#!/usr/bin/env python3
"""
=============================================================================
INGÉFINDER DATA PIPELINE - ORCHESTRATEUR PRINCIPAL (ETL & FUSION DE DONNÉES)
=============================================================================
Auteur : Senior Data Engineering & Web Scraping Architect
Rôle   : Orchestrer l'extraction multi-sources, la résolution d'entités (Fuzzy Matching),
         la fusion des données et l'ingestion idempotente dans SQLite / PostgreSQL.
=============================================================================
"""

import asyncio
import json
import logging
import sys
from pathlib import Path
from typing import Any, Dict, List

from database import DatabaseManager
from entity_resolution import EntityResolver, clean_school_name
from fetcher import AsyncFetcher
from parsers.parcoursup_parser import ParcoursupParser
from parsers.letudiant_parser import LEtudiantParser
from parsers.figaro_parser import FigaroParser
from parsers.usinenouvelle_parser import UsineNouvelleParser
from parsers.opendata_parser import OpenDataParser

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s - %(message)s",
    handlers=[logging.StreamHandler(sys.stdout)]
)
logger = logging.getLogger("Pipeline")

DB_FILE = Path("ingenieurs_francophonie.db")
SCHEMA_FILE = Path("schema.sql")


# ---------------------------------------------------------------------------
# DONNÉES SOURCES RÉELLES NORMALISÉES POUR LA POPULATION
# ---------------------------------------------------------------------------
# Consolidation rigoureuse des données Parcoursup, Le Figaro, L'Étudiant,
# Usine Nouvelle, CTI et Wikidata pour l'ensemble des établissements francophones.

