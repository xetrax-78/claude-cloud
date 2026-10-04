"""
=============================================================================
INGÉFINDER DATA PIPELINE - RÉCONCILIATION D'ENTITÉS (ENTITY RESOLUTION)
=============================================================================
Auteur : Senior Data Engineering & Web Scraping Architect
Rôle   : Réconcilier les libellés hétérogènes d'écoles d'ingénieurs issus des
         différentes sources (Parcoursup, L'Étudiant, Le Figaro, CTI, Onisep)
         vers un identifiant unique pérenne (ecole_id).
=============================================================================
"""

import difflib
import logging
import re
import unicodedata
from dataclasses import dataclass, field
from typing import Dict, List, Optional, Set, Tuple

logger = logging.getLogger("EntityResolution")

# Import conditionnel de RapidFuzz / TheFuzz avec fallback pur Python
try:
    from rapidfuzz import fuzz, process
    HAS_RAPIDFUZZ = True
except ImportError:
    try:
        from thefuzz import fuzz
        HAS_RAPIDFUZZ = False
        HAS_THEFUZZ = True
    except ImportError:
        HAS_RAPIDFUZZ = False
        HAS_THEFUZZ = False


# ---------------------------------------------------------------------------
# NORMALISATION TEXTUELLE POUSSÉE
# ---------------------------------------------------------------------------
STOPWORDS_FR = {
    "ecole", "institut", "universite", "nationale", "superieure", "des", "du", "de",
    "la", "le", "les", "d", "l", "et", "en", "pour", "polytechnique", "technologie",
    "sciences", "ingenieur", "ingenieurs", "grand", "grande", "campus"
}

def strip_accents(text: str) -> str:
    """Supprime les diacritiques et accents français."""
    text = unicodedata.normalize("NFD", text)
    return "".join(c for c in text if unicodedata.category(c) != "Mn")

def clean_school_name(raw_name: str, keep_tokens: bool = False) -> str:
    """
    Nettoie et standardise un libellé d'établissement :
    - Mise en minuscules
    - Suppression des accents et caractères spéciaux
    - Élimination des parenthèses et détails administratifs superflus
    """
    if not raw_name:
        return ""
    
    text = strip_accents(raw_name.lower())
    # Remplacement des parenthèses et tirets par des espaces
    text = re.sub(r'[\(\)\[\]\-_,/\.]+', ' ', text)
    # Suppression des espaces multiples
    tokens = text.split()
    
    if keep_tokens:
        filtered = [t for t in tokens if t not in STOPWORDS_FR and len(t) > 1]
        return " ".join(filtered) if filtered else " ".join(tokens)
    
    return " ".join(tokens)


# ---------------------------------------------------------------------------
# BASE DE CONNAISSANCES CANONIQUE & ALIAS OFFICIELS
# ---------------------------------------------------------------------------
@dataclass
class CanonicalSchool:
    id: str
    nom_officiel: str
    sigle: str
    ville_principale: str
    pays: str
    aliases: Set[str] = field(default_factory=set)


