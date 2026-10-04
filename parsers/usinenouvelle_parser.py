"""
=============================================================================
PARSER L'USINE NOUVELLE (INDICATEURS INDUSTRIELS & INNOVATION)
=============================================================================
Auteur : Senior Data Engineering & Web Scraping Architect
Sources :
  - Palmarès des écoles d'ingénieurs : https://www.usinenouvelle.com/comparatif-des-ecoles-d-ingenieurs/
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

logger = logging.getLogger("UsineNouvelleParser")


class UsineNouvelleParser:
    """
    Parser pour les indicateurs technologiques et industriels de L'Usine Nouvelle :
    - Rang d'insertion & international
    - Nombre de brevets déposés par an
    - Nombre de chaires industrielles d'entreprises
    - Nombre de startups incubées / créées
    - Part des femmes diplômées (%)
    - Durée minimale des stages obligatoires (semaines)
    """

    @staticmethod
    def parse_ranking_html(html_content: str, annee: int = 2025) -> List[Dict[str, Any]]:
        """
        Extrait les indicateurs d'innovation et industriels depuis L'Usine Nouvelle.
        """
        results = []
        soup = BeautifulSoup(html_content, "html.parser")

        cards = soup.find_all(class_=re.compile(r"card-school|item-comparatif|table-row", re.I))

        for card in cards:
            try:
                nom_elem = card.find(class_=re.compile(r"title|nom|name", re.I))
                if not nom_elem:
                    continue
                nom_brut = nom_elem.get_text(strip=True)

                rang_elem = card.find(class_=re.compile(r"rank|rang", re.I))
                rang_m = re.search(r"\d+", rang_elem.get_text(strip=True)) if rang_elem else None
                rang = int(rang_m.group(0)) if rang_m else None

                raw_metrics = {}
                text_block = card.get_text(" ", strip=True)

                # Extraction par expressions régulières des métriques industrielles
                brevets_m = re.search(r"(\d+)\s*brevets?", text_block, re.I)
                if brevets_m:
                    raw_metrics["nb_brevets"] = int(brevets_m.group(1))

                startups_m = re.search(r"(\d+)\s*startups?", text_block, re.I)
                if startups_m:
                    raw_metrics["nb_startups"] = int(startups_m.group(1))

                filles_m = re.search(r"(\d+[\.,]?\d*)\s*%\s*de\s*filles", text_block, re.I)
                if filles_m:
                    raw_metrics["part_filles"] = float(filles_m.group(1).replace(",", "."))

                stages_m = re.search(r"(\d+)\s*semaines?\s*de\s*stage", text_block, re.I)
                if stages_m:
                    raw_metrics["semaines_stages"] = int(stages_m.group(1))

                results.append({
                    "source_media": "L'Usine Nouvelle",
                    "annee": annee,
                    "nom_brut": nom_brut,
                    "rang_general": rang,
                    "raw_metrics": raw_metrics
                })
            except Exception as e:
                logger.debug("Erreur parsing carte Usine Nouvelle : %s", str(e))

        return results