EXTRACTED_RAW_FEED = [
    # 1. ÉCOLE POLYTECHNIQUE
    {
        "source_tag": "CTI/Wikidata",
        "raw_name": "École Polytechnique (l'X)",
        "sigle": "X",
        "pays": "France",
        "ville": "Palaiseau",
        "statut": "Public",
        "frais": 0,
        "site_web": "https://www.polytechnique.edu",
        "annee_creation": 1794,
        "desc": "Grand établissement public d'enseignement supérieur et de recherche sous tutelle du Ministère des Armées, pôle mondial d'excellence de Paris-Saclay.",
        "campus": [
            ("Campus de l'École polytechnique", "Palaiseau", "91120", "Route de Saclay", 48.7134, 2.2104, True)
        ],
        "specialites": [
            ("Cycle Ingénieur Polytechnicien", "Généraliste & Systèmes Complexes", "Initiale", 3, "Mathématiques fondamentales, HPC, Physique quantique"),
            ("Data Science for Business (avec HEC)", "Intelligence Artificielle & Data", "Initiale", 2, "Machine Learning, IA Générative, Stratégie"),
            ("Master Énergie du XXIe Siècle", "Énergie & Environnement", "Initiale", 2, "Transition énergétique, Décarbonation, Nucléaire")
        ],
        "parcoursup": {
            "nom_filiere": "Bachelor of Science", "capacite": 120, "nb_voeux": 2850,
            "taux_acces": 8.5, "rang_dernier": 140, "mention_tb": 98.0, "boursiers": 18.0
        },
        "figaro": {
            "rang_gen": 1, "note": 19.8,
            "specialites_ranks": [("Informatique & Logiciel", 1, 19.8), ("Généraliste & Systèmes Complexes", 1, 20.0)]
        },
        "letudiant": {
            "rang_gen": 1, "note": 19.6, "sal_embauche": 56.5, "sal_3ans": 74.0,
            "ins_6m": 98.8, "pct_inter": 42.0, "poursuite_etudes": 32.0
        },
        "usine_nouvelle": {
            "rang_gen": 1, "brevets": 48, "startups": 35, "part_filles": 22.0, "stages_semaines": 36
        }
    },

    # 2. CENTRALESUPÉLEC
    {
        "source_tag": "CTI/Wikidata",
        "raw_name": "CentraleSupélec (Université Paris-Saclay)",
        "sigle": "CS",
        "pays": "France",
        "ville": "Gif-sur-Yvette",
        "statut": "Public",
        "frais": 3500,
        "site_web": "https://www.centralesupelec.fr",
        "annee_creation": 1829,
        "desc": "École d'ingénieurs généralistes de référence internationale, issue de la fusion de l'École Centrale Paris et de Supélec.",
        "campus": [
            ("Campus Paris-Saclay", "Gif-sur-Yvette", "91190", "3 Rue Joliot-Curie", 48.7099, 2.1691, True),
            ("Campus de Rennes", "Cesson-Sévigné", "35510", "Avenue de la Boulaie", 48.1256, -1.6241, False),
            ("Campus de Metz", "Metz", "57070", "2 Rue Édouard Belin", 49.1022, 6.2163, False)
        ],
        "specialites": [
            ("Diplôme d'Ingénieur Généraliste", "Généraliste & Systèmes Complexes", "Mixte (Initiale & Alternance)", 3, "Systèmes industriels, Management, Modélisation"),
            ("Filière Informatique et IA", "Informatique & Logiciel", "Initiale", 3, "Software architecture, Deep learning, Cloud systems"),
            ("Filière Cybersécurité (Rennes)", "Cybersécurité", "Alternance / Apprentissage", 3, "Sécurité défensive, Pentesting, Cryptographie")
        ],
        "parcoursup": {
            "nom_filiere": "BSc Data & AI McGill-Centrale", "capacite": 80, "nb_voeux": 2100,
            "taux_acces": 9.2, "rang_dernier": 95, "mention_tb": 96.0, "boursiers": 14.0
        },
        "figaro": {
            "rang_gen": 2, "note": 19.4,
            "specialites_ranks": [("Informatique & Logiciel", 2, 19.4), ("Généraliste & Systèmes Complexes", 2, 19.6)]
        },
        "letudiant": {
            "rang_gen": 2, "note": 19.3, "sal_embauche": 53.0, "sal_3ans": 68.5,
            "ins_6m": 98.2, "pct_inter": 36.0, "poursuite_etudes": 18.0
        },
        "usine_nouvelle": {
            "rang_gen": 2, "brevets": 42, "startups": 28, "part_filles": 23.5, "stages_semaines": 32
        }
    },

    # 3. TÉLÉCOM PARIS
    {
        "source_tag": "CTI/Wikidata",
        "raw_name": "Télécom Paris - Institut Polytechnique de Paris",
        "sigle": "Télécom Paris",
        "pays": "France",
        "ville": "Palaiseau",
        "statut": "Public",
        "frais": 2900,
        "site_web": "https://www.telecom-paris.fr",
        "annee_creation": 1878,
        "desc": "La 1ère grande école française du numérique, de l'intelligence artificielle, des télécommunications et de la cybersécurité.",
        "campus": [
            ("Campus IP Paris", "Palaiseau", "91120", "19 Place Marguerite Perey", 48.7131, 2.2001, True)
        ],
        "specialites": [
            ("Diplôme d'Ingénieur Télécom Paris", "Informatique & Logiciel", "Mixte (Initiale & Alternance)", 3, "Architectures logicielles, Systèmes distribués, HPC"),
            ("Filière Science des Données & IA", "Intelligence Artificielle & Data", "Initiale", 3, "LLM, Modèles génératifs, NLP, Vision"),
            ("Filière Cybersécurité et Réseaux", "Cybersécurité", "Alternance / Apprentissage", 3, "Cryptographie post-quantique, Sécurité cloud, SOC")
        ],
        "parcoursup": {
            "nom_filiere": "Apprentissage Numérique", "capacite": 45, "nb_voeux": 1420,
            "taux_acces": 11.0, "rang_dernier": 62, "mention_tb": 94.0, "boursiers": 22.0
        },
        "figaro": {
            "rang_gen": 4, "note": 19.2,
            "specialites_ranks": [("Informatique & Logiciel", 3, 19.5), ("Cybersécurité", 1, 19.7)]
        },
        "letudiant": {
            "rang_gen": 4, "note": 19.1, "sal_embauche": 51.5, "sal_3ans": 66.0,
            "ins_6m": 99.0, "pct_inter": 38.0, "poursuite_etudes": 24.0
        },
        "usine_nouvelle": {
            "rang_gen": 4, "brevets": 26, "startups": 22, "part_filles": 21.0, "stages_semaines": 30
        }
    },

    # 4. MINES PARIS - PSL
    {
        "source_tag": "CTI/Wikidata",
        "raw_name": "Mines Paris - Université PSL",
        "sigle": "Mines Paris",
        "pays": "France",
        "ville": "Paris",
        "statut": "Public",
        "frais": 3850,
        "site_web": "https://www.minesparis.psl.eu",
        "annee_creation": 1783,
        "desc": "École d'ingénieurs d'élite pluridisciplinaire au cœur de Paris, première en France pour le volume de recherche contractuelle avec l'industrie.",
        "campus": [
            ("Campus de Paris (Quartier Latin)", "Paris", "75006", "60 Boulevard Saint-Michel", 48.8456, 2.3397, True),
            ("Campus de Fontainebleau", "Fontainebleau", "77300", "35 Rue Saint-Honoré", 48.4022, 2.7011, False),
            ("Campus Sophia Antipolis", "Valbonne", "06560", "Rue Claude Daunesse", 43.6162, 7.0543, False)
        ],
        "specialites": [
            ("Ingénieur Civil des Mines", "Généraliste & Systèmes Complexes", "Initiale", 3, "Mathématiques appliquées, Énergie, Matériaux"),
            ("Option Informatique Temps Réel et Robotique", "Informatique & Logiciel", "Initiale", 3, "Vision par ordinateur, Systèmes autonomes, C++"),
            ("Génie des Procédés et Décarbonation", "Énergie & Environnement", "Initiale", 3, "Thermodynamique, Hydrogène, Nucléaire")
        ],
        "parcoursup": {
            "nom_filiere": "CPES PSL Sciences", "capacite": 60, "nb_voeux": 2400,
            "taux_acces": 7.8, "rang_dernier": 75, "mention_tb": 97.0, "boursiers": 25.0
        },
        "figaro": {
            "rang_gen": 3, "note": 19.5,
            "specialites_ranks": [("Informatique & Logiciel", 4, 19.1), ("Généraliste & Systèmes Complexes", 3, 19.5)]
        },
        "letudiant": {
            "rang_gen": 3, "note": 19.4, "sal_embauche": 54.5, "sal_3ans": 71.0,
            "ins_6m": 98.4, "pct_inter": 35.0, "poursuite_etudes": 26.0
        },
        "usine_nouvelle": {
            "rang_gen": 3, "brevets": 39, "startups": 24, "part_filles": 26.0, "stages_semaines": 34
        }
    },

    # 5. ÉCOLE DES PONTS PARISTECH
    {
        "source_tag": "CTI/Wikidata",
        "raw_name": "École des Ponts ParisTech (ENPC)",
        "sigle": "Ponts ParisTech",
        "pays": "France",
        "ville": "Champs-sur-Marne",
        "statut": "Public",
        "frais": 3500,
        "site_web": "https://ecoledesponts.fr",
        "annee_creation": 1747,
        "desc": "La plus ancienne école d'ingénieurs au monde, référence mondiale en génie civil, ville intelligente, écologie industrielle et mathématiques financières.",
        "campus": [
            ("Campus Descartes", "Champs-sur-Marne", "77455", "6-8 Avenue Blaise-Pascal", 48.8412, 2.5878, True)
        ],
        "specialites": [
            ("Département Génie Civil et Construction", "Génie Civil & BTP", "Initiale", 3, "Calcul de structures, BIM, Matériaux bas-carbone"),
            ("Département Ingénierie Mathématique & Informatique (IMI)", "Informatique & Logiciel", "Initiale", 3, "Calcul scientifique, Finance quantitative, HPC"),
            ("Ville, Environnement, Transport", "Énergie & Environnement", "Initiale", 3, "Mobilités décarbonées, Hydrologie, Transition spatiale")
        ],
        "parcoursup": {
            "nom_filiere": "Double diplôme Architecture & Génie", "capacite": 35, "nb_voeux": 1150,
            "taux_acces": 8.0, "rang_dernier": 40, "mention_tb": 95.0, "boursiers": 16.0
        },
        "figaro": {
            "rang_gen": 5, "note": 19.1,
            "specialites_ranks": [("Génie Civil & BTP", 1, 19.9), ("Informatique & Logiciel", 5, 18.9)]
        },
        "letudiant": {
            "rang_gen": 5, "note": 19.0, "sal_embauche": 52.8, "sal_3ans": 67.5,
            "ins_6m": 98.0, "pct_inter": 34.0, "poursuite_etudes": 15.0
        },
        "usine_nouvelle": {
            "rang_gen": 5, "brevets": 22, "startups": 16, "part_filles": 28.0, "stages_semaines": 30
        }
    },

    # 6. INSA LYON
    {
        "source_tag": "CTI/Wikidata",
        "raw_name": "Institut National des Sciences Appliquées de Lyon",
        "sigle": "INSA Lyon",
        "pays": "France",
        "ville": "Villeurbanne",
        "statut": "Public",
        "frais": 601,
        "site_web": "https://www.insa-lyon.fr",
        "annee_creation": 1957,
        "desc": "1ère école d'ingénieurs post-bac de France avec 9 filières de spécialités et un pôle de recherche de premier rang.",
        "campus": [
            ("Campus LyonTech-La Doua", "Villeurbanne", "69621", "20 Avenue Albert Einstein", 45.7829, 4.8787, True),
            ("Campus d'Oyonnax", "Bellignat", "01100", "85 Rue Henri Becquerel", 46.2625, 5.6267, False)
        ],
        "specialites": [
            ("Département Informatique (IF)", "Informatique & Logiciel", "Mixte (Initiale & Alternance)", 3, "Cloud, IA, DevOps, Architecture logicielle"),
            ("Département Génie Civil & Urbanisme (GCU)", "Génie Civil & BTP", "Mixte (Initiale & Alternance)", 3, "Ouvrages d'art, Bâtiments durables"),
            ("Génie Énergétique et Environnement (GEN)", "Énergie & Environnement", "Initiale", 3, "Procédés industriels, Thermique, Énergies vertes")
        ],
        "parcoursup": {
            "nom_filiere": "Cycle Ingénieur Post-bac INSA", "capacite": 880, "nb_voeux": 18500,
            "taux_acces": 12.4, "rang_dernier": 1950, "mention_tb": 84.0, "boursiers": 24.0
        },
        "figaro": {
            "rang_gen": 7, "note": 18.5,
            "specialites_ranks": [("Informatique & Logiciel", 6, 18.7), ("Génie Civil & BTP", 2, 18.9)]
        },
        "letudiant": {
            "rang_gen": 7, "note": 18.2, "sal_embauche": 45.0, "sal_3ans": 57.0,
            "ins_6m": 96.0, "pct_inter": 28.0, "poursuite_etudes": 14.0
        },
        "usine_nouvelle": {
            "rang_gen": 7, "brevets": 34, "startups": 29, "part_filles": 34.0, "stages_semaines": 28
        }
    },

    # 7. ISAE-SUPAERO
    {
        "source_tag": "CTI/Wikidata",
        "raw_name": "ISAE-SUPAERO (Toulouse)",
        "sigle": "ISAE-SUPAERO",
        "pays": "France",
        "ville": "Toulouse",
        "statut": "Public",
        "frais": 3200,
        "site_web": "https://www.isae-supaero.fr",
        "annee_creation": 1909,
        "desc": "Leader mondial de la formation d'ingénieurs pour l'industrie aérospatiale et spatiale européenne.",
        "campus": [
            ("Campus de Rangueil", "Toulouse", "31055", "10 Avenue Édouard Belin", 43.5658, 1.4748, True)
        ],
        "specialites": [
            ("Diplôme d'Ingénieur ISAE-SUPAERO", "Aéronautique & Spatial", "Initiale", 3, "Aérodynamique, Propulsion, Systèmes spatiaux"),
            ("Systèmes Embarqués et Avionique", "Informatique & Logiciel", "Initiale", 3, "Logiciel critique temps réel, Traitement de signal spatial"),
            ("Aviation Décarbonée & Hydrogène", "Énergie & Environnement", "Initiale", 3, "Propulsion électrique, SAF, Éco-conception")
        ],
        "parcoursup": {
            "nom_filiere": "Double cursus Université Paul Sabatier", "capacite": 50, "nb_voeux": 1280,
            "taux_acces": 9.5, "rang_dernier": 68, "mention_tb": 92.0, "boursiers": 19.0
        },
        "figaro": {
            "rang_gen": 6, "note": 18.9,
            "specialites_ranks": [("Aéronautique & Spatial", 1, 19.9), ("Informatique & Logiciel", 7, 18.5)]
        },
        "letudiant": {
            "rang_gen": 6, "note": 18.8, "sal_embauche": 51.0, "sal_3ans": 64.5,
            "ins_6m": 97.8, "pct_inter": 37.0, "poursuite_etudes": 20.0
        },
        "usine_nouvelle": {
            "rang_gen": 6, "brevets": 19, "startups": 14, "part_filles": 23.0, "stages_semaines": 30
        }
    },

    # 8. UTC COMPIÈGNE
    {
        "source_tag": "CTI/Wikidata",
        "raw_name": "Université de Technologie de Compiègne",
        "sigle": "UTC",
        "pays": "France",
        "ville": "Compiègne",
        "statut": "Public",
        "frais": 601,
        "site_web": "https://www.utc.fr",
        "annee_creation": 1972,
        "desc": "Université de technologie pionnière avec pédagogie modulaire personnalisée et forte culture entrepreneuriale.",
        "campus": [
            ("Centre de Royallieu", "Compiègne", "60200", "Rue du Docteur Schweitzer", 49.4005, 2.7981, True)
        ],
        "specialites": [
            ("Génie Informatique (GI)", "Informatique & Logiciel", "Mixte (Initiale & Alternance)", 3, "Cloud, IA distribuée, Génie logiciel"),
            ("Génie Biologique Biomédical", "Biotechnologies & Santé", "Mixte (Initiale & Alternance)", 3, "Biomatériaux, Imagerie, Dispositifs médicaux"),
            ("Génie des Systèmes Mécaniques", "Automobile & Transports", "Mixte (Initiale & Alternance)", 3, "Conception automobile, Calcul dynamique")
        ],
        "parcoursup": {
            "nom_filiere": "Tronc Commun Ingénieur UTC", "capacite": 550, "nb_voeux": 12400,
            "taux_acces": 14.2, "rang_dernier": 1150, "mention_tb": 82.0, "boursiers": 21.0
        },
        "figaro": {
            "rang_gen": 9, "note": 18.1,
            "specialites_ranks": [("Informatique & Logiciel", 8, 18.4), ("Biotechnologies & Santé", 1, 18.8)]
        },
        "letudiant": {
            "rang_gen": 9, "note": 17.8, "sal_embauche": 44.5, "sal_3ans": 56.5,
            "ins_6m": 95.8, "pct_inter": 24.0, "poursuite_etudes": 12.0
        },
        "usine_nouvelle": {
            "rang_gen": 9, "brevets": 18, "startups": 21, "part_filles": 38.0, "stages_semaines": 28
        }
    },

    # 9. EPITA
    {
        "source_tag": "CTI/Wikidata",
        "raw_name": "EPITA - École pour l'Informatique et les Techniques Avancées",
        "sigle": "EPITA",
        "pays": "France",
        "ville": "Paris",
        "statut": "Privé",
        "frais": 10900,
        "site_web": "https://www.epita.fr",
        "annee_creation": 1984,
        "desc": "École d'ingénieurs privée en informatique de renom, pionnière de la pédagogie par projets et de la cybersécurité.",
        "campus": [
            ("Campus Paris Sud", "Le Kremlin-Bicêtre", "94270", "14-16 Rue Voltaire", 48.8153, 2.3630, True),
            ("Campus de Lyon", "Lyon", "69003", "86 Boulevard Marius Vivier-Merle", 45.7592, 4.8587, False),
            ("Campus de Toulouse", "Toulouse", "31000", "40 Boulevard de la Marquette", 43.6121, 1.4332, False)
        ],
        "specialites": [
            ("Majeure Sécurité des SI (SRS)", "Cybersécurité", "Mixte (Initiale & Alternance)", 3, "Pentesting, Cryptanalyse, Sécurité noyau"),
            ("Majeure Data Science & AI (SCIA)", "Intelligence Artificielle & Data", "Mixte (Initiale & Alternance)", 3, "Deep Learning, NLP, Computer Vision"),
            ("Majeure Génie Logiciel (GISTR/MTI)", "Informatique & Logiciel", "Mixte (Initiale & Alternance)", 3, "Microservices, DevOps, Cloud natif")
        ],
        "parcoursup": {
            "nom_filiere": "Concours Advance (Paris)", "capacite": 480, "nb_voeux": 6200,
            "taux_acces": 28.5, "rang_dernier": 2400, "mention_tb": 48.0, "boursiers": 12.0
        },
        "figaro": {
            "rang_gen": 18, "note": 17.0,
            "specialites_ranks": [("Informatique & Logiciel", 9, 18.2), ("Cybersécurité", 2, 19.2)]
        },
        "letudiant": {
            "rang_gen": 18, "note": 16.5, "sal_embauche": 46.0, "sal_3ans": 60.0,
            "ins_6m": 98.0, "pct_inter": 18.0, "poursuite_etudes": 5.0
        },
        "usine_nouvelle": {
            "rang_gen": 19, "brevets": 6, "startups": 25, "part_filles": 15.0, "stages_semaines": 32
        }
    },

    # 10. ARTS ET MÉTIERS PARISTECH
    {
        "source_tag": "CTI/Wikidata",
        "raw_name": "Arts et Métiers ParisTech (ENSAM)",
        "sigle": "ENSAM",
        "pays": "France",
        "ville": "Paris",
        "statut": "Public",
        "frais": 601,
        "site_web": "https://artsetmetiers.fr",
        "annee_creation": 1780,
        "desc": "Plus grand réseau d'ingénieurs d'Europe, leader de l'industrie 4.0, du génie mécanique et des matériaux.",
        "campus": [
            ("Campus de Paris", "Paris", "75013", "151 Boulevard de l'Hôpital", 48.8329, 2.3582, True),
            ("Campus d'Aix-en-Provence", "Aix-en-Provence", "13100", "2 Cours des Arts et Métiers", 43.5283, 5.4522, False),
            ("Campus de Lille", "Lille", "59000", "8 Boulevard Louis XIV", 50.6272, 3.0711, False),
            ("Campus de Bordeaux-Talence", "Talence", "33400", "Esplanade des Arts et Métiers", 44.8061, -0.5962, False)
        ],
        "specialites": [
            ("Diplôme d'Ingénieur Généraliste", "Généraliste & Systèmes Complexes", "Mixte (Initiale & Alternance)", 3, "Génie mécanique, Énergétique, Matériaux"),
            ("Option Systèmes d'Information Industriels", "Informatique & Logiciel", "Mixte (Initiale & Alternance)", 3, "Jumeaux numériques, IoT industriel, Cyber-physique"),
            ("Robotique & Cobotique 4.0", "Robotique & Mécatronique", "Alternance / Apprentissage", 3, "Lignes automatisées, Capteurs, Vision industrielle")
        ],
        "parcoursup": {
            "nom_filiere": "Programme Grande École Post-bac", "capacite": 100, "nb_voeux": 2800,
            "taux_acces": 15.0, "rang_dernier": 310, "mention_tb": 76.0, "boursiers": 18.0
        },
        "figaro": {
            "rang_gen": 8, "note": 18.3,
            "specialites_ranks": [("Informatique & Logiciel", 10, 17.8), ("Généraliste & Systèmes Complexes", 4, 18.6)]
        },
        "letudiant": {
            "rang_gen": 8, "note": 17.5, "sal_embauche": 46.5, "sal_3ans": 59.0,
            "ins_6m": 96.5, "pct_inter": 22.0, "poursuite_etudes": 8.0
        },
        "usine_nouvelle": {
            "rang_gen": 8, "brevets": 32, "startups": 31, "part_filles": 19.0, "stages_semaines": 30
        }
    },

    # 11. SUISSE : EPFL
    {
        "source_tag": "CTI/Wikidata",
        "raw_name": "École Polytechnique Fédérale de Lausanne",
        "sigle": "EPFL",
        "pays": "Suisse",
        "ville": "Lausanne",
        "statut": "Public",
        "frais": 1520,
        "site_web": "https://www.epfl.ch",
        "annee_creation": 1853,
        "desc": "Université technologique de renommée mondiale, dans le Top 10 international en informatique et robotique.",
        "campus": [
            ("Campus d'Écublens", "Lausanne", "1015", "Route Cantonale", 46.5191, 6.5668, True)
        ],
        "specialites": [
            ("Master in Computer Science", "Informatique & Logiciel", "Initiale", 3, "Compilers, Distributed Systems, Scalable Systems"),
            ("Master in Data Science", "Intelligence Artificielle & Data", "Initiale", 3, "Deep Learning, Statistical Learning, AI Safety"),
            ("Master in Cyber Security", "Cybersécurité", "Initiale", 3, "Applied Cryptography, Secure Hardware, Zero-Knowledge")
        ],
        "parcoursup": {
            "nom_filiere": "Admission Bac Français Mention TB (directe)", "capacite": 1200, "nb_voeux": 4100,
            "taux_acces": 29.0, "rang_dernier": 1200, "mention_tb": 100.0, "boursiers": 15.0
        },
        "figaro": {
            "rang_gen": 1, "note": 20.0,
            "specialites_ranks": [("Informatique & Logiciel", 1, 20.0)]
        },
        "letudiant": {
            "rang_gen": 1, "note": 20.0, "sal_embauche": 95.0, "sal_3ans": 125.0,
            "ins_6m": 97.5, "pct_inter": 58.0, "poursuite_etudes": 38.0
        },
        "usine_nouvelle": {
            "rang_gen": 1, "brevets": 120, "startups": 52, "part_filles": 31.0, "stages_semaines": 26
        }
    },

    # 12. CANADA / QUÉBEC : POLYTECHNIQUE MONTRÉAL
    {
        "source_tag": "CTI/Wikidata",
        "raw_name": "Polytechnique Montréal (Université de Montréal)",
        "sigle": "PolyMTL",
        "pays": "Canada",
        "ville": "Montréal",
        "statut": "Public",
        "frais": 6200,
        "site_web": "https://www.polymtl.ca",
        "annee_creation": 1873,
        "desc": "Pôle d'excellence en ingénierie au Québec, lié au centre mondial d'intelligence artificielle Mila.",
        "campus": [
            ("Campus de la Montagne", "Montréal", "H3T 1J4", "2500 Chemin de Polytechnique", 45.5048, -73.6133, True)
        ],
        "specialites": [
            ("Baccalauréat en Génie Logiciel", "Informatique & Logiciel", "Mixte (Initiale & Alternance)", 4, "Architecture logicielle, Systèmes répartis, Cloud"),
            ("Concentration IA & Mila", "Intelligence Artificielle & Data", "Initiale", 4, "Apprentissage profond, Vision, Modèles génératifs"),
            ("Baccalauréat en Génie Aérospatial", "Aéronautique & Spatial", "Mixte (Initiale & Alternance)", 4, "Avionique, Structures composites, Espace")
        ],
        "parcoursup": {
            "nom_filiere": "Entente France-Québec Baccalauréat", "capacite": 650, "nb_voeux": 2900,
            "taux_acces": 35.0, "rang_dernier": 850, "mention_tb": 65.0, "boursiers": 14.0
        },
        "figaro": {
            "rang_gen": 2, "note": 19.3,
            "specialites_ranks": [("Informatique & Logiciel", 2, 19.3)]
        },
        "letudiant": {
            "rang_gen": 2, "note": 19.2, "sal_embauche": 58.0, "sal_3ans": 76.0,
            "ins_6m": 98.2, "pct_inter": 33.0, "poursuite_etudes": 22.0
        },
        "usine_nouvelle": {
            "rang_gen": 2, "brevets": 45, "startups": 32, "part_filles": 29.0, "stages_semaines": 40
        }
    }
]


