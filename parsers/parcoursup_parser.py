"""
=============================================================================
PARSER PARCOURSUP (CARTE & OPEN DATA ENSEIGNEMENT SUPÉRIEUR)
=============================================================================
Auteur : Senior Data Engineering & Web Scraping Architect
Sources :
  - API Open Data data.enseignementsup-recherche.gouv.fr (Dataset Parcoursup)
  - Endpoint GeoJSON carte Parcoursup : dossier.parcoursup.fr/Candidat/carte
=============================================================================
"""

import json
import logging
import re
from typing import Any, Dict, List, Optional

logger = logging.getLogger("ParcoursupParser")


class ParcoursupParser:
    """
    Parser pour les données Parcoursup :
    - Taux d'accès (%)
    - Rang du dernier appelé
    - Nombre de vœux confirmés
    - Capacité d'accueil
    - Répartition des mentions (Mention Très Bien %)
    - Pourcentage de boursiers
    """

    OPEN_DATA_PARCOURSUP_URL = (
        "https://data.enseignementsup-recherche.gouv.fr/api/explore/v2.1/catalog/datasets/"
        "fr-esr-parcoursup/records"
    )

    @staticmethod
    def parse_api_record(record: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        """
        Extrait et normalise un enregistrement brut retourné par l'API data.gouv.fr / ESR.
        """
        fields = record.get("fields", record)
        if not fields:
            return None

        # Vérifier s'il s'agit bien d'une formation d'ingénieurs
        filiere = fields.get("filiere_libelle_tres_abrege") or fields.get("fil_lib_voe_acc") or ""
        type_form = fields.get("filiere_formation") or fields.get("type_formation") or ""

        # Extraction des indicateurs d'admission
        try:
            capacite = int(fields.get("capa_fin", 0) or fields.get("capacite", 0) or 0)
            nb_voeux = int(fields.get("voe_tot", 0) or fields.get("nb_voeux", 0) or 0)
            
            # Taux d'accès
            taux_acces_raw = fields.get("taux_acces_ens") or fields.get("taux_acces")
            taux_acces = float(taux_acces_raw) if taux_acces_raw is not None else None
            if taux_acces is None and nb_voeux > 0 and capacite > 0:
                taux_acces = round((capacite / nb_voeux) * 100, 2)

            # Rang du dernier appelé
            rang_dernier = fields.get("ran_grp_sup") or fields.get("rang_dernier_appele")
            rang_dernier = int(rang_dernier) if rang_dernier else None

            # Mention Très Bien
            pct_mention_tb = fields.get("pct_acc_mention_tres_bien") or fields.get("pct_mention_tb")
            pct_mention_tb = float(pct_mention_tb) if pct_mention_tb else None

            # Boursiers
            pct_boursiers = fields.get("pct_boursiers") or fields.get("pct_b")
            pct_boursiers = float(pct_boursiers) if pct_boursiers else None

            annee = int(fields.get("session") or fields.get("annee") or 2024)

            etablissement_nom = fields.get("g_ea_lib_vx") or fields.get("etablissement_nom") or ""
            ville = fields.get("ville_etab") or fields.get("commune") or ""
            code_postal = fields.get("code_postal") or fields.get("dep") or ""

            return {
                "source": "Parcoursup",
                "annee": annee,
                "nom_etablissement_brut": etablissement_nom,
                "filiere_nom": filiere or type_form,
                "ville": ville,
                "code_postal": code_postal,
                "capacite": capacite,
                "nb_voeux": nb_voeux,
                "taux_acces": taux_acces,
                "rang_dernier_appele": rang_dernier,
                "pct_mention_tb": pct_mention_tb,
                "pct_boursiers": pct_boursiers,
                "raw_payload": {
                    "code_uai": fields.get("cod_uai") or fields.get("uai"),
                    "concours": fields.get("concours_nom"),
                    "frais_scolarite_indicatifs": fields.get("frais_scol")
                }
            }
        except Exception as e:
            logger.debug("Erreur parsing enregistrement Parcoursup : %s", str(e))
            return None

    @staticmethod
    def parse_carte_geojson(geojson_data: Dict[str, Any]) -> List[Dict[str, Any]]:
        """
        Extrait les fiches formations depuis le GeoJSON de la carte interactive Parcoursup.
        """
        features = geojson_data.get("features", [])
        parsed_list = []

        for feat in features:
            props = feat.get("properties", {})
            geom = feat.get("geometry", {})
            coords = geom.get("coordinates", [None, None])

            parsed = {
                "id_formation": props.get("id"),
                "nom_etablissement": props.get("nm"),
                "filiere": props.get("fl"),
                "ville": props.get("commune"),
                "latitude": coords[1] if len(coords) > 1 else None,
                "longitude": coords[0] if len(coords) > 0 else None,
                "capacite": props.get("cap"),
                "taux_acces": props.get("tx_acc")
            }
            parsed_list.append(parsed)

        return parsed_list