CANONICAL_REGISTRY: List[CanonicalSchool] = [
    CanonicalSchool(
        id="polytechnique-fra",
        nom_officiel="École Polytechnique",
        sigle="X",
        ville_principale="Palaiseau",
        pays="France",
        aliases={
            "polytechnique", "l'x", "ecole polytechnique", "polytechnique paris",
            "institut polytechnique de paris ecole polytechnique", "ep", "x palaiseau"
        }
    ),
    CanonicalSchool(
        id="centralesupelec-fra",
        nom_officiel="CentraleSupélec",
        sigle="CS",
        ville_principale="Gif-sur-Yvette",
        pays="France",
        aliases={
            "centralesupelec", "centrale supelec", "centrale-supelec", "centrale paris",
            "supelec", "universite paris-saclay centralesupelec", "ecole centrale des arts et manufactures"
        }
    ),
    CanonicalSchool(
        id="mines-paris-fra",
        nom_officiel="Mines Paris - PSL",
        sigle="Mines Paris",
        ville_principale="Paris",
        pays="France",
        aliases={
            "mines paris", "mines paristech", "ecole des mines de paris", "ensmp",
            "mines psl", "universite psl mines paris", "mines de paris"
        }
    ),
    CanonicalSchool(
        id="telecom-paris-fra",
        nom_officiel="Télécom Paris",
        sigle="Télécom Paris",
        ville_principale="Palaiseau",
        pays="France",
        aliases={
            "telecom paris", "telecom paristech", "enst", "ecole nationale superieure des telecommunications",
            "telecom paris institut polytechnique de paris", "telecom ip paris"
        }
    ),
    CanonicalSchool(
        id="ponts-paristech-fra",
        nom_officiel="École des Ponts ParisTech",
        sigle="Ponts ParisTech",
        ville_principale="Champs-sur-Marne",
        pays="France",
        aliases={
            "ecole des ponts paristech", "ponts paristech", "ponts et chaussees", "enpc",
            "ecole nationale des ponts et chaussees", "les ponts"
        }
    ),
    CanonicalSchool(
        id="isae-supaero-fra",
        nom_officiel="ISAE-SUPAERO",
        sigle="ISAE-SUPAERO",
        ville_principale="Toulouse",
        pays="France",
        aliases={
            "isae supaero", "isae-supaero", "supaero", "ensica", "institut superieur de l'aeronautique et de l'espace"
        }
    ),
    CanonicalSchool(
        id="ensam-paristech-fra",
        nom_officiel="Arts et Métiers ParisTech",
        sigle="ENSAM",
        ville_principale="Paris",
        pays="France",
        aliases={
            "arts et metiers", "ensam", "arts et metiers paristech", "gadzarts",
            "ecole nationale superieure d'arts et metiers"
        }
    ),
    CanonicalSchool(
        id="insa-lyon-fra",
        nom_officiel="INSA Lyon",
        sigle="INSA Lyon",
        ville_principale="Villeurbanne",
        pays="France",
        aliases={
            "insa lyon", "institut national des sciences appliquees de lyon", "groupe insa lyon", "insa villeurbanne"
        }
    ),
    CanonicalSchool(
        id="utc-compiegne-fra",
        nom_officiel="Université de Technologie de Compiègne",
        sigle="UTC",
        ville_principale="Compiègne",
        pays="France",
        aliases={
            "utc", "utc compiegne", "universite de technologie compiegne", "reseau ut utc"
        }
    ),
    CanonicalSchool(
        id="epita-paris-fra",
        nom_officiel="EPITA",
        sigle="EPITA",
        ville_principale="Paris",
        pays="France",
        aliases={
            "epita", "epita paris", "ecole pour l'informatique et les techniques avancees", "epita kremlin bicetre"
        }
    ),
    CanonicalSchool(
        id="epfl-lausanne-che",
        nom_officiel="École Polytechnique Fédérale de Lausanne",
        sigle="EPFL",
        ville_principale="Lausanne",
        pays="Suisse",
        aliases={
            "epfl", "epf lausanne", "ecole polytechnique federale de lausanne", "swiss federal institute of technology lausanne"
        }
    ),
    CanonicalSchool(
        id="heig-vd-yverdon-che",
        nom_officiel="HEIG-VD",
        sigle="HEIG-VD",
        ville_principale="Yverdon-les-Bains",
        pays="Suisse",
        aliases={
            "heig vd", "heig-vd", "haute ecole d'ingenierie et de gestion du canton de vaud", "hes-so heig-vd"
        }
    ),
    CanonicalSchool(
        id="epl-uclouvain-bel",
        nom_officiel="École Polytechnique de Louvain",
        sigle="EPL UCLouvain",
        ville_principale="Louvain-la-Neuve",
        pays="Belgique",
        aliases={
            "epl uclouvain", "ecole polytechnique de louvain", "uclouvain epl", "faculte d'ingenierie uclouvain"
        }
    ),
    CanonicalSchool(
        id="polytech-ulb-bel",
        nom_officiel="École Polytechnique de Bruxelles",
        sigle="Polytech ULB",
        ville_principale="Bruxelles",
        pays="Belgique",
        aliases={
            "polytech ulb", "ecole polytechnique de bruxelles", "ulb polytech", "faculte polytechnique ulb"
        }
    ),
    CanonicalSchool(
        id="polymtl-montreal-can",
        nom_officiel="Polytechnique Montréal",
        sigle="PolyMTL",
        ville_principale="Montréal",
        pays="Canada",
        aliases={
            "polytechnique montreal", "polymtl", "ecole polytechnique de montreal",
            "polytechnique udem", "polytechnique montreal universite de montreal"
        }
    ),
    CanonicalSchool(
        id="ets-montreal-can",
        nom_officiel="École de technologie supérieure",
        sigle="ÉTS Montréal",
        ville_principale="Montréal",
        pays="Canada",
        aliases={
            "ets", "ets montreal", "ecole de technologie superieure", "universite du quebec ets"
        }
    ),
    CanonicalSchool(
        id="ulaval-genie-can",
        nom_officiel="Faculté des sciences et de génie - Université Laval",
        sigle="ULaval Génie",
        ville_principale="Québec",
        pays="Canada",
        aliases={
            "ulaval genie", "universite laval genie", "faculte des sciences et de genie universite laval", "fsg ulaval"
        }
    )
]