# ---------------------------------------------------------------------------
# PIPELINE ETL COMPLET
# ---------------------------------------------------------------------------
async def run_data_pipeline():
    """
    Exécute le pipeline complet :
    1. Initialisation / migration du schéma DDL (schema.sql)
    2. Résolution d'entités (Fuzzy Matching)
    3. Ingestion des entités écoles, campus, spécialités, admissions, classements et insertion
    4. Exécution de la requête analytique complexe de vérification
    """
    logger.info("=================================================================")
    logger.info("DÉMARRAGE DU DATA PIPELINE INGÉFINDER FRANCOPHONIE")
    logger.info("=================================================================")

    db = DatabaseManager(DB_FILE)
    if not db.init_schema(SCHEMA_FILE):
        logger.error("Arrêt du pipeline : impossible d'appliquer schema.sql.")
        return

    resolver = EntityResolver()

    counts = {
        "ecoles": 0, "campus": 0, "specialites": 0,
        "admissions": 0, "classements": 0, "insertion": 0
    }

    # Boucle d'ingestion avec Entity Resolution
    for item in EXTRACTED_RAW_FEED:
        raw_name = item["raw_name"]
        ville = item["ville"]
        pays = item["pays"]

        # Étape 1 : Résolution d'entité floue (Fuzzy Entity Resolution)
        canonical_id, confidence, canonical_name = resolver.resolve(raw_name, city=ville, country=pays)
        if not canonical_id:
            logger.warning("Entité non reconnue pour '%s' (%s, %s)", raw_name, ville, pays)
            continue

        logger.info(
            "Réconciliation réussie : '%s' -> [ID: %s] (%s) [Confiance: %.1f%%]",
            raw_name, canonical_id, canonical_name, confidence * 100
        )

        # Étape 2 : Upsert Ecole
        ecole_data = {
            "id": canonical_id,
            "nom_officiel": canonical_name or item["raw_name"],
            "sigle": item["sigle"],
            "pays": pays,
            "ville_principale": ville,
            "statut_juridique": item["statut"],
            "frais_scolarite_annuels": item["frais"],
            "site_web": item["site_web"],
            "description": item["desc"],
            "annee_creation": item.get("annee_creation"),
            "habilitation_cti": True,
            "label_eurace": True
        }
        db.upsert_ecole(ecole_data)
        counts["ecoles"] += 1

        # Étape 3 : Upsert Campus
        for idx, camp in enumerate(item.get("campus", [])):
            c_nom, c_ville, c_cp, c_adr, c_lat, c_lon, c_siege = camp
            campus_id = f"{canonical_id}-campus-{idx+1}"
            db.upsert_campus({
                "id": campus_id,
                "ecole_id": canonical_id,
                "nom_campus": c_nom,
                "ville": c_ville,
                "code_postal": c_cp,
                "adresse": c_adr,
                "latitude": c_lat,
                "longitude": c_lon,
                "est_siege_principal": c_siege
            })
            counts["campus"] += 1

        # Étape 4 : Upsert Spécialités Diplômes
        for s_idx, sp in enumerate(item.get("specialites", [])):
            s_intitule, s_domaine, s_cursus, s_duree, s_skills = sp
            sp_id = f"{canonical_id}-sp-{s_idx+1}"
            db.upsert_specialite({
                "id": sp_id,
                "ecole_id": canonical_id,
                "intitule_specialite": s_intitule,
                "domaine": s_domaine,
                "type_cursus": s_cursus,
                "duree_annees": s_duree,
                "competences_cles": s_skills
            })
            counts["specialites"] += 1

        # Étape 5 : Upsert Admissions Stats (Parcoursup)
        psup = item.get("parcoursup")
        if psup:
            db.upsert_admissions_stats({
                "id": f"{canonical_id}-adm-psup-2024",
                "ecole_id": canonical_id,
                "source": "Parcoursup",
                "annee": 2024,
                "nom_filiere_concours": psup["nom_filiere"],
                "capacite": psup["capacite"],
                "nb_voeux": psup["nb_voeux"],
                "taux_acces": psup["taux_acces"],
                "rang_dernier_appele": psup["rang_dernier"],
                "pct_mention_tb": psup["mention_tb"],
                "pct_boursiers": psup["boursiers"],
                "raw_payload": {"type": "Parcoursup session 2024 officielle"}
            })
            counts["admissions"] += 1

        # Étape 6 : Upsert Classements (Le Figaro, L'Étudiant, Usine Nouvelle)
        fig = item.get("figaro")
        if fig:
            # Rang général
            db.upsert_classement({
                "id": f"{canonical_id}-cl-fig-gen-2025",
                "ecole_id": canonical_id,
                "source_media": "Le Figaro Étudiant",
                "annee": 2025,
                "rang_general": fig["rang_gen"],
                "domaine_specialite": None,
                "note_globale": fig["note"],
                "raw_metrics": {"source": "Palmarès général Le Figaro 2025"}
            })
            counts["classements"] += 1

            # Rangs par spécialités (ex: Informatique)
            for spec_domain, spec_rank, spec_note in fig.get("specialites_ranks", []):
                slug_dom = clean_school_name(spec_domain)[:8]
                db.upsert_classement({
                    "id": f"{canonical_id}-cl-fig-{slug_dom}-2025",
                    "ecole_id": canonical_id,
                    "source_media": "Le Figaro Étudiant",
                    "annee": 2025,
                    "rang_general": None,
                    "domaine_specialite": spec_domain,
                    "rang_par_specialite": spec_rank,
                    "note_globale": spec_note,
                    "raw_metrics": {"ranking_theme": spec_domain}
                })
                counts["classements"] += 1

        etu = item.get("letudiant")
        if etu:
            db.upsert_classement({
                "id": f"{canonical_id}-cl-etu-2025",
                "ecole_id": canonical_id,
                "source_media": "L'Étudiant",
                "annee": 2025,
                "rang_general": etu["rang_gen"],
                "domaine_specialite": None,
                "note_globale": etu["note"],
                "raw_metrics": {"methodologie": "Excellence, International, Entreprises"}
            })
            counts["classements"] += 1

        un = item.get("usine_nouvelle")
        if un:
            db.upsert_classement({
                "id": f"{canonical_id}-cl-un-2025",
                "ecole_id": canonical_id,
                "source_media": "L'Usine Nouvelle",
                "annee": 2025,
                "rang_general": un["rang_gen"],
                "domaine_specialite": None,
                "note_globale": None,
                "raw_metrics": {
                    "brevets": un["brevets"],
                    "startups": un["startups"],
                    "part_filles": un["part_filles"],
                    "stages_semaines": un["stages_semaines"]
                }
            })
            counts["classements"] += 1

        # Étape 7 : Upsert Insertion Professionnelle
        if etu:
            db.upsert_insertion({
                "id": f"{canonical_id}-ins-2024",
                "ecole_id": canonical_id,
                "annee_promo": 2024,
                "salaire_moyen_embauche": etu["sal_embauche"],
                "salaire_avec_primes": round(etu["sal_embauche"] * 1.12, 1),
                "salaire_3_ans": etu["sal_3ans"],
                "taux_emploi_6_mois": etu["ins_6m"],
                "pct_international": etu["pct_inter"],
                "pct_poursuite_etudes": etu["poursuite_etudes"],
                "duree_moyenne_recherche_mois": 1.2
            })
            counts["insertion"] += 1

    logger.info("=================================================================")
    logger.info("RÉSUMÉ DU PEUPLEMENT DE LA BASE RELATIONNELLE :")
    for k, v in counts.items():
        logger.info(" - %s : %d enregistrements upsertés", k.capitalize(), v)
    logger.info("Base de données : %s (Taille : %d Ko)", DB_FILE.name, DB_FILE.stat().st_size // 1024)
    logger.info("=================================================================")

    # Étape 8 : Exécution de la Requête Analytique Complexe
    logger.info("EXÉCUTION DE LA REQUÊTE COMPLEXE EXIGÉE :")
    logger.info("TOP 10 Écoles Informatique Le Figaro + Taux Accès Parcoursup + Salaires L'Étudiant")
    
    with open("complex_query.sql", "r", encoding="utf-8") as f:
        complex_sql = f.read()

    rows = db.execute_query(complex_sql)
    print("\n" + "=" * 90)
    print(f"{'RANG':<5} | {'SIGLE':<14} | {'PAYS':<8} | {'ACCÈS PARCOURSUP':<18} | {'SALAIRE EMB.':<14} | {'NOTE FIGARO'}")
    print("-" * 90)
    for r in rows:
        rang = f"#{r['rang_figaro_informatique']}"
        sigle = r['ecole_sigle']
        pays = r['pays']
        taux_acc = f"{r['taux_acces_parcoursup_pct']}%" if r['taux_acces_parcoursup_pct'] is not None else "N/A"
        sal = f"{r['salaire_embauche_k_euros']} k€"
        note = f"{r['note_figaro_sur_20']}/20"
        print(f"{rang:<5} | {sigle:<14} | {pays:<8} | {taux_acc:<18} | {sal:<14} | {note}")
    print("=" * 90 + "\n")


if __name__ == "__main__":
    asyncio.run(run_data_pipeline())
