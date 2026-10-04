"""
=============================================================================
PARSER LE FIGARO ÉTUDIANT (PALMARÈS GÉNÉRAL & PAR SPÉCIALITÉ)
=============================================================================
Auteur : Senior Data Engineering & Web Scraping Architect
Sources :
  - Palmarès des écoles d'ingénieurs : https://etudiant.lefigaro.fr/etudes/ecoles-ingenieurs/classement/
  - Classements thématiques (Informatique, Aéronautique, BTP, etc.)
=============================================================================
"""

import json
import logging
import re
from typing import Any, Dict, List, Optional

try:
    from bs4 import BeautifulSoup
    HAS_BS4 = True
except ImportError:
    HAS_BS4 = False
    BeautifulSoup = None

logger = logging.getLogger("FigaroParser")


class FigaroParser:
    """
    Parser pour Le Figaro Étudiant :
    - Classement général (Post-bac / Post-prépa)
    - Classement par domaine d'expertise (Informatique, BTP, Aéronautique, etc.)
    - Indicateur de sélectivité (moyenne au bac des intégrés)
    - Note de recherche académique
    - Salaire moyen brut à la sortie
    """

    DOMAINS_MAP = {
        "informatique": "Informatique & Logiciel",
        "cyber": "Cybersécurité",
        "aeronautique": "Aéronautique & Spatial",
        "btp": "Génie Civil & BTP",
        "energie": "Énergie & Environnement",
        "biologie": "Biotechnologies & Santé"
    }

    @staticmethod
    def parse_ranking_html(
        html_content: str,
        domaine_specialite: Optional[str] = None,
        annee: int = 2025
    ) -> List[Dict[str, Any]]:
        """
        Extrait les données d'un tableau de classement Le Figaro.
        """
        results = []
        soup = BeautifulSoup(html_content, "html.parser")

        # Recherche des lignes du tableau Figaro (classes .table-ranking, .classement-row, etc.)
        table_rows = soup.find_all("tr", class_=re.compile(r"row|classement|ecole", re.I))
        if not table_rows:
            table_rows = soup.find_all("div", class_=re.compile(r"item-classement|ecole-card", re.I))

        for row in table_rows:
            try:
                # 1. Nom de l'école
                nom_elem = row.find(class_=re.compile(r"nom|title|school-name", re.I)) or row.find("h3") or row.find("a")
                if not nom_elem:
                    continue
                nom_brut = nom_elem.get_text(strip=True)

                # 2. Rang
                rang_elem = row.find(class_=re.compile(r"rang|rank|position", re.I))
                rang_match = re.search(r"\d+", rang_elem.get_text(strip=True)) if rang_elem else None
                rang = int(rang_match.group(0)) if rang_match else None

                # 3. Note globale (/20)
                note_elem = row.find(class_=re.compile(r"note|score", re.I))
                note_match = re.search(r"(\d+[\.,]?\d*)", note_elem.get_text(strip=True)) if note_elem else None
                note_globale = float(note_match.group(1).replace(",", ".")) if note_match else None

                # 4. Métriques complémentaires (sélectivité, recherche, salaire)
                metrics = {}
                tds = row.find_all("td")
                for td in tds:
                    txt = td.get_text(strip=True)
                    if "€" in txt or "k" in txt:
                        sal_m = re.search(r"(\d+[\.,]?\d*)", txt)
                        if sal_m:
                            metrics["salaire_sortie"] = float(sal_m.group(1).replace(",", "."))
                    elif "/20" in txt:
                        note_m = re.search(r"(\d+[\.,]?\d*)", txt)
                        if note_m:
                            metrics["note_selectivite"] = float(note_m.group(1).replace(",", "."))

                results.append({
                    "source_media": "Le Figaro Étudiant",
                    "annee": annee,
                    "nom_brut": nom_brut,
                    "rang_general": rang if not domaine_specialite else None,
                    "domaine_specialite": domaine_specialite,
                    "rang_par_specialite": rang if domaine_specialite else None,
                    "note_globale": note_globale,
                    "raw_metrics": metrics
                })
            except Exception as e:
                logger.debug("Erreur parsing ligne Le Figaro : %s", str(e))

        return results
