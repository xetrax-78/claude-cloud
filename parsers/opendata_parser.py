"""
=============================================================================
PARSER REGISTRES OFFICIELS & OPEN DATA (CTI, ONISEP, WIKIDATA)
=============================================================================
Auteur : Senior Data Engineering & Web Scraping Architect
Sources :
  - CTI (Commission des Titres d'Ingénieur) : Décisions d'accréditation
  - API Onisep / data.gouv.fr : Référentiel des structures
  - Wikidata SPARQL Endpoint : Géolocalisation, campus et identifiants pérennes
=============================================================================
"""

import json
import logging
import re
from typing import Any, Dict, List, Optional

logger = logging.getLogger("OpenDataParser")


class OpenDataParser:
    """
    Parser pour les registres officiels d'État :
    - Données d'accréditation CTI (durée, statut d'habilitation)
    - Labels EUR-ACE
    - Multi-campus (adresses et coordonnées GPS WGS84)
    - Statut juridique d'autorité publique ou associative
    """

    @staticmethod
    def parse_wikidata_bindings(bindings: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """
        Extrait les campus, coordonnées GPS et métadonnées depuis le JSON SPARQL Wikidata.
        """
        results = []
        for b in bindings:
            try:
                uri = b.get("item", {}).get("value", "")
                nom = b.get("itemLabel", {}).get("value", "")
                sigle = b.get("acronym", {}).get("value", "")
                pays = b.get("countryLabel", {}).get("value", "")
                ville = b.get("cityLabel", {}).get("value", "")
                coords_str = b.get("coords", {}).get("value", "")
                site_web = b.get("website", {}).get("value", "")
                annee_crea_str = b.get("founded", {}).get("value", "")

                # Parsing coordonnées Point(lon lat)
                lat, lon = None, None
                if coords_str:
                    m = re.search(r"Point\(([-\d\.]+)\s+([-\d\.]+)\)", coords_str)
                    if m:
                        lon = float(m.group(1))
                        lat = float(m.group(2))

                # Parsing année de création
                annee_crea = None
                if annee_crea_str:
                    m_year = re.search(r"^(\d{4})", annee_crea_str)
                    if m_year:
                        annee_crea = int(m_year.group(1))

                results.append({
                    "wikidata_uri": uri,
                    "nom_officiel": nom,
                    "sigle": sigle,
                    "pays": pays,
                    "ville": ville,
                    "latitude": lat,
                    "longitude": lon,
                    "site_web": site_web,
                    "annee_creation": annee_crea
                })
            except Exception as e:
                logger.debug("Erreur parsing binding Wikidata : %s", str(e))

        return results

    @staticmethod
    def parse_cti_entry(entry: Dict[str, Any]) -> Dict[str, Any]:
        """
        Normalise une entrée du registre CTI.
        """
        return {
            "nom_etablissement": entry.get("nom") or entry.get("etablissement"),
            "habilitation_cti": True,
            "duree_habilitation_annees": int(entry.get("duree", 5)),
            "label_eurace": bool(entry.get("eurace", True)),
            "statut_juridique": entry.get("statut", "Public"),
            "campus_secondaires": entry.get("sites_delocalises", [])
        }