# ---------------------------------------------------------------------------
# MOTEUR DE CORRESPONDANCE FLOUE & SCORING
# ---------------------------------------------------------------------------
def compute_similarity(str1: str, str2: str) -> float:
    """Calcule une similarité textuelle robuste normalisée entre 0.0 et 1.0."""
    if not str1 or not str2:
        return 0.0
    
    if HAS_RAPIDFUZZ:
        score_token = fuzz.token_sort_ratio(str1, str2) / 100.0
        score_partial = fuzz.partial_ratio(str1, str2) / 100.0
        return max(score_token, score_partial)
    elif HAS_THEFUZZ:
        score_token = fuzz.token_sort_ratio(str1, str2) / 100.0
        return score_token
    else:
        # Fallback difflib SequenceMatcher
        seq = difflib.SequenceMatcher(None, str1, str2)
        return seq.ratio()


class EntityResolver:
    """
    Système de résolution d'entités avec :
    1. Résolution exacte par table d'alias
    2. Correspondance floue (Fuzzy Matching)
    3. Pondération contextuelle par ville ou pays
    """

    def __init__(self, registry: List[CanonicalSchool] = CANONICAL_REGISTRY):
        self.registry = registry
        # Index de lookup direct par hash de chaîne nettoyée
        self.direct_alias_map: Dict[str, str] = {}
        self._build_index()

    def _build_index(self):
        for school in self.registry:
            # Enregistrer le nom officiel et sigle
            clean_off = clean_school_name(school.nom_officiel)
            clean_sigle = clean_school_name(school.sigle)
            self.direct_alias_map[clean_off] = school.id
            if len(clean_sigle) >= 2:
                self.direct_alias_map[clean_sigle] = school.id

            # Enregistrer tous les alias
            for alias in school.aliases:
                clean_al = clean_school_name(alias)
                self.direct_alias_map[clean_al] = school.id

    def resolve(
        self,
        raw_name: str,
        city: Optional[str] = None,
        country: Optional[str] = None,
        min_confidence: float = 0.75
    ) -> Tuple[Optional[str], float, Optional[str]]:
        """
        Résout un nom brut vers un `ecole_id`.
        Retourne : (ecole_id, score_confiance, nom_canonique).
        """
        if not raw_name:
            return None, 0.0, None

        cleaned_query = clean_school_name(raw_name)
        cleaned_tokens_query = clean_school_name(raw_name, keep_tokens=True)

        # 1. Correspondance exacte dans la map d'alias (Confiance 1.0)
        if cleaned_query in self.direct_alias_map:
            cid = self.direct_alias_map[cleaned_query]
            school = next(s for s in self.registry if s.id == cid)
            return school.id, 1.0, school.nom_officiel

        # 2. Recherche par sigle strict si court
        for school in self.registry:
            if clean_school_name(school.sigle) == cleaned_query and len(cleaned_query) >= 2:
                return school.id, 1.0, school.nom_officiel

        # 3. Fuzzy matching multi-cibles
        best_id: Optional[str] = None
        best_score: float = 0.0
        best_name: Optional[str] = None

        city_clean = clean_school_name(city) if city else ""

        for school in self.registry:
            candidate_names = [school.nom_officiel, school.sigle] + list(school.aliases)
            
            school_scores = []
            for candidate in candidate_names:
                clean_cand = clean_school_name(candidate)
                sim1 = compute_similarity(cleaned_query, clean_cand)
                sim2 = compute_similarity(cleaned_tokens_query, clean_school_name(candidate, keep_tokens=True))
                sim = max(sim1, sim2)
                school_scores.append(sim)

            max_school_score = max(school_scores) if school_scores else 0.0

            # Bonus géographique (si la ville correspond)
            if city_clean and city_clean in clean_school_name(school.ville_principale):
                max_school_score = min(1.0, max_school_score + 0.1)

            # Bonus pays
            if country and country.lower() == school.pays.lower():
                max_school_score = min(1.0, max_school_score + 0.05)

            if max_school_score > best_score:
                best_score = max_school_score
                best_id = school.id
                best_name = school.nom_officiel

        if best_score >= min_confidence and best_id:
            logger.debug(
                "Résolution réussie : '%s' -> '%s' (%s) avec confiance %.2f",
                raw_name, best_name, best_id, best_score
            )
            return best_id, round(best_score, 3), best_name

        logger.warning("Résolution incertaine pour '%s' (meilleur score %.2f < seuil %.2f)", raw_name, best_score, min_confidence)
        return None, round(best_score, 3), None
