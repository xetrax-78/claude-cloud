"""
=============================================================================
PARSER L'ÉTUDIANT (PALMARÈS DES ÉCOLES D'INGÉNIEURS)
=============================================================================
Auteur : Senior Data Engineering & Web Scraping Architect
Sources :
  - Palmarès annuel : https://www.letudiant.fr/palmares/liste-profils/classement-des-ecoles-d-ingenieurs.html
  - Fiches comparatives par établissement
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

logger = logging.getLogger("LEtudiantParser")


class LEtudiantParser:
    """
    Parser HTML & JSON pour les palmarès de L'Étudiant :
    - Rang général et rang par critère
    - Note globale et sous-notes (Excellence académique, International, Proximité entreprises)
    - Salaires à 6 mois et à 3 ans (k€)
    - Part de diplômés à l'étranger (%)
    - Accréditations (EUR-ACE, CTI, AMBA, AACSB)
    """

    @staticmethod
    def parse_ranking_html(html_content: str, annee: int = 2025) -> List[Dict[str, Any]]:
        """
        Parse le tableau de classement L'Étudiant à partir du DOM HTML.
        Gère les tables dynamiques et les balises de données JSON intégrées (Next.js / Nuxt).
        """
        results = []
        if not HAS_BS4:
            # Fallback regex extraction sur JSON ou balises basiques
            json_match = re.search(r'<script id="__NEXT_DATA__"[^>]*>(.*?)</script>', html_content, re.DOTALL)
            if json_match:
                try:
                    data = json.loads(json_match.group(1))
                    items = data.get("props", {}).get("pageProps", {}).get("rankingData", {}).get("items", [])
                    for item in items:
                        results.append({
                            "source_media": "L'Étudiant",
                            "annee": annee,
                            "nom_brut": item.get("name") or item.get("title"),
                            "sigle": item.get("acronym"),
                            "rang_general": item.get("rank"),
                            "note_globale": item.get("overallScore")
                        })
                    return results
                except Exception:
                    pass
            return results

        soup = BeautifulSoup(html_content, "html.parser")

        # 1. Tentative d'extraction depuis les données d'état intégrées __NEXT_DATA__ ou script JSON-LD
        script_data = soup.find("script", id="__NEXT_DATA__")
        if script_data and script_data.string:
            try:
                data = json.loads(script_data.string)
                items = (
                    data.get("props", {})
                    .get("pageProps", {})
                    .get("rankingData", {})
                    .get("items", [])
                )
                if items:
                    for item in items:
                        results.append({
                            "source_media": "L'Étudiant",
                            "annee": annee,
                            "nom_brut": item.get("name") or item.get("title"),
                            "sigle": item.get("acronym"),
                            "rang_general": item.get("rank"),
                            "note_globale": item.get("overallScore"),
                            "salaire_embauche": item.get("salaryExit"),
                            "salaire_3_ans": item.get("salary3Years"),
                            "taux_emploi_6m": item.get("employmentRate"),
                            "pct_international": item.get("internationalPct"),
                            "note_excellence": item.get("academicScore"),
                            "note_entreprises": item.get("corporateScore"),
                            "accreditations": item.get("accreditations", [])
                        })
                    return results
            except Exception as e:
                logger.debug("Échec extraction JSON __NEXT_DATA__ : %s", str(e))

        # 2. Parsing du tableau HTML traditionnel
        table = soup.find("table", class_=re.compile(r"ranking|palmares|table", re.I))
        rows = table.find_all("tr") if table else soup.find_all("div", class_=re.compile(r"row-ranking|card-ecole", re.I))

        for row in rows:
            try:
                nom_elem = row.find(class_=re.compile(r"name|title|nom", re.I)) or row.find("a")
                if not nom_elem:
                    continue
                nom_brut = nom_elem.get_text(strip=True)

                rang_elem = row.find(class_=re.compile(r"rank|rang|position", re.I))
                rang_match = re.search(r"\d+", rang_elem.get_text(strip=True)) if rang_elem else None
                rang = int(rang_match.group(0)) if rang_match else None

                score_elem = row.find(class_=re.compile(r"score|note", re.I))
                score_match = re.search(r"(\d+[\.,]?\d*)", score_elem.get_text(strip=True)) if score_elem else None
                note = float(score_match.group(1).replace(",", ".")) if score_match else None

                results.append({
                    "source_media": "L'Étudiant",
                    "annee": annee,
                    "nom_brut": nom_brut,
                    "rang_general": rang,
                    "note_globale": note,
                    "raw_metrics": {
                        "row_text_snippet": row.get_text(" ", strip=True)[:150]
                    }
                })
            except Exception as e:
                logger.debug("Erreur parsing ligne L'Étudiant : %s", str(e))

        return results
