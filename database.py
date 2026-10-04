"""
=============================================================================
INGÉFINDER DATA PIPELINE - GESTIONNAIRE DE BASE DE DONNÉES & UPSERT
=============================================================================
Auteur : Senior Data Engineering & Web Scraping Architect
Rôle   : Migration et injection idempotente (Upsert ON CONFLICT DO UPDATE)
         compatible SQLite 3.35+ et PostgreSQL 14+.
=============================================================================
"""

import json
import logging
import sqlite3
from pathlib import Path
from typing import Any, Dict, List, Optional, Tuple, Union

logger = logging.getLogger("Database")

DEFAULT_DB_PATH = Path("ingenieurs_francophonie.db")
DEFAULT_SCHEMA_PATH = Path("schema.sql")


class DatabaseManager:
    """
    Gestionnaire d'accès aux données avec support des transactions idempotentes :
    - Exécution DDL de schéma (schema.sql)
    - Upsert sur toutes les entités sans création de doublons
    - Requêtes analytiques complexes
    """

    def __init__(self, db_path: Union[str, Path] = DEFAULT_DB_PATH):
        self.db_path = Path(db_path)

    def get_connection(self) -> sqlite3.Connection:
        conn = sqlite3.connect(self.db_path)
        conn.execute("PRAGMA foreign_keys = ON;")
        conn.row_factory = sqlite3.Row
        return conn

    def init_schema(self, schema_path: Union[str, Path] = DEFAULT_SCHEMA_PATH) -> bool:
        """Initialise ou met à jour la structure des tables."""
        schema_file = Path(schema_path)
        if not schema_file.exists():
            logger.error("Le fichier DDL %s est introuvable.", schema_path)
            return False

        with open(schema_file, "r", encoding="utf-8") as f:
            ddl_script = f.read()

        with self.get_connection() as conn:
            conn.executescript(ddl_script)
            conn.commit()

        logger.info("Schéma initialisé avec succès depuis %s", schema_file.name)
        return True

    # -----------------------------------------------------------------------
    # SYSTÈME D'UPSERT (ON CONFLICT DO UPDATE)
    # -----------------------------------------------------------------------

    def upsert_ecole(self, data: Dict[str, Any]) -> str:
        """
        Insère ou met à jour un établissement canonique.
        """
        sql = """
        INSERT INTO ecoles (
            id, nom_officiel, sigle, pays, ville_principale, statut_juridique,
            frais_scolarite_annuels, site_web, description, logo_url,
            habilitation_cti, label_eurace, annee_creation, updated_at
        ) VALUES (
            :id, :nom_officiel, :sigle, :pays, :ville_principale, :statut_juridique,
            :frais_scolarite_annuels, :site_web, :description, :logo_url,
            :habilitation_cti, :label_eurace, :annee_creation, CURRENT_TIMESTAMP
        )
        ON CONFLICT(id) DO UPDATE SET
            nom_officiel = excluded.nom_officiel,
            sigle = excluded.sigle,
            statut_juridique = excluded.statut_juridique,
            frais_scolarite_annuels = excluded.frais_scolarite_annuels,
            site_web = excluded.site_web,
            description = COALESCE(excluded.description, ecoles.description),
            habilitation_cti = excluded.habilitation_cti,
            label_eurace = excluded.label_eurace,
            updated_at = CURRENT_TIMESTAMP;
        """
        params = {
            "id": data["id"],
            "nom_officiel": data["nom_officiel"],
            "sigle": data.get("sigle", data["id"].upper()),
            "pays": data.get("pays", "France"),
            "ville_principale": data.get("ville_principale", ""),
            "statut_juridique": data.get("statut_juridique", "Public"),
            "frais_scolarite_annuels": int(data.get("frais_scolarite_annuels", 0)),
            "site_web": data.get("site_web", ""),
            "description": data.get("description", ""),
            "logo_url": data.get("logo_url", ""),
            "habilitation_cti": 1 if data.get("habilitation_cti", True) else 0,
            "label_eurace": 1 if data.get("label_eurace", True) else 0,
            "annee_creation": data.get("annee_creation")
        }

        with self.get_connection() as conn:
            conn.execute(sql, params)
            conn.commit()

        return data["id"]

    def upsert_campus(self, data: Dict[str, Any]) -> str:
        """
        Insère ou met à jour un campus rattaché à une école.
        """
        sql = """
        INSERT INTO campus (
            id, ecole_id, nom_campus, ville, code_postal, adresse, latitude, longitude, est_siege_principal
        ) VALUES (
            :id, :ecole_id, :nom_campus, :ville, :code_postal, :adresse, :latitude, :longitude, :est_siege_principal
        )
        ON CONFLICT(id) DO UPDATE SET
            nom_campus = excluded.nom_campus,
            latitude = COALESCE(excluded.latitude, campus.latitude),
            longitude = COALESCE(excluded.longitude, campus.longitude);
        """
        params = {
            "id": data["id"],
            "ecole_id": data["ecole_id"],
            "nom_campus": data["nom_campus"],
            "ville": data["ville"],
            "code_postal": data.get("code_postal"),
            "adresse": data.get("adresse"),
            "latitude": data.get("latitude"),
            "longitude": data.get("longitude"),
            "est_siege_principal": 1 if data.get("est_siege_principal") else 0
        }

        with self.get_connection() as conn:
            conn.execute(sql, params)
            conn.commit()

        return data["id"]

    def upsert_specialite(self, data: Dict[str, Any]) -> str:
        """
        Insère ou met à jour une spécialité diplômante.
        """
        sql = """
        INSERT INTO specialites_diplomes (
            id, ecole_id, intitule_specialite, domaine, type_cursus,
            diplome_delivre, duree_annees, competences_cles
        ) VALUES (
            :id, :ecole_id, :intitule_specialite, :domaine, :type_cursus,
            :diplome_delivre, :duree_annees, :competences_cles
        )
        ON CONFLICT(id) DO UPDATE SET
            intitule_specialite = excluded.intitule_specialite,
            domaine = excluded.domaine,
            type_cursus = excluded.type_cursus,
            competences_cles = excluded.competences_cles;
        """
        params = {
            "id": data["id"],
            "ecole_id": data["ecole_id"],
            "intitule_specialite": data["intitule_specialite"],
            "domaine": data["domaine"],
            "type_cursus": data.get("type_cursus", "Initiale"),
            "diplome_delivre": data.get("diplome_delivre", "Titre d'Ingénieur Diplômé (Bac+5 / Grade de Master)"),
            "duree_annees": int(data.get("duree_annees", 3)),
            "competences_cles": data.get("competences_cles", "")
        }

        with self.get_connection() as conn:
            conn.execute(sql, params)
            conn.commit()

        return data["id"]

    def upsert_admissions_stats(self, data: Dict[str, Any]) -> str:
        """
        Insère ou met à jour les statistiques de sélection (Parcoursup / Concours).
        """
        sql = """
        INSERT INTO admissions_stats (
            id, ecole_id, source, annee, nom_filiere_concours, capacite, nb_voeux,
            taux_acces, rang_dernier_appele, pct_mention_tb, pct_boursiers, raw_payload
        ) VALUES (
            :id, :ecole_id, :source, :annee, :nom_filiere_concours, :capacite, :nb_voeux,
            :taux_acces, :rang_dernier_appele, :pct_mention_tb, :pct_boursiers, :raw_payload
        )
        ON CONFLICT(id) DO UPDATE SET
            ecole_id = excluded.ecole_id,
            source = excluded.source,
            annee = excluded.annee,
            nom_filiere_concours = excluded.nom_filiere_concours,
            capacite = excluded.capacite,
            nb_voeux = excluded.nb_voeux,
            taux_acces = excluded.taux_acces,
            rang_dernier_appele = excluded.rang_dernier_appele,
            pct_mention_tb = excluded.pct_mention_tb,
            pct_boursiers = excluded.pct_boursiers,
            raw_payload = excluded.raw_payload;
        """
        raw_json = json.dumps(data.get("raw_payload", {})) if isinstance(data.get("raw_payload"), dict) else data.get("raw_payload")
        params = {
            "id": data["id"],
            "ecole_id": data["ecole_id"],
            "source": data["source"],
            "annee": int(data["annee"]),
            "nom_filiere_concours": data.get("nom_filiere_concours", "Général"),
            "capacite": int(data.get("capacite", 0)),
            "nb_voeux": int(data.get("nb_voeux", 0)),
            "taux_acces": data.get("taux_acces"),
            "rang_dernier_appele": data.get("rang_dernier_appele"),
            "pct_mention_tb": data.get("pct_mention_tb"),
            "pct_boursiers": data.get("pct_boursiers"),
            "raw_payload": raw_json
        }

        with self.get_connection() as conn:
            conn.execute(sql, params)
            conn.commit()

        return data["id"]

    def upsert_classement(self, data: Dict[str, Any]) -> str:
        """
        Insère ou met à jour les scores de classement média (Figaro, Étudiant, Usine Nouvelle).
        """
        sql = """
        INSERT INTO classements (
            id, ecole_id, source_media, annee, rang_general, domaine_specialite,
            rang_par_specialite, note_globale, raw_metrics
        ) VALUES (
            :id, :ecole_id, :source_media, :annee, :rang_general, :domaine_specialite,
            :rang_par_specialite, :note_globale, :raw_metrics
        )
        ON CONFLICT(id) DO UPDATE SET
            ecole_id = excluded.ecole_id,
            source_media = excluded.source_media,
            annee = excluded.annee,
            rang_general = excluded.rang_general,
            domaine_specialite = excluded.domaine_specialite,
            rang_par_specialite = excluded.rang_par_specialite,
            note_globale = excluded.note_globale,
            raw_metrics = excluded.raw_metrics;
        """
        raw_json = json.dumps(data.get("raw_metrics", {})) if isinstance(data.get("raw_metrics"), dict) else data.get("raw_metrics")
        params = {
            "id": data["id"],
            "ecole_id": data["ecole_id"],
            "source_media": data["source_media"],
            "annee": int(data["annee"]),
            "rang_general": data.get("rang_general"),
            "domaine_specialite": data.get("domaine_specialite"),
            "rang_par_specialite": data.get("rang_par_specialite"),
            "note_globale": data.get("note_globale"),
            "raw_metrics": raw_json
        }

        with self.get_connection() as conn:
            conn.execute(sql, params)
            conn.commit()

        return data["id"]

    def upsert_insertion(self, data: Dict[str, Any]) -> str:
        """
        Insère ou met à jour les données certifiées d'insertion professionnelle.
        """
        sql = """
        INSERT INTO insertion_professionnelle (
            id, ecole_id, annee_promo, salaire_moyen_embauche, salaire_avec_primes,
            salaire_3_ans, taux_emploi_6_mois, pct_international, pct_poursuite_etudes,
            duree_moyenne_recherche_mois
        ) VALUES (
            :id, :ecole_id, :annee_promo, :salaire_moyen_embauche, :salaire_avec_primes,
            :salaire_3_ans, :taux_emploi_6_mois, :pct_international, :pct_poursuite_etudes,
            :duree_moyenne_recherche_mois
        )
        ON CONFLICT(id) DO UPDATE SET
            ecole_id = excluded.ecole_id,
            annee_promo = excluded.annee_promo,
            salaire_moyen_embauche = excluded.salaire_moyen_embauche,
            salaire_avec_primes = excluded.salaire_avec_primes,
            salaire_3_ans = excluded.salaire_3_ans,
            taux_emploi_6_mois = excluded.taux_emploi_6_mois,
            pct_international = excluded.pct_international,
            pct_poursuite_etudes = excluded.pct_poursuite_etudes,
            duree_moyenne_recherche_mois = excluded.duree_moyenne_recherche_mois;
        """
        params = {
            "id": data["id"],
            "ecole_id": data["ecole_id"],
            "annee_promo": int(data["annee_promo"]),
            "salaire_moyen_embauche": float(data["salaire_moyen_embauche"]),
            "salaire_avec_primes": data.get("salaire_avec_primes"),
            "salaire_3_ans": data.get("salaire_3_ans"),
            "taux_emploi_6_mois": float(data["taux_emploi_6_mois"]),
            "pct_international": data.get("pct_international"),
            "pct_poursuite_etudes": data.get("pct_poursuite_etudes"),
            "duree_moyenne_recherche_mois": data.get("duree_moyenne_recherche_mois")
        }

        with self.get_connection() as conn:
            conn.execute(sql, params)
            conn.commit()

        return data["id"]

    def execute_query(self, query: str, params: Optional[Dict[str, Any]] = None) -> List[Dict[str, Any]]:
        """Exécute une requête SQL en lecture et renvoie des dictionnaires."""
        with self.get_connection() as conn:
            cursor = conn.cursor()
            if params:
                cursor.execute(query, params)
            else:
                cursor.execute(query)
            rows = cursor.fetchall()
            return [dict(row) for row in rows]
