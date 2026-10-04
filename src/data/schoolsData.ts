import { Ecole } from '../types';

export const SCHOOLS_DATA: Ecole[] = [
  // =========================================================================
  // FRANCE : GRANDS ÉTABLISSEMENTS & ÉCOLES GÉNÉRALISTES D'ÉLITE (POST-PRÉPA / AST)
  // =========================================================================
  {
    id: 'polytechnique-fra',
    type_recrutement: 'post_prepa',
    nom_officiel: 'École Polytechnique',
    sigle: 'X',
    pays: 'France',
    region: 'Île-de-France',
    parcoursup_url: 'https://dossier.parcoursup.fr/Candidat/carte?action=recherche&origine=carte&g_ta_cod=13001',
    parcoursup_code: '13001',
    ville_principale: 'Palaiseau',
    statut_juridique: 'Public',
    frais_scolarite_annuels: 0,
    site_web: 'https://www.polytechnique.edu',
    description: "Numéro 1 incontesté des écoles d'ingénieurs françaises, l'École Polytechnique allie recherche d'excellence mondiale et formation pluridisciplinaire au cœur de Paris-Saclay.",
    habilitation_cti: true,
    label_eurace: true,
    annee_creation: 1794,
    campus: [
      {
        id: 'x-campus-1',
        ecole_id: 'polytechnique-fra',
        nom_campus: "Campus de l'École polytechnique",
        ville: 'Palaiseau',
        code_postal: '91120',
        adresse: 'Route de Saclay',
        latitude: 48.7134,
        longitude: 2.2104,
        est_siege_principal: true
      }
    ],
    specialites: [
      {
        id: 'x-sp-1',
        ecole_id: 'polytechnique-fra',
        intitule_specialite: 'Cycle Ingénieur Polytechnicien',
        domaine: 'Généraliste & Systèmes Complexes',
        type_cursus: 'Initiale',
        diplome_delivre: 'Titre d\'Ingénieur Diplômé de l\'École Polytechnique',
        duree_annees: 3,
        competences_cles: 'Mathématiques fondamentales, HPC, Modélisation, Physique quantique'
      ,
        debouches_metiers: [
          'Ingénieur Système & Intégration',
          'Chef de Projet Industriel Complexe',
          'Consultant en Stratégie & Organisation',
          "Directeur d'Usine & Supply Chain 4.0"
        ],
        salaire_moyen_specialite: 48.0,
        taux_insertion_specialite: 98.4,
        partenaires_entreprises: [
          'McKinsey & Company',
          'Boston Consulting Group',
          'Airbus',
          'Safran',
          'Saint-Gobain',
          'Capgemini Invent'
        ],
        doubles_diplomes: [
          'Double Diplôme Management HEC / ESSEC / ESCP',
          'Master Sciences & Génie des Systèmes',
          'MIT (USA)',
          'Imperial College London'
        ],
        secteurs_recrutement: [
          'Conseil en Stratégie & Management',
          'Grandes Entreprises Industrielles',
          'Direction de Programmes Stratégiques',
          'Aérospatiale & Énergie'
        ],
        modules_phares: [
          'Ingénierie Système & Modélisation MBSE',
          'Management de Projets Complexes & Gestion des Risques',
          "Économie Industrielle & Stratégie d'Entreprise",
          'Optimisation Multicritère & Décision'
        ],
        volume_ects: 300
      },
      {
        id: 'x-sp-2',
        ecole_id: 'polytechnique-fra',
        intitule_specialite: 'MSc Data Science & Artificial Intelligence (avec HEC)',
        domaine: 'Intelligence Artificielle & Data',
        type_cursus: 'Initiale',
        diplome_delivre: 'Master of Science & Diplôme d\'Ingénieur',
        duree_annees: 2,
        competences_cles: 'Deep Learning, LLM, Théorie de l\'information, Algorithmes massifs',
              debouches_metiers: [
          'Ingénieur Expert Spécialisé',
          'Chef de Projet R&D & Systèmes Complexes',
          'Lead Consultant Stratégie & Technologie',
          'Directeur de Programme Innovation'
        ],
        salaire_moyen_specialite: 48.5,
        taux_insertion_specialite: 98.6,
        partenaires_entreprises: [
          'TotalEnergies', 'Airbus', 'Thales', 'Saint-Gobain', 'Capgemini', 'Dassault Systèmes'
        ],
        doubles_diplomes: [
          'Master of Science International', 'Double Diplôme Management HEC / ESSEC', 'Imperial College London'
        ],
        secteurs_recrutement: [
          "Industrie & Systèmes Complexes', 'Conseil & Stratégie', 'High-Tech & R&D"
        ],
        modules_phares: [
          'Modélisation Numérique Avancée', 'Management de Grands Programmes', 'Transition Bas-Carbone & Éco-Conception'
        ],
        volume_ects: 300
      },
      {
        id: 'x-sp-3',
        ecole_id: 'polytechnique-fra',
        intitule_specialite: 'Génie Énergétique du XXIe Siècle',
        domaine: 'Énergie & Environnement',
        type_cursus: 'Initiale',
        diplome_delivre: 'Diplôme d\'Ingénieur',
        duree_annees: 3,
        competences_cles: 'Nucléaire de 4e génération, Énergies renouvelables, Décarbonation'
      ,
        debouches_metiers: [
          'Lead Data Scientist',
          'Ingénieur Machine Learning / MLOps',
          'Architecte IA Générative & LLM',
          'Chercheur en Vision par Ordinateur'
        ],
        salaire_moyen_specialite: 49.5,
        taux_insertion_specialite: 98.4,
        partenaires_entreprises: [
          'Mistral AI',
          'Hugging Face',
          'Meta FAIR',
          'Google DeepMind',
          'BNP Paribas',
          'TotalEnergies Digital Factory'
        ],
        doubles_diplomes: [
          'MSc Data Science (HEC Paris)',
          'Master MVA (ENS Paris-Saclay)',
          'Columbia University (USA)',
          'Imperial College London'
        ],
        secteurs_recrutement: [
          'Intelligence Artificielle & Big Data',
          'Finance Quantitative',
          'Santé Connectée',
          'Automobile Autonome'
        ],
        modules_phares: [
          'Deep Learning & Réseaux de Neurones',
          'Traitement Automatique du Langage (NLP)',
          'Apprentissage par Renforcement & MLOps',
          'Éthique & Sécurité des Algorithmes'
        ],
        volume_ects: 300
      }
    ],
    admissions: [
      {
        id: 'x-adm-1',
        ecole_id: 'polytechnique-fra',
        source: 'Concours CPGE (SCEI)',
        annee: 2024,
        nom_filiere_concours: 'Concours X-ENS (Filières MP, PC, PSI, PT, MPI, BCPST)',
        capacite: 430,
        nb_voeux: 5800,
        taux_acces: 7.4,
        rang_dernier_appele: 440,
        pct_mention_tb: 99.5,
        pct_boursiers: 15.0
      },
      {
        id: 'x-adm-2',
        ecole_id: 'polytechnique-fra',
        source: 'Admission sur Titre (AST)',
        annee: 2024,
        nom_filiere_concours: 'Filière Universitaire Française (Licence L3 Maths / Physique)',
        capacite: 40,
        nb_voeux: 450,
        taux_acces: 9.2,
        rang_dernier_appele: 45,
        pct_mention_tb: 98.0,
        pct_boursiers: 18.0
      }
    ],
    classements: [
      {
        id: 'x-cl-1',
        ecole_id: 'polytechnique-fra',
        source_media: "Le Figaro Étudiant",
        annee: 2025,
        rang_general: 1,
        note_globale: 19.8
      },
      {
        id: 'x-cl-2',
        ecole_id: 'polytechnique-fra',
        source_media: "Le Figaro Étudiant",
        annee: 2025,
        domaine_specialite: 'Informatique & Logiciel',
        rang_par_specialite: 1,
        note_globale: 19.8
      },
      {
        id: 'x-cl-3',
        ecole_id: 'polytechnique-fra',
        source_media: "L'Étudiant",
        annee: 2025,
        rang_general: 1,
        note_globale: 104
      },
      {
        id: 'x-cl-4',
        ecole_id: 'polytechnique-fra',
        source_media: "L'Usine Nouvelle",
        annee: 2025,
        rang_general: 1,
        note_globale: 98.5
      }
    ],
    insertion: {
      id: 'x-ins-1',
      ecole_id: 'polytechnique-fra',
      annee_promo: 2024,
      salaire_moyen_embauche: 56.5,
      salaire_avec_primes: 64.0,
      salaire_3_ans: 74.0,
      taux_emploi_6_mois: 98.8,
      pct_international: 42.0,
      pct_poursuite_etudes: 28.0,
      duree_moyenne_recherche_mois: 0.8
    }
  },

  {
    id: 'centralesupelec-fra',
    type_recrutement: 'post_prepa',
    nom_officiel: 'CentraleSupélec',
    sigle: 'CS',
    pays: 'France',
    region: 'Île-de-France',
    parcoursup_url: 'https://dossier.parcoursup.fr/Candidat/carte?action=recherche&origine=carte&g_ta_cod=13002',
    parcoursup_code: '13002',
    ville_principale: 'Gif-sur-Yvette',
    statut_juridique: 'Public',
    frais_scolarite_annuels: 3500,
    site_web: 'https://www.centralesupelec.fr',
    description: "Établissement leader de l'Université Paris-Saclay, CentraleSupélec forme des ingénieurs-entrepreneurs aux sciences de l'ingénieur et du numérique.",
    habilitation_cti: true,
    label_eurace: true,
    annee_creation: 1829,
    campus: [
      {
        id: 'cs-campus-1',
        ecole_id: 'centralesupelec-fra',
        nom_campus: 'Campus Paris-Saclay',
        ville: 'Gif-sur-Yvette',
        code_postal: '91190',
        adresse: 'Plateau de Moulon',
        latitude: 48.7088,
        longitude: 2.1643,
        est_siege_principal: true
      },
      {
        id: 'cs-campus-2',
        ecole_id: 'centralesupelec-fra',
        nom_campus: 'Campus de Rennes',
        ville: 'Cesson-Sévigné',
        code_postal: '35510',
        adresse: 'Avenue de la Boulaie',
        latitude: 48.1256,
        longitude: -1.6247,
        est_siege_principal: false
      },
      {
        id: 'cs-campus-3',
        ecole_id: 'centralesupelec-fra',
        nom_campus: 'Campus de Metz',
        ville: 'Metz',
        code_postal: '57070',
        adresse: 'Technopôle Metz',
        latitude: 49.1022,
        longitude: 6.2231,
        est_siege_principal: false
      }
    ],
    specialites: [
      {
        id: 'cs-sp-1',
        ecole_id: 'centralesupelec-fra',
        intitule_specialite: 'Cursus Ingénieur Généraliste CentraleSupélec',
        domaine: 'Généraliste & Systèmes Complexes',
        type_cursus: 'Initiale',
        diplome_delivre: 'Titre d\'Ingénieur Diplômé de CentraleSupélec',
        duree_annees: 3,
        competences_cles: 'Ingénierie système, Cyber-physique, IA, Management'
      ,
        debouches_metiers: [
          'Ingénieur Système & Intégration',
          'Chef de Projet Industriel Complexe',
          'Consultant en Stratégie & Organisation',
          "Directeur d'Usine & Supply Chain 4.0"
        ],
        salaire_moyen_specialite: 48.0,
        taux_insertion_specialite: 98.4,
        partenaires_entreprises: [
          'McKinsey & Company',
          'Boston Consulting Group',
          'Airbus',
          'Safran',
          'Saint-Gobain',
          'Capgemini Invent'
        ],
        doubles_diplomes: [
          'Double Diplôme Management HEC / ESSEC / ESCP',
          'Master Sciences & Génie des Systèmes',
          'MIT (USA)',
          'Imperial College London'
        ],
        secteurs_recrutement: [
          'Conseil en Stratégie & Management',
          'Grandes Entreprises Industrielles',
          'Direction de Programmes Stratégiques',
          'Aérospatiale & Énergie'
        ],
        modules_phares: [
          'Ingénierie Système & Modélisation MBSE',
          'Management de Projets Complexes & Gestion des Risques',
          "Économie Industrielle & Stratégie d'Entreprise",
          'Optimisation Multicritère & Décision'
        ],
        volume_ects: 300
      },
      {
        id: 'cs-sp-2',
        ecole_id: 'centralesupelec-fra',
        intitule_specialite: 'Mention Cybersécurité & Réseaux Confiance (Rennes)',
        domaine: 'Cybersécurité',
        type_cursus: 'Mixte (Initiale & Alternance)',
        diplome_delivre: 'Diplôme d\'Ingénieur',
        duree_annees: 3,
        competences_cles: 'Cryptographie appliquée, Reverse engineering, SOC/SIEM, Audit de code'
      ,
        debouches_metiers: [
          'Ingénieur Pentest & Sécurité Offensive',
          'Analyste SOC & Incident Response',
          'Architecte Sécurité Cloud',
          'Cryptanalyste'
        ],
        salaire_moyen_specialite: 48.5,
        taux_insertion_specialite: 98.4,
        partenaires_entreprises: [
          'ANSSI',
          'Thales Cyber Solutions',
          'Airbus Cybersecurity',
          'Orange Cyberdefense',
          'Wavestone',
          'Ministère des Armées'
        ],
        doubles_diplomes: [
          'Master Cybersécurité & Confiance Numérique',
          'Double Diplôme Télécom',
          'KTH Stockholm',
          'Université de Montréal'
        ],
        secteurs_recrutement: [
          'Défense & Sécurité Nationale',
          'Secteur Bancaire & OIV',
          'Infrastructures Critiques',
          'Audit & Conseil'
        ],
        modules_phares: [
          'Cryptographie Appliquée & Post-Quantique',
          'Sécurité des Réseaux & Systèmes',
          'Rétro-ingénierie & Analyse de Malware',
          'Gouvernance & Normes ISO 27001'
        ],
        volume_ects: 300
      },
      {
        id: 'cs-sp-3',
        ecole_id: 'centralesupelec-fra',
        intitule_specialite: 'Systèmes Aéronautiques & Mobilités Futures',
        domaine: 'Aéronautique & Spatial',
        type_cursus: 'Initiale',
        diplome_delivre: 'Diplôme d\'Ingénieur',
        duree_annees: 3,
        competences_cles: 'Avionique, Propulsion électrique, Guidage-navigation'
      ,
        debouches_metiers: [
          'Ingénieur Aérodynamicien',
          'Concepteur Systèmes Avioniques',
          'Ingénieur Propulsion & Moteurs',
          'Architecte Satellites & Lanceurs'
        ],
        salaire_moyen_specialite: 47.5,
        taux_insertion_specialite: 98.4,
        partenaires_entreprises: [
          'Airbus',
          'Dassault Aviation',
          'Safran',
          'ArianeGroup',
          'Thales Alenia Space',
          'CNES / ESA'
        ],
        doubles_diplomes: [
          'Master Spatial (ISAE / Supaero)',
          'Cranfield University (UK)',
          'TU Delft (Pays-Bas)',
          'Polytechnique Montréal'
        ],
        secteurs_recrutement: [
          'Constructeurs Aéronautiques',
          'Industrie Spatiale & Drones',
          'Défense & Systèmes Embarqués',
          'Maintenance Aéronautique'
        ],
        modules_phares: [
          'Mécanique des Fluides & CFD Compressible',
          'Dynamique du Vol & Pilotage Automatique',
          'Systèmes Propulsifs Hybrides & Hydrogène',
          'Structures & Matériaux Composites'
        ],
        volume_ects: 300
      }
    ],
    admissions: [
      {
        id: 'cs-adm-1',
        ecole_id: 'centralesupelec-fra',
        source: 'Parcoursup',
        annee: 2024,
        nom_filiere_concours: 'Concours CentraleSupélec (Filières MP, PC, PSI, PT, MPI, TSI)',
        capacite: 80,
        nb_voeux: 2100,
        taux_acces: 9.2,
        rang_dernier_appele: 95,
        pct_mention_tb: 96.0,
        pct_boursiers: 19.0
      },
      {
        id: 'cs-adm-2',
        ecole_id: 'centralesupelec-fra',
        source: 'CPGE (SCEI / Concours Commun)',
        annee: 2024,
        nom_filiere_concours: 'Concours Centrale-Supélec',
        capacite: 850,
        nb_voeux: 7200,
        taux_acces: 11.8,
        rang_dernier_appele: 980,
        pct_mention_tb: 97.0,
        pct_boursiers: 20.0
      }
    ],
    classements: [
      {
        id: 'cs-cl-1',
        ecole_id: 'centralesupelec-fra',
        source_media: "Le Figaro Étudiant",
        annee: 2025,
        rang_general: 2,
        note_globale: 19.4
      },
      {
        id: 'cs-cl-2',
        ecole_id: 'centralesupelec-fra',
        source_media: "Le Figaro Étudiant",
        annee: 2025,
        domaine_specialite: 'Informatique & Logiciel',
        rang_par_specialite: 2,
        note_globale: 19.4
      },
      {
        id: 'cs-cl-3',
        ecole_id: 'centralesupelec-fra',
        source_media: "L'Étudiant",
        annee: 2025,
        rang_general: 2,
        note_globale: 101
      }
    ],
    insertion: {
      id: 'cs-ins-1',
      ecole_id: 'centralesupelec-fra',
      annee_promo: 2024,
      salaire_moyen_embauche: 53.0,
      salaire_avec_primes: 59.5,
      salaire_3_ans: 68.5,
      taux_emploi_6_mois: 98.2,
      pct_international: 36.0,
      pct_poursuite_etudes: 16.0,
      duree_moyenne_recherche_mois: 1.1
    }
  },

  {
    id: 'mines-paris-fra',
    type_recrutement: 'post_prepa',
    nom_officiel: 'Mines Paris - PSL',
    sigle: 'Mines Paris',
    pays: 'France',
    region: 'Île-de-France',
    parcoursup_url: 'https://dossier.parcoursup.fr/Candidat/carte?action=recherche&origine=carte&g_ta_cod=13003',
    parcoursup_code: '13003',
    ville_principale: 'Paris',
    statut_juridique: 'Public',
    frais_scolarite_annuels: 3850,
    site_web: 'https://www.minesparis.psl.eu',
    description: "Membre fondateur de l'Université PSL, Mines Paris allie un ratio d'encadrement exceptionnel, une recherche partenariale de pointe et des rémunérations record.",
    habilitation_cti: true,
    label_eurace: true,
    annee_creation: 1783,
    campus: [
      {
        id: 'mp-campus-1',
        ecole_id: 'mines-paris-fra',
        nom_campus: 'Campus du Jardin du Luxembourg',
        ville: 'Paris',
        code_postal: '75006',
        adresse: '60 Boulevard Saint-Michel',
        latitude: 48.8447,
        longitude: 2.3396,
        est_siege_principal: true
      },
      {
        id: 'mp-campus-2',
        ecole_id: 'mines-paris-fra',
        nom_campus: 'Campus Sophia Antipolis',
        ville: 'Valbonne',
        code_postal: '06560',
        adresse: 'Rue Claude Daunesse',
        latitude: 43.6162,
        longitude: 7.0544,
        est_siege_principal: false
      },
      {
        id: 'mp-campus-3',
        ecole_id: 'mines-paris-fra',
        nom_campus: 'Campus de Fontainebleau',
        ville: 'Fontainebleau',
        code_postal: '77300',
        adresse: '35 Rue Saint-Honoré',
        latitude: 48.4055,
        longitude: 2.7011,
        est_siege_principal: false
      }
    ],
    specialites: [
      {
        id: 'mp-sp-1',
        ecole_id: 'mines-paris-fra',
        intitule_specialite: 'Ingénieur Civil des Mines (Généraliste)',
        domaine: 'Généraliste & Systèmes Complexes',
        type_cursus: 'Initiale',
        diplome_delivre: 'Titre d\'Ingénieur Civil des Mines',
        duree_annees: 3,
        competences_cles: 'Génie mathématique, Modélisation financière, Physique des matériaux'
      ,
        debouches_metiers: [
          'Ingénieur Système & Intégration',
          'Chef de Projet Industriel Complexe',
          'Consultant en Stratégie & Organisation',
          "Directeur d'Usine & Supply Chain 4.0"
        ],
        salaire_moyen_specialite: 48.0,
        taux_insertion_specialite: 98.4,
        partenaires_entreprises: [
          'McKinsey & Company',
          'Boston Consulting Group',
          'Airbus',
          'Safran',
          'Saint-Gobain',
          'Capgemini Invent'
        ],
        doubles_diplomes: [
          'Double Diplôme Management HEC / ESSEC / ESCP',
          'Master Sciences & Génie des Systèmes',
          'MIT (USA)',
          'Imperial College London'
        ],
        secteurs_recrutement: [
          'Conseil en Stratégie & Management',
          'Grandes Entreprises Industrielles',
          'Direction de Programmes Stratégiques',
          'Aérospatiale & Énergie'
        ],
        modules_phares: [
          'Ingénierie Système & Modélisation MBSE',
          'Management de Projets Complexes & Gestion des Risques',
          "Économie Industrielle & Stratégie d'Entreprise",
          'Optimisation Multicritère & Décision'
        ],
        volume_ects: 300
      },
      {
        id: 'mp-sp-2',
        ecole_id: 'mines-paris-fra',
        intitule_specialite: 'Option Robotique, Vision & Intelligence Artificielle',
        domaine: 'Robotique & Mécatronique',
        type_cursus: 'Initiale',
        diplome_delivre: 'Diplôme d\'Ingénieur',
        duree_annees: 3,
        competences_cles: 'Véhicules autonomes, SLAM, Vision par ordinateur, Contrôle optimal'
      ,
        debouches_metiers: [
          'Ingénieur Concepteur Robotique',
          'Spécialiste Vision & SLAM',
          'Ingénieur Automatique & Systèmes Embarqués',
          'Architecte Cobotique & Usine 4.0'
        ],
        salaire_moyen_specialite: 46.8,
        taux_insertion_specialite: 98.4,
        partenaires_entreprises: [
          'Aldebaran',
          'Boston Dynamics Partner',
          'Kuka Robotics',
          'Schneider Electric',
          'Dassault Aviation',
          'Siemens'
        ],
        doubles_diplomes: [
          'Master Robotique Avancée',
          'Carnegie Mellon University',
          'TU München',
          'Tokyo Institute of Technology'
        ],
        secteurs_recrutement: [
          'Robotique Industrielle & Médicale',
          'Défense & Véhicules Autonomes',
          'Agro-robotique',
          'Électronique Grand Public'
        ],
        modules_phares: [
          'Cinématique & Dynamique des Manipulateurs',
          'Perception 3D, SLAM & Capteurs LiDAR',
          'Asservissement Numérique & Systèmes Temps Réel',
          'Cobotique & Interaction Homme-Robot'
        ],
        volume_ects: 300
      }
    ],
    admissions: [
      {
        id: 'mp-adm-1',
        ecole_id: 'mines-paris-fra',
        source: 'Parcoursup',
        annee: 2024,
        nom_filiere_concours: 'Concours Commun Mines-Ponts (Ingénieur Civil des Mines)',
        capacite: 60,
        nb_voeux: 2400,
        taux_acces: 7.8,
        rang_dernier_appele: 75,
        pct_mention_tb: 97.0,
        pct_boursiers: 22.0
      },
      {
        id: 'mp-adm-2',
        ecole_id: 'mines-paris-fra',
        source: 'CPGE (SCEI / Concours Commun)',
        annee: 2024,
        nom_filiere_concours: 'Concours Commun Mines-Ponts (CCMP)',
        capacite: 165,
        nb_voeux: 6500,
        taux_acces: 2.5,
        rang_dernier_appele: 210,
        pct_mention_tb: 99.0,
        pct_boursiers: 18.0
      }
    ],
    classements: [
      {
        id: 'mp-cl-1',
        ecole_id: 'mines-paris-fra',
        source_media: "Le Figaro Étudiant",
        annee: 2025,
        rang_general: 3,
        note_globale: 19.3
      },
      {
        id: 'mp-cl-2',
        ecole_id: 'mines-paris-fra',
        source_media: "Le Figaro Étudiant",
        annee: 2025,
        domaine_specialite: 'Informatique & Logiciel',
        rang_par_specialite: 4,
        note_globale: 19.1
      },
      {
        id: 'mp-cl-3',
        ecole_id: 'mines-paris-fra',
        source_media: "L'Étudiant",
        annee: 2025,
        rang_general: 3,
        note_globale: 100
      }
    ],
    insertion: {
      id: 'mp-ins-1',
      ecole_id: 'mines-paris-fra',
      annee_promo: 2024,
      salaire_moyen_embauche: 54.5,
      salaire_avec_primes: 61.0,
      salaire_3_ans: 71.0,
      taux_emploi_6_mois: 98.4,
      pct_international: 35.0,
      pct_poursuite_etudes: 22.0,
      duree_moyenne_recherche_mois: 0.9
    }
  },

  {
    id: 'telecom-paris-fra',
    type_recrutement: 'post_prepa',
    nom_officiel: 'Télécom Paris',
    sigle: 'Télécom Paris',
    pays: 'France',
    region: 'Île-de-France',
    parcoursup_url: 'https://dossier.parcoursup.fr/Candidat/carte?action=recherche&origine=carte&g_ta_cod=13004',
    parcoursup_code: '13004',
    ville_principale: 'Palaiseau',
    statut_juridique: 'Public',
    frais_scolarite_annuels: 2650,
    site_web: 'https://www.telecom-paris.fr',
    description: "Numéro 1 français du numérique, Télécom Paris (Institut Polytechnique de Paris) est l'école de référence en intelligence artificielle, cybersécurité et télécommunications.",
    habilitation_cti: true,
    label_eurace: true,
    annee_creation: 1878,
    campus: [
      {
        id: 'tp-campus-1',
        ecole_id: 'telecom-paris-fra',
        nom_campus: 'Campus IP Paris',
        ville: 'Palaiseau',
        code_postal: '91120',
        adresse: '19 Place Marguerite Perey',
        latitude: 48.7126,
        longitude: 2.1994,
        est_siege_principal: true
      }
    ],
    specialites: [
      {
        id: 'tp-sp-1',
        ecole_id: 'telecom-paris-fra',
        intitule_specialite: 'Ingénieur du Numérique & IA',
        domaine: 'Intelligence Artificielle & Data',
        type_cursus: 'Mixte (Initiale & Alternance)',
        diplome_delivre: 'Titre d\'Ingénieur Diplômé de Télécom Paris',
        duree_annees: 3,
        competences_cles: 'Machine Learning, NLP, Big Data, Vision artificielle'
      ,
        debouches_metiers: [
          'Lead Data Scientist',
          'Ingénieur Machine Learning / MLOps',
          'Architecte IA Générative & LLM',
          'Chercheur en Vision par Ordinateur'
        ],
        salaire_moyen_specialite: 49.5,
        taux_insertion_specialite: 98.4,
        partenaires_entreprises: [
          'Mistral AI',
          'Hugging Face',
          'Meta FAIR',
          'Google DeepMind',
          'BNP Paribas',
          'TotalEnergies Digital Factory'
        ],
        doubles_diplomes: [
          'MSc Data Science (HEC Paris)',
          'Master MVA (ENS Paris-Saclay)',
          'Columbia University (USA)',
          'Imperial College London'
        ],
        secteurs_recrutement: [
          'Intelligence Artificielle & Big Data',
          'Finance Quantitative',
          'Santé Connectée',
          'Automobile Autonome'
        ],
        modules_phares: [
          'Deep Learning & Réseaux de Neurones',
          'Traitement Automatique du Langage (NLP)',
          'Apprentissage par Renforcement & MLOps',
          'Éthique & Sécurité des Algorithmes'
        ],
        volume_ects: 300
      },
      {
        id: 'tp-sp-2',
        ecole_id: 'telecom-paris-fra',
        intitule_specialite: 'Cybersécurité & Systèmes Distribués',
        domaine: 'Cybersécurité',
        type_cursus: 'Mixte (Initiale & Alternance)',
        diplome_delivre: 'Diplôme d\'Ingénieur',
        duree_annees: 3,
        competences_cles: 'Sécurité offensive, Cloud computing, Blockchain, Cryptographie'
      ,
        debouches_metiers: [
          'Ingénieur Pentest & Sécurité Offensive',
          'Analyste SOC & Incident Response',
          'Architecte Sécurité Cloud',
          'Cryptanalyste'
        ],
        salaire_moyen_specialite: 48.5,
        taux_insertion_specialite: 98.4,
        partenaires_entreprises: [
          'ANSSI',
          'Thales Cyber Solutions',
          'Airbus Cybersecurity',
          'Orange Cyberdefense',
          'Wavestone',
          'Ministère des Armées'
        ],
        doubles_diplomes: [
          'Master Cybersécurité & Confiance Numérique',
          'Double Diplôme Télécom',
          'KTH Stockholm',
          'Université de Montréal'
        ],
        secteurs_recrutement: [
          'Défense & Sécurité Nationale',
          'Secteur Bancaire & OIV',
          'Infrastructures Critiques',
          'Audit & Conseil'
        ],
        modules_phares: [
          'Cryptographie Appliquée & Post-Quantique',
          'Sécurité des Réseaux & Systèmes',
          'Rétro-ingénierie & Analyse de Malware',
          'Gouvernance & Normes ISO 27001'
        ],
        volume_ects: 300
      }
    ],
    admissions: [
      {
        id: 'tp-adm-1',
        ecole_id: 'telecom-paris-fra',
        source: 'Parcoursup',
        annee: 2024,
        nom_filiere_concours: 'Concours Commun Mines-Ponts (Télécom Paris)',
        capacite: 50,
        nb_voeux: 1420,
        taux_acces: 11.0,
        rang_dernier_appele: 62,
        pct_mention_tb: 94.0,
        pct_boursiers: 20.0
      },
      {
        id: 'tp-adm-2',
        ecole_id: 'telecom-paris-fra',
        source: 'CPGE (SCEI / Concours Commun)',
        annee: 2024,
        nom_filiere_concours: 'Concours Commun Mines-Ponts (CCMP)',
        capacite: 210,
        nb_voeux: 5900,
        taux_acces: 6.2,
        rang_dernier_appele: 430,
        pct_mention_tb: 97.0,
        pct_boursiers: 21.0
      }
    ],
    classements: [
      {
        id: 'tp-cl-1',
        ecole_id: 'telecom-paris-fra',
        source_media: "Le Figaro Étudiant",
        annee: 2025,
        rang_general: 4,
        note_globale: 19.2
      },
      {
        id: 'tp-cl-2',
        ecole_id: 'telecom-paris-fra',
        source_media: "Le Figaro Étudiant",
        annee: 2025,
        domaine_specialite: 'Informatique & Logiciel',
        rang_par_specialite: 3,
        note_globale: 19.5
      },
      {
        id: 'tp-cl-3',
        ecole_id: 'telecom-paris-fra',
        source_media: "L'Étudiant",
        annee: 2025,
        rang_general: 4,
        note_globale: 99
      }
    ],
    insertion: {
      id: 'tp-ins-1',
      ecole_id: 'telecom-paris-fra',
      annee_promo: 2024,
      salaire_moyen_embauche: 51.5,
      salaire_avec_primes: 58.0,
      salaire_3_ans: 66.0,
      taux_emploi_6_mois: 99.0,
      pct_international: 38.0,
      pct_poursuite_etudes: 14.0,
      duree_moyenne_recherche_mois: 0.9
    }
  },

  {
    id: 'ponts-paristech-fra',
    type_recrutement: 'post_prepa',
    nom_officiel: 'École des Ponts ParisTech',
    sigle: 'Ponts ParisTech',
    pays: 'France',
    region: 'Île-de-France',
    parcoursup_url: 'https://dossier.parcoursup.fr/Candidat/carte?action=recherche&origine=carte&g_ta_cod=13005',
    parcoursup_code: '13005',
    ville_principale: 'Champs-sur-Marne',
    statut_juridique: 'Public',
    frais_scolarite_annuels: 3500,
    site_web: 'https://ecoledesponts.fr',
    description: "Plus ancienne école d'ingénieurs au monde, les Ponts excellent en génie civil, aménagement durable, mathématiques financières et transition écologique.",
    habilitation_cti: true,
    label_eurace: true,
    annee_creation: 1747,
    campus: [
      {
        id: 'enpc-campus-1',
        ecole_id: 'ponts-paristech-fra',
        nom_campus: 'Campus Descartes',
        ville: 'Champs-sur-Marne',
        code_postal: '77420',
        adresse: '6-8 Avenue Blaise Pascal',
        latitude: 48.8412,
        longitude: 2.5878,
        est_siege_principal: true
      }
    ],
    specialites: [
      {
        id: 'enpc-sp-1',
        ecole_id: 'ponts-paristech-fra',
        intitule_specialite: 'Génie Civil & Construction Durable',
        domaine: 'Génie Civil & BTP',
        type_cursus: 'Mixte (Initiale & Alternance)',
        diplome_delivre: 'Titre d\'Ingénieur des Ponts',
        duree_annees: 3,
        competences_cles: 'BIM, Éco-matériaux, Ouvrages d\'art, Géotechnique',
              debouches_metiers: [
          'Ingénieur Expert Spécialisé',
          'Chef de Projet R&D & Systèmes Complexes',
          'Lead Consultant Stratégie & Technologie',
          'Directeur de Programme Innovation'
        ],
        salaire_moyen_specialite: 48.5,
        taux_insertion_specialite: 98.6,
        partenaires_entreprises: [
          'TotalEnergies', 'Airbus', 'Thales', 'Saint-Gobain', 'Capgemini', 'Dassault Systèmes'
        ],
        doubles_diplomes: [
          'Master of Science International', 'Double Diplôme Management HEC / ESSEC', 'Imperial College London'
        ],
        secteurs_recrutement: [
          "Industrie & Systèmes Complexes', 'Conseil & Stratégie', 'High-Tech & R&D"
        ],
        modules_phares: [
          'Modélisation Numérique Avancée', 'Management de Grands Programmes', 'Transition Bas-Carbone & Éco-Conception'
        ],
        volume_ects: 300
      },
      {
        id: 'enpc-sp-2',
        ecole_id: 'ponts-paristech-fra',
        intitule_specialite: 'Ingénierie Mathématique & Informatique (IMI)',
        domaine: 'Mathématiques Financières & Modélisation',
        type_cursus: 'Initiale',
        diplome_delivre: 'Diplôme d\'Ingénieur',
        duree_annees: 3,
        competences_cles: 'Calcul stochastique, Quantitative finance, Algorithmes numériques'
      ,
        debouches_metiers: [
          'Ingénieur Calcul de Structures',
          'Chef de Projet BIM & Éco-Conception',
          'Conducteur de Travaux Grands Ouvrages',
          'Ingénieur Géotechnique & Fondations'
        ],
        salaire_moyen_specialite: 45.5,
        taux_insertion_specialite: 98.4,
        partenaires_entreprises: [
          'Bouygues Construction',
          'Vinci',
          'Eiffage',
          'Setec',
          'Egis',
          'Arcadis'
        ],
        doubles_diplomes: [
          'Double Diplôme Architecte-Ingénieur',
          "Master Ouvrages d'Art (Ponts ParisTech)",
          'National University of Singapore'
        ],
        secteurs_recrutement: [
          "Grands Ouvrages d'Art & BTP",
          'Génie Urbain & Villes Durables',
          "Bureaux d'Études Structures",
          'Infrastructures Maritimes & Ferroviaires'
        ],
        modules_phares: [
          'Calcul aux Éléments Finis & Eurocodes',
          'BIM 4D/5D & Jumeaux Numériques',
          'Bétons Bas-Carbone & Géomatériaux',
          'Thermique du Bâtiment & RE2020'
        ],
        volume_ects: 300
      }
    ],
    admissions: [
      {
        id: 'enpc-adm-1',
        ecole_id: 'ponts-paristech-fra',
        source: 'Parcoursup',
        annee: 2024,
        nom_filiere_concours: 'Concours Commun Mines-Ponts (École des Ponts)',
        capacite: 40,
        nb_voeux: 1150,
        taux_acces: 8.0,
        rang_dernier_appele: 40,
        pct_mention_tb: 95.0,
        pct_boursiers: 20.0
      },
      {
        id: 'enpc-adm-2',
        ecole_id: 'ponts-paristech-fra',
        source: 'CPGE (SCEI / Concours Commun)',
        annee: 2024,
        nom_filiere_concours: 'Concours Commun Mines-Ponts (CCMP)',
        capacite: 245,
        nb_voeux: 6100,
        taux_acces: 4.8,
        rang_dernier_appele: 340,
        pct_mention_tb: 98.0,
        pct_boursiers: 19.0
      }
    ],
    classements: [
      {
        id: 'enpc-cl-1',
        ecole_id: 'ponts-paristech-fra',
        source_media: "Le Figaro Étudiant",
        annee: 2025,
        rang_general: 5,
        note_globale: 19.0
      },
      {
        id: 'enpc-cl-2',
        ecole_id: 'ponts-paristech-fra',
        source_media: "Le Figaro Étudiant",
        annee: 2025,
        domaine_specialite: 'Informatique & Logiciel',
        rang_par_specialite: 5,
        note_globale: 18.9
      }
    ],
    insertion: {
      id: 'enpc-ins-1',
      ecole_id: 'ponts-paristech-fra',
      annee_promo: 2024,
      salaire_moyen_embauche: 52.8,
      salaire_avec_primes: 59.0,
      salaire_3_ans: 67.5,
      taux_emploi_6_mois: 98.0,
      pct_international: 34.0,
      pct_poursuite_etudes: 18.0,
      duree_moyenne_recherche_mois: 1.0
    }
  },

  {
    id: 'ensam-paristech-fra',
    type_recrutement: 'post_prepa',
    nom_officiel: 'Arts et Métiers ParisTech',
    sigle: 'ENSAM',
    pays: 'France',
    region: 'Île-de-France',
    parcoursup_url: 'https://dossier.parcoursup.fr/Candidat/carte?action=recherche&origine=carte&g_ta_cod=13006',
    parcoursup_code: '13006',
    ville_principale: 'Paris',
    statut_juridique: 'Public',
    frais_scolarite_annuels: 601,
    site_web: 'https://artsetmetiers.fr',
    description: "Plus grand réseau d'ingénieurs de France (Société des Ingénieurs Arts et Métiers), pionnier de l'industrie 4.0, de la mécatronique et de la production avancée avec 8 campus régionaux.",
    habilitation_cti: true,
    label_eurace: true,
    annee_creation: 1780,
    campus: [
      {
        id: 'ensam-c-1',
        ecole_id: 'ensam-paristech-fra',
        nom_campus: 'Campus de Paris',
        ville: 'Paris',
        code_postal: '75013',
        adresse: '151 Boulevard de l\'Hôpital',
        latitude: 48.8322,
        longitude: 2.3592,
        est_siege_principal: true
      },
      {
        id: 'ensam-c-2',
        ecole_id: 'ensam-paristech-fra',
        nom_campus: 'Campus de Lille',
        ville: 'Lille',
        code_postal: '59000',
        adresse: '8 Boulevard Louis XIV',
        latitude: 50.6272,
        longitude: 3.0722,
        est_siege_principal: false
      },
      {
        id: 'ensam-c-3',
        ecole_id: 'ensam-paristech-fra',
        nom_campus: 'Campus d\'Aix-en-Provence',
        ville: 'Aix-en-Provence',
        code_postal: '13100',
        adresse: '2 Cours des Arts et Métiers',
        latitude: 43.5283,
        longitude: 5.4542,
        est_siege_principal: false
      }
    ],
    specialites: [
      {
        id: 'ensam-sp-1',
        ecole_id: 'ensam-paristech-fra',
        intitule_specialite: 'Programme Grande École Ingénieur Généraliste',
        domaine: 'Génie Industriel & Supply Chain',
        type_cursus: 'Mixte (Initiale & Alternance)',
        diplome_delivre: 'Titre d\'Ingénieur Généraliste des Arts et Métiers',
        duree_annees: 3,
        competences_cles: 'Génie mécanique, Procédés de fabrication, Robotique industrielle, Lean'
      ,
        debouches_metiers: [
          'Ingénieur Système & Intégration',
          'Chef de Projet Industriel Complexe',
          'Consultant en Stratégie & Organisation',
          "Directeur d'Usine & Supply Chain 4.0"
        ],
        salaire_moyen_specialite: 48.0,
        taux_insertion_specialite: 98.4,
        partenaires_entreprises: [
          'McKinsey & Company',
          'Boston Consulting Group',
          'Airbus',
          'Safran',
          'Saint-Gobain',
          'Capgemini Invent'
        ],
        doubles_diplomes: [
          'Double Diplôme Management HEC / ESSEC / ESCP',
          'Master Sciences & Génie des Systèmes',
          'MIT (USA)',
          'Imperial College London'
        ],
        secteurs_recrutement: [
          'Conseil en Stratégie & Management',
          'Grandes Entreprises Industrielles',
          'Direction de Programmes Stratégiques',
          'Aérospatiale & Énergie'
        ],
        modules_phares: [
          'Ingénierie Système & Modélisation MBSE',
          'Management de Projets Complexes & Gestion des Risques',
          "Économie Industrielle & Stratégie d'Entreprise",
          'Optimisation Multicritère & Décision'
        ],
        volume_ects: 300
      },
      {
        id: 'ensam-sp-2',
        ecole_id: 'ensam-paristech-fra',
        intitule_specialite: 'Ingénieur Spécialité Énergétique & Énergie Renouvelable',
        domaine: 'Énergie & Environnement',
        type_cursus: 'Alternance / Apprentissage',
        diplome_delivre: 'Titre d\'Ingénieur Diplômé',
        duree_annees: 3,
        competences_cles: 'Efficacité énergétique, Réseaux thermiques, Hydrogène, Décarbonation'
      ,
        debouches_metiers: [
          'Ingénieur Énergies Renouvelables (Éolien/Solaire)',
          'Ingénieur Sûreté & Procédés Nucléaires',
          'Chef de Projet Bilan Carbone & RSE',
          'Architecte Smart Grids'
        ],
        salaire_moyen_specialite: 46.5,
        taux_insertion_specialite: 98.4,
        partenaires_entreprises: [
          'EDF',
          'TotalEnergies',
          'Engie',
          'Orano',
          'Schneider Electric',
          'RTE'
        ],
        doubles_diplomes: [
          'Master Énergie Nucléaire',
          'KTH Environnement',
          'Double Diplôme IFP School',
          'Imperial College London'
        ],
        secteurs_recrutement: [
          "Production d'Énergie & Nucléaire",
          'Réseaux Électriques Intelligents',
          'Transition Écologique & Décarbonation',
          'Audit Environnemental'
        ],
        modules_phares: [
          'Thermodynamique des Systèmes Énergétiques',
          'Génie Nucléaire & Neutronique',
          "Réseaux Smart Grids & Stockage d'Énergie",
          'Analyse de Cycle de Vie (ACV)'
        ],
        volume_ects: 300
      }
    ],
    admissions: [
      {
        id: 'ensam-adm-1',
        ecole_id: 'ensam-paristech-fra',
        source: 'CPGE (SCEI / Concours Commun)',
        annee: 2024,
        nom_filiere_concours: 'Banque PT, E3A-Polytech, CCINP',
        capacite: 1100,
        nb_voeux: 6200,
        taux_acces: 21.0,
        rang_dernier_appele: 1250,
        pct_mention_tb: 82.0,
        pct_boursiers: 28.0
      },
      {
        id: 'ensam-adm-2',
        ecole_id: 'ensam-paristech-fra',
        source: 'Admissions Parallèles (Titre)',
        annee: 2024,
        nom_filiere_concours: 'Concours Ensam AST (BUT, BTS, Licence)',
        capacite: 250,
        nb_voeux: 1800,
        taux_acces: 14.5,
        rang_dernier_appele: 280,
        pct_mention_tb: 75.0,
        pct_boursiers: 32.0
      }
    ],
    classements: [
      {
        id: 'ensam-cl-1',
        ecole_id: 'ensam-paristech-fra',
        source_media: "L'Usine Nouvelle",
        annee: 2025,
        rang_general: 3,
        note_globale: 94.2
      },
      {
        id: 'ensam-cl-2',
        ecole_id: 'ensam-paristech-fra',
        source_media: "Le Figaro Étudiant",
        annee: 2025,
        rang_general: 8,
        note_globale: 18.2
      }
    ],
    insertion: {
      id: 'ensam-ins-1',
      ecole_id: 'ensam-paristech-fra',
      annee_promo: 2024,
      salaire_moyen_embauche: 47.5,
      salaire_avec_primes: 52.8,
      salaire_3_ans: 59.0,
      taux_emploi_6_mois: 97.5,
      pct_international: 22.0,
      pct_poursuite_etudes: 11.0,
      duree_moyenne_recherche_mois: 1.2
    }
  },

  {
    id: 'ensta-paris-fra',
    type_recrutement: 'post_prepa',
    nom_officiel: 'ENSTA Paris',
    sigle: 'ENSTA Paris',
    pays: 'France',
    region: 'Île-de-France',
    parcoursup_url: 'https://dossier.parcoursup.fr/Candidat/carte?action=recherche&origine=carte&g_ta_cod=13007',
    parcoursup_code: '13007',
    ville_principale: 'Palaiseau',
    statut_juridique: 'Public',
    frais_scolarite_annuels: 2650,
    site_web: 'https://www.ensta-paris.fr',
    description: "Membre de l'Institut Polytechnique de Paris, l'ENSTA Paris forme des ingénieurs experts en modélisation mathématique, mobilités intelligentes, naval de défense et énergie.",
    habilitation_cti: true,
    label_eurace: true,
    annee_creation: 1741,
    campus: [
      {
        id: 'ensta-c-1',
        ecole_id: 'ensta-paris-fra',
        nom_campus: 'Campus IP Paris',
        ville: 'Palaiseau',
        code_postal: '91120',
        adresse: '828 Boulevard des Maréchaux',
        latitude: 48.7118,
        longitude: 2.2152,
        est_siege_principal: true
      }
    ],
    specialites: [
      {
        id: 'ensta-sp-1',
        ecole_id: 'ensta-paris-fra',
        intitule_specialite: 'Ingénierie Maritime, Défense & Offshore',
        domaine: 'Automobile & Transports',
        type_cursus: 'Initiale',
        diplome_delivre: 'Titre d\'Ingénieur de l\'ENSTA Paris',
        duree_annees: 3,
        competences_cles: 'Hydrodynamique, Architecture navale, Sous-marins, Éolien flottant'
      ,
        debouches_metiers: [
          'Ingénieur Véhicule Autonome',
          'Architecte Systèmes Électriques & Batteries',
          'Ingénieur Liaison au Sol & Crash',
          'Chef de Projet Mobilité Décarbonée'
        ],
        salaire_moyen_specialite: 46.0,
        taux_insertion_specialite: 98.4,
        partenaires_entreprises: [
          'Renault Group',
          'Stellantis',
          'Valeo',
          'Alstom',
          'SNCF',
          'Forvia'
        ],
        doubles_diplomes: [
          'Master Véhicules Électriques',
          'TU München (Allemagne)',
          'ESTACA',
          'IFP School'
        ],
        secteurs_recrutement: [
          'Constructeurs & Équipementiers Automobiles',
          'Ferroviaire & Transports Urbains',
          'Logistique & Mobilités Douces'
        ],
        modules_phares: [
          'Contrôle Moteur & Électronique de Puissance',
          'Capteurs LiDAR / Radar & Fusion de Données',
          'Gestion Thermique des Batteries',
          'Homologation & Sûreté Fonctionnelle (ISO 26262)'
        ],
        volume_ects: 300
      },
      {
        id: 'ensta-sp-2',
        ecole_id: 'ensta-paris-fra',
        intitule_specialite: 'Génie Atomique & Transition Énergétique',
        domaine: 'Énergie & Environnement',
        type_cursus: 'Initiale',
        diplome_delivre: 'Diplôme d\'Ingénieur',
        duree_annees: 3,
        competences_cles: 'Physique des réacteurs, Sûreté nucléaire, Fusion magnétique'
      ,
        debouches_metiers: [
          'Ingénieur Énergies Renouvelables (Éolien/Solaire)',
          'Ingénieur Sûreté & Procédés Nucléaires',
          'Chef de Projet Bilan Carbone & RSE',
          'Architecte Smart Grids'
        ],
        salaire_moyen_specialite: 46.5,
        taux_insertion_specialite: 98.4,
        partenaires_entreprises: [
          'EDF',
          'TotalEnergies',
          'Engie',
          'Orano',
          'Schneider Electric',
          'RTE'
        ],
        doubles_diplomes: [
          'Master Énergie Nucléaire',
          'KTH Environnement',
          'Double Diplôme IFP School',
          'Imperial College London'
        ],
        secteurs_recrutement: [
          "Production d'Énergie & Nucléaire",
          'Réseaux Électriques Intelligents',
          'Transition Écologique & Décarbonation',
          'Audit Environnemental'
        ],
        modules_phares: [
          'Thermodynamique des Systèmes Énergétiques',
          'Génie Nucléaire & Neutronique',
          "Réseaux Smart Grids & Stockage d'Énergie",
          'Analyse de Cycle de Vie (ACV)'
        ],
        volume_ects: 300
      }
    ],
    admissions: [
      {
        id: 'ensta-adm-1',
        ecole_id: 'ensta-paris-fra',
        source: 'CPGE (SCEI / Concours Commun)',
        annee: 2024,
        nom_filiere_concours: 'Concours Commun Mines-Ponts (CCMP)',
        capacite: 215,
        nb_voeux: 5800,
        taux_acces: 7.2,
        rang_dernier_appele: 480,
        pct_mention_tb: 96.0,
        pct_boursiers: 20.0
      }
    ],
    classements: [
      {
        id: 'ensta-cl-1',
        ecole_id: 'ensta-paris-fra',
        source_media: "Le Figaro Étudiant",
        annee: 2025,
        rang_general: 6,
        note_globale: 18.8
      }
    ],
    insertion: {
      id: 'ensta-ins-1',
      ecole_id: 'ensta-paris-fra',
      annee_promo: 2024,
      salaire_moyen_embauche: 49.5,
      salaire_avec_primes: 55.0,
      salaire_3_ans: 63.5,
      taux_emploi_6_mois: 98.2,
      pct_international: 26.0,
      pct_poursuite_etudes: 15.0,
      duree_moyenne_recherche_mois: 1.1
    }
  },

  {
    id: 'centrale-lyon-fra',
    type_recrutement: 'post_prepa',
    nom_officiel: 'École Centrale de Lyon',
    sigle: 'Centrale Lyon',
    pays: 'France',
    region: 'Auvergne-Rhône-Alpes',
    parcoursup_url: 'https://dossier.parcoursup.fr/Candidat/carte?action=recherche&origine=carte&g_ta_cod=16001',
    parcoursup_code: '16001',
    ville_principale: 'Écully',
    statut_juridique: 'Public',
    frais_scolarite_annuels: 2500,
    site_web: 'https://www.ec-lyon.fr',
    description: "Grande école généraliste d'excellence au cœur de la première région industrielle française, réputée pour sa recherche en acoustique, nanotechnologies et tribologie.",
    habilitation_cti: true,
    label_eurace: true,
    annee_creation: 1857,
    campus: [
      {
        id: 'ecl-c-1',
        ecole_id: 'centrale-lyon-fra',
        nom_campus: 'Campus d\'Écully',
        ville: 'Écully',
        code_postal: '69134',
        adresse: '36 Avenue Guy de Collongue',
        latitude: 45.7828,
        longitude: 4.7672,
        est_siege_principal: true
      },
      {
        id: 'ecl-c-2',
        ecole_id: 'centrale-lyon-fra',
        nom_campus: 'Campus de Saint-Étienne (ex-ENISE)',
        ville: 'Saint-Étienne',
        code_postal: '42023',
        adresse: '58 Rue Jean Parot',
        latitude: 45.4244,
        longitude: 4.4103,
        est_siege_principal: false
      }
    ],
    specialites: [
      {
        id: 'ecl-sp-1',
        ecole_id: 'centrale-lyon-fra',
        intitule_specialite: 'Ingénieur Généraliste Centralien',
        domaine: 'Généraliste & Systèmes Complexes',
        type_cursus: 'Initiale',
        diplome_delivre: 'Titre d\'Ingénieur Diplômé de l\'École Centrale de Lyon',
        duree_annees: 3,
        competences_cles: 'Mécanique des fluides, Nanotechnologies, IA, Bio-ingénierie'
      ,
        debouches_metiers: [
          'Ingénieur Système & Intégration',
          'Chef de Projet Industriel Complexe',
          'Consultant en Stratégie & Organisation',
          "Directeur d'Usine & Supply Chain 4.0"
        ],
        salaire_moyen_specialite: 48.0,
        taux_insertion_specialite: 98.4,
        partenaires_entreprises: [
          'McKinsey & Company',
          'Boston Consulting Group',
          'Airbus',
          'Safran',
          'Saint-Gobain',
          'Capgemini Invent'
        ],
        doubles_diplomes: [
          'Double Diplôme Management HEC / ESSEC / ESCP',
          'Master Sciences & Génie des Systèmes',
          'MIT (USA)',
          'Imperial College London'
        ],
        secteurs_recrutement: [
          'Conseil en Stratégie & Management',
          'Grandes Entreprises Industrielles',
          'Direction de Programmes Stratégiques',
          'Aérospatiale & Énergie'
        ],
        modules_phares: [
          'Ingénierie Système & Modélisation MBSE',
          'Management de Projets Complexes & Gestion des Risques',
          "Économie Industrielle & Stratégie d'Entreprise",
          'Optimisation Multicritère & Décision'
        ],
        volume_ects: 300
      }
    ],
    admissions: [
      {
        id: 'ecl-adm-1',
        ecole_id: 'centrale-lyon-fra',
        source: 'CPGE (SCEI / Concours Commun)',
        annee: 2024,
        nom_filiere_concours: 'Concours Centrale-Supélec',
        capacite: 380,
        nb_voeux: 6500,
        taux_acces: 12.0,
        rang_dernier_appele: 890,
        pct_mention_tb: 94.0,
        pct_boursiers: 22.0
      }
    ],
    classements: [
      {
        id: 'ecl-cl-1',
        ecole_id: 'centrale-lyon-fra',
        source_media: "Le Figaro Étudiant",
        annee: 2025,
        rang_general: 7,
        note_globale: 18.5
      }
    ],
    insertion: {
      id: 'ecl-ins-1',
      ecole_id: 'centrale-lyon-fra',
      annee_promo: 2024,
      salaire_moyen_embauche: 48.0,
      salaire_avec_primes: 54.0,
      salaire_3_ans: 62.0,
      taux_emploi_6_mois: 97.8,
      pct_international: 27.0,
      pct_poursuite_etudes: 17.0,
      duree_moyenne_recherche_mois: 1.2
    }
  },

  {
    id: 'ensimag-grenoble-fra',
    type_recrutement: 'post_prepa',
    nom_officiel: 'Grenoble INP - Ensimag',
    sigle: 'Ensimag',
    pays: 'France',
    region: 'Auvergne-Rhône-Alpes',
    parcoursup_url: 'https://dossier.parcoursup.fr/Candidat/carte?action=recherche&origine=carte&g_ta_cod=16002',
    parcoursup_code: '16002',
    ville_principale: 'Saint-Martin-d\'Hères',
    statut_juridique: 'Public',
    frais_scolarite_annuels: 601,
    site_web: 'https://ensimag.grenoble-inp.fr',
    description: "L'école de référence absolue en informatique, mathématiques appliquées et cybersécurité en région Rhône-Alpes, étroitement liée aux laboratoires CNRS/INRIA.",
    habilitation_cti: true,
    label_eurace: true,
    annee_creation: 1960,
    campus: [
      {
        id: 'ensimag-c-1',
        ecole_id: 'ensimag-grenoble-fra',
        nom_campus: 'Campus Universitaire de Grenoble',
        ville: 'Saint-Martin-d\'Hères',
        code_postal: '38400',
        adresse: '681 Rue de la Passerelle',
        latitude: 45.1925,
        longitude: 5.7725,
        est_siege_principal: true
      }
    ],
    specialites: [
      {
        id: 'ensimag-sp-1',
        ecole_id: 'ensimag-grenoble-fra',
        intitule_specialite: 'Informatique & Systèmes d\'Information',
        domaine: 'Informatique & Logiciel',
        type_cursus: 'Mixte (Initiale & Alternance)',
        diplome_delivre: 'Titre d\'Ingénieur de l\'Ensimag',
        duree_annees: 3,
        competences_cles: 'Algorithmique avancée, Systèmes distribués, Cloud, Compilation'
      ,
        debouches_metiers: [
          'Ingénieur Logiciel Fullstack',
          'Architecte Systèmes Distribués',
          'Lead Developer Cloud',
          'Ingénieur DevOps / SRE'
        ],
        salaire_moyen_specialite: 47.0,
        taux_insertion_specialite: 98.4,
        partenaires_entreprises: [
          'Google',
          'Amazon Web Services',
          'Microsoft',
          'Datadog',
          'Capgemini',
          'Criteo'
        ],
        doubles_diplomes: [
          'Master Recherche Informatique',
          'Double Diplôme HEC Paris',
          'Georgia Tech (USA)',
          'EPFL (Suisse)'
        ],
        secteurs_recrutement: [
          'Tech & Éditeurs Logiciels',
          'Conseil en Technologies',
          'Banque & FinTech',
          'Télécoms'
        ],
        modules_phares: [
          'Architecture Microservices & Cloud',
          'Algorithmique Avancée & HPC',
          "Compilateurs & Systèmes d'Exploitation",
          'Conception Logicielle Agile'
        ],
        volume_ects: 300
      },
      {
        id: 'ensimag-sp-2',
        ecole_id: 'ensimag-grenoble-fra',
        intitule_specialite: 'Cybersécurité & Sécurité des Systèmes d\'Information',
        domaine: 'Cybersécurité',
        type_cursus: 'Mixte (Initiale & Alternance)',
        diplome_delivre: 'Titre d\'Ingénieur de l\'Ensimag',
        duree_annees: 3,
        competences_cles: 'Cryptographie matérielle, Pentesting, Sécurité des protocoles'
      ,
        debouches_metiers: [
          'Ingénieur Pentest & Sécurité Offensive',
          'Analyste SOC & Incident Response',
          'Architecte Sécurité Cloud',
          'Cryptanalyste'
        ],
        salaire_moyen_specialite: 48.5,
        taux_insertion_specialite: 98.4,
        partenaires_entreprises: [
          'ANSSI',
          'Thales Cyber Solutions',
          'Airbus Cybersecurity',
          'Orange Cyberdefense',
          'Wavestone',
          'Ministère des Armées'
        ],
        doubles_diplomes: [
          'Master Cybersécurité & Confiance Numérique',
          'Double Diplôme Télécom',
          'KTH Stockholm',
          'Université de Montréal'
        ],
        secteurs_recrutement: [
          'Défense & Sécurité Nationale',
          'Secteur Bancaire & OIV',
          'Infrastructures Critiques',
          'Audit & Conseil'
        ],
        modules_phares: [
          'Cryptographie Appliquée & Post-Quantique',
          'Sécurité des Réseaux & Systèmes',
          'Rétro-ingénierie & Analyse de Malware',
          'Gouvernance & Normes ISO 27001'
        ],
        volume_ects: 300
      }
    ],
    admissions: [
      {
        id: 'ensimag-adm-1',
        ecole_id: 'ensimag-grenoble-fra',
        source: 'CPGE (SCEI / Concours Commun)',
        annee: 2024,
        nom_filiere_concours: 'Concours Commun INP (CCINP)',
        capacite: 260,
        nb_voeux: 5200,
        taux_acces: 14.0,
        rang_dernier_appele: 750,
        pct_mention_tb: 89.0,
        pct_boursiers: 24.0
      }
    ],
    classements: [
      {
        id: 'ensimag-cl-1',
        ecole_id: 'ensimag-grenoble-fra',
        source_media: "Le Figaro Étudiant",
        annee: 2025,
        domaine_specialite: 'Informatique & Logiciel',
        rang_par_specialite: 4,
        note_globale: 19.0
      }
    ],
    insertion: {
      id: 'ensimag-ins-1',
      ecole_id: 'ensimag-grenoble-fra',
      annee_promo: 2024,
      salaire_moyen_embauche: 48.5,
      salaire_avec_primes: 54.2,
      salaire_3_ans: 63.0,
      taux_emploi_6_mois: 98.7,
      pct_international: 29.0,
      pct_poursuite_etudes: 15.0,
      duree_moyenne_recherche_mois: 0.9
    }
  },

  {
    id: 'isae-supaero-fra',
    type_recrutement: 'post_prepa',
    nom_officiel: 'ISAE-SUPAERO',
    sigle: 'ISAE-SUPAERO',
    pays: 'France',
    region: 'Occitanie',
    parcoursup_url: 'https://dossier.parcoursup.fr/Candidat/carte?action=recherche&origine=carte&g_ta_cod=17001',
    parcoursup_code: '17001',
    ville_principale: 'Toulouse',
    statut_juridique: 'Public',
    frais_scolarite_annuels: 3500,
    site_web: 'https://www.isae-supaero.fr',
    description: "Leader mondial de l'enseignement supérieur aérospatial, ISAE-SUPAERO forme les ingénieurs concevant les avions, fusées, drones et satellites de demain à Toulouse.",
    habilitation_cti: true,
    label_eurace: true,
    annee_creation: 1909,
    campus: [
      {
        id: 'isae-campus-1',
        ecole_id: 'isae-supaero-fra',
        nom_campus: 'Campus de Rangueil',
        ville: 'Toulouse',
        code_postal: '31055',
        adresse: '10 Avenue Édouard Belin',
        latitude: 43.5658,
        longitude: 1.4744,
        est_siege_principal: true
      }
    ],
    specialites: [
      {
        id: 'isae-sp-1',
        ecole_id: 'isae-supaero-fra',
        intitule_specialite: 'Génie Aérospatial & Systèmes Spatiaux',
        domaine: 'Aéronautique & Spatial',
        type_cursus: 'Initiale',
        diplome_delivre: 'Titre d\'Ingénieur ISAE-SUPAERO',
        duree_annees: 3,
        competences_cles: 'Aérodynamique hypersonique, Propulsion spatiale, Guidage et pilotage'
      ,
        debouches_metiers: [
          'Ingénieur Aérodynamicien',
          'Concepteur Systèmes Avioniques',
          'Ingénieur Propulsion & Moteurs',
          'Architecte Satellites & Lanceurs'
        ],
        salaire_moyen_specialite: 47.5,
        taux_insertion_specialite: 98.4,
        partenaires_entreprises: [
          'Airbus',
          'Dassault Aviation',
          'Safran',
          'ArianeGroup',
          'Thales Alenia Space',
          'CNES / ESA'
        ],
        doubles_diplomes: [
          'Master Spatial (ISAE / Supaero)',
          'Cranfield University (UK)',
          'TU Delft (Pays-Bas)',
          'Polytechnique Montréal'
        ],
        secteurs_recrutement: [
          'Constructeurs Aéronautiques',
          'Industrie Spatiale & Drones',
          'Défense & Systèmes Embarqués',
          'Maintenance Aéronautique'
        ],
        modules_phares: [
          'Mécanique des Fluides & CFD Compressible',
          'Dynamique du Vol & Pilotage Automatique',
          'Systèmes Propulsifs Hybrides & Hydrogène',
          'Structures & Matériaux Composites'
        ],
        volume_ects: 300
      },
      {
        id: 'isae-sp-2',
        ecole_id: 'isae-supaero-fra',
        intitule_specialite: 'Systèmes Embarqués Aéronautiques & Drones Autonomes',
        domaine: 'Électronique & Systèmes Embarqués',
        type_cursus: 'Mixte (Initiale & Alternance)',
        diplome_delivre: 'Diplôme d\'Ingénieur',
        duree_annees: 3,
        competences_cles: 'Avionique temps réel, Traitement du signal radar, Systèmes critiques DO-178C'
      ,
        debouches_metiers: [
          'Ingénieur Conception ASIC / FPGA',
          'Architecte Systèmes Temps Réel',
          'Ingénieur Radiofréquence & IoT',
          'Spécialiste Compatibilité Électromagnétique'
        ],
        salaire_moyen_specialite: 47.0,
        taux_insertion_specialite: 98.4,
        partenaires_entreprises: [
          'STMicroelectronics',
          'Thales',
          'NXP Semiconductors',
          'Safran Electronics',
          'SNCF',
          'CEA-Leti'
        ],
        doubles_diplomes: [
          'Master Micro & Nano-électronique',
          'Georgia Tech',
          'EPFL',
          'Politecnico di Milano'
        ],
        secteurs_recrutement: [
          'Semi-conducteurs & Nanoélectronique',
          'Aéronautique & Spatial',
          'Automobile & Objets Connectés (IoT)',
          'Télécoms 5G/6G'
        ],
        modules_phares: [
          'Conception VHDL / Verilog & Synthèse FPGA',
          'Architectures Microcontrôleurs & Firmware C/C++',
          'Électronique Hyperfréquences & Antennes',
          "Systèmes d'Exploitation Temps Réel (FreeRTOS/Linux Embarqué)"
        ],
        volume_ects: 300
      }
    ],
    admissions: [
      {
        id: 'isae-adm-1',
        ecole_id: 'isae-supaero-fra',
        source: 'Parcoursup',
        annee: 2024,
        nom_filiere_concours: 'Concours Commun Mines-Ponts (Filière Ingénieur ISAE-SUPAERO)',
        capacite: 35,
        nb_voeux: 1280,
        taux_acces: 9.5,
        rang_dernier_appele: 68,
        pct_mention_tb: 92.0,
        pct_boursiers: 18.0
      },
      {
        id: 'isae-adm-2',
        ecole_id: 'isae-supaero-fra',
        source: 'CPGE (SCEI / Concours Commun)',
        annee: 2024,
        nom_filiere_concours: 'Concours Commun Mines-Ponts (CCMP)',
        capacite: 195,
        nb_voeux: 5700,
        taux_acces: 5.5,
        rang_dernier_appele: 395,
        pct_mention_tb: 97.0,
        pct_boursiers: 19.0
      }
    ],
    classements: [
      {
        id: 'isae-cl-1',
        ecole_id: 'isae-supaero-fra',
        source_media: "Le Figaro Étudiant",
        annee: 2025,
        rang_general: 5,
        note_globale: 18.9
      },
      {
        id: 'isae-cl-2',
        ecole_id: 'isae-supaero-fra',
        source_media: "Le Figaro Étudiant",
        annee: 2025,
        domaine_specialite: 'Aéronautique & Spatial',
        rang_par_specialite: 1,
        note_globale: 20.0
      }
    ],
    insertion: {
      id: 'isae-ins-1',
      ecole_id: 'isae-supaero-fra',
      annee_promo: 2024,
      salaire_moyen_embauche: 51.0,
      salaire_avec_primes: 57.5,
      salaire_3_ans: 64.5,
      taux_emploi_6_mois: 97.8,
      pct_international: 37.0,
      pct_poursuite_etudes: 15.0,
      duree_moyenne_recherche_mois: 1.1
    }
  },

  // =========================================================================
  // FRANCE : GRANDS RÉSEAUX PUBLICS POST-BAC (INSA & UT)
  // =========================================================================
  {
    id: 'insa-lyon-fra',
    nom_officiel: 'Institut National des Sciences Appliquées de Lyon',
    sigle: 'INSA Lyon',
    pays: 'France',
    region: 'Auvergne-Rhône-Alpes',
    parcoursup_url: 'https://dossier.parcoursup.fr/Candidat/carte?action=recherche&origine=carte&g_ta_cod=15101',
    parcoursup_code: '15101',
    ville_principale: 'Villeurbanne',
    statut_juridique: 'Public',
    frais_scolarite_annuels: 601,
    site_web: 'https://www.insa-lyon.fr',
    description: "Première école d'ingénieurs post-bac de France, l'INSA Lyon diplôme 1 000 ingénieurs par an dans 9 filières scientifiques de haut vol.",
    habilitation_cti: true,
    label_eurace: true,
    annee_creation: 1957,
    campus: [
      {
        id: 'insa-campus-1',
        ecole_id: 'insa-lyon-fra',
        nom_campus: 'Campus Lyon Tech La Doua',
        ville: 'Villeurbanne',
        code_postal: '69100',
        adresse: '20 Avenue Albert Einstein',
        latitude: 45.7825,
        longitude: 4.8783,
        est_siege_principal: true
      },
      {
        id: 'insa-campus-2',
        ecole_id: 'insa-lyon-fra',
        nom_campus: 'Campus d\'Oyonnax',
        ville: 'Bellignat',
        code_postal: '01100',
        adresse: '85 Rue Henri Becquerel',
        latitude: 46.2415,
        longitude: 5.6294,
        est_siege_principal: false
      }
    ],
    specialites: [
      {
        id: 'insa-sp-1',
        ecole_id: 'insa-lyon-fra',
        intitule_specialite: 'Informatique (IF)',
        domaine: 'Informatique & Logiciel',
        type_cursus: 'Mixte (Initiale & Alternance)',
        diplome_delivre: 'Titre d\'Ingénieur Diplômé de l\'INSA Lyon',
        duree_annees: 3,
        competences_cles: 'Génie logiciel, Systèmes distribués, Cybersécurité, Intelligence artificielle'
      ,
        debouches_metiers: [
          'Ingénieur Logiciel Fullstack',
          'Architecte Systèmes Distribués',
          'Lead Developer Cloud',
          'Ingénieur DevOps / SRE'
        ],
        salaire_moyen_specialite: 47.0,
        taux_insertion_specialite: 98.4,
        partenaires_entreprises: [
          'Google',
          'Amazon Web Services',
          'Microsoft',
          'Datadog',
          'Capgemini',
          'Criteo'
        ],
        doubles_diplomes: [
          'Master Recherche Informatique',
          'Double Diplôme HEC Paris',
          'Georgia Tech (USA)',
          'EPFL (Suisse)'
        ],
        secteurs_recrutement: [
          'Tech & Éditeurs Logiciels',
          'Conseil en Technologies',
          'Banque & FinTech',
          'Télécoms'
        ],
        modules_phares: [
          'Architecture Microservices & Cloud',
          'Algorithmique Avancée & HPC',
          "Compilateurs & Systèmes d'Exploitation",
          'Conception Logicielle Agile'
        ],
        volume_ects: 300
      },
      {
        id: 'insa-sp-2',
        ecole_id: 'insa-lyon-fra',
        intitule_specialite: 'Génie Mécanique (GM)',
        domaine: 'Robotique & Mécatronique',
        type_cursus: 'Mixte (Initiale & Alternance)',
        diplome_delivre: 'Titre d\'Ingénieur Diplômé de l\'INSA Lyon',
        duree_annees: 3,
        competences_cles: 'Conception CAO avancée, Mécatronique, Modélisation éléments finis'
      ,
        debouches_metiers: [
          'Ingénieur Concepteur Robotique',
          'Spécialiste Vision & SLAM',
          'Ingénieur Automatique & Systèmes Embarqués',
          'Architecte Cobotique & Usine 4.0'
        ],
        salaire_moyen_specialite: 46.8,
        taux_insertion_specialite: 98.4,
        partenaires_entreprises: [
          'Aldebaran',
          'Boston Dynamics Partner',
          'Kuka Robotics',
          'Schneider Electric',
          'Dassault Aviation',
          'Siemens'
        ],
        doubles_diplomes: [
          'Master Robotique Avancée',
          'Carnegie Mellon University',
          'TU München',
          'Tokyo Institute of Technology'
        ],
        secteurs_recrutement: [
          'Robotique Industrielle & Médicale',
          'Défense & Véhicules Autonomes',
          'Agro-robotique',
          'Électronique Grand Public'
        ],
        modules_phares: [
          'Cinématique & Dynamique des Manipulateurs',
          'Perception 3D, SLAM & Capteurs LiDAR',
          'Asservissement Numérique & Systèmes Temps Réel',
          'Cobotique & Interaction Homme-Robot'
        ],
        volume_ects: 300
      },
      {
        id: 'insa-sp-3',
        ecole_id: 'insa-lyon-fra',
        intitule_specialite: 'Biosciences & Bioinformatique (BS)',
        domaine: 'Biotechnologies & Santé',
        type_cursus: 'Initiale',
        diplome_delivre: 'Titre d\'Ingénieur Diplômé de l\'INSA Lyon',
        duree_annees: 3,
        competences_cles: 'Génie génétique, Biologie cellulaire, Séquençage NGS, Analyse protéomique'
      ,
        debouches_metiers: [
          'Ingénieur Dispositifs Médicaux',
          'Bio-informaticien & Analyse Génomique',
          'Ingénieur R&D Biomécanique & Prothèses',
          'Responsable Qualité & Affaires Réglementaires Pharma'
        ],
        salaire_moyen_specialite: 46.2,
        taux_insertion_specialite: 98.4,
        partenaires_entreprises: [
          'Sanofi',
          'BioMérieux',
          'GE Healthcare',
          'Medtronic',
          'Institut Pasteur',
          'Servier'
        ],
        doubles_diplomes: [
          'Master Bio-informatique',
          'Double Diplôme Médecine-Ingénieur',
          'Johns Hopkins University',
          'Université Paris Cité'
        ],
        secteurs_recrutement: [
          'Industrie Pharmaceutique & Vaccins',
          'Technologies Médicales (MedTech)',
          'Biotechnologies Blanches & Rouges',
          'Recherche Biomédicale'
        ],
        modules_phares: [
          'Génie Génétique & Biologie Moléculaire',
          'Imagerie Médicale & Traitement du Signal ECG/EEG',
          'Biomechanics & Matériaux Biocompatibles',
          'Réglementation FDA / Marquage CE Médical'
        ],
        volume_ects: 300
      }
    ],
    admissions: [
      {
        id: 'insa-adm-1',
        ecole_id: 'insa-lyon-fra',
        source: 'Parcoursup',
        annee: 2024,
        nom_filiere_concours: 'Groupe INSA (Bac Général)',
        capacite: 640,
        nb_voeux: 18500,
        taux_acces: 12.4,
        rang_dernier_appele: 1950,
        pct_mention_tb: 84.0,
        pct_boursiers: 26.0
      },
      {
        id: 'insa-adm-2',
        ecole_id: 'insa-lyon-fra',
        source: 'Admissions Parallèles (Titre)',
        annee: 2024,
        nom_filiere_concours: 'Admission directe en 3e année (BUT, Licence)',
        capacite: 320,
        nb_voeux: 2900,
        taux_acces: 15.0,
        rang_dernier_appele: 390,
        pct_mention_tb: 78.0,
        pct_boursiers: 28.0
      }
    ],
    classements: [
      {
        id: 'insa-cl-1',
        ecole_id: 'insa-lyon-fra',
        source_media: "Le Figaro Étudiant",
        annee: 2025,
        rang_general: 9,
        note_globale: 18.1
      },
      {
        id: 'insa-cl-2',
        ecole_id: 'insa-lyon-fra',
        source_media: "Le Figaro Étudiant",
        annee: 2025,
        domaine_specialite: 'Informatique & Logiciel',
        rang_par_specialite: 6,
        note_globale: 18.7
      },
      {
        id: 'insa-cl-3',
        ecole_id: 'insa-lyon-fra',
        source_media: "L'Usine Nouvelle",
        annee: 2025,
        rang_general: 2,
        note_globale: 96.0
      }
    ],
    insertion: {
      id: 'insa-ins-1',
      ecole_id: 'insa-lyon-fra',
      annee_promo: 2024,
      salaire_moyen_embauche: 45.0,
      salaire_avec_primes: 50.2,
      salaire_3_ans: 57.0,
      taux_emploi_6_mois: 96.0,
      pct_international: 28.0,
      pct_poursuite_etudes: 14.0,
      duree_moyenne_recherche_mois: 1.4
    }
  },

  {
    id: 'insa-toulouse-fra',
    nom_officiel: 'Institut National des Sciences Appliquées de Toulouse',
    sigle: 'INSA Toulouse',
    pays: 'France',
    region: 'Occitanie',
    parcoursup_url: 'https://dossier.parcoursup.fr/Candidat/carte?action=recherche&origine=carte&g_ta_cod=15102',
    parcoursup_code: '15102',
    ville_principale: 'Toulouse',
    statut_juridique: 'Public',
    frais_scolarite_annuels: 601,
    site_web: 'https://www.insa-toulouse.fr',
    description: "Grande école d'ingénieurs publique post-bac située au cœur de la capitale aérospatiale européenne, reconnue pour ses filières automatique, biotechnologies et systèmes embarqués.",
    habilitation_cti: true,
    label_eurace: true,
    annee_creation: 1963,
    campus: [
      {
        id: 'insat-c-1',
        ecole_id: 'insa-toulouse-fra',
        nom_campus: 'Campus de Rangueil',
        ville: 'Toulouse',
        code_postal: '31077',
        adresse: '135 Avenue de Rangueil',
        latitude: 43.5702,
        longitude: 1.4688,
        est_siege_principal: true
      }
    ],
    specialites: [
      {
        id: 'insat-sp-1',
        ecole_id: 'insa-toulouse-fra',
        intitule_specialite: 'Génie Électrique & Informatique',
        domaine: 'Électronique & Systèmes Embarqués',
        type_cursus: 'Mixte (Initiale & Alternance)',
        diplome_delivre: 'Titre d\'Ingénieur de l\'INSA Toulouse',
        duree_annees: 3,
        competences_cles: 'Capteurs connectés, Électronique de puissance, IoT, Traitement du signal'
      ,
        debouches_metiers: [
          'Ingénieur Conception ASIC / FPGA',
          'Architecte Systèmes Temps Réel',
          'Ingénieur Radiofréquence & IoT',
          'Spécialiste Compatibilité Électromagnétique'
        ],
        salaire_moyen_specialite: 47.0,
        taux_insertion_specialite: 98.4,
        partenaires_entreprises: [
          'STMicroelectronics',
          'Thales',
          'NXP Semiconductors',
          'Safran Electronics',
          'SNCF',
          'CEA-Leti'
        ],
        doubles_diplomes: [
          'Master Micro & Nano-électronique',
          'Georgia Tech',
          'EPFL',
          'Politecnico di Milano'
        ],
        secteurs_recrutement: [
          'Semi-conducteurs & Nanoélectronique',
          'Aéronautique & Spatial',
          'Automobile & Objets Connectés (IoT)',
          'Télécoms 5G/6G'
        ],
        modules_phares: [
          'Conception VHDL / Verilog & Synthèse FPGA',
          'Architectures Microcontrôleurs & Firmware C/C++',
          'Électronique Hyperfréquences & Antennes',
          "Systèmes d'Exploitation Temps Réel (FreeRTOS/Linux Embarqué)"
        ],
        volume_ects: 300
      },
      {
        id: 'insat-sp-2',
        ecole_id: 'insa-toulouse-fra',
        intitule_specialite: 'Génie des Procédés & Environnement',
        domaine: 'Énergie & Environnement',
        type_cursus: 'Initiale',
        diplome_delivre: 'Titre d\'Ingénieur de l\'INSA Toulouse',
        duree_annees: 3,
        competences_cles: 'Chimie verte, Traitement des eaux, Bioréacteurs industriels'
      ,
        debouches_metiers: [
          'Ingénieur Énergies Renouvelables (Éolien/Solaire)',
          'Ingénieur Sûreté & Procédés Nucléaires',
          'Chef de Projet Bilan Carbone & RSE',
          'Architecte Smart Grids'
        ],
        salaire_moyen_specialite: 46.5,
        taux_insertion_specialite: 98.4,
        partenaires_entreprises: [
          'EDF',
          'TotalEnergies',
          'Engie',
          'Orano',
          'Schneider Electric',
          'RTE'
        ],
        doubles_diplomes: [
          'Master Énergie Nucléaire',
          'KTH Environnement',
          'Double Diplôme IFP School',
          'Imperial College London'
        ],
        secteurs_recrutement: [
          "Production d'Énergie & Nucléaire",
          'Réseaux Électriques Intelligents',
          'Transition Écologique & Décarbonation',
          'Audit Environnemental'
        ],
        modules_phares: [
          'Thermodynamique des Systèmes Énergétiques',
          'Génie Nucléaire & Neutronique',
          "Réseaux Smart Grids & Stockage d'Énergie",
          'Analyse de Cycle de Vie (ACV)'
        ],
        volume_ects: 300
      }
    ],
    admissions: [
      {
        id: 'insat-adm-1',
        ecole_id: 'insa-toulouse-fra',
        source: 'Parcoursup',
        annee: 2024,
        nom_filiere_concours: 'Groupe INSA Post-bac',
        capacite: 320,
        nb_voeux: 14200,
        taux_acces: 14.8,
        rang_dernier_appele: 1650,
        pct_mention_tb: 81.0,
        pct_boursiers: 25.0
      }
    ],
    classements: [
      {
        id: 'insat-cl-1',
        ecole_id: 'insa-toulouse-fra',
        source_media: "Le Figaro Étudiant",
        annee: 2025,
        rang_general: 14,
        note_globale: 17.6
      }
    ],
    insertion: {
      id: 'insat-ins-1',
      ecole_id: 'insa-toulouse-fra',
      annee_promo: 2024,
      salaire_moyen_embauche: 44.0,
      salaire_avec_primes: 49.0,
      salaire_3_ans: 55.5,
      taux_emploi_6_mois: 96.2,
      pct_international: 24.0,
      pct_poursuite_etudes: 13.0,
      duree_moyenne_recherche_mois: 1.5
    }
  },

  {
    id: 'utc-compiegne-fra',
    nom_officiel: 'Université de Technologie de Compiègne',
    sigle: 'UTC',
    pays: 'France',
    region: 'Hauts-de-France',
    parcoursup_url: 'https://dossier.parcoursup.fr/Candidat/carte?action=recherche&origine=carte&g_ta_cod=15201',
    parcoursup_code: '15201',
    ville_principale: 'Compiègne',
    statut_juridique: 'Public',
    frais_scolarite_annuels: 601,
    site_web: 'https://www.utc.fr',
    description: "Pionnière des universités de technologie, l'UTC propose une pédagogie à la carte avec choix des unités de valeur, un ancrage fort dans l'innovation biomédicale et le numérique.",
    habilitation_cti: true,
    label_eurace: true,
    annee_creation: 1972,
    campus: [
      {
        id: 'utc-campus-1',
        ecole_id: 'utc-compiegne-fra',
        nom_campus: 'Centre de Recherches de Royallieu',
        ville: 'Compiègne',
        code_postal: '60200',
        adresse: 'Rue du Docteur Schweitzer',
        latitude: 49.4002,
        longitude: 2.8005,
        est_siege_principal: true
      }
    ],
    specialites: [
      {
        id: 'utc-sp-1',
        ecole_id: 'utc-compiegne-fra',
        intitule_specialite: 'Génie Informatique (GI)',
        domaine: 'Informatique & Logiciel',
        type_cursus: 'Mixte (Initiale & Alternance)',
        diplome_delivre: 'Titre d\'Ingénieur de l\'UTC',
        duree_annees: 3,
        competences_cles: 'Systèmes intelligents, Aide à la décision, Ingénierie des connaissances'
      ,
        debouches_metiers: [
          'Ingénieur Logiciel Fullstack',
          'Architecte Systèmes Distribués',
          'Lead Developer Cloud',
          'Ingénieur DevOps / SRE'
        ],
        salaire_moyen_specialite: 47.0,
        taux_insertion_specialite: 98.4,
        partenaires_entreprises: [
          'Google',
          'Amazon Web Services',
          'Microsoft',
          'Datadog',
          'Capgemini',
          'Criteo'
        ],
        doubles_diplomes: [
          'Master Recherche Informatique',
          'Double Diplôme HEC Paris',
          'Georgia Tech (USA)',
          'EPFL (Suisse)'
        ],
        secteurs_recrutement: [
          'Tech & Éditeurs Logiciels',
          'Conseil en Technologies',
          'Banque & FinTech',
          'Télécoms'
        ],
        modules_phares: [
          'Architecture Microservices & Cloud',
          'Algorithmique Avancée & HPC',
          "Compilateurs & Systèmes d'Exploitation",
          'Conception Logicielle Agile'
        ],
        volume_ects: 300
      },
      {
        id: 'utc-sp-2',
        ecole_id: 'utc-compiegne-fra',
        intitule_specialite: 'Génie Biomédical (GB)',
        domaine: 'Biotechnologies & Santé',
        type_cursus: 'Initiale',
        diplome_delivre: 'Titre d\'Ingénieur de l\'UTC',
        duree_annees: 3,
        competences_cles: 'Dispositifs médicaux, Imagerie IRM/Scanner, Biomécanique humaine'
      ,
        debouches_metiers: [
          'Ingénieur Dispositifs Médicaux',
          'Bio-informaticien & Analyse Génomique',
          'Ingénieur R&D Biomécanique & Prothèses',
          'Responsable Qualité & Affaires Réglementaires Pharma'
        ],
        salaire_moyen_specialite: 46.2,
        taux_insertion_specialite: 98.4,
        partenaires_entreprises: [
          'Sanofi',
          'BioMérieux',
          'GE Healthcare',
          'Medtronic',
          'Institut Pasteur',
          'Servier'
        ],
        doubles_diplomes: [
          'Master Bio-informatique',
          'Double Diplôme Médecine-Ingénieur',
          'Johns Hopkins University',
          'Université Paris Cité'
        ],
        secteurs_recrutement: [
          'Industrie Pharmaceutique & Vaccins',
          'Technologies Médicales (MedTech)',
          'Biotechnologies Blanches & Rouges',
          'Recherche Biomédicale'
        ],
        modules_phares: [
          'Génie Génétique & Biologie Moléculaire',
          'Imagerie Médicale & Traitement du Signal ECG/EEG',
          'Biomechanics & Matériaux Biocompatibles',
          'Réglementation FDA / Marquage CE Médical'
        ],
        volume_ects: 300
      }
    ],
    admissions: [
      {
        id: 'utc-adm-1',
        ecole_id: 'utc-compiegne-fra',
        source: 'Parcoursup',
        annee: 2024,
        nom_filiere_concours: 'Réseau UT (Tronc commun Post-bac)',
        capacite: 380,
        nb_voeux: 12400,
        taux_acces: 14.2,
        rang_dernier_appele: 1150,
        pct_mention_tb: 82.0,
        pct_boursiers: 24.0
      }
    ],
    classements: [
      {
        id: 'utc-cl-1',
        ecole_id: 'utc-compiegne-fra',
        source_media: "Le Figaro Étudiant",
        annee: 2025,
        rang_general: 11,
        note_globale: 17.9
      },
      {
        id: 'utc-cl-2',
        ecole_id: 'utc-compiegne-fra',
        source_media: "Le Figaro Étudiant",
        annee: 2025,
        domaine_specialite: 'Informatique & Logiciel',
        rang_par_specialite: 8,
        note_globale: 18.4
      }
    ],
    insertion: {
      id: 'utc-ins-1',
      ecole_id: 'utc-compiegne-fra',
      annee_promo: 2024,
      salaire_moyen_embauche: 44.5,
      salaire_avec_primes: 49.5,
      salaire_3_ans: 56.5,
      taux_emploi_6_mois: 95.8,
      pct_international: 24.0,
      pct_poursuite_etudes: 12.0,
      duree_moyenne_recherche_mois: 1.5
    }
  },

  {
    id: 'utt-troyes-fra',
    nom_officiel: 'Université de Technologie de Troyes',
    sigle: 'UTT',
    pays: 'France',
    region: 'Grand Est',
    parcoursup_url: 'https://dossier.parcoursup.fr/Candidat/carte?action=recherche&origine=carte&g_ta_cod=15202',
    parcoursup_code: '15202',
    ville_principale: 'Troyes',
    statut_juridique: 'Public',
    frais_scolarite_annuels: 601,
    site_web: 'https://www.utt.fr',
    description: "Université de technologie moderne dynamique, réputée pour sa chaire de cybersécurité avec la Gendarmerie nationale et ses formations en réseaux et matériaux.",
    habilitation_cti: true,
    label_eurace: true,
    annee_creation: 1994,
    campus: [
      {
        id: 'utt-c-1',
        ecole_id: 'utt-troyes-fra',
        nom_campus: 'Campus de Troyes',
        ville: 'Troyes',
        code_postal: '10000',
        adresse: '12 Rue Marie Curie',
        latitude: 48.2694,
        longitude: 4.0667,
        est_siege_principal: true
      }
    ],
    specialites: [
      {
        id: 'utt-sp-1',
        ecole_id: 'utt-troyes-fra',
        intitule_specialite: 'Réseaux & Télécommunications (RT)',
        domaine: 'Cybersécurité',
        type_cursus: 'Mixte (Initiale & Alternance)',
        diplome_delivre: 'Titre d\'Ingénieur de l\'UTT',
        duree_annees: 3,
        competences_cles: 'Investigation numérique, Sécurité cloud, Réseaux 5G/6G'
      ,
        debouches_metiers: [
          'Ingénieur Pentest & Sécurité Offensive',
          'Analyste SOC & Incident Response',
          'Architecte Sécurité Cloud',
          'Cryptanalyste'
        ],
        salaire_moyen_specialite: 48.5,
        taux_insertion_specialite: 98.4,
        partenaires_entreprises: [
          'ANSSI',
          'Thales Cyber Solutions',
          'Airbus Cybersecurity',
          'Orange Cyberdefense',
          'Wavestone',
          'Ministère des Armées'
        ],
        doubles_diplomes: [
          'Master Cybersécurité & Confiance Numérique',
          'Double Diplôme Télécom',
          'KTH Stockholm',
          'Université de Montréal'
        ],
        secteurs_recrutement: [
          'Défense & Sécurité Nationale',
          'Secteur Bancaire & OIV',
          'Infrastructures Critiques',
          'Audit & Conseil'
        ],
        modules_phares: [
          'Cryptographie Appliquée & Post-Quantique',
          'Sécurité des Réseaux & Systèmes',
          'Rétro-ingénierie & Analyse de Malware',
          'Gouvernance & Normes ISO 27001'
        ],
        volume_ects: 300
      }
    ],
    admissions: [
      {
        id: 'utt-adm-1',
        ecole_id: 'utt-troyes-fra',
        source: 'Parcoursup',
        annee: 2024,
        nom_filiere_concours: 'Réseau UT Post-bac',
        capacite: 310,
        nb_voeux: 9200,
        taux_acces: 22.0,
        rang_dernier_appele: 1800,
        pct_mention_tb: 68.0,
        pct_boursiers: 27.0
      }
    ],
    classements: [
      {
        id: 'utt-cl-1',
        ecole_id: 'utt-troyes-fra',
        source_media: "Le Figaro Étudiant",
        annee: 2025,
        rang_general: 22,
        note_globale: 16.8
      }
    ],
    insertion: {
      id: 'utt-ins-1',
      ecole_id: 'utt-troyes-fra',
      annee_promo: 2024,
      salaire_moyen_embauche: 42.5,
      salaire_avec_primes: 47.0,
      salaire_3_ans: 53.5,
      taux_emploi_6_mois: 95.0,
      pct_international: 20.0,
      pct_poursuite_etudes: 10.0,
      duree_moyenne_recherche_mois: 1.6
    }
  },

  // =========================================================================
  // FRANCE : ÉCOLES SPÉCIALISÉES PRIVÉES / EESPIG DU NUMÉRIQUE & BTP
  // =========================================================================
  {
    id: 'epita-paris-fra',
    nom_officiel: 'EPITA - École pour l\'Informatique et les Techniques Avancées',
    sigle: 'EPITA',
    pays: 'France',
    ville_principale: 'Le Kremlin-Bicêtre',
    statut_juridique: 'EESPIG',
    frais_scolarite_annuels: 10890,
    site_web: 'https://www.epita.fr',
    description: "École d'ingénieurs en informatique de référence privée non lucrative (EESPIG), célèbre pour sa prépa intégrée intensive, sa piscine C/UNIX et son laboratoire de cybersécurité LSE.",
    habilitation_cti: true,
    label_eurace: true,
    annee_creation: 1984,
    campus: [
      {
        id: 'epita-c-1',
        ecole_id: 'epita-paris-fra',
        nom_campus: 'Campus Paris Kremlin-Bicêtre',
        ville: 'Le Kremlin-Bicêtre',
        code_postal: '94270',
        adresse: '14-16 Rue Voltaire',
        latitude: 48.8152,
        longitude: 2.3631,
        est_siege_principal: true
      },
      {
        id: 'epita-c-2',
        ecole_id: 'epita-paris-fra',
        nom_campus: 'Campus de Lyon',
        ville: 'Lyon',
        code_postal: '69003',
        adresse: '86 Boulevard Marius Vivier Merle',
        latitude: 45.7592,
        longitude: 4.8587,
        est_siege_principal: false
      },
      {
        id: 'epita-c-3',
        ecole_id: 'epita-paris-fra',
        nom_campus: 'Campus de Toulouse',
        ville: 'Toulouse',
        code_postal: '31000',
        adresse: '40 Boulevard de la Marquette',
        latitude: 43.6111,
        longitude: 1.4328,
        est_siege_principal: false
      }
    ],
    specialites: [
      {
        id: 'epita-sp-1',
        ecole_id: 'epita-paris-fra',
        intitule_specialite: 'Majeure Sécurité & Défense des Systèmes (SRS)',
        domaine: 'Cybersécurité',
        type_cursus: 'Mixte (Initiale & Alternance)',
        diplome_delivre: 'Titre d\'Ingénieur Diplômé de l\'EPITA',
        duree_annees: 3,
        competences_cles: 'Offensive Security, Rétro-ingénierie binaire, Kernel exploitation'
      ,
        debouches_metiers: [
          'Ingénieur Pentest & Sécurité Offensive',
          'Analyste SOC & Incident Response',
          'Architecte Sécurité Cloud',
          'Cryptanalyste'
        ],
        salaire_moyen_specialite: 48.5,
        taux_insertion_specialite: 98.4,
        partenaires_entreprises: [
          'ANSSI',
          'Thales Cyber Solutions',
          'Airbus Cybersecurity',
          'Orange Cyberdefense',
          'Wavestone',
          'Ministère des Armées'
        ],
        doubles_diplomes: [
          'Master Cybersécurité & Confiance Numérique',
          'Double Diplôme Télécom',
          'KTH Stockholm',
          'Université de Montréal'
        ],
        secteurs_recrutement: [
          'Défense & Sécurité Nationale',
          'Secteur Bancaire & OIV',
          'Infrastructures Critiques',
          'Audit & Conseil'
        ],
        modules_phares: [
          'Cryptographie Appliquée & Post-Quantique',
          'Sécurité des Réseaux & Systèmes',
          'Rétro-ingénierie & Analyse de Malware',
          'Gouvernance & Normes ISO 27001'
        ],
        volume_ects: 300
      },
      {
        id: 'epita-sp-2',
        ecole_id: 'epita-paris-fra',
        intitule_specialite: 'Majeure Data Science & Intelligence Artificielle (SCIA)',
        domaine: 'Intelligence Artificielle & Data',
        type_cursus: 'Mixte (Initiale & Alternance)',
        diplome_delivre: 'Titre d\'Ingénieur Diplômé de l\'EPITA',
        duree_annees: 3,
        competences_cles: 'Transformers, Computer Vision, MLOps, Architectures distribuées'
      ,
        debouches_metiers: [
          'Lead Data Scientist',
          'Ingénieur Machine Learning / MLOps',
          'Architecte IA Générative & LLM',
          'Chercheur en Vision par Ordinateur'
        ],
        salaire_moyen_specialite: 49.5,
        taux_insertion_specialite: 98.4,
        partenaires_entreprises: [
          'Mistral AI',
          'Hugging Face',
          'Meta FAIR',
          'Google DeepMind',
          'BNP Paribas',
          'TotalEnergies Digital Factory'
        ],
        doubles_diplomes: [
          'MSc Data Science (HEC Paris)',
          'Master MVA (ENS Paris-Saclay)',
          'Columbia University (USA)',
          'Imperial College London'
        ],
        secteurs_recrutement: [
          'Intelligence Artificielle & Big Data',
          'Finance Quantitative',
          'Santé Connectée',
          'Automobile Autonome'
        ],
        modules_phares: [
          'Deep Learning & Réseaux de Neurones',
          'Traitement Automatique du Langage (NLP)',
          'Apprentissage par Renforcement & MLOps',
          'Éthique & Sécurité des Algorithmes'
        ],
        volume_ects: 300
      }
    ],
    admissions: [
      {
        id: 'epita-adm-1',
        ecole_id: 'epita-paris-fra',
        source: 'Parcoursup',
        annee: 2024,
        nom_filiere_concours: 'Concours Advance (Bac Général)',
        capacite: 450,
        nb_voeux: 8200,
        taux_acces: 38.0,
        rang_dernier_appele: 2800,
        pct_mention_tb: 52.0,
        pct_boursiers: 16.0
      }
    ],
    classements: [
      {
        id: 'epita-cl-1',
        ecole_id: 'epita-paris-fra',
        source_media: "Le Figaro Étudiant",
        annee: 2025,
        domaine_specialite: 'Informatique & Logiciel',
        rang_par_specialite: 9,
        note_globale: 18.2
      }
    ],
    insertion: {
      id: 'epita-ins-1',
      ecole_id: 'epita-paris-fra',
      annee_promo: 2024,
      salaire_moyen_embauche: 46.5,
      salaire_avec_primes: 51.5,
      salaire_3_ans: 59.5,
      taux_emploi_6_mois: 99.1,
      pct_international: 26.0,
      pct_poursuite_etudes: 8.0,
      duree_moyenne_recherche_mois: 0.8
    }
  },

  {
    id: 'estp-paris-fra',
    nom_officiel: 'ESTP Paris - Grande École d\'Ingénieurs de la Construction',
    sigle: 'ESTP',
    pays: 'France',
    ville_principale: 'Cachan',
    statut_juridique: 'EESPIG',
    frais_scolarite_annuels: 9200,
    site_web: 'https://www.estp.fr',
    description: "École historique des grands projets d'infrastructures, l'ESTP forme la majorité des cadres dirigeants du BTP, de l'immobilier durable et des villes intelligentes en France.",
    habilitation_cti: true,
    label_eurace: true,
    annee_creation: 1891,
    campus: [
      {
        id: 'estp-c-1',
        ecole_id: 'estp-paris-fra',
        nom_campus: 'Campus de Cachan',
        ville: 'Cachan',
        code_postal: '94230',
        adresse: '28 Avenue du Président Wilson',
        latitude: 48.7942,
        longitude: 2.3278,
        est_siege_principal: true
      },
      {
        id: 'estp-c-2',
        ecole_id: 'estp-paris-fra',
        nom_campus: 'Campus de Troyes',
        ville: 'Troyes',
        code_postal: '10000',
        adresse: 'Technopole de l\'Aube',
        latitude: 48.2711,
        longitude: 4.0722,
        est_siege_principal: false
      }
    ],
    specialites: [
      {
        id: 'estp-sp-1',
        ecole_id: 'estp-paris-fra',
        intitule_specialite: 'Génie Civil & Bâtiment Bas-Carbone',
        domaine: 'Génie Civil & BTP',
        type_cursus: 'Mixte (Initiale & Alternance)',
        diplome_delivre: 'Titre d\'Ingénieur Diplômé de l\'ESTP Paris',
        duree_annees: 3,
        competences_cles: 'BIM Management, Éco-conception, Géotechnique, Gestion de chantiers complexes'
      ,
        debouches_metiers: [
          'Ingénieur Calcul de Structures',
          'Chef de Projet BIM & Éco-Conception',
          'Conducteur de Travaux Grands Ouvrages',
          'Ingénieur Géotechnique & Fondations'
        ],
        salaire_moyen_specialite: 45.5,
        taux_insertion_specialite: 98.4,
        partenaires_entreprises: [
          'Bouygues Construction',
          'Vinci',
          'Eiffage',
          'Setec',
          'Egis',
          'Arcadis'
        ],
        doubles_diplomes: [
          'Double Diplôme Architecte-Ingénieur',
          "Master Ouvrages d'Art (Ponts ParisTech)",
          'National University of Singapore'
        ],
        secteurs_recrutement: [
          "Grands Ouvrages d'Art & BTP",
          'Génie Urbain & Villes Durables',
          "Bureaux d'Études Structures",
          'Infrastructures Maritimes & Ferroviaires'
        ],
        modules_phares: [
          'Calcul aux Éléments Finis & Eurocodes',
          'BIM 4D/5D & Jumeaux Numériques',
          'Bétons Bas-Carbone & Géomatériaux',
          'Thermique du Bâtiment & RE2020'
        ],
        volume_ects: 300
      }
    ],
    admissions: [
      {
        id: 'estp-adm-1',
        ecole_id: 'estp-paris-fra',
        source: 'CPGE (SCEI / Concours Commun)',
        annee: 2024,
        nom_filiere_concours: 'Concours Centrale-Supélec & CCINP',
        capacite: 700,
        nb_voeux: 4900,
        taux_acces: 24.0,
        rang_dernier_appele: 1200,
        pct_mention_tb: 72.0,
        pct_boursiers: 18.0
      }
    ],
    classements: [
      {
        id: 'estp-cl-1',
        ecole_id: 'estp-paris-fra',
        source_media: "Le Figaro Étudiant",
        annee: 2025,
        domaine_specialite: 'Génie Civil & BTP',
        rang_par_specialite: 2,
        note_globale: 18.6
      }
    ],
    insertion: {
      id: 'estp-ins-1',
      ecole_id: 'estp-paris-fra',
      annee_promo: 2024,
      salaire_moyen_embauche: 45.0,
      salaire_avec_primes: 49.5,
      salaire_3_ans: 56.5,
      taux_emploi_6_mois: 98.4,
      pct_international: 22.0,
      pct_poursuite_etudes: 9.0,
      duree_moyenne_recherche_mois: 0.9
    }
  },

  {
    id: 'esilv-paris-fra',
    nom_officiel: 'ESILV - École Supérieure d\'Ingénieurs Léonard de Vinci',
    sigle: 'ESILV',
    pays: 'France',
    ville_principale: 'Courbevoie',
    statut_juridique: 'EESPIG',
    frais_scolarite_annuels: 10400,
    site_web: 'https://www.esilv.fr',
    description: "Implantée au cœur du quartier d'affaires de Paris La Défense, l'ESILV s'est hissée parmi les meilleures écoles post-bac grâce à ses filières finance de marché, IA et alternance.",
    habilitation_cti: true,
    label_eurace: true,
    annee_creation: 1995,
    campus: [
      {
        id: 'esilv-c-1',
        ecole_id: 'esilv-paris-fra',
        nom_campus: 'Campus de Paris La Défense',
        ville: 'Courbevoie',
        code_postal: '92400',
        adresse: '12 Avenue Léonard de Vinci',
        latitude: 48.8964,
        longitude: 2.2361,
        est_siege_principal: true
      },
      {
        id: 'esilv-c-2',
        ecole_id: 'esilv-paris-fra',
        nom_campus: 'Campus de Nantes',
        ville: 'Nantes',
        code_postal: '44000',
        adresse: 'Boulevard de la Prairie au Duc',
        latitude: 47.2062,
        longitude: -1.5542,
        est_siege_principal: false
      }
    ],
    specialites: [
      {
        id: 'esilv-sp-1',
        ecole_id: 'esilv-paris-fra',
        intitule_specialite: 'Ingénierie Financière & Fintech',
        domaine: 'Mathématiques Financières & Modélisation',
        type_cursus: 'Mixte (Initiale & Alternance)',
        diplome_delivre: 'Titre d\'Ingénieur Diplômé de l\'ESILV',
        duree_annees: 3,
        competences_cles: 'Trading algorithmique, Risque de crédit, Python quant, Blockchain'
      ,
        debouches_metiers: [
          'Quant Trader / Ingénieur Financier',
          'Risk Manager Stochastique',
          'Data Scientist Actuariat',
          'Chercheur en Modélisation Mathématique & HPC'
        ],
        salaire_moyen_specialite: 52.0,
        taux_insertion_specialite: 98.4,
        partenaires_entreprises: [
          'BNP Paribas CIB',
          'Société Générale',
          'Natixis',
          'Goldman Sachs',
          'AXA',
          'Millennium Management'
        ],
        doubles_diplomes: [
          'Master El Karoui (Sorbonne / X)',
          'Double Diplôme HEC / ESSEC',
          'Columbia University',
          'London School of Economics'
        ],
        secteurs_recrutement: [
          "Banque d'Investissement & Marchés",
          "Fonds d'Investissement & Hedge Funds",
          'Assurance & Réassurance',
          'Conseil Actuariel'
        ],
        modules_phares: [
          'Calcul Stochastique & Équations Différentielles',
          'Pricing des Produits Dérivés & Modèle Black-Scholes',
          "Machine Learning pour l'Analyse Quantitative",
          'Gestion des Risques de Marché & Régulation Bâle III'
        ],
        volume_ects: 300
      },
      {
        id: 'esilv-sp-2',
        ecole_id: 'esilv-paris-fra',
        intitule_specialite: 'Data & Artificial Intelligence',
        domaine: 'Intelligence Artificielle & Data',
        type_cursus: 'Alternance / Apprentissage',
        diplome_delivre: 'Titre d\'Ingénieur Diplômé de l\'ESILV',
        duree_annees: 3,
        competences_cles: 'Machine learning, Deep learning, Big Data pipelines'
      ,
        debouches_metiers: [
          'Lead Data Scientist',
          'Ingénieur Machine Learning / MLOps',
          'Architecte IA Générative & LLM',
          'Chercheur en Vision par Ordinateur'
        ],
        salaire_moyen_specialite: 49.5,
        taux_insertion_specialite: 98.4,
        partenaires_entreprises: [
          'Mistral AI',
          'Hugging Face',
          'Meta FAIR',
          'Google DeepMind',
          'BNP Paribas',
          'TotalEnergies Digital Factory'
        ],
        doubles_diplomes: [
          'MSc Data Science (HEC Paris)',
          'Master MVA (ENS Paris-Saclay)',
          'Columbia University (USA)',
          'Imperial College London'
        ],
        secteurs_recrutement: [
          'Intelligence Artificielle & Big Data',
          'Finance Quantitative',
          'Santé Connectée',
          'Automobile Autonome'
        ],
        modules_phares: [
          'Deep Learning & Réseaux de Neurones',
          'Traitement Automatique du Langage (NLP)',
          'Apprentissage par Renforcement & MLOps',
          'Éthique & Sécurité des Algorithmes'
        ],
        volume_ects: 300
      }
    ],
    admissions: [
      {
        id: 'esilv-adm-1',
        ecole_id: 'esilv-paris-fra',
        source: 'Parcoursup',
        annee: 2024,
        nom_filiere_concours: 'Concours Puissance Alpha (Post-bac)',
        capacite: 480,
        nb_voeux: 9800,
        taux_acces: 34.0,
        rang_dernier_appele: 2900,
        pct_mention_tb: 58.0,
        pct_boursiers: 17.0
      }
    ],
    classements: [
      {
        id: 'esilv-cl-1',
        ecole_id: 'esilv-paris-fra',
        source_media: "Le Figaro Étudiant",
        annee: 2025,
        rang_general: 12,
        note_globale: 17.7
      }
    ],
    insertion: {
      id: 'esilv-ins-1',
      ecole_id: 'esilv-paris-fra',
      annee_promo: 2024,
      salaire_moyen_embauche: 45.8,
      salaire_avec_primes: 51.0,
      salaire_3_ans: 58.0,
      taux_emploi_6_mois: 98.0,
      pct_international: 25.0,
      pct_poursuite_etudes: 9.0,
      duree_moyenne_recherche_mois: 1.0
    }
  },

  // =========================================================================
  // SUISSE : HAUTES ÉCOLES FÉDÉRALES & HES
  // =========================================================================
  {
    id: 'epfl-lausanne-che',
    nom_officiel: 'École Polytechnique Fédérale de Lausanne',
    sigle: 'EPFL',
    pays: 'Suisse',
    region: 'Canton de Vaud',
    ville_principale: 'Lausanne',
    statut_juridique: 'Public',
    frais_scolarite_annuels: 1560,
    site_web: 'https://www.epfl.ch',
    description: "L'une des universités technologiques les plus prestigieuses et cosmopolites du monde, l'EPFL attire les meilleurs chercheurs mondiaux dans un campus d'avant-garde au bord du lac Léman.",
    habilitation_cti: true,
    label_eurace: true,
    annee_creation: 1853,
    campus: [
      {
        id: 'epfl-campus-1',
        ecole_id: 'epfl-lausanne-che',
        nom_campus: 'Campus d\'Écublens',
        ville: 'Lausanne',
        code_postal: '1015',
        adresse: 'Route Cantonale',
        latitude: 46.5191,
        longitude: 6.5668,
        est_siege_principal: true
      },
      {
        id: 'epfl-campus-2',
        ecole_id: 'epfl-lausanne-che',
        nom_campus: 'Microcity Neuchâtel',
        ville: 'Neuchâtel',
        code_postal: '2000',
        adresse: 'Rue de la Maladière 71b',
        latitude: 46.9983,
        longitude: 6.9422,
        est_siege_principal: false
      }
    ],
    specialites: [
      {
        id: 'epfl-sp-1',
        ecole_id: 'epfl-lausanne-che',
        intitule_specialite: 'Master in Computer Science & Cyber Security',
        domaine: 'Informatique & Logiciel',
        type_cursus: 'Initiale',
        diplome_delivre: 'Master of Science EPFL (Équivalence Titre CTI)',
        duree_annees: 2,
        competences_cles: 'Calcul quantique, Cryptographie, Systèmes autonomes, Intelligence artificielle'
      ,
        debouches_metiers: [
          'Ingénieur Logiciel Fullstack',
          'Architecte Systèmes Distribués',
          'Lead Developer Cloud',
          'Ingénieur DevOps / SRE'
        ],
        salaire_moyen_specialite: 47.0,
        taux_insertion_specialite: 98.4,
        partenaires_entreprises: [
          'Google',
          'Amazon Web Services',
          'Microsoft',
          'Datadog',
          'Capgemini',
          'Criteo'
        ],
        doubles_diplomes: [
          'Master Recherche Informatique',
          'Double Diplôme HEC Paris',
          'Georgia Tech (USA)',
          'EPFL (Suisse)'
        ],
        secteurs_recrutement: [
          'Tech & Éditeurs Logiciels',
          'Conseil en Technologies',
          'Banque & FinTech',
          'Télécoms'
        ],
        modules_phares: [
          'Architecture Microservices & Cloud',
          'Algorithmique Avancée & HPC',
          "Compilateurs & Systèmes d'Exploitation",
          'Conception Logicielle Agile'
        ],
        volume_ects: 300
      },
      {
        id: 'epfl-sp-2',
        ecole_id: 'epfl-lausanne-che',
        intitule_specialite: 'Master in Microengineering & Robotics',
        domaine: 'Robotique & Mécatronique',
        type_cursus: 'Initiale',
        diplome_delivre: 'Master of Science EPFL',
        duree_annees: 2,
        competences_cles: 'Microrobotique, MEMS, Capteurs biomédicaux, Prothèses intelligentes'
      ,
        debouches_metiers: [
          'Ingénieur Concepteur Robotique',
          'Spécialiste Vision & SLAM',
          'Ingénieur Automatique & Systèmes Embarqués',
          'Architecte Cobotique & Usine 4.0'
        ],
        salaire_moyen_specialite: 46.8,
        taux_insertion_specialite: 98.4,
        partenaires_entreprises: [
          'Aldebaran',
          'Boston Dynamics Partner',
          'Kuka Robotics',
          'Schneider Electric',
          'Dassault Aviation',
          'Siemens'
        ],
        doubles_diplomes: [
          'Master Robotique Avancée',
          'Carnegie Mellon University',
          'TU München',
          'Tokyo Institute of Technology'
        ],
        secteurs_recrutement: [
          'Robotique Industrielle & Médicale',
          'Défense & Véhicules Autonomes',
          'Agro-robotique',
          'Électronique Grand Public'
        ],
        modules_phares: [
          'Cinématique & Dynamique des Manipulateurs',
          'Perception 3D, SLAM & Capteurs LiDAR',
          'Asservissement Numérique & Systèmes Temps Réel',
          'Cobotique & Interaction Homme-Robot'
        ],
        volume_ects: 300
      }
    ],
    admissions: [
      {
        id: 'epfl-adm-1',
        ecole_id: 'epfl-lausanne-che',
        source: 'Parcoursup',
        annee: 2024,
        nom_filiere_concours: 'Admission directe bacheliers français (Mention TB > 16/20)',
        capacite: 350,
        nb_voeux: 4100,
        taux_acces: 29.0,
        rang_dernier_appele: 1200,
        pct_mention_tb: 100.0,
        pct_boursiers: 12.0
      }
    ],
    classements: [
      {
        id: 'epfl-cl-1',
        ecole_id: 'epfl-lausanne-che',
        source_media: "QS World University Rankings",
        annee: 2025,
        rang_general: 26,
        note_globale: 94.0
      },
      {
        id: 'epfl-cl-2',
        ecole_id: 'epfl-lausanne-che',
        source_media: "Le Figaro Étudiant",
        annee: 2025,
        domaine_specialite: 'Informatique & Logiciel',
        rang_par_specialite: 1,
        note_globale: 20.0
      }
    ],
    insertion: {
      id: 'epfl-ins-1',
      ecole_id: 'epfl-lausanne-che',
      annee_promo: 2024,
      salaire_moyen_embauche: 95.0,
      salaire_avec_primes: 108.0,
      salaire_3_ans: 125.0,
      taux_emploi_6_mois: 97.5,
      pct_international: 58.0,
      pct_poursuite_etudes: 25.0,
      duree_moyenne_recherche_mois: 1.3
    }
  },

  {
    id: 'hes-so-vd-che',
    nom_officiel: 'HES-SO - Haute École d\'Ingénierie et de Gestion du Canton de Vaud (HEIG-VD)',
    sigle: 'HEIG-VD',
    pays: 'Suisse',
    ville_principale: 'Yverdon-les-Bains',
    statut_juridique: 'Public',
    frais_scolarite_annuels: 1200,
    site_web: 'https://heig-vd.ch',
    description: "Plus grand pôle d'ingénierie appliquée de Suisse romande au sein du réseau HES-SO, formant des ingénieurs Bachelor et Master en étroite synergie avec le tissu industriel helvétique.",
    habilitation_cti: true,
    label_eurace: true,
    annee_creation: 1975,
    campus: [
      {
        id: 'heig-c-1',
        ecole_id: 'hes-so-vd-che',
        nom_campus: 'Campus de Cheseaux',
        ville: 'Yverdon-les-Bains',
        code_postal: '1401',
        adresse: 'Route de Cheseaux 1',
        latitude: 46.7788,
        longitude: 6.6412,
        est_siege_principal: true
      }
    ],
    specialites: [
      {
        id: 'heig-sp-1',
        ecole_id: 'hes-so-vd-che',
        intitule_specialite: 'Bachelor of Science HES-SO en Informatique & Télécommunications',
        domaine: 'Informatique & Logiciel',
        type_cursus: 'Mixte (Initiale & Alternance)',
        diplome_delivre: 'Bachelor & Master HES-SO en Ingénierie',
        duree_annees: 3,
        competences_cles: 'Ingénierie logicielle, IoT industriel, Réseaux d\'entreprise, Cloud suisse',
              debouches_metiers: [
          'Ingénieur Expert Spécialisé',
          'Chef de Projet R&D & Systèmes Complexes',
          'Lead Consultant Stratégie & Technologie',
          'Directeur de Programme Innovation'
        ],
        salaire_moyen_specialite: 48.5,
        taux_insertion_specialite: 98.6,
        partenaires_entreprises: [
          'TotalEnergies', 'Airbus', 'Thales', 'Saint-Gobain', 'Capgemini', 'Dassault Systèmes'
        ],
        doubles_diplomes: [
          'Master of Science International', 'Double Diplôme Management HEC / ESSEC', 'Imperial College London'
        ],
        secteurs_recrutement: [
          "Industrie & Systèmes Complexes', 'Conseil & Stratégie', 'High-Tech & R&D"
        ],
        modules_phares: [
          'Modélisation Numérique Avancée', 'Management de Grands Programmes', 'Transition Bas-Carbone & Éco-Conception'
        ],
        volume_ects: 300
      }
    ],
    admissions: [
      {
        id: 'heig-adm-1',
        ecole_id: 'hes-so-vd-che',
        source: 'Examen Universitaire / Équivalence',
        annee: 2024,
        nom_filiere_concours: 'Maturité professionnelle technique / Titre équivalent',
        capacite: 450,
        nb_voeux: 1200,
        taux_acces: 42.0,
        rang_dernier_appele: 520,
        pct_mention_tb: 45.0,
        pct_boursiers: 15.0
      }
    ],
    classements: [
      {
        id: 'heig-cl-1',
        ecole_id: 'hes-so-vd-che',
        source_media: "L'Étudiant",
        annee: 2025,
        rang_general: 18,
        note_globale: 86.5
      }
    ],
    insertion: {
      id: 'heig-ins-1',
      ecole_id: 'hes-so-vd-che',
      annee_promo: 2024,
      salaire_moyen_embauche: 88.0,
      salaire_avec_primes: 96.0,
      salaire_3_ans: 112.0,
      taux_emploi_6_mois: 98.2,
      pct_international: 22.0,
      pct_poursuite_etudes: 12.0,
      duree_moyenne_recherche_mois: 1.0
    }
  },

  // =========================================================================
  // BELGIQUE : ÉCOLES POLYTECHNIQUES UNIVERSITAIRES (FÉDÉRATION WALLONIE-BRUXELLES)
  // =========================================================================
  {
    id: 'epl-louvain-bel',
    nom_officiel: 'École Polytechnique de Louvain - UCLouvain',
    sigle: 'EPL',
    pays: 'Belgique',
    region: 'Wallonie',
    ville_principale: 'Louvain-la-Neuve',
    statut_juridique: 'Public',
    frais_scolarite_annuels: 835,
    site_web: 'https://uclouvain.be/fr/facultes/epl',
    description: "Faculté d'ingénierie de l'Université Catholique de Louvain, première université francophone de Belgique, réputée pour ses masters d'ingénieur civil en cryptographie et nanotechnologies.",
    habilitation_cti: true,
    label_eurace: true,
    annee_creation: 1865,
    campus: [
      {
        id: 'epl-c-1',
        ecole_id: 'epl-louvain-bel',
        nom_campus: 'Campus de Louvain-la-Neuve',
        ville: 'Louvain-la-Neuve',
        code_postal: '1348',
        adresse: 'Rue Archimède 1',
        latitude: 50.6698,
        longitude: 4.6182,
        est_siege_principal: true
      }
    ],
    specialites: [
      {
        id: 'epl-sp-1',
        ecole_id: 'epl-louvain-bel',
        intitule_specialite: 'Master Ingénieur Civil en Informatique',
        domaine: 'Informatique & Logiciel',
        type_cursus: 'Initiale',
        diplome_delivre: 'Grade d\'Ingénieur Civil Informaticien (Bac+5 / CTI)',
        duree_annees: 2,
        competences_cles: 'Algorithmes distribues, Sémantique des langages, Cryptographie, IA'
      ,
        debouches_metiers: [
          'Ingénieur Logiciel Fullstack',
          'Architecte Systèmes Distribués',
          'Lead Developer Cloud',
          'Ingénieur DevOps / SRE'
        ],
        salaire_moyen_specialite: 47.0,
        taux_insertion_specialite: 98.4,
        partenaires_entreprises: [
          'Google',
          'Amazon Web Services',
          'Microsoft',
          'Datadog',
          'Capgemini',
          'Criteo'
        ],
        doubles_diplomes: [
          'Master Recherche Informatique',
          'Double Diplôme HEC Paris',
          'Georgia Tech (USA)',
          'EPFL (Suisse)'
        ],
        secteurs_recrutement: [
          'Tech & Éditeurs Logiciels',
          'Conseil en Technologies',
          'Banque & FinTech',
          'Télécoms'
        ],
        modules_phares: [
          'Architecture Microservices & Cloud',
          'Algorithmique Avancée & HPC',
          "Compilateurs & Systèmes d'Exploitation",
          'Conception Logicielle Agile'
        ],
        volume_ects: 300
      },
      {
        id: 'epl-sp-2',
        ecole_id: 'epl-louvain-bel',
        intitule_specialite: 'Master Ingénieur Civil Électricien (Nanotech & Énergie)',
        domaine: 'Énergie & Environnement',
        type_cursus: 'Initiale',
        diplome_delivre: 'Grade d\'Ingénieur Civil Électricien',
        duree_annees: 2,
        competences_cles: 'Smart grids, Semi-conducteurs, Électronique de puissance'
      ,
        debouches_metiers: [
          'Ingénieur Énergies Renouvelables (Éolien/Solaire)',
          'Ingénieur Sûreté & Procédés Nucléaires',
          'Chef de Projet Bilan Carbone & RSE',
          'Architecte Smart Grids'
        ],
        salaire_moyen_specialite: 46.5,
        taux_insertion_specialite: 98.4,
        partenaires_entreprises: [
          'EDF',
          'TotalEnergies',
          'Engie',
          'Orano',
          'Schneider Electric',
          'RTE'
        ],
        doubles_diplomes: [
          'Master Énergie Nucléaire',
          'KTH Environnement',
          'Double Diplôme IFP School',
          'Imperial College London'
        ],
        secteurs_recrutement: [
          "Production d'Énergie & Nucléaire",
          'Réseaux Électriques Intelligents',
          'Transition Écologique & Décarbonation',
          'Audit Environnemental'
        ],
        modules_phares: [
          'Thermodynamique des Systèmes Énergétiques',
          'Génie Nucléaire & Neutronique',
          "Réseaux Smart Grids & Stockage d'Énergie",
          'Analyse de Cycle de Vie (ACV)'
        ],
        volume_ects: 300
      }
    ],
    admissions: [
      {
        id: 'epl-adm-1',
        ecole_id: 'epl-louvain-bel',
        source: 'Examen Universitaire / Équivalence',
        annee: 2024,
        nom_filiere_concours: 'Examen spécial d\'admission aux études d\'ingénieur civil',
        capacite: 380,
        nb_voeux: 950,
        taux_acces: 48.0,
        rang_dernier_appele: 450,
        pct_mention_tb: 62.0,
        pct_boursiers: 18.0
      }
    ],
    classements: [
      {
        id: 'epl-cl-1',
        ecole_id: 'epl-louvain-bel',
        source_media: "QS World University Rankings",
        annee: 2025,
        rang_general: 180,
        note_globale: 82.4
      }
    ],
    insertion: {
      id: 'epl-ins-1',
      ecole_id: 'epl-louvain-bel',
      annee_promo: 2024,
      salaire_moyen_embauche: 48.0,
      salaire_avec_primes: 54.0,
      salaire_3_ans: 62.5,
      taux_emploi_6_mois: 97.2,
      pct_international: 31.0,
      pct_poursuite_etudes: 16.0,
      duree_moyenne_recherche_mois: 1.3
    }
  },

  {
    id: 'polytech-bruxelles-bel',
    nom_officiel: 'École Polytechnique de Bruxelles - ULB',
    sigle: 'Polytech Bruxelles',
    pays: 'Belgique',
    region: 'Région de Bruxelles-Capitale',
    ville_principale: 'Bruxelles',
    statut_juridique: 'Public',
    frais_scolarite_annuels: 835,
    site_web: 'https://polytech.ulb.be',
    description: "Faculté des sciences appliquées de l'Université Libre de Bruxelles, ancrée au cœur de la capitale européenne avec des partenariats industriels majeurs en biomédical et robotique.",
    habilitation_cti: true,
    label_eurace: true,
    annee_creation: 1873,
    campus: [
      {
        id: 'ulb-c-1',
        ecole_id: 'polytech-bruxelles-bel',
        nom_campus: 'Campus du Solbosch',
        ville: 'Bruxelles',
        code_postal: '1050',
        adresse: 'Avenue Franklin Roosevelt 50',
        latitude: 50.8131,
        longitude: 4.3822,
        est_siege_principal: true
      }
    ],
    specialites: [
      {
        id: 'ulb-sp-1',
        ecole_id: 'polytech-bruxelles-bel',
        intitule_specialite: 'Master Ingénieur Civil Biomédical',
        domaine: 'Biotechnologies & Santé',
        type_cursus: 'Initiale',
        diplome_delivre: 'Grade d\'Ingénieur Civil Biomédical',
        duree_annees: 2,
        competences_cles: 'Bio-MEMS, Traitement du signal physiologique, Imagerie médicale'
      ,
        debouches_metiers: [
          'Ingénieur Dispositifs Médicaux',
          'Bio-informaticien & Analyse Génomique',
          'Ingénieur R&D Biomécanique & Prothèses',
          'Responsable Qualité & Affaires Réglementaires Pharma'
        ],
        salaire_moyen_specialite: 46.2,
        taux_insertion_specialite: 98.4,
        partenaires_entreprises: [
          'Sanofi',
          'BioMérieux',
          'GE Healthcare',
          'Medtronic',
          'Institut Pasteur',
          'Servier'
        ],
        doubles_diplomes: [
          'Master Bio-informatique',
          'Double Diplôme Médecine-Ingénieur',
          'Johns Hopkins University',
          'Université Paris Cité'
        ],
        secteurs_recrutement: [
          'Industrie Pharmaceutique & Vaccins',
          'Technologies Médicales (MedTech)',
          'Biotechnologies Blanches & Rouges',
          'Recherche Biomédicale'
        ],
        modules_phares: [
          'Génie Génétique & Biologie Moléculaire',
          'Imagerie Médicale & Traitement du Signal ECG/EEG',
          'Biomechanics & Matériaux Biocompatibles',
          'Réglementation FDA / Marquage CE Médical'
        ],
        volume_ects: 300
      }
    ],
    admissions: [
      {
        id: 'ulb-adm-1',
        ecole_id: 'polytech-bruxelles-bel',
        source: 'Examen Universitaire / Équivalence',
        annee: 2024,
        nom_filiere_concours: 'Examen d\'admission Ingénieur Civil FWB',
        capacite: 290,
        nb_voeux: 720,
        taux_acces: 45.0,
        rang_dernier_appele: 320,
        pct_mention_tb: 55.0,
        pct_boursiers: 20.0
      }
    ],
    classements: [
      {
        id: 'ulb-cl-1',
        ecole_id: 'polytech-bruxelles-bel',
        source_media: "QS World University Rankings",
        annee: 2025,
        rang_general: 210,
        note_globale: 79.5
      }
    ],
    insertion: {
      id: 'ulb-ins-1',
      ecole_id: 'polytech-bruxelles-bel',
      annee_promo: 2024,
      salaire_moyen_embauche: 47.0,
      salaire_avec_primes: 53.0,
      salaire_3_ans: 61.0,
      taux_emploi_6_mois: 96.8,
      pct_international: 34.0,
      pct_poursuite_etudes: 15.0,
      duree_moyenne_recherche_mois: 1.4
    }
  },

  // =========================================================================
  // CANADA / QUÉBEC : FACULTÉS DE GÉNIE RECONNUES BCAPG / ACCRÉDITATION CTI
  // =========================================================================
  {
    id: 'polymtl-montreal-can',
    nom_officiel: 'Polytechnique Montréal',
    sigle: 'PolyMTL',
    pays: 'Canada',
    region: 'Québec',
    ville_principale: 'Montréal',
    statut_juridique: 'Public',
    frais_scolarite_annuels: 4500,
    site_web: 'https://www.polymtl.ca',
    description: "Plus grand centre universitaire de formation et recherche en génie au Québec, affilié à l'Université de Montréal, mondialement réputé pour son institut d'IA Mila et ses chaires aérospatiales.",
    habilitation_cti: true,
    label_eurace: true,
    annee_creation: 1873,
    campus: [
      {
        id: 'pmtl-campus-1',
        ecole_id: 'polymtl-montreal-can',
        nom_campus: 'Campus de la Montagne (Mont-Royal)',
        ville: 'Montréal',
        code_postal: 'H3T 1J4',
        adresse: '2500 Chemin de Polytechnique',
        latitude: 45.5048,
        longitude: -73.6133,
        est_siege_principal: true
      }
    ],
    specialites: [
      {
        id: 'pmtl-sp-1',
        ecole_id: 'polymtl-montreal-can',
        intitule_specialite: 'Baccalauréat en Génie Informatique & Logiciel',
        domaine: 'Informatique & Logiciel',
        type_cursus: 'Mixte (Initiale & Alternance)',
        diplome_delivre: 'B.Ing / Diplôme d\'Ingénieur (Équivalence CTI & BCAPG)',
        duree_annees: 4,
        competences_cles: 'Conception logicielle avancée, Systèmes embarqués, IA générative, Cloud'
      ,
        debouches_metiers: [
          'Ingénieur Logiciel Fullstack',
          'Architecte Systèmes Distribués',
          'Lead Developer Cloud',
          'Ingénieur DevOps / SRE'
        ],
        salaire_moyen_specialite: 47.0,
        taux_insertion_specialite: 98.4,
        partenaires_entreprises: [
          'Google',
          'Amazon Web Services',
          'Microsoft',
          'Datadog',
          'Capgemini',
          'Criteo'
        ],
        doubles_diplomes: [
          'Master Recherche Informatique',
          'Double Diplôme HEC Paris',
          'Georgia Tech (USA)',
          'EPFL (Suisse)'
        ],
        secteurs_recrutement: [
          'Tech & Éditeurs Logiciels',
          'Conseil en Technologies',
          'Banque & FinTech',
          'Télécoms'
        ],
        modules_phares: [
          'Architecture Microservices & Cloud',
          'Algorithmique Avancée & HPC',
          "Compilateurs & Systèmes d'Exploitation",
          'Conception Logicielle Agile'
        ],
        volume_ects: 300
      },
      {
        id: 'pmtl-sp-2',
        ecole_id: 'polymtl-montreal-can',
        intitule_specialite: 'Baccalauréat en Génie Aérospatial',
        domaine: 'Aéronautique & Spatial',
        type_cursus: 'Mixte (Initiale & Alternance)',
        diplome_delivre: 'Baccalauréat en Ingénierie (B.Ing)',
        duree_annees: 4,
        competences_cles: 'Structures composites, Thermodynamique aéronautique, Systèmes de contrôle de vol'
      ,
        debouches_metiers: [
          'Ingénieur Aérodynamicien',
          'Concepteur Systèmes Avioniques',
          'Ingénieur Propulsion & Moteurs',
          'Architecte Satellites & Lanceurs'
        ],
        salaire_moyen_specialite: 47.5,
        taux_insertion_specialite: 98.4,
        partenaires_entreprises: [
          'Airbus',
          'Dassault Aviation',
          'Safran',
          'ArianeGroup',
          'Thales Alenia Space',
          'CNES / ESA'
        ],
        doubles_diplomes: [
          'Master Spatial (ISAE / Supaero)',
          'Cranfield University (UK)',
          'TU Delft (Pays-Bas)',
          'Polytechnique Montréal'
        ],
        secteurs_recrutement: [
          'Constructeurs Aéronautiques',
          'Industrie Spatiale & Drones',
          'Défense & Systèmes Embarqués',
          'Maintenance Aéronautique'
        ],
        modules_phares: [
          'Mécanique des Fluides & CFD Compressible',
          'Dynamique du Vol & Pilotage Automatique',
          'Systèmes Propulsifs Hybrides & Hydrogène',
          'Structures & Matériaux Composites'
        ],
        volume_ects: 300
      }
    ],
    admissions: [
      {
        id: 'pmtl-adm-1',
        ecole_id: 'polymtl-montreal-can',
        source: 'Parcoursup',
        annee: 2024,
        nom_filiere_concours: 'Admission directe bacheliers français (Moyenne > 13.5/20)',
        capacite: 350,
        nb_voeux: 2900,
        taux_acces: 35.0,
        rang_dernier_appele: 850,
        pct_mention_tb: 65.0,
        pct_boursiers: 14.0
      }
    ],
    classements: [
      {
        id: 'pmtl-cl-1',
        ecole_id: 'polymtl-montreal-can',
        source_media: "Le Figaro Étudiant",
        annee: 2025,
        domaine_specialite: 'Informatique & Logiciel',
        rang_par_specialite: 2,
        note_globale: 19.3
      },
      {
        id: 'pmtl-cl-2',
        ecole_id: 'polymtl-montreal-can',
        source_media: "QS World University Rankings",
        annee: 2025,
        rang_general: 165,
        note_globale: 84.5
      }
    ],
    insertion: {
      id: 'pmtl-ins-1',
      ecole_id: 'polymtl-montreal-can',
      annee_promo: 2024,
      salaire_moyen_embauche: 58.0,
      salaire_avec_primes: 66.0,
      salaire_3_ans: 76.0,
      taux_emploi_6_mois: 98.2,
      pct_international: 33.0,
      pct_poursuite_etudes: 12.0,
      duree_moyenne_recherche_mois: 1.1
    }
  },

  {
    id: 'ets-montreal-can',
    nom_officiel: 'École de Technologie Supérieure - Université du Québec',
    sigle: 'ÉTS Montréal',
    pays: 'Canada',
    region: 'Québec',
    ville_principale: 'Montréal',
    statut_juridique: 'Public',
    frais_scolarite_annuels: 4300,
    site_web: 'https://www.etsmtl.ca',
    description: "Deuxième plus grande faculté de génie au Canada, l'ÉTS est axée sur le génie appliqué et l'alternance coopérative obligatoire (3 stages rémunérés en entreprise).",
    habilitation_cti: true,
    label_eurace: true,
    annee_creation: 1974,
    campus: [
      {
        id: 'ets-c-1',
        ecole_id: 'ets-montreal-can',
        nom_campus: 'Campus Griffintown',
        ville: 'Montréal',
        code_postal: 'H3C 1K3',
        adresse: '1100 Rue Notre-Dame Ouest',
        latitude: 45.4952,
        longitude: -73.5626,
        est_siege_principal: true
      }
    ],
    specialites: [
      {
        id: 'ets-sp-1',
        ecole_id: 'ets-montreal-can',
        intitule_specialite: 'Baccalauréat en Génie Logiciel (Coop)',
        domaine: 'Informatique & Logiciel',
        type_cursus: 'Alternance / Apprentissage',
        diplome_delivre: 'B.Ing en Génie Logiciel (BCAPG & CTI)',
        duree_annees: 4,
        competences_cles: 'Développement Full-Stack, DevOps, Microservices, Sécurité logicielle'
      ,
        debouches_metiers: [
          'Ingénieur Logiciel Fullstack',
          'Architecte Systèmes Distribués',
          'Lead Developer Cloud',
          'Ingénieur DevOps / SRE'
        ],
        salaire_moyen_specialite: 47.0,
        taux_insertion_specialite: 98.4,
        partenaires_entreprises: [
          'Google',
          'Amazon Web Services',
          'Microsoft',
          'Datadog',
          'Capgemini',
          'Criteo'
        ],
        doubles_diplomes: [
          'Master Recherche Informatique',
          'Double Diplôme HEC Paris',
          'Georgia Tech (USA)',
          'EPFL (Suisse)'
        ],
        secteurs_recrutement: [
          'Tech & Éditeurs Logiciels',
          'Conseil en Technologies',
          'Banque & FinTech',
          'Télécoms'
        ],
        modules_phares: [
          'Architecture Microservices & Cloud',
          'Algorithmique Avancée & HPC',
          "Compilateurs & Systèmes d'Exploitation",
          'Conception Logicielle Agile'
        ],
        volume_ects: 300
      },
      {
        id: 'ets-sp-2',
        ecole_id: 'ets-montreal-can',
        intitule_specialite: 'Baccalauréat en Génie de la Production Automatisée',
        domaine: 'Robotique & Mécatronique',
        type_cursus: 'Alternance / Apprentissage',
        diplome_delivre: 'B.Ing en Génie Automatisé',
        duree_annees: 4,
        competences_cles: 'Automates programmables, Cobotique, Usine connectée, Vision artificielle'
      ,
        debouches_metiers: [
          'Ingénieur Concepteur Robotique',
          'Spécialiste Vision & SLAM',
          'Ingénieur Automatique & Systèmes Embarqués',
          'Architecte Cobotique & Usine 4.0'
        ],
        salaire_moyen_specialite: 46.8,
        taux_insertion_specialite: 98.4,
        partenaires_entreprises: [
          'Aldebaran',
          'Boston Dynamics Partner',
          'Kuka Robotics',
          'Schneider Electric',
          'Dassault Aviation',
          'Siemens'
        ],
        doubles_diplomes: [
          'Master Robotique Avancée',
          'Carnegie Mellon University',
          'TU München',
          'Tokyo Institute of Technology'
        ],
        secteurs_recrutement: [
          'Robotique Industrielle & Médicale',
          'Défense & Véhicules Autonomes',
          'Agro-robotique',
          'Électronique Grand Public'
        ],
        modules_phares: [
          'Cinématique & Dynamique des Manipulateurs',
          'Perception 3D, SLAM & Capteurs LiDAR',
          'Asservissement Numérique & Systèmes Temps Réel',
          'Cobotique & Interaction Homme-Robot'
        ],
        volume_ects: 300
      }
    ],
    admissions: [
      {
        id: 'ets-adm-1',
        ecole_id: 'ets-montreal-can',
        source: 'Admissions Parallèles (Titre)',
        annee: 2024,
        nom_filiere_concours: 'Admission directe titulaires de BUT / BTS / DUT français',
        capacite: 450,
        nb_voeux: 2200,
        taux_acces: 42.0,
        rang_dernier_appele: 850,
        pct_mention_tb: 45.0,
        pct_boursiers: 16.0
      }
    ],
    classements: [
      {
        id: 'ets-cl-1',
        ecole_id: 'ets-montreal-can',
        source_media: "L'Usine Nouvelle",
        annee: 2025,
        rang_general: 12,
        note_globale: 89.0
      }
    ],
    insertion: {
      id: 'ets-ins-1',
      ecole_id: 'ets-montreal-can',
      annee_promo: 2024,
      salaire_moyen_embauche: 56.5,
      salaire_avec_primes: 63.0,
      salaire_3_ans: 73.0,
      taux_emploi_6_mois: 98.9,
      pct_international: 28.0,
      pct_poursuite_etudes: 8.0,
      duree_moyenne_recherche_mois: 0.8
    }
  },

  {
    id: 'ulaval-genie-can',
    nom_officiel: 'Université Laval - Faculté des Sciences et de Génie',
    sigle: 'ULaval Génie',
    pays: 'Canada',
    region: 'Québec',
    ville_principale: 'Québec',
    statut_juridique: 'Public',
    frais_scolarite_annuels: 4400,
    site_web: 'https://www.fsg.ulaval.ca',
    description: "Première université francophone d'Amérique du Nord, l'Université Laval à Québec propose des programmes d'ingénierie d'excellence en optique-photonique, mines et génie civil boréal.",
    habilitation_cti: true,
    label_eurace: true,
    annee_creation: 1852,
    campus: [
      {
        id: 'ulaval-c-1',
        ecole_id: 'ulaval-genie-can',
        nom_campus: 'Campus de Sainte-Foy',
        ville: 'Québec',
        code_postal: 'G1V 0A6',
        adresse: 'Pavillon Alexandre-Vachon',
        latitude: 46.7801,
        longitude: -71.2764,
        est_siege_principal: true
      }
    ],
    specialites: [
      {
        id: 'ulaval-sp-1',
        ecole_id: 'ulaval-genie-can',
        intitule_specialite: 'Baccalauréat en Génie Physique & Optique-Photonique',
        domaine: 'Électronique & Systèmes Embarqués',
        type_cursus: 'Mixte (Initiale & Alternance)',
        diplome_delivre: 'B.Ing en Génie Physique',
        duree_annees: 4,
        competences_cles: 'Lasers ultra-rapides, Fibres optiques, Capteurs quantiques'
      ,
        debouches_metiers: [
          'Ingénieur Conception ASIC / FPGA',
          'Architecte Systèmes Temps Réel',
          'Ingénieur Radiofréquence & IoT',
          'Spécialiste Compatibilité Électromagnétique'
        ],
        salaire_moyen_specialite: 47.0,
        taux_insertion_specialite: 98.4,
        partenaires_entreprises: [
          'STMicroelectronics',
          'Thales',
          'NXP Semiconductors',
          'Safran Electronics',
          'SNCF',
          'CEA-Leti'
        ],
        doubles_diplomes: [
          'Master Micro & Nano-électronique',
          'Georgia Tech',
          'EPFL',
          'Politecnico di Milano'
        ],
        secteurs_recrutement: [
          'Semi-conducteurs & Nanoélectronique',
          'Aéronautique & Spatial',
          'Automobile & Objets Connectés (IoT)',
          'Télécoms 5G/6G'
        ],
        modules_phares: [
          'Conception VHDL / Verilog & Synthèse FPGA',
          'Architectures Microcontrôleurs & Firmware C/C++',
          'Électronique Hyperfréquences & Antennes',
          "Systèmes d'Exploitation Temps Réel (FreeRTOS/Linux Embarqué)"
        ],
        volume_ects: 300
      }
    ],
    admissions: [
      {
        id: 'ulaval-adm-1',
        ecole_id: 'ulaval-genie-can',
        source: 'Examen Universitaire / Équivalence',
        annee: 2024,
        nom_filiere_concours: 'Admission directe Baccalauréat général français',
        capacite: 320,
        nb_voeux: 1400,
        taux_acces: 48.0,
        rang_dernier_appele: 620,
        pct_mention_tb: 52.0,
        pct_boursiers: 15.0
      }
    ],
    classements: [
      {
        id: 'ulaval-cl-1',
        ecole_id: 'ulaval-genie-can',
        source_media: "QS World University Rankings",
        annee: 2025,
        rang_general: 280,
        note_globale: 74.0
      }
    ],
    insertion: {
      id: 'ulaval-ins-1',
      ecole_id: 'ulaval-genie-can',
      annee_promo: 2024,
      salaire_moyen_embauche: 54.0,
      salaire_avec_primes: 60.5,
      salaire_3_ans: 70.0,
      taux_emploi_6_mois: 97.4,
      pct_international: 25.0,
      pct_poursuite_etudes: 14.0,
      duree_moyenne_recherche_mois: 1.2
    }
  },

  {
    id: 'usherbrooke-genie-can',
    nom_officiel: 'Université de Sherbrooke - Faculté de Génie',
    sigle: 'UdeS Génie',
    pays: 'Canada',
    region: 'Québec',
    ville_principale: 'Sherbrooke',
    statut_juridique: 'Public',
    frais_scolarite_annuels: 4400,
    site_web: 'https://www.usherbrooke.ca/genie',
    description: "Leader incontesté de l'apprentissage coopératif en Amérique du Nord, l'Université de Sherbrooke alterne systématiquement sessions d'études et stages professionnels rémunérés.",
    habilitation_cti: true,
    label_eurace: true,
    annee_creation: 1954,
    campus: [
      {
        id: 'udes-c-1',
        ecole_id: 'usherbrooke-genie-can',
        nom_campus: 'Campus Principal de Sherbrooke',
        ville: 'Sherbrooke',
        code_postal: 'J1K 2R1',
        adresse: '2500 Boulevard de l\'Université',
        latitude: 45.3788,
        longitude: -71.9284,
        est_siege_principal: true
      }
    ],
    specialites: [
      {
        id: 'udes-sp-1',
        ecole_id: 'usherbrooke-genie-can',
        intitule_specialite: 'Baccalauréat en Génie Robotique (Régime Coop)',
        domaine: 'Robotique & Mécatronique',
        type_cursus: 'Alternance / Apprentissage',
        diplome_delivre: 'B.Ing en Génie Robotique',
        duree_annees: 4,
        competences_cles: 'Robotique mobile, Téléopération, Contrôle temps réel, IA embarquée'
      ,
        debouches_metiers: [
          'Ingénieur Concepteur Robotique',
          'Spécialiste Vision & SLAM',
          'Ingénieur Automatique & Systèmes Embarqués',
          'Architecte Cobotique & Usine 4.0'
        ],
        salaire_moyen_specialite: 46.8,
        taux_insertion_specialite: 98.4,
        partenaires_entreprises: [
          'Aldebaran',
          'Boston Dynamics Partner',
          'Kuka Robotics',
          'Schneider Electric',
          'Dassault Aviation',
          'Siemens'
        ],
        doubles_diplomes: [
          'Master Robotique Avancée',
          'Carnegie Mellon University',
          'TU München',
          'Tokyo Institute of Technology'
        ],
        secteurs_recrutement: [
          'Robotique Industrielle & Médicale',
          'Défense & Véhicules Autonomes',
          'Agro-robotique',
          'Électronique Grand Public'
        ],
        modules_phares: [
          'Cinématique & Dynamique des Manipulateurs',
          'Perception 3D, SLAM & Capteurs LiDAR',
          'Asservissement Numérique & Systèmes Temps Réel',
          'Cobotique & Interaction Homme-Robot'
        ],
        volume_ects: 300
      }
    ],
    admissions: [
      {
        id: 'udes-adm-1',
        ecole_id: 'usherbrooke-genie-can',
        source: 'Examen Universitaire / Équivalence',
        annee: 2024,
        nom_filiere_concours: 'Régime coopératif international',
        capacite: 280,
        nb_voeux: 1300,
        taux_acces: 44.0,
        rang_dernier_appele: 550,
        pct_mention_tb: 48.0,
        pct_boursiers: 16.0
      }
    ],
    classements: [
      {
        id: 'udes-cl-1',
        ecole_id: 'usherbrooke-genie-can',
        source_media: "QS World University Rankings",
        annee: 2025,
        rang_general: 350,
        note_globale: 70.0
      }
    ],
    insertion: {
      id: 'udes-ins-1',
      ecole_id: 'usherbrooke-genie-can',
      annee_promo: 2024,
      salaire_moyen_embauche: 55.0,
      salaire_avec_primes: 61.5,
      salaire_3_ans: 71.0,
      taux_emploi_6_mois: 98.5,
      pct_international: 26.0,
      pct_poursuite_etudes: 10.0,
      duree_moyenne_recherche_mois: 0.9
    }
  },

  // =========================================================================
  // ÉCOLES ADDITIONNELLES D'EXCELLENCE
  // =========================================================================
  {
    id: 'mines-nancy-fra',
    type_recrutement: 'post_prepa',
    nom_officiel: 'École Nationale Supérieure des Mines de Nancy',
    sigle: 'Mines Nancy',
    pays: 'France',
    region: 'Grand Est',
    parcoursup_url: 'https://dossier.parcoursup.fr/Candidat/carte?action=recherche&origine=carte&g_ta_cod=18001',
    parcoursup_code: '18001',
    ville_principale: 'Nancy',
    statut_juridique: 'Public',
    frais_scolarite_annuels: 2500,
    site_web: 'https://mines-nancy.univ-lorraine.fr',
    description: "Grande école d'ingénieurs généraliste du groupe Mines-Télécom, pionnière en science des matériaux, intelligence artificielle et génie civil durable au sein d'Artem.",
    habilitation_cti: true,
    label_eurace: true,
    annee_creation: 1919,
    campus: [
      {
        id: 'mn-c-1',
        ecole_id: 'mines-nancy-fra',
        nom_campus: 'Campus Artem',
        ville: 'Nancy',
        code_postal: '54000',
        adresse: '92 Rue du Sergent Blandan',
        latitude: 48.6752,
        longitude: 6.1718,
        est_siege_principal: true
      }
    ],
    specialites: [
      {
        id: 'mn-sp-1',
        ecole_id: 'mines-nancy-fra',
        intitule_specialite: 'Ingénieur Civil des Mines (Généraliste)',
        domaine: 'Matériaux & Chimie',
        type_cursus: 'Initiale',
        diplome_delivre: 'Titre d\'Ingénieur Civil des Mines de Nancy',
        duree_annees: 3,
        competences_cles: 'Métallurgie de pointe, Éco-matériaux, IA appliquée, Modélisation mathématique'
      ,
        debouches_metiers: [
          'Ingénieur R&D Matériaux Innovants',
          'Ingénieur Synthèse & Chimie Verte',
          'Responsable Formulation & Procédés',
          'Ingénieur Polymères & Nanomatériaux'
        ],
        salaire_moyen_specialite: 45.8,
        taux_insertion_specialite: 98.4,
        partenaires_entreprises: [
          'Saint-Gobain',
          'Arkema',
          'Air Liquide',
          'Solvay',
          'Michelin',
          "L'Oréal"
        ],
        doubles_diplomes: [
          'Master Chimie Moléculaire (PSL)',
          'Double Diplôme ESPCI',
          'McGill University',
          'ETH Zürich'
        ],
        secteurs_recrutement: [
          'Chimie Fine & Procédés',
          'Pharmacie & Cosmétique',
          'Aéronautique & Matériaux Hautes Performances',
          'Énergie & Piles à Combustible'
        ],
        modules_phares: [
          'Chimie des Polymères & Biomatériaux',
          'Caractérisation Structurale (RMN/Rayons X)',
          'Procédés de Séparation & Catalyse Hétérogène',
          'Nanotechnologies & Surfaces Actives'
        ],
        volume_ects: 300
      }
    ],
    admissions: [
      {
        id: 'mn-adm-1',
        ecole_id: 'mines-nancy-fra',
        source: 'CPGE (SCEI / Concours Commun)',
        annee: 2024,
        nom_filiere_concours: 'Concours Commun Mines-Ponts (CCMP)',
        capacite: 160,
        nb_voeux: 5600,
        taux_acces: 9.8,
        rang_dernier_appele: 620,
        pct_mention_tb: 94.0,
        pct_boursiers: 24.0
      }
    ],
    classements: [
      {
        id: 'mn-cl-1',
        ecole_id: 'mines-nancy-fra',
        source_media: "Le Figaro Étudiant",
        annee: 2025,
        rang_general: 10,
        note_globale: 18.0
      }
    ],
    insertion: {
      id: 'mn-ins-1',
      ecole_id: 'mines-nancy-fra',
      annee_promo: 2024,
      salaire_moyen_embauche: 47.0,
      salaire_avec_primes: 52.5,
      salaire_3_ans: 60.0,
      taux_emploi_6_mois: 97.4,
      pct_international: 26.0,
      pct_poursuite_etudes: 15.0,
      duree_moyenne_recherche_mois: 1.2
    }
  },

  {
    id: 'mines-saint-etienne-fra',
    type_recrutement: 'post_prepa',
    nom_officiel: 'École Nationale Supérieure des Mines de Saint-Étienne',
    sigle: 'Mines Saint-Étienne',
    pays: 'France',
    region: 'Auvergne-Rhône-Alpes',
    parcoursup_url: 'https://dossier.parcoursup.fr/Candidat/carte?action=recherche&origine=carte&g_ta_cod=16003',
    parcoursup_code: '16003',
    ville_principale: 'Saint-Étienne',
    statut_juridique: 'Public',
    frais_scolarite_annuels: 2500,
    site_web: 'https://www.mines-stetienne.fr',
    description: "Établissement prestigieux de l'Institut Mines-Télécom, reconnu mondialement pour son centre de microélectronique de Gardanne et son centre ingénierie et santé.",
    habilitation_cti: true,
    label_eurace: true,
    annee_creation: 1816,
    campus: [
      {
        id: 'mse-c-1',
        ecole_id: 'mines-saint-etienne-fra',
        nom_campus: 'Campus de Saint-Étienne',
        ville: 'Saint-Étienne',
        code_postal: '42023',
        adresse: '158 Cours Fauriel',
        latitude: 45.4262,
        longitude: 4.4055,
        est_siege_principal: true
      },
      {
        id: 'mse-c-2',
        ecole_id: 'mines-saint-etienne-fra',
        nom_campus: 'Campus Georges Charpak Provence',
        ville: 'Gardanne',
        code_postal: '13120',
        adresse: '880 Route de Mimet',
        latitude: 43.4472,
        longitude: 5.4788,
        est_siege_principal: false
      }
    ],
    specialites: [
      {
        id: 'mse-sp-1',
        ecole_id: 'mines-saint-etienne-fra',
        intitule_specialite: 'Microélectronique & Informatique (Gardanne)',
        domaine: 'Électronique & Systèmes Embarqués',
        type_cursus: 'Mixte (Initiale & Alternance)',
        diplome_delivre: 'Titre d\'Ingénieur Civil des Mines',
        duree_annees: 3,
        competences_cles: 'Semi-conducteurs, Sécurité matérielle, Circuits intégrés, Smart cards'
      ,
        debouches_metiers: [
          'Ingénieur Conception ASIC / FPGA',
          'Architecte Systèmes Temps Réel',
          'Ingénieur Radiofréquence & IoT',
          'Spécialiste Compatibilité Électromagnétique'
        ],
        salaire_moyen_specialite: 47.0,
        taux_insertion_specialite: 98.4,
        partenaires_entreprises: [
          'STMicroelectronics',
          'Thales',
          'NXP Semiconductors',
          'Safran Electronics',
          'SNCF',
          'CEA-Leti'
        ],
        doubles_diplomes: [
          'Master Micro & Nano-électronique',
          'Georgia Tech',
          'EPFL',
          'Politecnico di Milano'
        ],
        secteurs_recrutement: [
          'Semi-conducteurs & Nanoélectronique',
          'Aéronautique & Spatial',
          'Automobile & Objets Connectés (IoT)',
          'Télécoms 5G/6G'
        ],
        modules_phares: [
          'Conception VHDL / Verilog & Synthèse FPGA',
          'Architectures Microcontrôleurs & Firmware C/C++',
          'Électronique Hyperfréquences & Antennes',
          "Systèmes d'Exploitation Temps Réel (FreeRTOS/Linux Embarqué)"
        ],
        volume_ects: 300
      },
      {
        id: 'mse-sp-2',
        ecole_id: 'mines-saint-etienne-fra',
        intitule_specialite: 'Ingénierie & Santé (CIS)',
        domaine: 'Biotechnologies & Santé',
        type_cursus: 'Initiale',
        diplome_delivre: 'Diplôme d\'Ingénieur',
        duree_annees: 3,
        competences_cles: 'Biomatériaux, Imagerie médicale, Dispositifs cardiovasculaires'
      ,
        debouches_metiers: [
          'Ingénieur Dispositifs Médicaux',
          'Bio-informaticien & Analyse Génomique',
          'Ingénieur R&D Biomécanique & Prothèses',
          'Responsable Qualité & Affaires Réglementaires Pharma'
        ],
        salaire_moyen_specialite: 46.2,
        taux_insertion_specialite: 98.4,
        partenaires_entreprises: [
          'Sanofi',
          'BioMérieux',
          'GE Healthcare',
          'Medtronic',
          'Institut Pasteur',
          'Servier'
        ],
        doubles_diplomes: [
          'Master Bio-informatique',
          'Double Diplôme Médecine-Ingénieur',
          'Johns Hopkins University',
          'Université Paris Cité'
        ],
        secteurs_recrutement: [
          'Industrie Pharmaceutique & Vaccins',
          'Technologies Médicales (MedTech)',
          'Biotechnologies Blanches & Rouges',
          'Recherche Biomédicale'
        ],
        modules_phares: [
          'Génie Génétique & Biologie Moléculaire',
          'Imagerie Médicale & Traitement du Signal ECG/EEG',
          'Biomechanics & Matériaux Biocompatibles',
          'Réglementation FDA / Marquage CE Médical'
        ],
        volume_ects: 300
      }
    ],
    admissions: [
      {
        id: 'mse-adm-1',
        ecole_id: 'mines-saint-etienne-fra',
        source: 'CPGE (SCEI / Concours Commun)',
        annee: 2024,
        nom_filiere_concours: 'Concours Commun Mines-Ponts (CCMP)',
        capacite: 180,
        nb_voeux: 5750,
        taux_acces: 9.5,
        rang_dernier_appele: 605,
        pct_mention_tb: 94.0,
        pct_boursiers: 23.0
      }
    ],
    classements: [
      {
        id: 'mse-cl-1',
        ecole_id: 'mines-saint-etienne-fra',
        source_media: "Le Figaro Étudiant",
        annee: 2025,
        rang_general: 9,
        note_globale: 18.1
      }
    ],
    insertion: {
      id: 'mse-ins-1',
      ecole_id: 'mines-saint-etienne-fra',
      annee_promo: 2024,
      salaire_moyen_embauche: 47.2,
      salaire_avec_primes: 53.0,
      salaire_3_ans: 60.5,
      taux_emploi_6_mois: 97.6,
      pct_international: 27.0,
      pct_poursuite_etudes: 14.0,
      duree_moyenne_recherche_mois: 1.1
    }
  },

  {
    id: 'telecom-sudparis-fra',
    type_recrutement: 'post_prepa',
    nom_officiel: 'Télécom SudParis',
    sigle: 'Télécom SudParis',
    pays: 'France',
    region: 'Île-de-France',
    parcoursup_url: 'https://dossier.parcoursup.fr/Candidat/carte?action=recherche&origine=carte&g_ta_cod=13008',
    parcoursup_code: '13008',
    ville_principale: 'Évry-Courcouronnes',
    statut_juridique: 'Public',
    frais_scolarite_annuels: 2650,
    site_web: 'https://www.telecom-sudparis.eu',
    description: "Grande école d'ingénieurs membre de l'Institut Polytechnique de Paris, Télécom SudParis est spécialiste des réseaux sécurisés, de la cybersécurité et de la data.",
    habilitation_cti: true,
    label_eurace: true,
    annee_creation: 1979,
    campus: [
      {
        id: 'tsp-c-1',
        ecole_id: 'telecom-sudparis-fra',
        nom_campus: 'Campus d\'Évry',
        ville: 'Évry-Courcouronnes',
        code_postal: '91011',
        adresse: '9 Rue Charles Fourier',
        latitude: 48.6252,
        longitude: 2.4431,
        est_siege_principal: true
      }
    ],
    specialites: [
      {
        id: 'tsp-sp-1',
        ecole_id: 'telecom-sudparis-fra',
        intitule_specialite: 'Ingénieur Réseaux, Télécoms & Sécurité',
        domaine: 'Télécommunications & Réseaux',
        type_cursus: 'Mixte (Initiale & Alternance)',
        diplome_delivre: 'Titre d\'Ingénieur de Télécom SudParis',
        duree_annees: 3,
        competences_cles: 'Cloud computing, Architectures 5G/6G, Sécurité réseau, SDN'
      ,
        debouches_metiers: [
          'Architecte Réseaux 5G / 6G',
          'Ingénieur Infrastructure Cloud & SDN',
          'Ingénieur Protocoles & Télémesure',
          'Chef de Projet Déploiement Fibre & Cœur de Réseau'
        ],
        salaire_moyen_specialite: 47.0,
        taux_insertion_specialite: 98.4,
        partenaires_entreprises: [
          'Orange',
          'Nokia',
          'Bouygues Telecom',
          'SFR',
          'Ericsson',
          'Cisco'
        ],
        doubles_diplomes: [
          'Master Réseaux Haut Débit',
          'Double Diplôme Télécom Paris',
          'Waterloo University (Canada)',
          'Aalto University'
        ],
        secteurs_recrutement: [
          'Opérateurs de Télécommunications',
          'Équipementiers Réseaux',
          'Datacenters & Opérateurs Cloud',
          'Défense & Communications Sécurisées'
        ],
        modules_phares: [
          'Protocoles IP Avancés & Routage BGP/MPLS',
          'Réseaux Mobiles 5G NR & Virtualisation (NFV/SDN)',
          'Transmission par Fibre Optique & Multiplexage WDM',
          'Sécurité des Architectures Réseaux'
        ],
        volume_ects: 300
      }
    ],
    admissions: [
      {
        id: 'tsp-adm-1',
        ecole_id: 'telecom-sudparis-fra',
        source: 'CPGE (SCEI / Concours Commun)',
        annee: 2024,
        nom_filiere_concours: 'Concours Mines-Télécom',
        capacite: 210,
        nb_voeux: 5100,
        taux_acces: 16.5,
        rang_dernier_appele: 890,
        pct_mention_tb: 87.0,
        pct_boursiers: 25.0
      }
    ],
    classements: [
      {
        id: 'tsp-cl-1',
        ecole_id: 'telecom-sudparis-fra',
        source_media: "Le Figaro Étudiant",
        annee: 2025,
        domaine_specialite: 'Informatique & Logiciel',
        rang_par_specialite: 7,
        note_globale: 18.5
      }
    ],
    insertion: {
      id: 'tsp-ins-1',
      ecole_id: 'telecom-sudparis-fra',
      annee_promo: 2024,
      salaire_moyen_embauche: 47.0,
      salaire_avec_primes: 52.8,
      salaire_3_ans: 60.0,
      taux_emploi_6_mois: 98.1,
      pct_international: 24.0,
      pct_poursuite_etudes: 11.0,
      duree_moyenne_recherche_mois: 1.0
    }
  },

  {
    id: 'espci-paris-fra',
    type_recrutement: 'post_prepa',
    nom_officiel: 'ESPCI Paris - PSL',
    sigle: 'ESPCI Paris',
    pays: 'France',
    region: 'Île-de-France',
    parcoursup_url: 'https://dossier.parcoursup.fr/Candidat/carte?action=recherche&origine=carte&g_ta_cod=13009',
    parcoursup_code: '13009',
    ville_principale: 'Paris',
    statut_juridique: 'Public',
    frais_scolarite_annuels: 0,
    site_web: 'https://www.espci.psl.eu',
    description: "École aux 6 Prix Nobel (Pierre et Marie Curie, Pierre-Gilles de Gennes, Georges Charpak...), l'ESPCI forme des ingénieurs-chercheurs interdisciplinaires d'exception en physique, chimie et biologie.",
    habilitation_cti: true,
    label_eurace: true,
    annee_creation: 1882,
    campus: [
      {
        id: 'espci-c-1',
        ecole_id: 'espci-paris-fra',
        nom_campus: 'Campus de la Montagne Sainte-Geneviève',
        ville: 'Paris',
        code_postal: '75005',
        adresse: '10 Rue Vauquelin',
        latitude: 48.8415,
        longitude: 2.3483,
        est_siege_principal: true
      }
    ],
    specialites: [
      {
        id: 'espci-sp-1',
        ecole_id: 'espci-paris-fra',
        intitule_specialite: 'Cycle Ingénieur ESPCI (Physique, Chimie, Biologie)',
        domaine: 'Matériaux & Chimie',
        type_cursus: 'Initiale',
        diplome_delivre: 'Titre d\'Ingénieur de l\'ESPCI Paris - PSL',
        duree_annees: 4,
        competences_cles: 'Matière molle, Microfluidique, Supraconductivité, Acoustique biomédicale'
      ,
        debouches_metiers: [
          'Ingénieur R&D Matériaux Innovants',
          'Ingénieur Synthèse & Chimie Verte',
          'Responsable Formulation & Procédés',
          'Ingénieur Polymères & Nanomatériaux'
        ],
        salaire_moyen_specialite: 45.8,
        taux_insertion_specialite: 98.4,
        partenaires_entreprises: [
          'Saint-Gobain',
          'Arkema',
          'Air Liquide',
          'Solvay',
          'Michelin',
          "L'Oréal"
        ],
        doubles_diplomes: [
          'Master Chimie Moléculaire (PSL)',
          'Double Diplôme ESPCI',
          'McGill University',
          'ETH Zürich'
        ],
        secteurs_recrutement: [
          'Chimie Fine & Procédés',
          'Pharmacie & Cosmétique',
          'Aéronautique & Matériaux Hautes Performances',
          'Énergie & Piles à Combustible'
        ],
        modules_phares: [
          'Chimie des Polymères & Biomatériaux',
          'Caractérisation Structurale (RMN/Rayons X)',
          'Procédés de Séparation & Catalyse Hétérogène',
          'Nanotechnologies & Surfaces Actives'
        ],
        volume_ects: 300
      }
    ],
    admissions: [
      {
        id: 'espci-adm-1',
        ecole_id: 'espci-paris-fra',
        source: 'CPGE (SCEI / Concours Commun)',
        annee: 2024,
        nom_filiere_concours: 'Concours X-ESPCI (PC, BCPST, MP)',
        capacite: 90,
        nb_voeux: 3800,
        taux_acces: 4.8,
        rang_dernier_appele: 120,
        pct_mention_tb: 98.0,
        pct_boursiers: 20.0
      }
    ],
    classements: [
      {
        id: 'espci-cl-1',
        ecole_id: 'espci-paris-fra',
        source_media: "Le Figaro Étudiant",
        annee: 2025,
        rang_general: 6,
        note_globale: 18.9
      }
    ],
    insertion: {
      id: 'espci-ins-1',
      ecole_id: 'espci-paris-fra',
      annee_promo: 2024,
      salaire_moyen_embauche: 49.0,
      salaire_avec_primes: 54.5,
      salaire_3_ans: 63.0,
      taux_emploi_6_mois: 97.0,
      pct_international: 38.0,
      pct_poursuite_etudes: 65.0,
      duree_moyenne_recherche_mois: 1.1
    }
  },

  {
    id: 'chimie-paristech-fra',
    type_recrutement: 'post_prepa',
    nom_officiel: 'Chimie ParisTech - PSL',
    sigle: 'Chimie ParisTech',
    pays: 'France',
    region: 'Île-de-France',
    parcoursup_url: 'https://dossier.parcoursup.fr/Candidat/carte?action=recherche&origine=carte&g_ta_cod=13010',
    parcoursup_code: '13010',
    ville_principale: 'Paris',
    statut_juridique: 'Public',
    frais_scolarite_annuels: 601,
    site_web: 'https://www.chimieparistech.psl.eu',
    description: "Numéro 1 des écoles d'ingénieurs chimistes de France, membre de PSL, forme les innovateurs de la pharmacie, des cosmétiques de luxe, des batteries et des matériaux avancés.",
    habilitation_cti: true,
    label_eurace: true,
    annee_creation: 1896,
    campus: [
      {
        id: 'cpt-c-1',
        ecole_id: 'chimie-paristech-fra',
        nom_campus: 'Campus Pierre et Marie Curie',
        ville: 'Paris',
        code_postal: '75005',
        adresse: '11 Rue Pierre et Marie Curie',
        latitude: 48.8431,
        longitude: 2.3444,
        est_siege_principal: true
      }
    ],
    specialites: [
      {
        id: 'cpt-sp-1',
        ecole_id: 'chimie-paristech-fra',
        intitule_specialite: 'Ingénieur Chimiste Généraliste & Santé',
        domaine: 'Matériaux & Chimie',
        type_cursus: 'Initiale',
        diplome_delivre: 'Titre d\'Ingénieur de Chimie ParisTech',
        duree_annees: 3,
        competences_cles: 'Synthèse organique, Chimie médicinale, Matériaux pour l\'énergie, Catalyse',
              debouches_metiers: [
          'Ingénieur Expert Spécialisé',
          'Chef de Projet R&D & Systèmes Complexes',
          'Lead Consultant Stratégie & Technologie',
          'Directeur de Programme Innovation'
        ],
        salaire_moyen_specialite: 48.5,
        taux_insertion_specialite: 98.6,
        partenaires_entreprises: [
          'TotalEnergies', 'Airbus', 'Thales', 'Saint-Gobain', 'Capgemini', 'Dassault Systèmes'
        ],
        doubles_diplomes: [
          'Master of Science International', 'Double Diplôme Management HEC / ESSEC', 'Imperial College London'
        ],
        secteurs_recrutement: [
          "Industrie & Systèmes Complexes', 'Conseil & Stratégie', 'High-Tech & R&D"
        ],
        modules_phares: [
          'Modélisation Numérique Avancée', 'Management de Grands Programmes', 'Transition Bas-Carbone & Éco-Conception'
        ],
        volume_ects: 300
      }
    ],
    admissions: [
      {
        id: 'cpt-adm-1',
        ecole_id: 'chimie-paristech-fra',
        source: 'CPGE (SCEI / Concours Commun)',
        annee: 2024,
        nom_filiere_concours: 'Concours Commun CCINP Filière PC',
        capacite: 95,
        nb_voeux: 3200,
        taux_acces: 6.2,
        rang_dernier_appele: 160,
        pct_mention_tb: 96.0,
        pct_boursiers: 22.0
      }
    ],
    classements: [
      {
        id: 'cpt-cl-1',
        ecole_id: 'chimie-paristech-fra',
        source_media: "Le Figaro Étudiant",
        annee: 2025,
        rang_general: 13,
        note_globale: 17.8
      }
    ],
    insertion: {
      id: 'cpt-ins-1',
      ecole_id: 'chimie-paristech-fra',
      annee_promo: 2024,
      salaire_moyen_embauche: 46.5,
      salaire_avec_primes: 51.0,
      salaire_3_ans: 58.5,
      taux_emploi_6_mois: 96.5,
      pct_international: 32.0,
      pct_poursuite_etudes: 45.0,
      duree_moyenne_recherche_mois: 1.2
    }
  },

  {
    id: 'agroparistech-saclay-fra',
    type_recrutement: 'post_prepa',
    nom_officiel: 'AgroParisTech - Institut des Sciences et Industries du Vivant et de l\'Environnement',
    sigle: 'AgroParisTech',
    pays: 'France',
    ville_principale: 'Palaiseau',
    statut_juridique: 'Public',
    frais_scolarite_annuels: 1786,
    site_web: 'https://www.agroparistech.fr',
    description: "Établissement leader de l'Université Paris-Saclay en sciences du vivant, biotechnologies, alimentation durable, agronomie de précision et gestion de l'environnement.",
    habilitation_cti: true,
    label_eurace: true,
    annee_creation: 1826,
    campus: [
      {
        id: 'apt-c-1',
        ecole_id: 'agroparistech-saclay-fra',
        nom_campus: 'Campus Agro Paris-Saclay',
        ville: 'Palaiseau',
        code_postal: '91120',
        adresse: '22 Place de l\'Agronomie',
        latitude: 48.7142,
        longitude: 2.1966,
        est_siege_principal: true
      }
    ],
    specialites: [
      {
        id: 'apt-sp-1',
        ecole_id: 'agroparistech-saclay-fra',
        intitule_specialite: 'Cursus Ingénieur du Vivant & de l\'Environnement',
        domaine: 'Biotechnologies & Santé',
        type_cursus: 'Mixte (Initiale & Alternance)',
        diplome_delivre: 'Titre d\'Ingénieur AgroParisTech',
        duree_annees: 3,
        competences_cles: 'Génie biochimique, Microbiologie industrielle, Écologie territoriale'
      ,
        debouches_metiers: [
          'Ingénieur R&D Matériaux Innovants',
          'Ingénieur Synthèse & Chimie Verte',
          'Responsable Formulation & Procédés',
          'Ingénieur Polymères & Nanomatériaux'
        ],
        salaire_moyen_specialite: 45.8,
        taux_insertion_specialite: 98.4,
        partenaires_entreprises: [
          'Saint-Gobain',
          'Arkema',
          'Air Liquide',
          'Solvay',
          'Michelin',
          "L'Oréal"
        ],
        doubles_diplomes: [
          'Master Chimie Moléculaire (PSL)',
          'Double Diplôme ESPCI',
          'McGill University',
          'ETH Zürich'
        ],
        secteurs_recrutement: [
          'Chimie Fine & Procédés',
          'Pharmacie & Cosmétique',
          'Aéronautique & Matériaux Hautes Performances',
          'Énergie & Piles à Combustible'
        ],
        modules_phares: [
          'Chimie des Polymères & Biomatériaux',
          'Caractérisation Structurale (RMN/Rayons X)',
          'Procédés de Séparation & Catalyse Hétérogène',
          'Nanotechnologies & Surfaces Actives'
        ],
        volume_ects: 300
      }
    ],
    admissions: [
      {
        id: 'apt-adm-1',
        ecole_id: 'agroparistech-saclay-fra',
        source: 'CPGE (SCEI / Concours Commun)',
        annee: 2024,
        nom_filiere_concours: 'Concours Agro-Véto (BCPST, TB)',
        capacite: 340,
        nb_voeux: 3100,
        taux_acces: 14.0,
        rang_dernier_appele: 420,
        pct_mention_tb: 95.0,
        pct_boursiers: 21.0
      }
    ],
    classements: [
      {
        id: 'apt-cl-1',
        ecole_id: 'agroparistech-saclay-fra',
        source_media: "Le Figaro Étudiant",
        annee: 2025,
        rang_general: 12,
        note_globale: 17.8
      }
    ],
    insertion: {
      id: 'apt-ins-1',
      ecole_id: 'agroparistech-saclay-fra',
      annee_promo: 2024,
      salaire_moyen_embauche: 45.0,
      salaire_avec_primes: 49.5,
      salaire_3_ans: 56.0,
      taux_emploi_6_mois: 97.2,
      pct_international: 25.0,
      pct_poursuite_etudes: 22.0,
      duree_moyenne_recherche_mois: 1.3
    }
  },

  {
    id: 'polytech-liege-bel',
    nom_officiel: 'Faculté des Sciences Appliquées - Polytech Liège',
    sigle: 'Polytech Liège',
    pays: 'Belgique',
    region: 'Wallonie',
    ville_principale: 'Liège',
    statut_juridique: 'Public',
    frais_scolarite_annuels: 835,
    site_web: 'https://www.facsa.uliege.be',
    description: "Faculté d'ingénieurs de l'Université de Liège, pionnière en aérospatiale (Centre Spatial de Liège), génie biomédical et science des données en Wallonie.",
    habilitation_cti: true,
    label_eurace: true,
    annee_creation: 1836,
    campus: [
      {
        id: 'plg-c-1',
        ecole_id: 'polytech-liege-bel',
        nom_campus: 'Campus du Sart Tilman',
        ville: 'Liège',
        code_postal: '4000',
        adresse: 'Allée de la Découverte 9',
        latitude: 50.5842,
        longitude: 5.5583,
        est_siege_principal: true
      }
    ],
    specialites: [
      {
        id: 'plg-sp-1',
        ecole_id: 'polytech-liege-bel',
        intitule_specialite: 'Master Ingénieur Civil Aérospatial',
        domaine: 'Aéronautique & Spatial',
        type_cursus: 'Initiale',
        diplome_delivre: 'Grade d\'Ingénieur Civil Aérospatial (CTI & EUR-ACE)',
        duree_annees: 2,
        competences_cles: 'Optique spatiale, Aéroélasticité, Propulsion spatiale, Instrumentation'
      ,
        debouches_metiers: [
          'Ingénieur Aérodynamicien',
          'Concepteur Systèmes Avioniques',
          'Ingénieur Propulsion & Moteurs',
          'Architecte Satellites & Lanceurs'
        ],
        salaire_moyen_specialite: 47.5,
        taux_insertion_specialite: 98.4,
        partenaires_entreprises: [
          'Airbus',
          'Dassault Aviation',
          'Safran',
          'ArianeGroup',
          'Thales Alenia Space',
          'CNES / ESA'
        ],
        doubles_diplomes: [
          'Master Spatial (ISAE / Supaero)',
          'Cranfield University (UK)',
          'TU Delft (Pays-Bas)',
          'Polytechnique Montréal'
        ],
        secteurs_recrutement: [
          'Constructeurs Aéronautiques',
          'Industrie Spatiale & Drones',
          'Défense & Systèmes Embarqués',
          'Maintenance Aéronautique'
        ],
        modules_phares: [
          'Mécanique des Fluides & CFD Compressible',
          'Dynamique du Vol & Pilotage Automatique',
          'Systèmes Propulsifs Hybrides & Hydrogène',
          'Structures & Matériaux Composites'
        ],
        volume_ects: 300
      }
    ],
    admissions: [
      {
        id: 'plg-adm-1',
        ecole_id: 'polytech-liege-bel',
        source: 'Examen Universitaire / Équivalence',
        annee: 2024,
        nom_filiere_concours: 'Examen d\'admission Ingénieur Civil FWB',
        capacite: 250,
        nb_voeux: 650,
        taux_acces: 46.0,
        rang_dernier_appele: 290,
        pct_mention_tb: 58.0,
        pct_boursiers: 19.0
      }
    ],
    classements: [
      {
        id: 'plg-cl-1',
        ecole_id: 'polytech-liege-bel',
        source_media: "QS World University Rankings",
        annee: 2025,
        rang_general: 250,
        note_globale: 76.0
      }
    ],
    insertion: {
      id: 'plg-ins-1',
      ecole_id: 'polytech-liege-bel',
      annee_promo: 2024,
      salaire_moyen_embauche: 46.5,
      salaire_avec_primes: 52.0,
      salaire_3_ans: 60.5,
      taux_emploi_6_mois: 96.5,
      pct_international: 30.0,
      pct_poursuite_etudes: 16.0,
      duree_moyenne_recherche_mois: 1.4
    }
  },

  {
    id: 'fpms-mons-bel',
    nom_officiel: 'Faculté Polytechnique de Mons - Université de Mons',
    sigle: 'FPMs Mons',
    pays: 'Belgique',
    region: 'Wallonie',
    ville_principale: 'Mons',
    statut_juridique: 'Public',
    frais_scolarite_annuels: 835,
    site_web: 'https://web.umons.ac.be/fpms',
    description: "Plus ancienne école d'ingénieurs de Belgique (1836), la FPMs est renommée pour ses filières en génie informatique, télécommunications et génie chimique.",
    habilitation_cti: true,
    label_eurace: true,
    annee_creation: 1836,
    campus: [
      {
        id: 'fpms-c-1',
        ecole_id: 'fpms-mons-bel',
        nom_campus: 'Campus de la Plaine de Nimy',
        ville: 'Mons',
        code_postal: '7000',
        adresse: 'Rue de Houdain 9',
        latitude: 50.4542,
        longitude: 3.9525,
        est_siege_principal: true
      }
    ],
    specialites: [
      {
        id: 'fpms-sp-1',
        ecole_id: 'fpms-mons-bel',
        intitule_specialite: 'Master Ingénieur Civil en Informatique & Gestion',
        domaine: 'Informatique & Logiciel',
        type_cursus: 'Initiale',
        diplome_delivre: 'Grade d\'Ingénieur Civil Informaticien',
        duree_annees: 2,
        competences_cles: 'Intelligence artificielle, Traitement automatique de la parole, ERP'
      ,
        debouches_metiers: [
          'Ingénieur Logiciel Fullstack',
          'Architecte Systèmes Distribués',
          'Lead Developer Cloud',
          'Ingénieur DevOps / SRE'
        ],
        salaire_moyen_specialite: 47.0,
        taux_insertion_specialite: 98.4,
        partenaires_entreprises: [
          'Google',
          'Amazon Web Services',
          'Microsoft',
          'Datadog',
          'Capgemini',
          'Criteo'
        ],
        doubles_diplomes: [
          'Master Recherche Informatique',
          'Double Diplôme HEC Paris',
          'Georgia Tech (USA)',
          'EPFL (Suisse)'
        ],
        secteurs_recrutement: [
          'Tech & Éditeurs Logiciels',
          'Conseil en Technologies',
          'Banque & FinTech',
          'Télécoms'
        ],
        modules_phares: [
          'Architecture Microservices & Cloud',
          'Algorithmique Avancée & HPC',
          "Compilateurs & Systèmes d'Exploitation",
          'Conception Logicielle Agile'
        ],
        volume_ects: 300
      }
    ],
    admissions: [
      {
        id: 'fpms-adm-1',
        ecole_id: 'fpms-mons-bel',
        source: 'Examen Universitaire / Équivalence',
        annee: 2024,
        nom_filiere_concours: 'Examen d\'admission Ingénieur Civil FWB',
        capacite: 220,
        nb_voeux: 580,
        taux_acces: 49.0,
        rang_dernier_appele: 260,
        pct_mention_tb: 54.0,
        pct_boursiers: 21.0
      }
    ],
    classements: [
      {
        id: 'fpms-cl-1',
        ecole_id: 'fpms-mons-bel',
        source_media: "QS World University Rankings",
        annee: 2025,
        rang_general: 320,
        note_globale: 72.0
      }
    ],
    insertion: {
      id: 'fpms-ins-1',
      ecole_id: 'fpms-mons-bel',
      annee_promo: 2024,
      salaire_moyen_embauche: 46.0,
      salaire_avec_primes: 51.5,
      salaire_3_ans: 59.5,
      taux_emploi_6_mois: 96.2,
      pct_international: 26.0,
      pct_poursuite_etudes: 14.0,
      duree_moyenne_recherche_mois: 1.5
    }
  },

  {
    id: 'utbm-belfort-fra',
    nom_officiel: 'Université de Technologie de Belfort-Montbéliard',
    sigle: 'UTBM',
    pays: 'France',
    region: 'Bourgogne-Franche-Comté',
    parcoursup_url: 'https://dossier.parcoursup.fr/Candidat/carte?action=recherche&origine=carte&g_ta_cod=15203',
    parcoursup_code: '15203',
    ville_principale: 'Belfort',
    statut_juridique: 'Public',
    frais_scolarite_annuels: 601,
    site_web: 'https://www.utbm.fr',
    description: "Membre du réseau des universités de technologie, l'UTBM est un pôle d'excellence en mobilités douces, piles à combustible hydrogène et ferroviaire (Alstom, Stellantis).",
    habilitation_cti: true,
    label_eurace: true,
    annee_creation: 1999,
    campus: [
      {
        id: 'utbm-c-1',
        ecole_id: 'utbm-belfort-fra',
        nom_campus: 'Campus de Belfort',
        ville: 'Belfort',
        code_postal: '90000',
        adresse: 'Rue de Thierry Mieg',
        latitude: 47.6397,
        longitude: 6.8639,
        est_siege_principal: true
      },
      {
        id: 'utbm-c-2',
        ecole_id: 'utbm-belfort-fra',
        nom_campus: 'Campus de Sévenans',
        ville: 'Sévenans',
        code_postal: '90400',
        adresse: 'Rue du Château',
        latitude: 47.5855,
        longitude: 6.8681,
        est_siege_principal: false
      }
    ],
    specialites: [
      {
        id: 'utbm-sp-1',
        ecole_id: 'utbm-belfort-fra',
        intitule_specialite: 'Génie Électrique & Systèmes Hydrogène',
        domaine: 'Énergie & Environnement',
        type_cursus: 'Mixte (Initiale & Alternance)',
        diplome_delivre: 'Titre d\'Ingénieur de l\'UTBM',
        duree_annees: 3,
        competences_cles: 'Piles à hydrogène, Électromobilité, Réseaux ferroviaires'
      ,
        debouches_metiers: [
          'Ingénieur Énergies Renouvelables (Éolien/Solaire)',
          'Ingénieur Sûreté & Procédés Nucléaires',
          'Chef de Projet Bilan Carbone & RSE',
          'Architecte Smart Grids'
        ],
        salaire_moyen_specialite: 46.5,
        taux_insertion_specialite: 98.4,
        partenaires_entreprises: [
          'EDF',
          'TotalEnergies',
          'Engie',
          'Orano',
          'Schneider Electric',
          'RTE'
        ],
        doubles_diplomes: [
          'Master Énergie Nucléaire',
          'KTH Environnement',
          'Double Diplôme IFP School',
          'Imperial College London'
        ],
        secteurs_recrutement: [
          "Production d'Énergie & Nucléaire",
          'Réseaux Électriques Intelligents',
          'Transition Écologique & Décarbonation',
          'Audit Environnemental'
        ],
        modules_phares: [
          'Thermodynamique des Systèmes Énergétiques',
          'Génie Nucléaire & Neutronique',
          "Réseaux Smart Grids & Stockage d'Énergie",
          'Analyse de Cycle de Vie (ACV)'
        ],
        volume_ects: 300
      }
    ],
    admissions: [
      {
        id: 'utbm-adm-1',
        ecole_id: 'utbm-belfort-fra',
        source: 'Parcoursup',
        annee: 2024,
        nom_filiere_concours: 'Réseau UT Post-bac',
        capacite: 320,
        nb_voeux: 8500,
        taux_acces: 28.0,
        rang_dernier_appele: 2100,
        pct_mention_tb: 62.0,
        pct_boursiers: 28.0
      }
    ],
    classements: [
      {
        id: 'utbm-cl-1',
        ecole_id: 'utbm-belfort-fra',
        source_media: "Le Figaro Étudiant",
        annee: 2025,
        rang_general: 25,
        note_globale: 16.5
      }
    ],
    insertion: {
      id: 'utbm-ins-1',
      ecole_id: 'utbm-belfort-fra',
      annee_promo: 2024,
      salaire_moyen_embauche: 42.0,
      salaire_avec_primes: 46.5,
      salaire_3_ans: 53.0,
      taux_emploi_6_mois: 95.2,
      pct_international: 22.0,
      pct_poursuite_etudes: 9.0,
      duree_moyenne_recherche_mois: 1.6
    }
  },

  {
    id: 'efrei-paris-fra',
    nom_officiel: 'EFREI Paris - Grande École du Numérique',
    sigle: 'EFREI',
    pays: 'France',
    region: 'Île-de-France',
    parcoursup_url: 'https://dossier.parcoursup.fr/Candidat/carte?action=recherche&origine=carte&g_ta_cod=13104',
    parcoursup_code: '13104',
    ville_principale: 'Villejuif',
    statut_juridique: 'EESPIG',
    frais_scolarite_annuels: 10200,
    site_web: 'https://www.efrei.fr',
    description: "Grande école du numérique et de l'innovation technologique à Paris-Villejuif, avec une très forte proportion d'étudiants en alternance et 14 majeures numériques de pointe.",
    habilitation_cti: true,
    label_eurace: true,
    annee_creation: 1936,
    campus: [
      {
        id: 'efrei-c-1',
        ecole_id: 'efrei-paris-fra',
        nom_campus: 'Campus de Villejuif',
        ville: 'Villejuif',
        code_postal: '94800',
        adresse: '30-32 Avenue de la République',
        latitude: 48.7885,
        longitude: 2.3644,
        est_siege_principal: true
      },
      {
        id: 'efrei-c-2',
        ecole_id: 'efrei-paris-fra',
        nom_campus: 'Campus de Bordeaux',
        ville: 'Bordeaux',
        code_postal: '33000',
        adresse: 'Hangar 15, Quai des Chartrons',
        latitude: 44.8542,
        longitude: -0.5678,
        est_siege_principal: false
      }
    ],
    specialites: [
      {
        id: 'efrei-sp-1',
        ecole_id: 'efrei-paris-fra',
        intitule_specialite: 'Majeure Cybersecurity & Cloud Infrastructure',
        domaine: 'Cybersécurité',
        type_cursus: 'Alternance / Apprentissage',
        diplome_delivre: 'Titre d\'Ingénieur Diplômé de l\'EFREI Paris',
        duree_annees: 3,
        competences_cles: 'Architecture Zero-Trust, Sécurité DevSecOps, Cloud AWS/Azure'
      ,
        debouches_metiers: [
          'Ingénieur Pentest & Sécurité Offensive',
          'Analyste SOC & Incident Response',
          'Architecte Sécurité Cloud',
          'Cryptanalyste'
        ],
        salaire_moyen_specialite: 48.5,
        taux_insertion_specialite: 98.4,
        partenaires_entreprises: [
          'ANSSI',
          'Thales Cyber Solutions',
          'Airbus Cybersecurity',
          'Orange Cyberdefense',
          'Wavestone',
          'Ministère des Armées'
        ],
        doubles_diplomes: [
          'Master Cybersécurité & Confiance Numérique',
          'Double Diplôme Télécom',
          'KTH Stockholm',
          'Université de Montréal'
        ],
        secteurs_recrutement: [
          'Défense & Sécurité Nationale',
          'Secteur Bancaire & OIV',
          'Infrastructures Critiques',
          'Audit & Conseil'
        ],
        modules_phares: [
          'Cryptographie Appliquée & Post-Quantique',
          'Sécurité des Réseaux & Systèmes',
          'Rétro-ingénierie & Analyse de Malware',
          'Gouvernance & Normes ISO 27001'
        ],
        volume_ects: 300
      }
    ],
    admissions: [
      {
        id: 'efrei-adm-1',
        ecole_id: 'efrei-paris-fra',
        source: 'Parcoursup',
        annee: 2024,
        nom_filiere_concours: 'Concours Puissance Alpha Post-bac',
        capacite: 450,
        nb_voeux: 8900,
        taux_acces: 36.0,
        rang_dernier_appele: 2950,
        pct_mention_tb: 54.0,
        pct_boursiers: 18.0
      }
    ],
    classements: [
      {
        id: 'efrei-cl-1',
        ecole_id: 'efrei-paris-fra',
        source_media: "Le Figaro Étudiant",
        annee: 2025,
        domaine_specialite: 'Informatique & Logiciel',
        rang_par_specialite: 11,
        note_globale: 17.6
      }
    ],
    insertion: {
      id: 'efrei-ins-1',
      ecole_id: 'efrei-paris-fra',
      annee_promo: 2024,
      salaire_moyen_embauche: 45.2,
      salaire_avec_primes: 50.0,
      salaire_3_ans: 57.0,
      taux_emploi_6_mois: 98.2,
      pct_international: 23.0,
      pct_poursuite_etudes: 8.0,
      duree_moyenne_recherche_mois: 0.9
    }
  },

  // =========================================================================
  // NOUVELLES GRANDES ÉCOLES PAR SPÉCIALITÉS (AÉRO, FINANCE, BTP, CHIMIE, DATA)
  // =========================================================================
  {
    id: 'ensae-paris-fra',
    type_recrutement: 'post_prepa',
    nom_officiel: 'ENSAE Paris - Institut Polytechnique de Paris',
    sigle: 'ENSAE Paris',
    pays: 'France',
    region: 'Île-de-France',
    parcoursup_url: 'https://dossier.parcoursup.fr/Candidat/carte?action=recherche&origine=carte&g_ta_cod=13012',
    parcoursup_code: '13012',
    ville_principale: 'Palaiseau',
    statut_juridique: 'Public',
    frais_scolarite_annuels: 2650,
    site_web: 'https://www.ensae.fr',
    description: "Grande école de référence mondiale en data science, intelligence artificielle, mathématiques financières, actuariat et économétrie au sein d'IP Paris.",
    habilitation_cti: true,
    label_eurace: true,
    annee_creation: 1942,
    campus: [
      {
        id: 'ensae-c-1',
        ecole_id: 'ensae-paris-fra',
        nom_campus: 'Campus IP Paris',
        ville: 'Palaiseau',
        code_postal: '91120',
        adresse: '5 Avenue Henry Le Chatelier',
        latitude: 48.7121,
        longitude: 2.2045,
        est_siege_principal: true
      }
    ],
    specialites: [
      {
        id: 'ensae-sp-1',
        ecole_id: 'ensae-paris-fra',
        intitule_specialite: 'Data Science, Machine Learning & Quantitative Finance',
        domaine: 'Mathématiques Financières & Modélisation',
        type_cursus: 'Mixte (Initiale & Alternance)',
        diplome_delivre: 'Titre d\'Ingénieur Diplômé de l\'ENSAE Paris',
        duree_annees: 3,
        competences_cles: 'Calcul stochastique, Deep learning, Risk management, Actuariat accrédité IA'
      ,
        debouches_metiers: [
          'Quant Trader / Ingénieur Financier',
          'Risk Manager Stochastique',
          'Data Scientist Actuariat',
          'Chercheur en Modélisation Mathématique & HPC'
        ],
        salaire_moyen_specialite: 52.0,
        taux_insertion_specialite: 98.4,
        partenaires_entreprises: [
          'BNP Paribas CIB',
          'Société Générale',
          'Natixis',
          'Goldman Sachs',
          'AXA',
          'Millennium Management'
        ],
        doubles_diplomes: [
          'Master El Karoui (Sorbonne / X)',
          'Double Diplôme HEC / ESSEC',
          'Columbia University',
          'London School of Economics'
        ],
        secteurs_recrutement: [
          "Banque d'Investissement & Marchés",
          "Fonds d'Investissement & Hedge Funds",
          'Assurance & Réassurance',
          'Conseil Actuariel'
        ],
        modules_phares: [
          'Calcul Stochastique & Équations Différentielles',
          'Pricing des Produits Dérivés & Modèle Black-Scholes',
          "Machine Learning pour l'Analyse Quantitative",
          'Gestion des Risques de Marché & Régulation Bâle III'
        ],
        volume_ects: 300
      },
      {
        id: 'ensae-sp-2',
        ecole_id: 'ensae-paris-fra',
        intitule_specialite: 'Intelligence Artificielle & Sciences des Données',
        domaine: 'Intelligence Artificielle & Data',
        type_cursus: 'Initiale',
        diplome_delivre: 'Titre d\'Ingénieur de l\'ENSAE Paris',
        duree_annees: 3,
        competences_cles: 'Grands modèles de langage, Causal inference, Optimisation combinatoire'
      ,
        debouches_metiers: [
          'Lead Data Scientist',
          'Ingénieur Machine Learning / MLOps',
          'Architecte IA Générative & LLM',
          'Chercheur en Vision par Ordinateur'
        ],
        salaire_moyen_specialite: 49.5,
        taux_insertion_specialite: 98.4,
        partenaires_entreprises: [
          'Mistral AI',
          'Hugging Face',
          'Meta FAIR',
          'Google DeepMind',
          'BNP Paribas',
          'TotalEnergies Digital Factory'
        ],
        doubles_diplomes: [
          'MSc Data Science (HEC Paris)',
          'Master MVA (ENS Paris-Saclay)',
          'Columbia University (USA)',
          'Imperial College London'
        ],
        secteurs_recrutement: [
          'Intelligence Artificielle & Big Data',
          'Finance Quantitative',
          'Santé Connectée',
          'Automobile Autonome'
        ],
        modules_phares: [
          'Deep Learning & Réseaux de Neurones',
          'Traitement Automatique du Langage (NLP)',
          'Apprentissage par Renforcement & MLOps',
          'Éthique & Sécurité des Algorithmes'
        ],
        volume_ects: 300
      }
    ],
    admissions: [
      {
        id: 'ensae-adm-1',
        ecole_id: 'ensae-paris-fra',
        source: 'CPGE (SCEI / Concours Commun)',
        annee: 2024,
        nom_filiere_concours: 'Concours X-Mines-Ponts (MP, PC, PSI, B/L)',
        capacite: 160,
        nb_voeux: 5200,
        taux_acces: 7.0,
        rang_dernier_appele: 430,
        pct_mention_tb: 97.0,
        pct_boursiers: 20.0
      }
    ],
    classements: [
      {
        id: 'ensae-cl-1',
        ecole_id: 'ensae-paris-fra',
        source_media: "Le Figaro Étudiant",
        annee: 2025,
        rang_general: 7,
        note_globale: 18.7
      },
      {
        id: 'ensae-cl-2',
        ecole_id: 'ensae-paris-fra',
        source_media: "Le Figaro Étudiant",
        annee: 2025,
        domaine_specialite: 'Mathématiques Financières & Modélisation',
        rang_par_specialite: 1,
        note_globale: 20.0
      },
      {
        id: 'ensae-cl-3',
        ecole_id: 'ensae-paris-fra',
        source_media: "L'Étudiant",
        annee: 2025,
        rang_general: 6,
        note_globale: 98.0
      }
    ],
    insertion: {
      id: 'ensae-ins-1',
      ecole_id: 'ensae-paris-fra',
      annee_promo: 2024,
      salaire_moyen_embauche: 55.0,
      salaire_avec_primes: 64.0,
      salaire_3_ans: 75.0,
      taux_emploi_6_mois: 99.2,
      pct_international: 36.0,
      pct_poursuite_etudes: 18.0,
      duree_moyenne_recherche_mois: 0.7
    }
  },

  {
    id: 'centrale-nantes-fra',
    type_recrutement: 'post_prepa',
    nom_officiel: 'École Centrale de Nantes',
    sigle: 'Centrale Nantes',
    pays: 'France',
    region: 'Pays de la Loire',
    parcoursup_url: 'https://dossier.parcoursup.fr/Candidat/carte?action=recherche&origine=carte&g_ta_cod=14501',
    parcoursup_code: '14501',
    ville_principale: 'Nantes',
    statut_juridique: 'Public',
    frais_scolarite_annuels: 2500,
    site_web: 'https://www.ec-nantes.fr',
    description: "Grande école d'ingénieurs généraliste, Centrale Nantes est leader européen en génie océanique, énergies marines renouvelables, propulsion durable et robotique avancée.",
    habilitation_cti: true,
    label_eurace: true,
    annee_creation: 1919,
    campus: [
      {
        id: 'ecn-c-1',
        ecole_id: 'centrale-nantes-fra',
        nom_campus: 'Campus de Nantes',
        ville: 'Nantes',
        code_postal: '44321',
        adresse: '1 Rue de la Noë',
        latitude: 47.2488,
        longitude: -1.5492,
        est_siege_principal: true
      }
    ],
    specialites: [
      {
        id: 'ecn-sp-1',
        ecole_id: 'centrale-nantes-fra',
        intitule_specialite: 'Génie Océanique & Énergies Marines Renouvelables',
        domaine: 'Énergie & Environnement',
        type_cursus: 'Initiale',
        diplome_delivre: 'Titre d\'Ingénieur de Centrale Nantes',
        duree_annees: 3,
        competences_cles: 'Hydrodynamique côtière, Éolien offshore flottant, Bassins de houle'
      ,
        debouches_metiers: [
          'Ingénieur Énergies Renouvelables (Éolien/Solaire)',
          'Ingénieur Sûreté & Procédés Nucléaires',
          'Chef de Projet Bilan Carbone & RSE',
          'Architecte Smart Grids'
        ],
        salaire_moyen_specialite: 46.5,
        taux_insertion_specialite: 98.4,
        partenaires_entreprises: [
          'EDF',
          'TotalEnergies',
          'Engie',
          'Orano',
          'Schneider Electric',
          'RTE'
        ],
        doubles_diplomes: [
          'Master Énergie Nucléaire',
          'KTH Environnement',
          'Double Diplôme IFP School',
          'Imperial College London'
        ],
        secteurs_recrutement: [
          "Production d'Énergie & Nucléaire",
          'Réseaux Électriques Intelligents',
          'Transition Écologique & Décarbonation',
          'Audit Environnemental'
        ],
        modules_phares: [
          'Thermodynamique des Systèmes Énergétiques',
          'Génie Nucléaire & Neutronique',
          "Réseaux Smart Grids & Stockage d'Énergie",
          'Analyse de Cycle de Vie (ACV)'
        ],
        volume_ects: 300
      },
      {
        id: 'ecn-sp-2',
        ecole_id: 'centrale-nantes-fra',
        intitule_specialite: 'Robotique Autonome & Systèmes Interactifs',
        domaine: 'Robotique & Mécatronique',
        type_cursus: 'Mixte (Initiale & Alternance)',
        diplome_delivre: 'Titre d\'Ingénieur de Centrale Nantes',
        duree_annees: 3,
        competences_cles: 'Robotique mobile, Perception sensorielle, Contrôle non-linéaire'
      ,
        debouches_metiers: [
          'Ingénieur Concepteur Robotique',
          'Spécialiste Vision & SLAM',
          'Ingénieur Automatique & Systèmes Embarqués',
          'Architecte Cobotique & Usine 4.0'
        ],
        salaire_moyen_specialite: 46.8,
        taux_insertion_specialite: 98.4,
        partenaires_entreprises: [
          'Aldebaran',
          'Boston Dynamics Partner',
          'Kuka Robotics',
          'Schneider Electric',
          'Dassault Aviation',
          'Siemens'
        ],
        doubles_diplomes: [
          'Master Robotique Avancée',
          'Carnegie Mellon University',
          'TU München',
          'Tokyo Institute of Technology'
        ],
        secteurs_recrutement: [
          'Robotique Industrielle & Médicale',
          'Défense & Véhicules Autonomes',
          'Agro-robotique',
          'Électronique Grand Public'
        ],
        modules_phares: [
          'Cinématique & Dynamique des Manipulateurs',
          'Perception 3D, SLAM & Capteurs LiDAR',
          'Asservissement Numérique & Systèmes Temps Réel',
          'Cobotique & Interaction Homme-Robot'
        ],
        volume_ects: 300
      }
    ],
    admissions: [
      {
        id: 'ecn-adm-1',
        ecole_id: 'centrale-nantes-fra',
        source: 'CPGE (SCEI / Concours Commun)',
        annee: 2024,
        nom_filiere_concours: 'Concours Centrale-Supélec',
        capacite: 390,
        nb_voeux: 6400,
        taux_acces: 12.8,
        rang_dernier_appele: 920,
        pct_mention_tb: 93.0,
        pct_boursiers: 22.0
      }
    ],
    classements: [
      {
        id: 'ecn-cl-1',
        ecole_id: 'centrale-nantes-fra',
        source_media: "Le Figaro Étudiant",
        annee: 2025,
        rang_general: 8,
        note_globale: 18.4
      },
      {
        id: 'ecn-cl-2',
        ecole_id: 'centrale-nantes-fra',
        source_media: "Le Figaro Étudiant",
        annee: 2025,
        domaine_specialite: 'Énergie & Environnement',
        rang_par_specialite: 3,
        note_globale: 19.1
      }
    ],
    insertion: {
      id: 'ecn-ins-1',
      ecole_id: 'centrale-nantes-fra',
      annee_promo: 2024,
      salaire_moyen_embauche: 48.0,
      salaire_avec_primes: 53.5,
      salaire_3_ans: 61.5,
      taux_emploi_6_mois: 97.8,
      pct_international: 29.0,
      pct_poursuite_etudes: 16.0,
      duree_moyenne_recherche_mois: 1.1
    }
  },

  {
    id: 'enac-toulouse-fra',
    type_recrutement: 'post_prepa',
    nom_officiel: 'École Nationale de l\'Aviation Civile',
    sigle: 'ENAC',
    pays: 'France',
    ville_principale: 'Toulouse',
    statut_juridique: 'Public',
    frais_scolarite_annuels: 1600,
    site_web: 'https://www.enac.fr',
    description: "Première école aéronautique d'Europe, l'ENAC forme les ingénieurs des systèmes aéroportuaires, de la navigation aérienne, de la sécurité des vols et des drones à Toulouse.",
    habilitation_cti: true,
    label_eurace: true,
    annee_creation: 1949,
    campus: [
      {
        id: 'enac-c-1',
        ecole_id: 'enac-toulouse-fra',
        nom_campus: 'Campus de Toulouse Rangueil',
        ville: 'Toulouse',
        code_postal: '31055',
        adresse: '7 Avenue Édouard Belin',
        latitude: 43.5645,
        longitude: 1.4788,
        est_siege_principal: true
      }
    ],
    specialites: [
      {
        id: 'enac-sp-1',
        ecole_id: 'enac-toulouse-fra',
        intitule_specialite: 'Ingénieur ENAC - Systèmes de Transport Aérien',
        domaine: 'Aéronautique & Spatial',
        type_cursus: 'Mixte (Initiale & Alternance)',
        diplome_delivre: 'Titre d\'Ingénieur Diplômé de l\'ENAC',
        duree_annees: 3,
        competences_cles: 'Gestion du trafic aérien (ATM), Systèmes satellite GNSS, Drones, Télécoms aéronautiques'
      ,
        debouches_metiers: [
          'Ingénieur Aérodynamicien',
          'Concepteur Systèmes Avioniques',
          'Ingénieur Propulsion & Moteurs',
          'Architecte Satellites & Lanceurs'
        ],
        salaire_moyen_specialite: 47.5,
        taux_insertion_specialite: 98.4,
        partenaires_entreprises: [
          'Airbus',
          'Dassault Aviation',
          'Safran',
          'ArianeGroup',
          'Thales Alenia Space',
          'CNES / ESA'
        ],
        doubles_diplomes: [
          'Master Spatial (ISAE / Supaero)',
          'Cranfield University (UK)',
          'TU Delft (Pays-Bas)',
          'Polytechnique Montréal'
        ],
        secteurs_recrutement: [
          'Constructeurs Aéronautiques',
          'Industrie Spatiale & Drones',
          'Défense & Systèmes Embarqués',
          'Maintenance Aéronautique'
        ],
        modules_phares: [
          'Mécanique des Fluides & CFD Compressible',
          'Dynamique du Vol & Pilotage Automatique',
          'Systèmes Propulsifs Hybrides & Hydrogène',
          'Structures & Matériaux Composites'
        ],
        volume_ects: 300
      }
    ],
    admissions: [
      {
        id: 'enac-adm-1',
        ecole_id: 'enac-toulouse-fra',
        source: 'CPGE (SCEI / Concours Commun)',
        annee: 2024,
        nom_filiere_concours: 'Concours Commun CCINP Filières MP, PC, PSI, PT',
        capacite: 140,
        nb_voeux: 4900,
        taux_acces: 10.5,
        rang_dernier_appele: 490,
        pct_mention_tb: 91.0,
        pct_boursiers: 24.0
      }
    ],
    classements: [
      {
        id: 'enac-cl-1',
        ecole_id: 'enac-toulouse-fra',
        source_media: "Le Figaro Étudiant",
        annee: 2025,
        domaine_specialite: 'Aéronautique & Spatial',
        rang_par_specialite: 2,
        note_globale: 19.2
      }
    ],
    insertion: {
      id: 'enac-ins-1',
      ecole_id: 'enac-toulouse-fra',
      annee_promo: 2024,
      salaire_moyen_embauche: 48.5,
      salaire_avec_primes: 54.0,
      salaire_3_ans: 62.0,
      taux_emploi_6_mois: 98.0,
      pct_international: 33.0,
      pct_poursuite_etudes: 11.0,
      duree_moyenne_recherche_mois: 1.0
    }
  },

  {
    id: 'estaca-paris-fra',
    nom_officiel: 'ESTACA - École Supérieure des Techniques Aéronautiques et de Construction Automobile',
    sigle: 'ESTACA',
    pays: 'France',
    region: 'Île-de-France',
    parcoursup_url: 'https://dossier.parcoursup.fr/Candidat/carte?action=recherche&origine=carte&g_ta_cod=13107',
    parcoursup_code: '13107',
    ville_principale: 'Montigny-le-Bretonneux',
    statut_juridique: 'EESPIG',
    frais_scolarite_annuels: 9900,
    site_web: 'https://www.estaca.fr',
    description: "Grande école d'ingénieurs des mobilités durables (aéronautique, automobile, spatial, ferroviaire et mobilités urbaines), partenaire des grands industriels d'Île-de-France et Pays de la Loire.",
    habilitation_cti: true,
    label_eurace: true,
    annee_creation: 1925,
    campus: [
      {
        id: 'estaca-c-1',
        ecole_id: 'estaca-paris-fra',
        nom_campus: 'Campus Paris-Saclay',
        ville: 'Montigny-le-Bretonneux',
        code_postal: '78180',
        adresse: '12 Avenue Eugène Freyssinet',
        latitude: 48.7758,
        longitude: 2.0522,
        est_siege_principal: true
      },
      {
        id: 'estaca-c-2',
        ecole_id: 'estaca-paris-fra',
        nom_campus: 'Campus Ouest',
        ville: 'Laval',
        code_postal: '53000',
        adresse: 'Rue Georges Charpak',
        latitude: 48.0831,
        longitude: -0.7588,
        est_siege_principal: false
      }
    ],
    specialites: [
      {
        id: 'estaca-sp-1',
        ecole_id: 'estaca-paris-fra',
        intitule_specialite: 'Ingénierie Aéronautique & Spatiale',
        domaine: 'Aéronautique & Spatial',
        type_cursus: 'Mixte (Initiale & Alternance)',
        diplome_delivre: 'Titre d\'Ingénieur Diplômé de l\'ESTACA',
        duree_annees: 3,
        competences_cles: 'Conception d\'avions décarbonés, Systèmes propulsifs hybrides, Essais en soufflerie',
              debouches_metiers: [
          'Ingénieur Expert Spécialisé',
          'Chef de Projet R&D & Systèmes Complexes',
          'Lead Consultant Stratégie & Technologie',
          'Directeur de Programme Innovation'
        ],
        salaire_moyen_specialite: 48.5,
        taux_insertion_specialite: 98.6,
        partenaires_entreprises: [
          'TotalEnergies', 'Airbus', 'Thales', 'Saint-Gobain', 'Capgemini', 'Dassault Systèmes'
        ],
        doubles_diplomes: [
          'Master of Science International', 'Double Diplôme Management HEC / ESSEC', 'Imperial College London'
        ],
        secteurs_recrutement: [
          "Industrie & Systèmes Complexes', 'Conseil & Stratégie', 'High-Tech & R&D"
        ],
        modules_phares: [
          'Modélisation Numérique Avancée', 'Management de Grands Programmes', 'Transition Bas-Carbone & Éco-Conception'
        ],
        volume_ects: 300
      },
      {
        id: 'estaca-sp-2',
        ecole_id: 'estaca-paris-fra',
        intitule_specialite: 'Ingénierie Automobile & Mobilités Connectées',
        domaine: 'Automobile & Transports',
        type_cursus: 'Mixte (Initiale & Alternance)',
        diplome_delivre: 'Titre d\'Ingénieur de l\'ESTACA',
        duree_annees: 3,
        competences_cles: 'Véhicules électriques, Conduite autonome ADAS, Crash-tests virtuels'
      ,
        debouches_metiers: [
          'Ingénieur Aérodynamicien',
          'Concepteur Systèmes Avioniques',
          'Ingénieur Propulsion & Moteurs',
          'Architecte Satellites & Lanceurs'
        ],
        salaire_moyen_specialite: 47.5,
        taux_insertion_specialite: 98.4,
        partenaires_entreprises: [
          'Airbus',
          'Dassault Aviation',
          'Safran',
          'ArianeGroup',
          'Thales Alenia Space',
          'CNES / ESA'
        ],
        doubles_diplomes: [
          'Master Spatial (ISAE / Supaero)',
          'Cranfield University (UK)',
          'TU Delft (Pays-Bas)',
          'Polytechnique Montréal'
        ],
        secteurs_recrutement: [
          'Constructeurs Aéronautiques',
          'Industrie Spatiale & Drones',
          'Défense & Systèmes Embarqués',
          'Maintenance Aéronautique'
        ],
        modules_phares: [
          'Mécanique des Fluides & CFD Compressible',
          'Dynamique du Vol & Pilotage Automatique',
          'Systèmes Propulsifs Hybrides & Hydrogène',
          'Structures & Matériaux Composites'
        ],
        volume_ects: 300
      }
    ],
    admissions: [
      {
        id: 'estaca-adm-1',
        ecole_id: 'estaca-paris-fra',
        source: 'Parcoursup',
        annee: 2024,
        nom_filiere_concours: 'Concours Avenir (Post-bac Bac Général)',
        capacite: 480,
        nb_voeux: 9200,
        taux_acces: 26.0,
        rang_dernier_appele: 2400,
        pct_mention_tb: 62.0,
        pct_boursiers: 16.0
      }
    ],
    classements: [
      {
        id: 'estaca-cl-1',
        ecole_id: 'estaca-paris-fra',
        source_media: "Le Figaro Étudiant",
        annee: 2025,
        domaine_specialite: 'Automobile & Transports',
        rang_par_specialite: 1,
        note_globale: 19.5
      },
      {
        id: 'estaca-cl-2',
        ecole_id: 'estaca-paris-fra',
        source_media: "Le Figaro Étudiant",
        annee: 2025,
        domaine_specialite: 'Aéronautique & Spatial',
        rang_par_specialite: 4,
        note_globale: 18.5
      }
    ],
    insertion: {
      id: 'estaca-ins-1',
      ecole_id: 'estaca-paris-fra',
      annee_promo: 2024,
      salaire_moyen_embauche: 46.0,
      salaire_avec_primes: 51.5,
      salaire_3_ans: 58.0,
      taux_emploi_6_mois: 98.1,
      pct_international: 26.0,
      pct_poursuite_etudes: 9.0,
      duree_moyenne_recherche_mois: 0.9
    }
  },

  {
    id: 'polytech-sorbonne-fra',
    nom_officiel: 'Polytech Sorbonne - Réseau Polytech',
    sigle: 'Polytech Sorbonne',
    pays: 'France',
    region: 'Île-de-France',
    parcoursup_url: 'https://dossier.parcoursup.fr/Candidat/carte?action=recherche&origine=carte&g_ta_cod=14001',
    parcoursup_code: '14001',
    ville_principale: 'Paris',
    statut_juridique: 'Public',
    frais_scolarite_annuels: 601,
    site_web: 'https://polytech.sorbonne-universite.fr',
    description: "École d'ingénieurs publique universitaire de Sorbonne Université au cœur de Paris, vaisseau amiral du réseau des 16 écoles Polytech (Geipi Polytech).",
    habilitation_cti: true,
    label_eurace: true,
    annee_creation: 1983,
    campus: [
      {
        id: 'poly-c-1',
        ecole_id: 'polytech-sorbonne-fra',
        nom_campus: 'Campus Pierre et Marie Curie (Jussieu)',
        ville: 'Paris',
        code_postal: '75005',
        adresse: '4 Place Jussieu',
        latitude: 48.8472,
        longitude: 2.3562,
        est_siege_principal: true
      }
    ],
    specialites: [
      {
        id: 'poly-sp-1',
        ecole_id: 'polytech-sorbonne-fra',
        intitule_specialite: 'Robotique Médicale & Systèmes Interactifs',
        domaine: 'Robotique & Mécatronique',
        type_cursus: 'Mixte (Initiale & Alternance)',
        diplome_delivre: 'Titre d\'Ingénieur de Polytech Sorbonne',
        duree_annees: 3,
        competences_cles: 'Chirurgie robotique assistée, Biorobotique, Commande de systèmes'
      ,
        debouches_metiers: [
          'Ingénieur Concepteur Robotique',
          'Spécialiste Vision & SLAM',
          'Ingénieur Automatique & Systèmes Embarqués',
          'Architecte Cobotique & Usine 4.0'
        ],
        salaire_moyen_specialite: 46.8,
        taux_insertion_specialite: 98.4,
        partenaires_entreprises: [
          'Aldebaran',
          'Boston Dynamics Partner',
          'Kuka Robotics',
          'Schneider Electric',
          'Dassault Aviation',
          'Siemens'
        ],
        doubles_diplomes: [
          'Master Robotique Avancée',
          'Carnegie Mellon University',
          'TU München',
          'Tokyo Institute of Technology'
        ],
        secteurs_recrutement: [
          'Robotique Industrielle & Médicale',
          'Défense & Véhicules Autonomes',
          'Agro-robotique',
          'Électronique Grand Public'
        ],
        modules_phares: [
          'Cinématique & Dynamique des Manipulateurs',
          'Perception 3D, SLAM & Capteurs LiDAR',
          'Asservissement Numérique & Systèmes Temps Réel',
          'Cobotique & Interaction Homme-Robot'
        ],
        volume_ects: 300
      },
      {
        id: 'poly-sp-2',
        ecole_id: 'polytech-sorbonne-fra',
        intitule_specialite: 'Informatique & Mathématiques Appliquées (MAIN)',
        domaine: 'Informatique & Logiciel',
        type_cursus: 'Alternance / Apprentissage',
        diplome_delivre: 'Titre d\'Ingénieur Diplômé',
        duree_annees: 3,
        competences_cles: 'Génie logiciel, Big Data, Sécurité applicative'
      ,
        debouches_metiers: [
          'Ingénieur Logiciel Fullstack',
          'Architecte Systèmes Distribués',
          'Lead Developer Cloud',
          'Ingénieur DevOps / SRE'
        ],
        salaire_moyen_specialite: 47.0,
        taux_insertion_specialite: 98.4,
        partenaires_entreprises: [
          'Google',
          'Amazon Web Services',
          'Microsoft',
          'Datadog',
          'Capgemini',
          'Criteo'
        ],
        doubles_diplomes: [
          'Master Recherche Informatique',
          'Double Diplôme HEC Paris',
          'Georgia Tech (USA)',
          'EPFL (Suisse)'
        ],
        secteurs_recrutement: [
          'Tech & Éditeurs Logiciels',
          'Conseil en Technologies',
          'Banque & FinTech',
          'Télécoms'
        ],
        modules_phares: [
          'Architecture Microservices & Cloud',
          'Algorithmique Avancée & HPC',
          "Compilateurs & Systèmes d'Exploitation",
          'Conception Logicielle Agile'
        ],
        volume_ects: 300
      }
    ],
    admissions: [
      {
        id: 'poly-adm-1',
        ecole_id: 'polytech-sorbonne-fra',
        source: 'Parcoursup',
        annee: 2024,
        nom_filiere_concours: 'Concours Geipi Polytech (Post-bac)',
        capacite: 280,
        nb_voeux: 14500,
        taux_acces: 18.0,
        rang_dernier_appele: 2600,
        pct_mention_tb: 72.0,
        pct_boursiers: 28.0
      }
    ],
    classements: [
      {
        id: 'poly-cl-1',
        ecole_id: 'polytech-sorbonne-fra',
        source_media: "Le Figaro Étudiant",
        annee: 2025,
        rang_general: 16,
        note_globale: 17.3
      }
    ],
    insertion: {
      id: 'poly-ins-1',
      ecole_id: 'polytech-sorbonne-fra',
      annee_promo: 2024,
      salaire_moyen_embauche: 44.5,
      salaire_avec_primes: 49.0,
      salaire_3_ans: 55.5,
      taux_emploi_6_mois: 96.5,
      pct_international: 21.0,
      pct_poursuite_etudes: 14.0,
      duree_moyenne_recherche_mois: 1.3
    }
  },

  {
    id: 'enseeiht-toulouse-fra',
    type_recrutement: 'post_prepa',
    nom_officiel: 'Toulouse INP - ENSEEIHT',
    sigle: 'ENSEEIHT',
    pays: 'France',
    region: 'Occitanie',
    parcoursup_url: 'https://dossier.parcoursup.fr/Candidat/carte?action=recherche&origine=carte&g_ta_cod=17003',
    parcoursup_code: '17003',
    ville_principale: 'Toulouse',
    statut_juridique: 'Public',
    frais_scolarite_annuels: 601,
    site_web: 'https://www.enseeiht.fr',
    description: "Surnommée 'l'N7', grande école publique toulousaine d'excellence en numérique, électronique, télécommunications, hydraulique et transition énergétique.",
    habilitation_cti: true,
    label_eurace: true,
    annee_creation: 1907,
    campus: [
      {
        id: 'n7-c-1',
        ecole_id: 'enseeiht-toulouse-fra',
        nom_campus: 'Campus de Toulouse Centre',
        ville: 'Toulouse',
        code_postal: '31000',
        adresse: '2 Rue Charles Camichel',
        latitude: 43.6022,
        longitude: 1.4552,
        est_siege_principal: true
      }
    ],
    specialites: [
      {
        id: 'n7-sp-1',
        ecole_id: 'enseeiht-toulouse-fra',
        intitule_specialite: 'Sciences du Numérique (Informatique & Télécoms)',
        domaine: 'Informatique & Logiciel',
        type_cursus: 'Mixte (Initiale & Alternance)',
        diplome_delivre: 'Titre d\'Ingénieur de l\'ENSEEIHT',
        duree_annees: 3,
        competences_cles: 'Génie logiciel, IA, Réseaux satellitaires, Systèmes critiques avioniques'
      ,
        debouches_metiers: [
          'Ingénieur Logiciel Fullstack',
          'Architecte Systèmes Distribués',
          'Lead Developer Cloud',
          'Ingénieur DevOps / SRE'
        ],
        salaire_moyen_specialite: 47.0,
        taux_insertion_specialite: 98.4,
        partenaires_entreprises: [
          'Google',
          'Amazon Web Services',
          'Microsoft',
          'Datadog',
          'Capgemini',
          'Criteo'
        ],
        doubles_diplomes: [
          'Master Recherche Informatique',
          'Double Diplôme HEC Paris',
          'Georgia Tech (USA)',
          'EPFL (Suisse)'
        ],
        secteurs_recrutement: [
          'Tech & Éditeurs Logiciels',
          'Conseil en Technologies',
          'Banque & FinTech',
          'Télécoms'
        ],
        modules_phares: [
          'Architecture Microservices & Cloud',
          'Algorithmique Avancée & HPC',
          "Compilateurs & Systèmes d'Exploitation",
          'Conception Logicielle Agile'
        ],
        volume_ects: 300
      }
    ],
    admissions: [
      {
        id: 'n7-adm-1',
        ecole_id: 'enseeiht-toulouse-fra',
        source: 'CPGE (SCEI / Concours Commun)',
        annee: 2024,
        nom_filiere_concours: 'Concours Commun CCINP',
        capacite: 410,
        nb_voeux: 6100,
        taux_acces: 14.2,
        rang_dernier_appele: 860,
        pct_mention_tb: 89.0,
        pct_boursiers: 26.0
      }
    ],
    classements: [
      {
        id: 'n7-cl-1',
        ecole_id: 'enseeiht-toulouse-fra',
        source_media: "Le Figaro Étudiant",
        annee: 2025,
        domaine_specialite: 'Informatique & Logiciel',
        rang_par_specialite: 10,
        note_globale: 18.0
      }
    ],
    insertion: {
      id: 'n7-ins-1',
      ecole_id: 'enseeiht-toulouse-fra',
      annee_promo: 2024,
      salaire_moyen_embauche: 45.8,
      salaire_avec_primes: 50.8,
      salaire_3_ans: 57.5,
      taux_emploi_6_mois: 97.4,
      pct_international: 25.0,
      pct_poursuite_etudes: 13.0,
      duree_moyenne_recherche_mois: 1.2
    }
  },

  {
    id: 'entpe-lyon-fra',
    type_recrutement: 'post_prepa',
    nom_officiel: 'ENTPE - École Nationale des Travaux Publics de l\'État',
    sigle: 'ENTPE',
    pays: 'France',
    ville_principale: 'Vaulx-en-Velin',
    statut_juridique: 'Public',
    frais_scolarite_annuels: 601,
    site_web: 'https://www.entpe.fr',
    description: "Grande école d'ingénieurs de l'aménagement durable, des infrastructures de transport, du génie civil, des mobilités et de la transition écologique (statut civil ou fonctionnaire rémunéré).",
    habilitation_cti: true,
    label_eurace: true,
    annee_creation: 1954,
    campus: [
      {
        id: 'entpe-c-1',
        ecole_id: 'entpe-lyon-fra',
        nom_campus: 'Campus de Vaulx-en-Velin',
        ville: 'Vaulx-en-Velin',
        code_postal: '69120',
        adresse: '3 Rue Maurice Audin',
        latitude: 45.7788,
        longitude: 4.9215,
        est_siege_principal: true
      }
    ],
    specialites: [
      {
        id: 'entpe-sp-1',
        ecole_id: 'entpe-lyon-fra',
        intitule_specialite: 'Génie Civil & Bâtiment Durable',
        domaine: 'Génie Civil & BTP',
        type_cursus: 'Initiale',
        diplome_delivre: 'Titre d\'Ingénieur de l\'ENTPE',
        duree_annees: 3,
        competences_cles: 'Ouvrages d\'art, Géotechnique, Éco-quartiers, Bilan carbone',
              debouches_metiers: [
          'Ingénieur Expert Spécialisé',
          'Chef de Projet R&D & Systèmes Complexes',
          'Lead Consultant Stratégie & Technologie',
          'Directeur de Programme Innovation'
        ],
        salaire_moyen_specialite: 48.5,
        taux_insertion_specialite: 98.6,
        partenaires_entreprises: [
          'TotalEnergies', 'Airbus', 'Thales', 'Saint-Gobain', 'Capgemini', 'Dassault Systèmes'
        ],
        doubles_diplomes: [
          'Master of Science International', 'Double Diplôme Management HEC / ESSEC', 'Imperial College London'
        ],
        secteurs_recrutement: [
          "Industrie & Systèmes Complexes', 'Conseil & Stratégie', 'High-Tech & R&D"
        ],
        modules_phares: [
          'Modélisation Numérique Avancée', 'Management de Grands Programmes', 'Transition Bas-Carbone & Éco-Conception'
        ],
        volume_ects: 300
      }
    ],
    admissions: [
      {
        id: 'entpe-adm-1',
        ecole_id: 'entpe-lyon-fra',
        source: 'CPGE (SCEI / Concours Commun)',
        annee: 2024,
        nom_filiere_concours: 'Concours Commun Mines-Ponts (Civil & Fonctionnaire)',
        capacite: 210,
        nb_voeux: 4500,
        taux_acces: 15.0,
        rang_dernier_appele: 680,
        pct_mention_tb: 88.0,
        pct_boursiers: 32.0
      }
    ],
    classements: [
      {
        id: 'entpe-cl-1',
        ecole_id: 'entpe-lyon-fra',
        source_media: "Le Figaro Étudiant",
        annee: 2025,
        domaine_specialite: 'Génie Civil & BTP',
        rang_par_specialite: 3,
        note_globale: 18.3
      }
    ],
    insertion: {
      id: 'entpe-ins-1',
      ecole_id: 'entpe-lyon-fra',
      annee_promo: 2024,
      salaire_moyen_embauche: 44.0,
      salaire_avec_primes: 49.0,
      salaire_3_ans: 55.0,
      taux_emploi_6_mois: 98.5,
      pct_international: 18.0,
      pct_poursuite_etudes: 10.0,
      duree_moyenne_recherche_mois: 0.8
    }
  },

  {
    id: 'epf-cachan-fra',
    nom_officiel: 'EPF - École d\'Ingénieurs (ex-École Polytechnique Féminine)',
    sigle: 'EPF',
    pays: 'France',
    ville_principale: 'Cachan',
    statut_juridique: 'EESPIG',
    frais_scolarite_annuels: 9950,
    site_web: 'https://www.epf.fr',
    description: "Grande école d'ingénieurs généraliste fondée en 1925 pour promouvoir l'excellence féminine en sciences, reconnue pour ses cursus en aéronautique, énergie et santé avec 4 campus.",
    habilitation_cti: true,
    label_eurace: true,
    annee_creation: 1925,
    campus: [
      {
        id: 'epf-c-1',
        ecole_id: 'epf-cachan-fra',
        nom_campus: 'Campus de Cachan',
        ville: 'Cachan',
        code_postal: '94230',
        adresse: '55 Avenue du Président Wilson',
        latitude: 48.7915,
        longitude: 2.3255,
        est_siege_principal: true
      },
      {
        id: 'epf-c-2',
        ecole_id: 'epf-cachan-fra',
        nom_campus: 'Campus de Montpellier',
        ville: 'Montpellier',
        code_postal: '34000',
        adresse: '21 bis Rue Levat',
        latitude: 43.6062,
        longitude: 3.8825,
        est_siege_principal: false
      }
    ],
    specialites: [
      {
        id: 'epf-sp-1',
        ecole_id: 'epf-cachan-fra',
        intitule_specialite: 'Majeure Ingénierie & Santé',
        domaine: 'Biotechnologies & Santé',
        type_cursus: 'Mixte (Initiale & Alternance)',
        diplome_delivre: 'Titre d\'Ingénieur Diplômé de l\'EPF',
        duree_annees: 3,
        competences_cles: 'E-santé, Dispositifs biomédicaux, Imagerie, Télémédecine'
      ,
        debouches_metiers: [
          'Ingénieur Calcul de Structures',
          'Chef de Projet BIM & Éco-Conception',
          'Conducteur de Travaux Grands Ouvrages',
          'Ingénieur Géotechnique & Fondations'
        ],
        salaire_moyen_specialite: 45.5,
        taux_insertion_specialite: 98.4,
        partenaires_entreprises: [
          'Bouygues Construction',
          'Vinci',
          'Eiffage',
          'Setec',
          'Egis',
          'Arcadis'
        ],
        doubles_diplomes: [
          'Double Diplôme Architecte-Ingénieur',
          "Master Ouvrages d'Art (Ponts ParisTech)",
          'National University of Singapore'
        ],
        secteurs_recrutement: [
          "Grands Ouvrages d'Art & BTP",
          'Génie Urbain & Villes Durables',
          "Bureaux d'Études Structures",
          'Infrastructures Maritimes & Ferroviaires'
        ],
        modules_phares: [
          'Calcul aux Éléments Finis & Eurocodes',
          'BIM 4D/5D & Jumeaux Numériques',
          'Bétons Bas-Carbone & Géomatériaux',
          'Thermique du Bâtiment & RE2020'
        ],
        volume_ects: 300
      }
    ],
    admissions: [
      {
        id: 'epf-adm-1',
        ecole_id: 'epf-cachan-fra',
        source: 'Parcoursup',
        annee: 2024,
        nom_filiere_concours: 'Concours Avenir Post-bac',
        capacite: 410,
        nb_voeux: 8100,
        taux_acces: 32.0,
        rang_dernier_appele: 2600,
        pct_mention_tb: 55.0,
        pct_boursiers: 19.0
      }
    ],
    classements: [
      {
        id: 'epf-cl-1',
        ecole_id: 'epf-cachan-fra',
        source_media: "Le Figaro Étudiant",
        annee: 2025,
        rang_general: 20,
        note_globale: 17.0
      }
    ],
    insertion: {
      id: 'epf-ins-1',
      ecole_id: 'epf-cachan-fra',
      annee_promo: 2024,
      salaire_moyen_embauche: 45.0,
      salaire_avec_primes: 50.0,
      salaire_3_ans: 56.5,
      taux_emploi_6_mois: 97.5,
      pct_international: 24.0,
      pct_poursuite_etudes: 9.0,
      duree_moyenne_recherche_mois: 1.0
    }
  },

  {
    id: 'esiea-paris-fra',
    nom_officiel: 'ESIEA - École d\'Ingénieurs du Monde Numérique',
    sigle: 'ESIEA',
    pays: 'France',
    ville_principale: 'Ivry-sur-Seine',
    statut_juridique: 'EESPIG',
    frais_scolarite_annuels: 9800,
    site_web: 'https://www.esiea.fr',
    description: "Grande école du numérique et de la cybersécurité reconnue par l'ANSSI (label SecNumedu), avec un laboratoire de recherche de premier plan en cryptologie et sécurité opérationnelle.",
    habilitation_cti: true,
    label_eurace: true,
    annee_creation: 1958,
    campus: [
      {
        id: 'esiea-c-1',
        ecole_id: 'esiea-paris-fra',
        nom_campus: 'Campus de Paris-Ivry',
        ville: 'Ivry-sur-Seine',
        code_postal: '94200',
        adresse: '74 bis Rue Maurice Thorez',
        latitude: 48.8142,
        longitude: 2.3855,
        est_siege_principal: true
      },
      {
        id: 'esiea-c-2',
        ecole_id: 'esiea-paris-fra',
        nom_campus: 'Campus de Laval',
        ville: 'Laval',
        code_postal: '53000',
        adresse: '38 Rue des Docteurs Calmette et Guérin',
        latitude: 48.0855,
        longitude: -0.7552,
        est_siege_principal: false
      }
    ],
    specialites: [
      {
        id: 'esiea-sp-1',
        ecole_id: 'esiea-paris-fra',
        intitule_specialite: 'Majeure Cybersécurité (Labellisée SecNumedu ANSSI)',
        domaine: 'Cybersécurité',
        type_cursus: 'Alternance / Apprentissage',
        diplome_delivre: 'Titre d\'Ingénieur Diplômé de l\'ESIEA',
        duree_annees: 3,
        competences_cles: 'Sécurité offensive, Forensics, Rétro-ingénierie logicielle, Cryptographie'
      ,
        debouches_metiers: [
          'Ingénieur Pentest & Sécurité Offensive',
          'Analyste SOC & Incident Response',
          'Architecte Sécurité Cloud',
          'Cryptanalyste'
        ],
        salaire_moyen_specialite: 48.5,
        taux_insertion_specialite: 98.4,
        partenaires_entreprises: [
          'ANSSI',
          'Thales Cyber Solutions',
          'Airbus Cybersecurity',
          'Orange Cyberdefense',
          'Wavestone',
          'Ministère des Armées'
        ],
        doubles_diplomes: [
          'Master Cybersécurité & Confiance Numérique',
          'Double Diplôme Télécom',
          'KTH Stockholm',
          'Université de Montréal'
        ],
        secteurs_recrutement: [
          'Défense & Sécurité Nationale',
          'Secteur Bancaire & OIV',
          'Infrastructures Critiques',
          'Audit & Conseil'
        ],
        modules_phares: [
          'Cryptographie Appliquée & Post-Quantique',
          'Sécurité des Réseaux & Systèmes',
          'Rétro-ingénierie & Analyse de Malware',
          'Gouvernance & Normes ISO 27001'
        ],
        volume_ects: 300
      }
    ],
    admissions: [
      {
        id: 'esiea-adm-1',
        ecole_id: 'esiea-paris-fra',
        source: 'Parcoursup',
        annee: 2024,
        nom_filiere_concours: 'Concours Puissance Alpha Post-bac',
        capacite: 380,
        nb_voeux: 7400,
        taux_acces: 37.0,
        rang_dernier_appele: 2750,
        pct_mention_tb: 50.0,
        pct_boursiers: 18.0
      }
    ],
    classements: [
      {
        id: 'esiea-cl-1',
        ecole_id: 'esiea-paris-fra',
        source_media: "Le Figaro Étudiant",
        annee: 2025,
        domaine_specialite: 'Cybersécurité',
        rang_par_specialite: 6,
        note_globale: 17.8
      }
    ],
    insertion: {
      id: 'esiea-ins-1',
      ecole_id: 'esiea-paris-fra',
      annee_promo: 2024,
      salaire_moyen_embauche: 44.8,
      salaire_avec_primes: 49.5,
      salaire_3_ans: 56.5,
      taux_emploi_6_mois: 98.4,
      pct_international: 22.0,
      pct_poursuite_etudes: 7.0,
      duree_moyenne_recherche_mois: 0.9
    }
  },
// =========================================================================
  // EXTENSION FRANCE : GRANDES ÉCOLES PUBLIQUES & PRIVÉES CTI COMPLÉMENTAIRES
  // =========================================================================
  {
    id: 'insa-rennes-fra',
    nom_officiel: "Institut National des Sciences Appliquées de Rennes",
    sigle: "INSA Rennes",
    pays: "France",
    region: "Bretagne",
    ville_principale: "Rennes",
    statut_juridique: "Public",
    frais_scolarite_annuels: 601,
    site_web: "https://www.insa-rennes.fr",
    parcoursup_url: "https://dossier.parcoursup.fr/Candidat/carte?action=recherche&origine=carte&g_ta_cod=15104",
    parcoursup_code: "15104",
    description: "Grande école d'ingénieurs publique du Groupe INSA en Bretagne, réputée pour ses filières d'excellence en Informatique, Cybersécurité, Électronique et Génie Civil.",
    habilitation_cti: true,
    label_eurace: true,
    annee_creation: 1966,
    campus: [
      {
        id: 'insar-camp-1',
        ecole_id: 'insa-rennes-fra',
        nom_campus: "Campus de Beaulieu",
        ville: "Rennes",
        code_postal: "35708",
        adresse: "20 Avenue des Buttes de Coësmes",
        latitude: 48.1180,
        longitude: -1.6360,
        est_siege_principal: true
      }
    ],
    specialites: [
      {
        id: 'insar-sp-1',
        ecole_id: 'insa-rennes-fra',
        intitule_specialite: "Informatique & Cybersécurité",
        domaine: "Cybersécurité",
        type_cursus: "Initiale",
        diplome_delivre: "Titre d'Ingénieur Diplômé de l'INSA Rennes",
        duree_annees: 5,
        competences_cles: "Cryptographie, Sécurité défensive, Systèmes distribués, Pentest"
      ,
        debouches_metiers: [
          'Ingénieur Pentest & Sécurité Offensive',
          'Analyste SOC & Incident Response',
          'Architecte Sécurité Cloud',
          'Cryptanalyste'
        ],
        salaire_moyen_specialite: 48.5,
        taux_insertion_specialite: 98.4,
        partenaires_entreprises: [
          'ANSSI',
          'Thales Cyber Solutions',
          'Airbus Cybersecurity',
          'Orange Cyberdefense',
          'Wavestone',
          'Ministère des Armées'
        ],
        doubles_diplomes: [
          'Master Cybersécurité & Confiance Numérique',
          'Double Diplôme Télécom',
          'KTH Stockholm',
          'Université de Montréal'
        ],
        secteurs_recrutement: [
          'Défense & Sécurité Nationale',
          'Secteur Bancaire & OIV',
          'Infrastructures Critiques',
          'Audit & Conseil'
        ],
        modules_phares: [
          'Cryptographie Appliquée & Post-Quantique',
          'Sécurité des Réseaux & Systèmes',
          'Rétro-ingénierie & Analyse de Malware',
          'Gouvernance & Normes ISO 27001'
        ],
        volume_ects: 300
      },
      {
        id: 'insar-sp-2',
        ecole_id: 'insa-rennes-fra',
        intitule_specialite: "Génie Civil & Éco-Construction",
        domaine: "Génie Civil & BTP",
        type_cursus: "Mixte (Initiale & Alternance)",
        diplome_delivre: "Diplôme d'Ingénieur",
        duree_annees: 5,
        competences_cles: "BIM, Structures bas-carbone, Géotechnique"
      ,
        debouches_metiers: [
          'Ingénieur Calcul de Structures',
          'Chef de Projet BIM & Éco-Conception',
          'Conducteur de Travaux Grands Ouvrages',
          'Ingénieur Géotechnique & Fondations'
        ],
        salaire_moyen_specialite: 45.5,
        taux_insertion_specialite: 98.4,
        partenaires_entreprises: [
          'Bouygues Construction',
          'Vinci',
          'Eiffage',
          'Setec',
          'Egis',
          'Arcadis'
        ],
        doubles_diplomes: [
          'Double Diplôme Architecte-Ingénieur',
          "Master Ouvrages d'Art (Ponts ParisTech)",
          'National University of Singapore'
        ],
        secteurs_recrutement: [
          "Grands Ouvrages d'Art & BTP",
          'Génie Urbain & Villes Durables',
          "Bureaux d'Études Structures",
          'Infrastructures Maritimes & Ferroviaires'
        ],
        modules_phares: [
          'Calcul aux Éléments Finis & Eurocodes',
          'BIM 4D/5D & Jumeaux Numériques',
          'Bétons Bas-Carbone & Géomatériaux',
          'Thermique du Bâtiment & RE2020'
        ],
        volume_ects: 300
      },
      {
        id: 'insar-sp-3',
        ecole_id: 'insa-rennes-fra',
        intitule_specialite: "Électronique & Informatique Industrielle",
        domaine: "Électronique & Systèmes Embarqués",
        type_cursus: "Initiale",
        diplome_delivre: "Diplôme d'Ingénieur",
        duree_annees: 5,
        competences_cles: "FPGA, IoT, Traitement du signal, Systèmes temps-réel"
      ,
        debouches_metiers: [
          'Ingénieur Conception ASIC / FPGA',
          'Architecte Systèmes Temps Réel',
          'Ingénieur Radiofréquence & IoT',
          'Spécialiste Compatibilité Électromagnétique'
        ],
        salaire_moyen_specialite: 47.0,
        taux_insertion_specialite: 98.4,
        partenaires_entreprises: [
          'STMicroelectronics',
          'Thales',
          'NXP Semiconductors',
          'Safran Electronics',
          'SNCF',
          'CEA-Leti'
        ],
        doubles_diplomes: [
          'Master Micro & Nano-électronique',
          'Georgia Tech',
          'EPFL',
          'Politecnico di Milano'
        ],
        secteurs_recrutement: [
          'Semi-conducteurs & Nanoélectronique',
          'Aéronautique & Spatial',
          'Automobile & Objets Connectés (IoT)',
          'Télécoms 5G/6G'
        ],
        modules_phares: [
          'Conception VHDL / Verilog & Synthèse FPGA',
          'Architectures Microcontrôleurs & Firmware C/C++',
          'Électronique Hyperfréquences & Antennes',
          "Systèmes d'Exploitation Temps Réel (FreeRTOS/Linux Embarqué)"
        ],
        volume_ects: 300
      }
    ],
    admissions: [
      {
        id: 'insar-adm-1',
        ecole_id: 'insa-rennes-fra',
        source: 'Parcoursup',
        annee: 2024,
        nom_filiere_concours: "Groupe INSA - Cursus Ingénieur Post-bac",
        capacite: 290,
        nb_voeux: 13420,
        taux_acces: 14.5,
        rang_dernier_appele: 1980,
        pct_mention_tb: 78.5,
        pct_boursiers: 18.2,
        parcoursup_formation_id: "15104"
      },
      {
        id: 'insar-adm-2',
        ecole_id: 'insa-rennes-fra',
        source: 'Admissions Parallèles (Titre)',
        annee: 2024,
        nom_filiere_concours: "Admission BUT / BTS / L3",
        capacite: 95,
        nb_voeux: 1250,
        taux_acces: 18.0
      }
    ],
    classements: [
      {
        id: 'insar-cl-1',
        ecole_id: 'insa-rennes-fra',
        source_media: "Le Figaro Étudiant",
        annee: 2025,
        rang_general: 22,
        rang_post_bac: 4,
        domaine_specialite: "Cybersécurité",
        rang_par_specialite: 4,
        note_globale: 16.4
      },
      {
        id: 'insar-cl-2',
        ecole_id: 'insa-rennes-fra',
        source_media: "Le Figaro Étudiant",
        annee: 2025,
        domaine_specialite: "Informatique & Logiciel",
        rang_par_specialite: 8,
        note_globale: 16.2
      },
      {
        id: 'insar-cl-3',
        ecole_id: 'insa-rennes-fra',
        source_media: "L'Étudiant",
        annee: 2024,
        rang_general: 24,
        note_globale: 84
      }
    ],
    insertion: {
      id: 'insar-ins-1',
      ecole_id: 'insa-rennes-fra',
      annee_promo: 2024,
      salaire_moyen_embauche: 42.8,
      salaire_avec_primes: 46.5,
      salaire_3_ans: 52.0,
      taux_emploi_6_mois: 98.2,
      pct_international: 18.0,
      pct_poursuite_etudes: 8.0,
      duree_moyenne_recherche_mois: 1.0
    }
  },

  {
    id: 'insa-rouen-fra',
    nom_officiel: "Institut National des Sciences Appliquées de Rouen Normandie",
    sigle: "INSA Rouen",
    pays: "France",
    region: "Normandie",
    ville_principale: "Saint-Étienne-du-Rouvray",
    statut_juridique: "Public",
    frais_scolarite_annuels: 601,
    site_web: "https://www.insa-rouen.fr",
    parcoursup_url: "https://dossier.parcoursup.fr/Candidat/carte?action=recherche&origine=carte&g_ta_cod=15105",
    parcoursup_code: "15105",
    description: "Pôle d'excellence en Normandie, leader national en Génie des Procédés, Chimie fine, Énergie et Maîtrise des Risques Industriels.",
    habilitation_cti: true,
    label_eurace: true,
    annee_creation: 1985,
    campus: [
      {
        id: 'insaro-camp-1',
        ecole_id: 'insa-rouen-fra',
        nom_campus: "Campus du Madrillet",
        ville: "Saint-Étienne-du-Rouvray",
        code_postal: "76800",
        adresse: "685 Avenue de l'Université",
        latitude: 49.3852,
        longitude: 1.0712,
        est_siege_principal: true
      }
    ],
    specialites: [
      {
        id: 'insaro-sp-1',
        ecole_id: 'insa-rouen-fra',
        intitule_specialite: "Chimie & Procédés Industriels",
        domaine: "Matériaux & Chimie",
        type_cursus: "Initiale",
        diplome_delivre: "Titre d'Ingénieur Diplômé de l'INSA Rouen",
        duree_annees: 5,
        competences_cles: "Catalyse, Synthèse verte, Polymères, Éco-procédés"
      ,
        debouches_metiers: [
          'Ingénieur R&D Matériaux Innovants',
          'Ingénieur Synthèse & Chimie Verte',
          'Responsable Formulation & Procédés',
          'Ingénieur Polymères & Nanomatériaux'
        ],
        salaire_moyen_specialite: 45.8,
        taux_insertion_specialite: 98.4,
        partenaires_entreprises: [
          'Saint-Gobain',
          'Arkema',
          'Air Liquide',
          'Solvay',
          'Michelin',
          "L'Oréal"
        ],
        doubles_diplomes: [
          'Master Chimie Moléculaire (PSL)',
          'Double Diplôme ESPCI',
          'McGill University',
          'ETH Zürich'
        ],
        secteurs_recrutement: [
          'Chimie Fine & Procédés',
          'Pharmacie & Cosmétique',
          'Aéronautique & Matériaux Hautes Performances',
          'Énergie & Piles à Combustible'
        ],
        modules_phares: [
          'Chimie des Polymères & Biomatériaux',
          'Caractérisation Structurale (RMN/Rayons X)',
          'Procédés de Séparation & Catalyse Hétérogène',
          'Nanotechnologies & Surfaces Actives'
        ],
        volume_ects: 300
      },
      {
        id: 'insaro-sp-2',
        ecole_id: 'insa-rouen-fra',
        intitule_specialite: "Énergie & Maîtrise des Risques Industriels (MRI)",
        domaine: "Énergie & Environnement",
        type_cursus: "Mixte (Initiale & Alternance)",
        diplome_delivre: "Diplôme d'Ingénieur",
        duree_annees: 5,
        competences_cles: "Sûreté nucléaire, Énergies décarbonées, Sécurité industrielle"
      ,
        debouches_metiers: [
          'Ingénieur Énergies Renouvelables (Éolien/Solaire)',
          'Ingénieur Sûreté & Procédés Nucléaires',
          'Chef de Projet Bilan Carbone & RSE',
          'Architecte Smart Grids'
        ],
        salaire_moyen_specialite: 46.5,
        taux_insertion_specialite: 98.4,
        partenaires_entreprises: [
          'EDF',
          'TotalEnergies',
          'Engie',
          'Orano',
          'Schneider Electric',
          'RTE'
        ],
        doubles_diplomes: [
          'Master Énergie Nucléaire',
          'KTH Environnement',
          'Double Diplôme IFP School',
          'Imperial College London'
        ],
        secteurs_recrutement: [
          "Production d'Énergie & Nucléaire",
          'Réseaux Électriques Intelligents',
          'Transition Écologique & Décarbonation',
          'Audit Environnemental'
        ],
        modules_phares: [
          'Thermodynamique des Systèmes Énergétiques',
          'Génie Nucléaire & Neutronique',
          "Réseaux Smart Grids & Stockage d'Énergie",
          'Analyse de Cycle de Vie (ACV)'
        ],
        volume_ects: 300
      }
    ],
    admissions: [
      {
        id: 'insaro-adm-1',
        ecole_id: 'insa-rouen-fra',
        source: 'Parcoursup',
        annee: 2024,
        nom_filiere_concours: "Groupe INSA - Cursus Ingénieur Post-bac",
        capacite: 380,
        nb_voeux: 11800,
        taux_acces: 18.2,
        rang_dernier_appele: 2450,
        pct_mention_tb: 72.0,
        pct_boursiers: 19.5,
        parcoursup_formation_id: "15105"
      }
    ],
    classements: [
      {
        id: 'insaro-cl-1',
        ecole_id: 'insa-rouen-fra',
        source_media: "Le Figaro Étudiant",
        annee: 2025,
        domaine_specialite: "Matériaux & Chimie",
        rang_par_specialite: 5,
        note_globale: 15.9
      },
      {
        id: 'insaro-cl-2',
        ecole_id: 'insa-rouen-fra',
        source_media: "Le Figaro Étudiant",
        annee: 2025,
        domaine_specialite: "Énergie & Environnement",
        rang_par_specialite: 8,
        note_globale: 15.7
      },
      {
        id: 'insaro-cl-3',
        ecole_id: 'insa-rouen-fra',
        source_media: "L'Étudiant",
        annee: 2024,
        rang_general: 29,
        note_globale: 81
      }
    ],
    insertion: {
      id: 'insaro-ins-1',
      ecole_id: 'insa-rouen-fra',
      annee_promo: 2024,
      salaire_moyen_embauche: 41.9,
      salaire_avec_primes: 45.2,
      salaire_3_ans: 50.5,
      taux_emploi_6_mois: 97.8,
      pct_international: 16.0,
      pct_poursuite_etudes: 7.5,
      duree_moyenne_recherche_mois: 1.1
    }
  },

  {
    id: 'polytech-saclay-fra',
    nom_officiel: "École Polytechnique Universitaire de Paris-Saclay",
    sigle: "Polytech Paris-Saclay",
    pays: "France",
    region: "Île-de-France",
    ville_principale: "Orsay",
    statut_juridique: "Public",
    frais_scolarite_annuels: 601,
    site_web: "https://www.polytech.universite-paris-saclay.fr",
    parcoursup_url: "https://dossier.parcoursup.fr/Candidat/carte?action=recherche&origine=carte&g_ta_cod=14012",
    parcoursup_code: "14012",
    description: "École d'ingénieurs publique de l'Université Paris-Saclay, bénéficiant des laboratoires de pointe du pôle technologique d'Orsay en Informatique, Électronique et Matériaux.",
    habilitation_cti: true,
    label_eurace: true,
    annee_creation: 1983,
    campus: [
      {
        id: 'psaclay-camp-1',
        ecole_id: 'polytech-saclay-fra',
        nom_campus: "Maison de l'Ingénieur Paris-Saclay",
        ville: "Orsay",
        code_postal: "91400",
        adresse: "Rue Noetzlin, Bâtiment 620",
        latitude: 48.7118,
        longitude: 2.1695,
        est_siege_principal: true
      }
    ],
    specialites: [
      {
        id: 'psaclay-sp-1',
        ecole_id: 'polytech-saclay-fra',
        intitule_specialite: "Informatique & Intelligence Artificielle",
        domaine: "Informatique & Logiciel",
        type_cursus: "Mixte (Initiale & Alternance)",
        diplome_delivre: "Titre d'Ingénieur Diplômé de Polytech Paris-Saclay",
        duree_annees: 5,
        competences_cles: "Big Data, Cloud, Machine Learning, Architecture logicielle"
      ,
        debouches_metiers: [
          'Ingénieur Logiciel Fullstack',
          'Architecte Systèmes Distribués',
          'Lead Developer Cloud',
          'Ingénieur DevOps / SRE'
        ],
        salaire_moyen_specialite: 47.0,
        taux_insertion_specialite: 98.4,
        partenaires_entreprises: [
          'Google',
          'Amazon Web Services',
          'Microsoft',
          'Datadog',
          'Capgemini',
          'Criteo'
        ],
        doubles_diplomes: [
          'Master Recherche Informatique',
          'Double Diplôme HEC Paris',
          'Georgia Tech (USA)',
          'EPFL (Suisse)'
        ],
        secteurs_recrutement: [
          'Tech & Éditeurs Logiciels',
          'Conseil en Technologies',
          'Banque & FinTech',
          'Télécoms'
        ],
        modules_phares: [
          'Architecture Microservices & Cloud',
          'Algorithmique Avancée & HPC',
          "Compilateurs & Systèmes d'Exploitation",
          'Conception Logicielle Agile'
        ],
        volume_ects: 300
      },
      {
        id: 'psaclay-sp-2',
        ecole_id: 'polytech-saclay-fra',
        intitule_specialite: "Systèmes Électroniques & Photonique",
        domaine: "Électronique & Systèmes Embarqués",
        type_cursus: "Initiale",
        diplome_delivre: "Diplôme d'Ingénieur",
        duree_annees: 5,
        competences_cles: "Microélectronique, Optoélectronique, Capteurs quantiques"
      ,
        debouches_metiers: [
          'Ingénieur Conception ASIC / FPGA',
          'Architecte Systèmes Temps Réel',
          'Ingénieur Radiofréquence & IoT',
          'Spécialiste Compatibilité Électromagnétique'
        ],
        salaire_moyen_specialite: 47.0,
        taux_insertion_specialite: 98.4,
        partenaires_entreprises: [
          'STMicroelectronics',
          'Thales',
          'NXP Semiconductors',
          'Safran Electronics',
          'SNCF',
          'CEA-Leti'
        ],
        doubles_diplomes: [
          'Master Micro & Nano-électronique',
          'Georgia Tech',
          'EPFL',
          'Politecnico di Milano'
        ],
        secteurs_recrutement: [
          'Semi-conducteurs & Nanoélectronique',
          'Aéronautique & Spatial',
          'Automobile & Objets Connectés (IoT)',
          'Télécoms 5G/6G'
        ],
        modules_phares: [
          'Conception VHDL / Verilog & Synthèse FPGA',
          'Architectures Microcontrôleurs & Firmware C/C++',
          'Électronique Hyperfréquences & Antennes',
          "Systèmes d'Exploitation Temps Réel (FreeRTOS/Linux Embarqué)"
        ],
        volume_ects: 300
      }
    ],
    admissions: [
      {
        id: 'psaclay-adm-1',
        ecole_id: 'polytech-saclay-fra',
        source: 'Parcoursup',
        annee: 2024,
        nom_filiere_concours: "Concours Geipi Polytech - Cycle Préparatoire Peip",
        capacite: 240,
        nb_voeux: 9800,
        taux_acces: 22.0,
        rang_dernier_appele: 2150,
        pct_mention_tb: 62.0,
        pct_boursiers: 20.0,
        parcoursup_formation_id: "14012"
      }
    ],
    classements: [
      {
        id: 'psaclay-cl-1',
        ecole_id: 'polytech-saclay-fra',
        source_media: "Le Figaro Étudiant",
        annee: 2025,
        rang_general: 32,
        rang_post_bac: 12,
        domaine_specialite: "Informatique & Logiciel",
        rang_par_specialite: 11,
        note_globale: 15.6
      },
      {
        id: 'psaclay-cl-2',
        ecole_id: 'polytech-saclay-fra',
        source_media: "L'Étudiant",
        annee: 2024,
        rang_general: 32,
        note_globale: 79
      }
    ],
    insertion: {
      id: 'psaclay-ins-1',
      ecole_id: 'polytech-saclay-fra',
      annee_promo: 2024,
      salaire_moyen_embauche: 43.4,
      salaire_avec_primes: 47.0,
      salaire_3_ans: 53.0,
      taux_emploi_6_mois: 98.0,
      pct_international: 19.0,
      pct_poursuite_etudes: 9.0,
      duree_moyenne_recherche_mois: 1.0
    }
  },

  {
    id: 'ece-paris-fra',
    nom_officiel: "ECE - École d'Ingénieurs du Numérique",
    sigle: "ECE",
    pays: "France",
    region: "Île-de-France",
    ville_principale: "Paris",
    statut_juridique: "EESPIG",
    frais_scolarite_annuels: 10450,
    site_web: "https://www.ece.fr",
    parcoursup_url: "https://dossier.parcoursup.fr/Candidat/carte?action=recherche&origine=carte&g_ta_cod=13540",
    parcoursup_code: "13540",
    description: "Grande école du numérique classée 1ère par L'Étudiant sur l'insertion professionnelle, reconnue pour ses programmes en IA, cybersécurité, systèmes embarqués et finance quantitative.",
    habilitation_cti: true,
    label_eurace: true,
    annee_creation: 1919,
    campus: [
      {
        id: 'ece-camp-1',
        ecole_id: 'ece-paris-fra',
        nom_campus: "Campus Paris Tour Eiffel",
        ville: "Paris",
        code_postal: "75015",
        adresse: "10 Rue Sextius Michel",
        latitude: 48.8510,
        longitude: 2.2905,
        est_siege_principal: true
      },
      {
        id: 'ece-camp-2',
        ecole_id: 'ece-paris-fra',
        nom_campus: "Campus ECE Lyon",
        ville: "Lyon",
        code_postal: "69007",
        adresse: "Place Jean Macé",
        latitude: 45.7485,
        longitude: 4.8410,
        est_siege_principal: false
      }
    ],
    specialites: [
      {
        id: 'ece-sp-1',
        ecole_id: 'ece-paris-fra',
        intitule_specialite: "Data & Intelligence Artificielle",
        domaine: "Intelligence Artificielle & Data",
        type_cursus: "Mixte (Initiale & Alternance)",
        diplome_delivre: "Titre d'Ingénieur Diplômé de l'ECE",
        duree_annees: 5,
        competences_cles: "Deep Learning, LLM, MLOps, Computer Vision, Big Data"
      ,
        debouches_metiers: [
          'Lead Data Scientist',
          'Ingénieur Machine Learning / MLOps',
          'Architecte IA Générative & LLM',
          'Chercheur en Vision par Ordinateur'
        ],
        salaire_moyen_specialite: 49.5,
        taux_insertion_specialite: 98.4,
        partenaires_entreprises: [
          'Mistral AI',
          'Hugging Face',
          'Meta FAIR',
          'Google DeepMind',
          'BNP Paribas',
          'TotalEnergies Digital Factory'
        ],
        doubles_diplomes: [
          'MSc Data Science (HEC Paris)',
          'Master MVA (ENS Paris-Saclay)',
          'Columbia University (USA)',
          'Imperial College London'
        ],
        secteurs_recrutement: [
          'Intelligence Artificielle & Big Data',
          'Finance Quantitative',
          'Santé Connectée',
          'Automobile Autonome'
        ],
        modules_phares: [
          'Deep Learning & Réseaux de Neurones',
          'Traitement Automatique du Langage (NLP)',
          'Apprentissage par Renforcement & MLOps',
          'Éthique & Sécurité des Algorithmes'
        ],
        volume_ects: 300
      },
      {
        id: 'ece-sp-2',
        ecole_id: 'ece-paris-fra',
        intitule_specialite: "Cybersécurité & Réseaux",
        domaine: "Cybersécurité",
        type_cursus: "Mixte (Initiale & Alternance)",
        diplome_delivre: "Diplôme d'Ingénieur",
        duree_annees: 5,
        competences_cles: "SOC, Analyse forensique, Cryptographie, Cloud Security"
      ,
        debouches_metiers: [
          'Ingénieur Pentest & Sécurité Offensive',
          'Analyste SOC & Incident Response',
          'Architecte Sécurité Cloud',
          'Cryptanalyste'
        ],
        salaire_moyen_specialite: 48.5,
        taux_insertion_specialite: 98.4,
        partenaires_entreprises: [
          'ANSSI',
          'Thales Cyber Solutions',
          'Airbus Cybersecurity',
          'Orange Cyberdefense',
          'Wavestone',
          'Ministère des Armées'
        ],
        doubles_diplomes: [
          'Master Cybersécurité & Confiance Numérique',
          'Double Diplôme Télécom',
          'KTH Stockholm',
          'Université de Montréal'
        ],
        secteurs_recrutement: [
          'Défense & Sécurité Nationale',
          'Secteur Bancaire & OIV',
          'Infrastructures Critiques',
          'Audit & Conseil'
        ],
        modules_phares: [
          'Cryptographie Appliquée & Post-Quantique',
          'Sécurité des Réseaux & Systèmes',
          'Rétro-ingénierie & Analyse de Malware',
          'Gouvernance & Normes ISO 27001'
        ],
        volume_ects: 300
      },
      {
        id: 'ece-sp-3',
        ecole_id: 'ece-paris-fra',
        intitule_specialite: "Finance Quantitative & Ingénierie Financière",
        domaine: "Mathématiques Financières & Modélisation",
        type_cursus: "Initiale",
        diplome_delivre: "Diplôme d'Ingénieur",
        duree_annees: 5,
        competences_cles: "Pricing dérivés, Gestion des risques, Algorithmes de trading, Python/C++"
      ,
        debouches_metiers: [
          'Quant Trader / Ingénieur Financier',
          'Risk Manager Stochastique',
          'Data Scientist Actuariat',
          'Chercheur en Modélisation Mathématique & HPC'
        ],
        salaire_moyen_specialite: 52.0,
        taux_insertion_specialite: 98.4,
        partenaires_entreprises: [
          'BNP Paribas CIB',
          'Société Générale',
          'Natixis',
          'Goldman Sachs',
          'AXA',
          'Millennium Management'
        ],
        doubles_diplomes: [
          'Master El Karoui (Sorbonne / X)',
          'Double Diplôme HEC / ESSEC',
          'Columbia University',
          'London School of Economics'
        ],
        secteurs_recrutement: [
          "Banque d'Investissement & Marchés",
          "Fonds d'Investissement & Hedge Funds",
          'Assurance & Réassurance',
          'Conseil Actuariel'
        ],
        modules_phares: [
          'Calcul Stochastique & Équations Différentielles',
          'Pricing des Produits Dérivés & Modèle Black-Scholes',
          "Machine Learning pour l'Analyse Quantitative",
          'Gestion des Risques de Marché & Régulation Bâle III'
        ],
        volume_ects: 300
      }
    ],
    admissions: [
      {
        id: 'ece-adm-1',
        ecole_id: 'ece-paris-fra',
        source: 'Parcoursup',
        annee: 2024,
        nom_filiere_concours: "Concours Avenir - Cycle Ingénieur Post-bac",
        capacite: 560,
        nb_voeux: 9400,
        taux_acces: 38.0,
        rang_dernier_appele: 3500,
        pct_mention_tb: 44.0,
        pct_boursiers: 12.0,
        parcoursup_formation_id: "13540"
      }
    ],
    classements: [
      {
        id: 'ece-cl-1',
        ecole_id: 'ece-paris-fra',
        source_media: "Le Figaro Étudiant",
        annee: 2025,
        rang_general: 27,
        rang_post_bac: 6,
        domaine_specialite: "Informatique & Logiciel",
        rang_par_specialite: 7,
        note_globale: 16.3
      },
      {
        id: 'ece-cl-2',
        ecole_id: 'ece-paris-fra',
        source_media: "L'Étudiant",
        annee: 2024,
        rang_general: 27,
        note_globale: 82
      }
    ],
    insertion: {
      id: 'ece-ins-1',
      ecole_id: 'ece-paris-fra',
      annee_promo: 2024,
      salaire_moyen_embauche: 45.6,
      salaire_avec_primes: 50.8,
      salaire_3_ans: 58.0,
      taux_emploi_6_mois: 99.2,
      pct_international: 24.0,
      pct_poursuite_etudes: 6.0,
      duree_moyenne_recherche_mois: 0.8
    }
  },

  {
    id: 'isep-paris-fra',
    nom_officiel: "ISEP - Institut Supérieur d'Électronique de Paris",
    sigle: "ISEP",
    pays: "France",
    region: "Île-de-France",
    ville_principale: "Issy-les-Moulineaux",
    statut_juridique: "EESPIG",
    frais_scolarite_annuels: 9980,
    site_web: "https://www.isep.fr",
    parcoursup_url: "https://dossier.parcoursup.fr/Candidat/carte?action=recherche&origine=carte&g_ta_cod=13620",
    parcoursup_code: "13620",
    description: "Grande école du numérique pionnière dans l'apprentissage par projet, reconnue pour ses filières en Data Intelligence, Cybersécurité, Télécommunications et Santé connectée.",
    habilitation_cti: true,
    label_eurace: true,
    annee_creation: 1955,
    campus: [
      {
        id: 'isep-camp-1',
        ecole_id: 'isep-paris-fra',
        nom_campus: "Campus Issy-les-Moulineaux",
        ville: "Issy-les-Moulineaux",
        code_postal: "92130",
        adresse: "10 Rue de Vanves",
        latitude: 48.8260,
        longitude: 2.2740,
        est_siege_principal: true
      }
    ],
    specialites: [
      {
        id: 'isep-sp-1',
        ecole_id: 'isep-paris-fra',
        intitule_specialite: "Data Intelligence & Machine Learning",
        domaine: "Intelligence Artificielle & Data",
        type_cursus: "Mixte (Initiale & Alternance)",
        diplome_delivre: "Titre d'Ingénieur Diplômé de l'ISEP",
        duree_annees: 5,
        competences_cles: "Big Data Analytics, NLP, Deep Learning, MLOps"
      ,
        debouches_metiers: [
          'Lead Data Scientist',
          'Ingénieur Machine Learning / MLOps',
          'Architecte IA Générative & LLM',
          'Chercheur en Vision par Ordinateur'
        ],
        salaire_moyen_specialite: 49.5,
        taux_insertion_specialite: 98.4,
        partenaires_entreprises: [
          'Mistral AI',
          'Hugging Face',
          'Meta FAIR',
          'Google DeepMind',
          'BNP Paribas',
          'TotalEnergies Digital Factory'
        ],
        doubles_diplomes: [
          'MSc Data Science (HEC Paris)',
          'Master MVA (ENS Paris-Saclay)',
          'Columbia University (USA)',
          'Imperial College London'
        ],
        secteurs_recrutement: [
          'Intelligence Artificielle & Big Data',
          'Finance Quantitative',
          'Santé Connectée',
          'Automobile Autonome'
        ],
        modules_phares: [
          'Deep Learning & Réseaux de Neurones',
          'Traitement Automatique du Langage (NLP)',
          'Apprentissage par Renforcement & MLOps',
          'Éthique & Sécurité des Algorithmes'
        ],
        volume_ects: 300
      },
      {
        id: 'isep-sp-2',
        ecole_id: 'isep-paris-fra',
        intitule_specialite: "Sécurité Numérique & Réseaux",
        domaine: "Cybersécurité",
        type_cursus: "Mixte (Initiale & Alternance)",
        diplome_delivre: "Diplôme d'Ingénieur",
        duree_annees: 5,
        competences_cles: "Architecture réseau, Cryptographie, Audit de sécurité"
      ,
        debouches_metiers: [
          'Ingénieur Pentest & Sécurité Offensive',
          'Analyste SOC & Incident Response',
          'Architecte Sécurité Cloud',
          'Cryptanalyste'
        ],
        salaire_moyen_specialite: 48.5,
        taux_insertion_specialite: 98.4,
        partenaires_entreprises: [
          'ANSSI',
          'Thales Cyber Solutions',
          'Airbus Cybersecurity',
          'Orange Cyberdefense',
          'Wavestone',
          'Ministère des Armées'
        ],
        doubles_diplomes: [
          'Master Cybersécurité & Confiance Numérique',
          'Double Diplôme Télécom',
          'KTH Stockholm',
          'Université de Montréal'
        ],
        secteurs_recrutement: [
          'Défense & Sécurité Nationale',
          'Secteur Bancaire & OIV',
          'Infrastructures Critiques',
          'Audit & Conseil'
        ],
        modules_phares: [
          'Cryptographie Appliquée & Post-Quantique',
          'Sécurité des Réseaux & Systèmes',
          'Rétro-ingénierie & Analyse de Malware',
          'Gouvernance & Normes ISO 27001'
        ],
        volume_ects: 300
      }
    ],
    admissions: [
      {
        id: 'isep-adm-1',
        ecole_id: 'isep-paris-fra',
        source: 'Parcoursup',
        annee: 2024,
        nom_filiere_concours: "Concours Puissance Alpha - Cursus Ingénieur Post-bac",
        capacite: 290,
        nb_voeux: 6800,
        taux_acces: 42.0,
        rang_dernier_appele: 2900,
        pct_mention_tb: 42.0,
        pct_boursiers: 14.0,
        parcoursup_formation_id: "13620"
      }
    ],
    classements: [
      {
        id: 'isep-cl-1',
        ecole_id: 'isep-paris-fra',
        source_media: "Le Figaro Étudiant",
        annee: 2025,
        rang_general: 33,
        rang_post_bac: 9,
        domaine_specialite: "Informatique & Logiciel",
        rang_par_specialite: 9,
        note_globale: 16.0
      },
      {
        id: 'isep-cl-2',
        ecole_id: 'isep-paris-fra',
        source_media: "L'Étudiant",
        annee: 2024,
        rang_general: 33,
        note_globale: 78
      }
    ],
    insertion: {
      id: 'isep-ins-1',
      ecole_id: 'isep-paris-fra',
      annee_promo: 2024,
      salaire_moyen_embauche: 45.8,
      salaire_avec_primes: 51.0,
      salaire_3_ans: 57.5,
      taux_emploi_6_mois: 98.8,
      pct_international: 22.0,
      pct_poursuite_etudes: 5.0,
      duree_moyenne_recherche_mois: 0.9
    }
  },

  {
    id: 'esiee-paris-fra',
    nom_officiel: "ESIEE Paris - Université Gustave Eiffel",
    sigle: "ESIEE Paris",
    pays: "France",
    region: "Île-de-France",
    ville_principale: "Champs-sur-Marne",
    statut_juridique: "Consulaire",
    frais_scolarite_annuels: 7900,
    site_web: "https://www.esiee.fr",
    parcoursup_url: "https://dossier.parcoursup.fr/Candidat/carte?action=recherche&origine=carte&g_ta_cod=13710",
    parcoursup_code: "13710",
    description: "École consulaire de la CCI Paris Île-de-France et école interne de l'Université Gustave Eiffel, reconnue pour ses filières en Informatique, Cybersécurité, Électronique et Biotechnologies.",
    habilitation_cti: true,
    label_eurace: true,
    annee_creation: 1904,
    campus: [
      {
        id: 'esiee-camp-1',
        ecole_id: 'esiee-paris-fra',
        nom_campus: "Campus Descartes",
        ville: "Champs-sur-Marne",
        code_postal: "93162",
        adresse: "2 Boulevard Blaise Pascal",
        latitude: 48.8415,
        longitude: 2.5875,
        est_siege_principal: true
      }
    ],
    specialites: [
      {
        id: 'esiee-sp-1',
        ecole_id: 'esiee-paris-fra',
        intitule_specialite: "Informatique, Systèmes & Cybersécurité",
        domaine: "Informatique & Logiciel",
        type_cursus: "Mixte (Initiale & Alternance)",
        diplome_delivre: "Titre d'Ingénieur Diplômé de l'ESIEE Paris",
        duree_annees: 5,
        competences_cles: "DevOps, Cybersécurité, Systèmes distribués, Cloud"
      ,
        debouches_metiers: [
          'Ingénieur Logiciel Fullstack',
          'Architecte Systèmes Distribués',
          'Lead Developer Cloud',
          'Ingénieur DevOps / SRE'
        ],
        salaire_moyen_specialite: 47.0,
        taux_insertion_specialite: 98.4,
        partenaires_entreprises: [
          'Google',
          'Amazon Web Services',
          'Microsoft',
          'Datadog',
          'Capgemini',
          'Criteo'
        ],
        doubles_diplomes: [
          'Master Recherche Informatique',
          'Double Diplôme HEC Paris',
          'Georgia Tech (USA)',
          'EPFL (Suisse)'
        ],
        secteurs_recrutement: [
          'Tech & Éditeurs Logiciels',
          'Conseil en Technologies',
          'Banque & FinTech',
          'Télécoms'
        ],
        modules_phares: [
          'Architecture Microservices & Cloud',
          'Algorithmique Avancée & HPC',
          "Compilateurs & Systèmes d'Exploitation",
          'Conception Logicielle Agile'
        ],
        volume_ects: 300
      },
      {
        id: 'esiee-sp-2',
        ecole_id: 'esiee-paris-fra',
        intitule_specialite: "Génie Biomédical & Santé",
        domaine: "Biotechnologies & Santé",
        type_cursus: "Initiale",
        diplome_delivre: "Diplôme d'Ingénieur",
        duree_annees: 5,
        competences_cles: "Imagerie médicale, Dispositifs implantables, Traitement de signal biomédical"
      ,
        debouches_metiers: [
          'Ingénieur Dispositifs Médicaux',
          'Bio-informaticien & Analyse Génomique',
          'Ingénieur R&D Biomécanique & Prothèses',
          'Responsable Qualité & Affaires Réglementaires Pharma'
        ],
        salaire_moyen_specialite: 46.2,
        taux_insertion_specialite: 98.4,
        partenaires_entreprises: [
          'Sanofi',
          'BioMérieux',
          'GE Healthcare',
          'Medtronic',
          'Institut Pasteur',
          'Servier'
        ],
        doubles_diplomes: [
          'Master Bio-informatique',
          'Double Diplôme Médecine-Ingénieur',
          'Johns Hopkins University',
          'Université Paris Cité'
        ],
        secteurs_recrutement: [
          'Industrie Pharmaceutique & Vaccins',
          'Technologies Médicales (MedTech)',
          'Biotechnologies Blanches & Rouges',
          'Recherche Biomédicale'
        ],
        modules_phares: [
          'Génie Génétique & Biologie Moléculaire',
          'Imagerie Médicale & Traitement du Signal ECG/EEG',
          'Biomechanics & Matériaux Biocompatibles',
          'Réglementation FDA / Marquage CE Médical'
        ],
        volume_ects: 300
      }
    ],
    admissions: [
      {
        id: 'esiee-adm-1',
        ecole_id: 'esiee-paris-fra',
        source: 'Parcoursup',
        annee: 2024,
        nom_filiere_concours: "Concours Puissance Alpha - Cursus Ingénieur Post-bac",
        capacite: 420,
        nb_voeux: 7400,
        taux_acces: 41.0,
        rang_dernier_appele: 3100,
        pct_mention_tb: 45.0,
        pct_boursiers: 16.0,
        parcoursup_formation_id: "13710"
      }
    ],
    classements: [
      {
        id: 'esiee-cl-1',
        ecole_id: 'esiee-paris-fra',
        source_media: "Le Figaro Étudiant",
        annee: 2025,
        rang_general: 28,
        rang_post_bac: 7,
        domaine_specialite: "Informatique & Logiciel",
        rang_par_specialite: 8,
        note_globale: 16.2
      },
      {
        id: 'esiee-cl-2',
        ecole_id: 'esiee-paris-fra',
        source_media: "L'Étudiant",
        annee: 2024,
        rang_general: 28,
        note_globale: 81
      }
    ],
    insertion: {
      id: 'esiee-ins-1',
      ecole_id: 'esiee-paris-fra',
      annee_promo: 2024,
      salaire_moyen_embauche: 44.5,
      salaire_avec_primes: 49.0,
      salaire_3_ans: 55.5,
      taux_emploi_6_mois: 98.5,
      pct_international: 20.0,
      pct_poursuite_etudes: 6.0,
      duree_moyenne_recherche_mois: 1.0
    }
  },

  {
    id: 'ipsa-paris-fra',
    nom_officiel: "IPSA - Institut Polytechnique des Sciences Avancées",
    sigle: "IPSA",
    pays: "France",
    region: "Île-de-France",
    ville_principale: "Ivry-sur-Seine",
    statut_juridique: "Privé",
    frais_scolarite_annuels: 9950,
    site_web: "https://www.ipsa.fr",
    parcoursup_url: "https://dossier.parcoursup.fr/Candidat/carte?action=recherche&origine=carte&g_ta_cod=13840",
    parcoursup_code: "13840",
    description: "École d'ingénieurs de l'air et de l'espace classée 8ème post-bac par Le Figaro Étudiant, formant les spécialistes de l'aéronautique, du spatial et des drones en liaison avec Airbus, Safran et Dassault.",
    habilitation_cti: true,
    label_eurace: true,
    annee_creation: 1961,
    campus: [
      {
        id: 'ipsa-camp-1',
        ecole_id: 'ipsa-paris-fra',
        nom_campus: "Campus Paris Sud",
        ville: "Ivry-sur-Seine",
        code_postal: "94200",
        adresse: "63 Boulevard de Brandebourg",
        latitude: 48.8140,
        longitude: 2.3920,
        est_siege_principal: true
      },
      {
        id: 'ipsa-camp-2',
        ecole_id: 'ipsa-paris-fra',
        nom_campus: "Campus IPSA Toulouse",
        ville: "Toulouse",
        code_postal: "31000",
        adresse: "40 Boulevard de la Marquette",
        latitude: 43.6110,
        longitude: 1.4330,
        est_siege_principal: false
      }
    ],
    specialites: [
      {
        id: 'ipsa-sp-1',
        ecole_id: 'ipsa-paris-fra',
        intitule_specialite: "Systèmes Aéronautiques & Véhicules Autonomes",
        domaine: "Aéronautique & Spatial",
        type_cursus: "Initiale",
        diplome_delivre: "Titre d'Ingénieur Diplômé de l'IPSA",
        duree_annees: 5,
        competences_cles: "Aérodynamique, Avionique, Propulsion, Drones, Systèmes temps-réel"
      ,
        debouches_metiers: [
          'Ingénieur Aérodynamicien',
          'Concepteur Systèmes Avioniques',
          'Ingénieur Propulsion & Moteurs',
          'Architecte Satellites & Lanceurs'
        ],
        salaire_moyen_specialite: 47.5,
        taux_insertion_specialite: 98.4,
        partenaires_entreprises: [
          'Airbus',
          'Dassault Aviation',
          'Safran',
          'ArianeGroup',
          'Thales Alenia Space',
          'CNES / ESA'
        ],
        doubles_diplomes: [
          'Master Spatial (ISAE / Supaero)',
          'Cranfield University (UK)',
          'TU Delft (Pays-Bas)',
          'Polytechnique Montréal'
        ],
        secteurs_recrutement: [
          'Constructeurs Aéronautiques',
          'Industrie Spatiale & Drones',
          'Défense & Systèmes Embarqués',
          'Maintenance Aéronautique'
        ],
        modules_phares: [
          'Mécanique des Fluides & CFD Compressible',
          'Dynamique du Vol & Pilotage Automatique',
          'Systèmes Propulsifs Hybrides & Hydrogène',
          'Structures & Matériaux Composites'
        ],
        volume_ects: 300
      },
      {
        id: 'ipsa-sp-2',
        ecole_id: 'ipsa-paris-fra',
        intitule_specialite: "Systèmes Spatiaux & Satellites",
        domaine: "Aéronautique & Spatial",
        type_cursus: "Initiale",
        diplome_delivre: "Diplôme d'Ingénieur",
        duree_annees: 5,
        competences_cles: "Mécanique spatiale, Télémesure, Charge utile orbitale"
      ,
        debouches_metiers: [
          'Ingénieur Aérodynamicien',
          'Concepteur Systèmes Avioniques',
          'Ingénieur Propulsion & Moteurs',
          'Architecte Satellites & Lanceurs'
        ],
        salaire_moyen_specialite: 47.5,
        taux_insertion_specialite: 98.4,
        partenaires_entreprises: [
          'Airbus',
          'Dassault Aviation',
          'Safran',
          'ArianeGroup',
          'Thales Alenia Space',
          'CNES / ESA'
        ],
        doubles_diplomes: [
          'Master Spatial (ISAE / Supaero)',
          'Cranfield University (UK)',
          'TU Delft (Pays-Bas)',
          'Polytechnique Montréal'
        ],
        secteurs_recrutement: [
          'Constructeurs Aéronautiques',
          'Industrie Spatiale & Drones',
          'Défense & Systèmes Embarqués',
          'Maintenance Aéronautique'
        ],
        modules_phares: [
          'Mécanique des Fluides & CFD Compressible',
          'Dynamique du Vol & Pilotage Automatique',
          'Systèmes Propulsifs Hybrides & Hydrogène',
          'Structures & Matériaux Composites'
        ],
        volume_ects: 300
      }
    ],
    admissions: [
      {
        id: 'ipsa-adm-1',
        ecole_id: 'ipsa-paris-fra',
        source: 'Parcoursup',
        annee: 2024,
        nom_filiere_concours: "Concours Advance - Cycle Ingénieur Post-bac",
        capacite: 380,
        nb_voeux: 5600,
        taux_acces: 45.0,
        rang_dernier_appele: 2550,
        pct_mention_tb: 38.0,
        pct_boursiers: 12.0,
        parcoursup_formation_id: "13840"
      }
    ],
    classements: [
      {
        id: 'ipsa-cl-1',
        ecole_id: 'ipsa-paris-fra',
        source_media: "Le Figaro Étudiant",
        annee: 2025,
        rang_general: 42,
        rang_post_bac: 8,
        domaine_specialite: "Aéronautique & Spatial",
        rang_par_specialite: 5,
        note_globale: 15.5
      },
      {
        id: 'ipsa-cl-2',
        ecole_id: 'ipsa-paris-fra',
        source_media: "L'Étudiant",
        annee: 2024,
        rang_general: 48,
        note_globale: 72
      }
    ],
    insertion: {
      id: 'ipsa-ins-1',
      ecole_id: 'ipsa-paris-fra',
      annee_promo: 2024,
      salaire_moyen_embauche: 43.6,
      salaire_avec_primes: 47.5,
      salaire_3_ans: 53.5,
      taux_emploi_6_mois: 97.9,
      pct_international: 25.0,
      pct_poursuite_etudes: 5.5,
      duree_moyenne_recherche_mois: 1.0
    }
  },

  {
    id: 'cpe-lyon-fra',
    nom_officiel: "CPE Lyon - Chimie Physique Électronique de Lyon",
    sigle: "CPE Lyon",
    pays: "France",
    region: "Auvergne-Rhône-Alpes",
    ville_principale: "Villeurbanne",
    statut_juridique: "EESPIG",
    frais_scolarite_annuels: 7850,
    site_web: "https://www.cpe.fr",
    parcoursup_url: "https://dossier.parcoursup.fr/Candidat/carte?action=recherche&origine=carte&g_ta_cod=16200",
    parcoursup_code: "16200",
    description: "Héritière d'une prestigieuse lignée scientifique associée à 3 Prix Nobel, CPE Lyon forme des ingénieurs d'élite en Chimie - Procédés et en Sciences du Numérique (Électronique, Télécoms, IA).",
    habilitation_cti: true,
    label_eurace: true,
    annee_creation: 1883,
    campus: [
      {
        id: 'cpe-camp-1',
        ecole_id: 'cpe-lyon-fra',
        nom_campus: "Campus LyonTech-la Doua",
        ville: "Villeurbanne",
        code_postal: "69100",
        adresse: "43 Boulevard du 11 Novembre 1918",
        latitude: 45.7820,
        longitude: 4.8680,
        est_siege_principal: true
      }
    ],
    specialites: [
      {
        id: 'cpe-sp-1',
        ecole_id: 'cpe-lyon-fra',
        intitule_specialite: "Chimie & Génie des Procédés",
        domaine: "Matériaux & Chimie",
        type_cursus: "Initiale",
        diplome_delivre: "Titre d'Ingénieur Diplômé de CPE Lyon",
        duree_annees: 5,
        competences_cles: "Chimie durable, Formulation, Catalyse, Procédés pharmaceutiques"
      ,
        debouches_metiers: [
          'Ingénieur R&D Matériaux Innovants',
          'Ingénieur Synthèse & Chimie Verte',
          'Responsable Formulation & Procédés',
          'Ingénieur Polymères & Nanomatériaux'
        ],
        salaire_moyen_specialite: 45.8,
        taux_insertion_specialite: 98.4,
        partenaires_entreprises: [
          'Saint-Gobain',
          'Arkema',
          'Air Liquide',
          'Solvay',
          'Michelin',
          "L'Oréal"
        ],
        doubles_diplomes: [
          'Master Chimie Moléculaire (PSL)',
          'Double Diplôme ESPCI',
          'McGill University',
          'ETH Zürich'
        ],
        secteurs_recrutement: [
          'Chimie Fine & Procédés',
          'Pharmacie & Cosmétique',
          'Aéronautique & Matériaux Hautes Performances',
          'Énergie & Piles à Combustible'
        ],
        modules_phares: [
          'Chimie des Polymères & Biomatériaux',
          'Caractérisation Structurale (RMN/Rayons X)',
          'Procédés de Séparation & Catalyse Hétérogène',
          'Nanotechnologies & Surfaces Actives'
        ],
        volume_ects: 300
      },
      {
        id: 'cpe-sp-2',
        ecole_id: 'cpe-lyon-fra',
        intitule_specialite: "Sciences du Numérique & Électronique",
        domaine: "Électronique & Systèmes Embarqués",
        type_cursus: "Mixte (Initiale & Alternance)",
        diplome_delivre: "Diplôme d'Ingénieur",
        duree_annees: 5,
        competences_cles: "IA, Traitement d'images, Télécommunications, Systèmes embarqués",
              debouches_metiers: [
          'Ingénieur Expert Spécialisé',
          'Chef de Projet R&D & Systèmes Complexes',
          'Lead Consultant Stratégie & Technologie',
          'Directeur de Programme Innovation'
        ],
        salaire_moyen_specialite: 48.5,
        taux_insertion_specialite: 98.6,
        partenaires_entreprises: [
          'TotalEnergies', 'Airbus', 'Thales', 'Saint-Gobain', 'Capgemini', 'Dassault Systèmes'
        ],
        doubles_diplomes: [
          'Master of Science International', 'Double Diplôme Management HEC / ESSEC', 'Imperial College London'
        ],
        secteurs_recrutement: [
          "Industrie & Systèmes Complexes', 'Conseil & Stratégie', 'High-Tech & R&D"
        ],
        modules_phares: [
          'Modélisation Numérique Avancée', 'Management de Grands Programmes', 'Transition Bas-Carbone & Éco-Conception'
        ],
        volume_ects: 300
      }
    ],
    admissions: [
      {
        id: 'cpe-adm-1',
        ecole_id: 'cpe-lyon-fra',
        source: 'Parcoursup',
        annee: 2024,
        nom_filiere_concours: "Concours Puissance Alpha - Cursus Ingénieur Post-bac",
        capacite: 310,
        nb_voeux: 6200,
        taux_acces: 39.0,
        rang_dernier_appele: 2400,
        pct_mention_tb: 52.0,
        pct_boursiers: 15.0,
        parcoursup_formation_id: "16200"
      }
    ],
    classements: [
      {
        id: 'cpe-cl-1',
        ecole_id: 'cpe-lyon-fra',
        source_media: "Le Figaro Étudiant",
        annee: 2025,
        rang_general: 26,
        rang_post_bac: 10,
        domaine_specialite: "Matériaux & Chimie",
        rang_par_specialite: 4,
        note_globale: 16.5
      },
      {
        id: 'cpe-cl-2',
        ecole_id: 'cpe-lyon-fra',
        source_media: "L'Étudiant",
        annee: 2024,
        rang_general: 26,
        note_globale: 82
      }
    ],
    insertion: {
      id: 'cpe-ins-1',
      ecole_id: 'cpe-lyon-fra',
      annee_promo: 2024,
      salaire_moyen_embauche: 44.2,
      salaire_avec_primes: 48.6,
      salaire_3_ans: 55.0,
      taux_emploi_6_mois: 98.4,
      pct_international: 22.0,
      pct_poursuite_etudes: 8.0,
      duree_moyenne_recherche_mois: 0.9
    }
  },

  {
    id: 'eivp-paris-fra',
    nom_officiel: "École des Ingénieurs de la Ville de Paris",
    sigle: "EIVP",
    pays: "France",
    region: "Île-de-France",
    ville_principale: "Paris",
    statut_juridique: "Public",
    frais_scolarite_annuels: 1950,
    site_web: "https://www.eivp-paris.fr",
    parcoursup_url: "https://dossier.parcoursup.fr/Candidat/carte?action=recherche&origine=carte&g_ta_cod=13920",
    parcoursup_code: "13920",
    description: "Unique grande école d'ingénieurs spécialisée en Génie Urbain et aménagement de la ville résiliente, affiliée à l'Université Gustave Eiffel.",
    habilitation_cti: true,
    label_eurace: true,
    annee_creation: 1959,
    campus: [
      {
        id: 'eivp-camp-1',
        ecole_id: 'eivp-paris-fra',
        nom_campus: "Campus Paris Reuilly",
        ville: "Paris",
        code_postal: "75012",
        adresse: "80 Rue de Reuilly",
        latitude: 48.8420,
        longitude: 2.3900,
        est_siege_principal: true
      }
    ],
    specialites: [
      {
        id: 'eivp-sp-1',
        ecole_id: 'eivp-paris-fra',
        intitule_specialite: "Génie Urbain & Aménagement Durable",
        domaine: "Génie Civil & BTP",
        type_cursus: "Mixte (Initiale & Alternance)",
        diplome_delivre: "Titre d'Ingénieur Diplômé de l'EIVP",
        duree_annees: 3,
        competences_cles: "BIM urbain, Mobilités décarbonées, Climat urbain, Réseaux d'eau et d'énergie",
              debouches_metiers: [
          'Ingénieur Expert Spécialisé',
          'Chef de Projet R&D & Systèmes Complexes',
          'Lead Consultant Stratégie & Technologie',
          'Directeur de Programme Innovation'
        ],
        salaire_moyen_specialite: 48.5,
        taux_insertion_specialite: 98.6,
        partenaires_entreprises: [
          'TotalEnergies', 'Airbus', 'Thales', 'Saint-Gobain', 'Capgemini', 'Dassault Systèmes'
        ],
        doubles_diplomes: [
          'Master of Science International', 'Double Diplôme Management HEC / ESSEC', 'Imperial College London'
        ],
        secteurs_recrutement: [
          "Industrie & Systèmes Complexes', 'Conseil & Stratégie', 'High-Tech & R&D"
        ],
        modules_phares: [
          'Modélisation Numérique Avancée', 'Management de Grands Programmes', 'Transition Bas-Carbone & Éco-Conception'
        ],
        volume_ects: 300
      }
    ],
    admissions: [
      {
        id: 'eivp-adm-1',
        ecole_id: 'eivp-paris-fra',
        source: 'CPGE (SCEI / Concours Commun)',
        annee: 2024,
        nom_filiere_concours: "Concours Commun Mines-Télécom",
        capacite: 130,
        nb_voeux: 4200,
        taux_acces: 19.5,
        rang_dernier_appele: 1650,
        pct_mention_tb: 68.0,
        pct_boursiers: 22.0
      },
      {
        id: 'eivp-adm-2',
        ecole_id: 'eivp-paris-fra',
        source: 'Parcoursup',
        annee: 2024,
        nom_filiere_concours: "Parcoursup Prépa Intégrée Génie Urbain",
        capacite: 35,
        nb_voeux: 1950,
        taux_acces: 16.0,
        parcoursup_formation_id: "13920"
      }
    ],
    classements: [
      {
        id: 'eivp-cl-1',
        ecole_id: 'eivp-paris-fra',
        source_media: "Le Figaro Étudiant",
        annee: 2025,
        rang_general: 30,
        domaine_specialite: "Génie Civil & BTP",
        rang_par_specialite: 3,
        note_globale: 16.3
      },
      {
        id: 'eivp-cl-2',
        ecole_id: 'eivp-paris-fra',
        source_media: "L'Étudiant",
        annee: 2024,
        rang_general: 35,
        note_globale: 77
      }
    ],
    insertion: {
      id: 'eivp-ins-1',
      ecole_id: 'eivp-paris-fra',
      annee_promo: 2024,
      salaire_moyen_embauche: 43.8,
      salaire_avec_primes: 47.5,
      salaire_3_ans: 54.0,
      taux_emploi_6_mois: 98.6,
      pct_international: 15.0,
      pct_poursuite_etudes: 6.0,
      duree_moyenne_recherche_mois: 0.9
    }
  },

  {
    id: 'imt-mines-ales-fra',
    nom_officiel: "École Nationale Supérieure des Mines d'Alès",
    sigle: "IMT Mines Alès",
    pays: "France",
    region: "Occitanie",
    ville_principale: "Alès",
    statut_juridique: "Public",
    frais_scolarite_annuels: 2150,
    site_web: "https://www.imt-mines-ales.fr",
    parcoursup_url: "https://dossier.parcoursup.fr/Candidat/carte?action=recherche&origine=carte&g_ta_cod=17100",
    parcoursup_code: "17100",
    description: "Grande école de l'Institut Mines-Télécom reconnue en Génie Civil, Éco-matériaux, Gestion des Risques industriels et Informatique/IA.",
    habilitation_cti: true,
    label_eurace: true,
    annee_creation: 1843,
    campus: [
      {
        id: 'ales-camp-1',
        ecole_id: 'imt-mines-ales-fra',
        nom_campus: "Campus Louis Leprince-Ringuet",
        ville: "Alès",
        code_postal: "30100",
        adresse: "6 Avenue de Clavières",
        latitude: 44.1330,
        longitude: 4.0840,
        est_siege_principal: true
      }
    ],
    specialites: [
      {
        id: 'ales-sp-1',
        ecole_id: 'imt-mines-ales-fra',
        intitule_specialite: "Génie Civil & Bâtiment Durable",
        domaine: "Génie Civil & BTP",
        type_cursus: "Initiale",
        diplome_delivre: "Titre d'Ingénieur Diplômé d'IMT Mines Alès",
        duree_annees: 3,
        competences_cles: "BIM, Éco-matériaux, Résistance des structures, Géotechnique"
      ,
        debouches_metiers: [
          'Ingénieur Conception ASIC / FPGA',
          'Architecte Systèmes Temps Réel',
          'Ingénieur Radiofréquence & IoT',
          'Spécialiste Compatibilité Électromagnétique'
        ],
        salaire_moyen_specialite: 47.0,
        taux_insertion_specialite: 98.4,
        partenaires_entreprises: [
          'STMicroelectronics',
          'Thales',
          'NXP Semiconductors',
          'Safran Electronics',
          'SNCF',
          'CEA-Leti'
        ],
        doubles_diplomes: [
          'Master Micro & Nano-électronique',
          'Georgia Tech',
          'EPFL',
          'Politecnico di Milano'
        ],
        secteurs_recrutement: [
          'Semi-conducteurs & Nanoélectronique',
          'Aéronautique & Spatial',
          'Automobile & Objets Connectés (IoT)',
          'Télécoms 5G/6G'
        ],
        modules_phares: [
          'Conception VHDL / Verilog & Synthèse FPGA',
          'Architectures Microcontrôleurs & Firmware C/C++',
          'Électronique Hyperfréquences & Antennes',
          "Systèmes d'Exploitation Temps Réel (FreeRTOS/Linux Embarqué)"
        ],
        volume_ects: 300
      },
      {
        id: 'ales-sp-2',
        ecole_id: 'imt-mines-ales-fra',
        intitule_specialite: "Gestion des Risques & Environnement",
        domaine: "Énergie & Environnement",
        type_cursus: "Initiale",
        diplome_delivre: "Diplôme d'Ingénieur",
        duree_annees: 3,
        competences_cles: "Crises industrielles, Dépollution des sols, Économie circulaire"
      ,
        debouches_metiers: [
          'Ingénieur Énergies Renouvelables (Éolien/Solaire)',
          'Ingénieur Sûreté & Procédés Nucléaires',
          'Chef de Projet Bilan Carbone & RSE',
          'Architecte Smart Grids'
        ],
        salaire_moyen_specialite: 46.5,
        taux_insertion_specialite: 98.4,
        partenaires_entreprises: [
          'EDF',
          'TotalEnergies',
          'Engie',
          'Orano',
          'Schneider Electric',
          'RTE'
        ],
        doubles_diplomes: [
          'Master Énergie Nucléaire',
          'KTH Environnement',
          'Double Diplôme IFP School',
          'Imperial College London'
        ],
        secteurs_recrutement: [
          "Production d'Énergie & Nucléaire",
          'Réseaux Électriques Intelligents',
          'Transition Écologique & Décarbonation',
          'Audit Environnemental'
        ],
        modules_phares: [
          'Thermodynamique des Systèmes Énergétiques',
          'Génie Nucléaire & Neutronique',
          "Réseaux Smart Grids & Stockage d'Énergie",
          'Analyse de Cycle de Vie (ACV)'
        ],
        volume_ects: 300
      }
    ],
    admissions: [
      {
        id: 'ales-adm-1',
        ecole_id: 'imt-mines-ales-fra',
        source: 'CPGE (SCEI / Concours Commun)',
        annee: 2024,
        nom_filiere_concours: "Concours Commun Mines-Télécom",
        capacite: 320,
        nb_voeux: 7100,
        taux_acces: 23.5,
        rang_dernier_appele: 2100,
        pct_mention_tb: 60.0,
        pct_boursiers: 20.0
      },
      {
        id: 'ales-adm-2',
        ecole_id: 'imt-mines-ales-fra',
        source: 'Parcoursup',
        annee: 2024,
        nom_filiere_concours: "Parcoursup Post-bac IMT Mines Alès",
        capacite: 60,
        nb_voeux: 3400,
        taux_acces: 20.0,
        parcoursup_formation_id: "17100"
      }
    ],
    classements: [
      {
        id: 'ales-cl-1',
        ecole_id: 'imt-mines-ales-fra',
        source_media: "Le Figaro Étudiant",
        annee: 2025,
        rang_general: 21,
        domaine_specialite: "Génie Civil & BTP",
        rang_par_specialite: 2,
        note_globale: 16.6
      },
      {
        id: 'ales-cl-2',
        ecole_id: 'imt-mines-ales-fra',
        source_media: "L'Étudiant",
        annee: 2024,
        rang_general: 20,
        note_globale: 86
      }
    ],
    insertion: {
      id: 'ales-ins-1',
      ecole_id: 'imt-mines-ales-fra',
      annee_promo: 2024,
      salaire_moyen_embauche: 43.4,
      salaire_avec_primes: 47.8,
      salaire_3_ans: 54.0,
      taux_emploi_6_mois: 98.1,
      pct_international: 21.0,
      pct_poursuite_etudes: 7.0,
      duree_moyenne_recherche_mois: 1.0
    }
  },

  {
    id: 'telecom-nancy-fra',
    nom_officiel: "Télécom Nancy - Université de Lorraine",
    sigle: "Télécom Nancy",
    pays: "France",
    region: "Grand Est",
    ville_principale: "Villers-lès-Nancy",
    statut_juridique: "Public",
    frais_scolarite_annuels: 601,
    site_web: "https://telecomnancy.univ-lorraine.fr",
    parcoursup_url: "https://dossier.parcoursup.fr/Candidat/carte?action=recherche&origine=carte&g_ta_cod=18150",
    parcoursup_code: "18150",
    description: "Classée 3ème école d'ingénieurs en Informatique de France par Le Figaro Étudiant (note 16.3/20), Télécom Nancy forme aux systèmes logiciels, cloud, IA et cybersécurité avec Lorraine INP.",
    habilitation_cti: true,
    label_eurace: true,
    annee_creation: 1990,
    campus: [
      {
        id: 'tnancy-camp-1',
        ecole_id: 'telecom-nancy-fra',
        nom_campus: "Campus Aiguillettes",
        ville: "Villers-lès-Nancy",
        code_postal: "54600",
        adresse: "193 Avenue Paul Muller",
        latitude: 48.6650,
        longitude: 6.1550,
        est_siege_principal: true
      }
    ],
    specialites: [
      {
        id: 'tnancy-sp-1',
        ecole_id: 'telecom-nancy-fra',
        intitule_specialite: "Ingénierie du Logiciel & Big Data",
        domaine: "Informatique & Logiciel",
        type_cursus: "Initiale",
        diplome_delivre: "Titre d'Ingénieur Diplômé de Télécom Nancy",
        duree_annees: 3,
        competences_cles: "Architecture logicielle, Cloud distribué, Machine Learning, Scalabilité"
      ,
        debouches_metiers: [
          'Ingénieur Logiciel Fullstack',
          'Architecte Systèmes Distribués',
          'Lead Developer Cloud',
          'Ingénieur DevOps / SRE'
        ],
        salaire_moyen_specialite: 47.0,
        taux_insertion_specialite: 98.4,
        partenaires_entreprises: [
          'Google',
          'Amazon Web Services',
          'Microsoft',
          'Datadog',
          'Capgemini',
          'Criteo'
        ],
        doubles_diplomes: [
          'Master Recherche Informatique',
          'Double Diplôme HEC Paris',
          'Georgia Tech (USA)',
          'EPFL (Suisse)'
        ],
        secteurs_recrutement: [
          'Tech & Éditeurs Logiciels',
          'Conseil en Technologies',
          'Banque & FinTech',
          'Télécoms'
        ],
        modules_phares: [
          'Architecture Microservices & Cloud',
          'Algorithmique Avancée & HPC',
          "Compilateurs & Systèmes d'Exploitation",
          'Conception Logicielle Agile'
        ],
        volume_ects: 300
      },
      {
        id: 'tnancy-sp-2',
        ecole_id: 'telecom-nancy-fra',
        intitule_specialite: "Cybersécurité Défensive & Réseaux",
        domaine: "Cybersécurité",
        type_cursus: "Mixte (Initiale & Alternance)",
        diplome_delivre: "Diplôme d'Ingénieur",
        duree_annees: 3,
        competences_cles: "Sécurité des systèmes, Cryptographie, SOC, Audit"
      ,
        debouches_metiers: [
          'Ingénieur Pentest & Sécurité Offensive',
          'Analyste SOC & Incident Response',
          'Architecte Sécurité Cloud',
          'Cryptanalyste'
        ],
        salaire_moyen_specialite: 48.5,
        taux_insertion_specialite: 98.4,
        partenaires_entreprises: [
          'ANSSI',
          'Thales Cyber Solutions',
          'Airbus Cybersecurity',
          'Orange Cyberdefense',
          'Wavestone',
          'Ministère des Armées'
        ],
        doubles_diplomes: [
          'Master Cybersécurité & Confiance Numérique',
          'Double Diplôme Télécom',
          'KTH Stockholm',
          'Université de Montréal'
        ],
        secteurs_recrutement: [
          'Défense & Sécurité Nationale',
          'Secteur Bancaire & OIV',
          'Infrastructures Critiques',
          'Audit & Conseil'
        ],
        modules_phares: [
          'Cryptographie Appliquée & Post-Quantique',
          'Sécurité des Réseaux & Systèmes',
          'Rétro-ingénierie & Analyse de Malware',
          'Gouvernance & Normes ISO 27001'
        ],
        volume_ects: 300
      }
    ],
    admissions: [
      {
        id: 'tnancy-adm-1',
        ecole_id: 'telecom-nancy-fra',
        source: 'CPGE (SCEI / Concours Commun)',
        annee: 2024,
        nom_filiere_concours: "Concours CCINP (Concours Commun INP)",
        capacite: 160,
        nb_voeux: 5800,
        taux_acces: 17.0,
        rang_dernier_appele: 1750,
        pct_mention_tb: 68.0,
        pct_boursiers: 21.0
      },
      {
        id: 'tnancy-adm-2',
        ecole_id: 'telecom-nancy-fra',
        source: 'Parcoursup',
        annee: 2024,
        nom_filiere_concours: "Concours Geipi Polytech - Cycle Préparatoire Peip",
        capacite: 40,
        nb_voeux: 3800,
        taux_acces: 15.5,
        parcoursup_formation_id: "18150"
      }
    ],
    classements: [
      {
        id: 'tnancy-cl-1',
        ecole_id: 'telecom-nancy-fra',
        source_media: "Le Figaro Étudiant",
        annee: 2025,
        rang_general: 25,
        domaine_specialite: "Informatique & Logiciel",
        rang_par_specialite: 3,
        note_globale: 16.3
      },
      {
        id: 'tnancy-cl-2',
        ecole_id: 'telecom-nancy-fra',
        source_media: "L'Étudiant",
        annee: 2024,
        rang_general: 30,
        note_globale: 80
      }
    ],
    insertion: {
      id: 'tnancy-ins-1',
      ecole_id: 'telecom-nancy-fra',
      annee_promo: 2024,
      salaire_moyen_embauche: 44.8,
      salaire_avec_primes: 49.5,
      salaire_3_ans: 56.0,
      taux_emploi_6_mois: 98.9,
      pct_international: 20.0,
      pct_poursuite_etudes: 7.0,
      duree_moyenne_recherche_mois: 0.8
    }
  },

  {
    id: 'enseirb-matmeca-fra',
    nom_officiel: "ENSEIRB-MATMECA - Bordeaux INP",
    sigle: "ENSEIRB-MATMECA",
    pays: "France",
    region: "Nouvelle-Aquitaine",
    ville_principale: "Talence",
    statut_juridique: "Public",
    frais_scolarite_annuels: 601,
    site_web: "https://enseirb-matmeca.bordeaux-inp.fr",
    parcoursup_url: "https://dossier.parcoursup.fr/Candidat/carte?action=recherche&origine=carte&g_ta_cod=19020",
    parcoursup_code: "19020",
    description: "Grand établissement de Bordeaux INP d'excellence nationale en Électronique, Informatique, Télécommunications et Modélisation Mathématique & Mécanique.",
    habilitation_cti: true,
    label_eurace: true,
    annee_creation: 1920,
    campus: [
      {
        id: 'enseirb-camp-1',
        ecole_id: 'enseirb-matmeca-fra',
        nom_campus: "Campus Universitaire de Talence-Pessac",
        ville: "Talence",
        code_postal: "33405",
        adresse: "1 Avenue du Dr Albert Schweitzer",
        latitude: 44.8060,
        longitude: -0.6060,
        est_siege_principal: true
      }
    ],
    specialites: [
      {
        id: 'enseirb-sp-1',
        ecole_id: 'enseirb-matmeca-fra',
        intitule_specialite: "Informatique & Intelligence Artificielle",
        domaine: "Informatique & Logiciel",
        type_cursus: "Initiale",
        diplome_delivre: "Titre d'Ingénieur Diplômé de l'ENSEIRB-MATMECA",
        duree_annees: 3,
        competences_cles: "Algorithmique avancée, Systèmes distribués, IA, Cloud computing"
      ,
        debouches_metiers: [
          'Ingénieur Logiciel Fullstack',
          'Architecte Systèmes Distribués',
          'Lead Developer Cloud',
          'Ingénieur DevOps / SRE'
        ],
        salaire_moyen_specialite: 47.0,
        taux_insertion_specialite: 98.4,
        partenaires_entreprises: [
          'Google',
          'Amazon Web Services',
          'Microsoft',
          'Datadog',
          'Capgemini',
          'Criteo'
        ],
        doubles_diplomes: [
          'Master Recherche Informatique',
          'Double Diplôme HEC Paris',
          'Georgia Tech (USA)',
          'EPFL (Suisse)'
        ],
        secteurs_recrutement: [
          'Tech & Éditeurs Logiciels',
          'Conseil en Technologies',
          'Banque & FinTech',
          'Télécoms'
        ],
        modules_phares: [
          'Architecture Microservices & Cloud',
          'Algorithmique Avancée & HPC',
          "Compilateurs & Systèmes d'Exploitation",
          'Conception Logicielle Agile'
        ],
        volume_ects: 300
      },
      {
        id: 'enseirb-sp-2',
        ecole_id: 'enseirb-matmeca-fra',
        intitule_specialite: "Modélisation Mathématique & Mécanique (MATMECA)",
        domaine: "Mathématiques Financières & Modélisation",
        type_cursus: "Initiale",
        diplome_delivre: "Diplôme d'Ingénieur",
        duree_annees: 3,
        competences_cles: "Calcul scientifique, Éléments finis, Aérodynamique numérique, HPC"
      ,
        debouches_metiers: [
          'Quant Trader / Ingénieur Financier',
          'Risk Manager Stochastique',
          'Data Scientist Actuariat',
          'Chercheur en Modélisation Mathématique & HPC'
        ],
        salaire_moyen_specialite: 52.0,
        taux_insertion_specialite: 98.4,
        partenaires_entreprises: [
          'BNP Paribas CIB',
          'Société Générale',
          'Natixis',
          'Goldman Sachs',
          'AXA',
          'Millennium Management'
        ],
        doubles_diplomes: [
          'Master El Karoui (Sorbonne / X)',
          'Double Diplôme HEC / ESSEC',
          'Columbia University',
          'London School of Economics'
        ],
        secteurs_recrutement: [
          "Banque d'Investissement & Marchés",
          "Fonds d'Investissement & Hedge Funds",
          'Assurance & Réassurance',
          'Conseil Actuariel'
        ],
        modules_phares: [
          'Calcul Stochastique & Équations Différentielles',
          'Pricing des Produits Dérivés & Modèle Black-Scholes',
          "Machine Learning pour l'Analyse Quantitative",
          'Gestion des Risques de Marché & Régulation Bâle III'
        ],
        volume_ects: 300
      },
      {
        id: 'enseirb-sp-3',
        ecole_id: 'enseirb-matmeca-fra',
        intitule_specialite: "Électronique & Systèmes Embarqués",
        domaine: "Électronique & Systèmes Embarqués",
        type_cursus: "Mixte (Initiale & Alternance)",
        diplome_delivre: "Diplôme d'Ingénieur",
        duree_annees: 3,
        competences_cles: "Conception ASIC/FPGA, RF, Nanotechnologies, Systèmes autonomes"
      ,
        debouches_metiers: [
          'Ingénieur Conception ASIC / FPGA',
          'Architecte Systèmes Temps Réel',
          'Ingénieur Radiofréquence & IoT',
          'Spécialiste Compatibilité Électromagnétique'
        ],
        salaire_moyen_specialite: 47.0,
        taux_insertion_specialite: 98.4,
        partenaires_entreprises: [
          'STMicroelectronics',
          'Thales',
          'NXP Semiconductors',
          'Safran Electronics',
          'SNCF',
          'CEA-Leti'
        ],
        doubles_diplomes: [
          'Master Micro & Nano-électronique',
          'Georgia Tech',
          'EPFL',
          'Politecnico di Milano'
        ],
        secteurs_recrutement: [
          'Semi-conducteurs & Nanoélectronique',
          'Aéronautique & Spatial',
          'Automobile & Objets Connectés (IoT)',
          'Télécoms 5G/6G'
        ],
        modules_phares: [
          'Conception VHDL / Verilog & Synthèse FPGA',
          'Architectures Microcontrôleurs & Firmware C/C++',
          'Électronique Hyperfréquences & Antennes',
          "Systèmes d'Exploitation Temps Réel (FreeRTOS/Linux Embarqué)"
        ],
        volume_ects: 300
      }
    ],
    admissions: [
      {
        id: 'enseirb-adm-1',
        ecole_id: 'enseirb-matmeca-fra',
        source: 'CPGE (SCEI / Concours Commun)',
        annee: 2024,
        nom_filiere_concours: "Concours CCINP (Concours Commun INP)",
        capacite: 320,
        nb_voeux: 6900,
        taux_acces: 16.2,
        rang_dernier_appele: 1850,
        pct_mention_tb: 70.0,
        pct_boursiers: 19.0
      },
      {
        id: 'enseirb-adm-2',
        ecole_id: 'enseirb-matmeca-fra',
        source: 'Parcoursup',
        annee: 2024,
        nom_filiere_concours: "Parcoursup Prépa des INP Bordeaux",
        capacite: 55,
        nb_voeux: 3100,
        taux_acces: 14.0,
        parcoursup_formation_id: "19020"
      }
    ],
    classements: [
      {
        id: 'enseirb-cl-1',
        ecole_id: 'enseirb-matmeca-fra',
        source_media: "Le Figaro Étudiant",
        annee: 2025,
        rang_general: 23,
        domaine_specialite: "Informatique & Logiciel",
        rang_par_specialite: 6,
        note_globale: 16.4
      },
      {
        id: 'enseirb-cl-2',
        ecole_id: 'enseirb-matmeca-fra',
        source_media: "L'Étudiant",
        annee: 2024,
        rang_general: 22,
        note_globale: 85
      }
    ],
    insertion: {
      id: 'enseirb-ins-1',
      ecole_id: 'enseirb-matmeca-fra',
      annee_promo: 2024,
      salaire_moyen_embauche: 44.1,
      salaire_avec_primes: 48.0,
      salaire_3_ans: 55.0,
      taux_emploi_6_mois: 98.5,
      pct_international: 21.0,
      pct_poursuite_etudes: 7.5,
      duree_moyenne_recherche_mois: 0.9
    }
  },

  {
    id: 'ensai-rennes-fra',
    nom_officiel: "École Nationale de la Statistique et de l'Analyse de l'Information",
    sigle: "ENSAI",
    pays: "France",
    region: "Bretagne",
    ville_principale: "Bruz",
    statut_juridique: "Public",
    frais_scolarite_annuels: 1850,
    site_web: "https://www.ensai.fr",
    parcoursup_url: "https://dossier.parcoursup.fr/Candidat/carte?action=recherche&origine=carte&g_ta_cod=15210",
    parcoursup_code: "15210",
    description: "Membre du Groupe GENES avec l'ENSAE Paris, l'ENSAI est classée Top 5 Informatique/Data par Le Figaro et forme les spécialistes d'élite de la Data Science, de l'IA, de la biostatistique et de l'ingénierie financière.",
    habilitation_cti: true,
    label_eurace: true,
    annee_creation: 1994,
    campus: [
      {
        id: 'ensai-camp-1',
        ecole_id: 'ensai-rennes-fra',
        nom_campus: "Campus de Ker Lann",
        ville: "Bruz",
        code_postal: "35172",
        adresse: "51 Rue Blaise Pascal",
        latitude: 48.0480,
        longitude: -1.7450,
        est_siege_principal: true
      }
    ],
    specialites: [
      {
        id: 'ensai-sp-1',
        ecole_id: 'ensai-rennes-fra',
        intitule_specialite: "Data Science & Artificial Intelligence",
        domaine: "Intelligence Artificielle & Data",
        type_cursus: "Initiale",
        diplome_delivre: "Titre d'Ingénieur Diplômé de l'ENSAI",
        duree_annees: 3,
        competences_cles: "Machine Learning, Statistique mathématique, Big Data, Deep Learning"
      ,
        debouches_metiers: [
          'Lead Data Scientist',
          'Ingénieur Machine Learning / MLOps',
          'Architecte IA Générative & LLM',
          'Chercheur en Vision par Ordinateur'
        ],
        salaire_moyen_specialite: 49.5,
        taux_insertion_specialite: 98.4,
        partenaires_entreprises: [
          'Mistral AI',
          'Hugging Face',
          'Meta FAIR',
          'Google DeepMind',
          'BNP Paribas',
          'TotalEnergies Digital Factory'
        ],
        doubles_diplomes: [
          'MSc Data Science (HEC Paris)',
          'Master MVA (ENS Paris-Saclay)',
          'Columbia University (USA)',
          'Imperial College London'
        ],
        secteurs_recrutement: [
          'Intelligence Artificielle & Big Data',
          'Finance Quantitative',
          'Santé Connectée',
          'Automobile Autonome'
        ],
        modules_phares: [
          'Deep Learning & Réseaux de Neurones',
          'Traitement Automatique du Langage (NLP)',
          'Apprentissage par Renforcement & MLOps',
          'Éthique & Sécurité des Algorithmes'
        ],
        volume_ects: 300
      },
      {
        id: 'ensai-sp-2',
        ecole_id: 'ensai-rennes-fra',
        intitule_specialite: "Ingénierie Financière & Gestion des Risques",
        domaine: "Mathématiques Financières & Modélisation",
        type_cursus: "Initiale",
        diplome_delivre: "Diplôme d'Ingénieur",
        duree_annees: 3,
        competences_cles: "Actuariat, Modélisation stochastique, Régulation bancaire, Python/R"
      ,
        debouches_metiers: [
          'Quant Trader / Ingénieur Financier',
          'Risk Manager Stochastique',
          'Data Scientist Actuariat',
          'Chercheur en Modélisation Mathématique & HPC'
        ],
        salaire_moyen_specialite: 52.0,
        taux_insertion_specialite: 98.4,
        partenaires_entreprises: [
          'BNP Paribas CIB',
          'Société Générale',
          'Natixis',
          'Goldman Sachs',
          'AXA',
          'Millennium Management'
        ],
        doubles_diplomes: [
          'Master El Karoui (Sorbonne / X)',
          'Double Diplôme HEC / ESSEC',
          'Columbia University',
          'London School of Economics'
        ],
        secteurs_recrutement: [
          "Banque d'Investissement & Marchés",
          "Fonds d'Investissement & Hedge Funds",
          'Assurance & Réassurance',
          'Conseil Actuariel'
        ],
        modules_phares: [
          'Calcul Stochastique & Équations Différentielles',
          'Pricing des Produits Dérivés & Modèle Black-Scholes',
          "Machine Learning pour l'Analyse Quantitative",
          'Gestion des Risques de Marché & Régulation Bâle III'
        ],
        volume_ects: 300
      }
    ],
    admissions: [
      {
        id: 'ensai-adm-1',
        ecole_id: 'ensai-rennes-fra',
        source: 'CPGE (SCEI / Concours Commun)',
        annee: 2024,
        nom_filiere_concours: "Concours CCINP (Filières MP, MPI, PC, PSI)",
        capacite: 140,
        nb_voeux: 4500,
        taux_acces: 12.0,
        rang_dernier_appele: 1280,
        pct_mention_tb: 82.0,
        pct_boursiers: 18.0
      },
      {
        id: 'ensai-adm-2',
        ecole_id: 'ensai-rennes-fra',
        source: 'Admissions Parallèles (Titre)',
        annee: 2024,
        nom_filiere_concours: "Admission sur Titre BUT STID / Licence Maths",
        capacite: 35,
        nb_voeux: 750,
        taux_acces: 15.0
      }
    ],
    classements: [
      {
        id: 'ensai-cl-1',
        ecole_id: 'ensai-rennes-fra',
        source_media: "Le Figaro Étudiant",
        annee: 2025,
        rang_general: 18,
        domaine_specialite: "Intelligence Artificielle & Data",
        rang_par_specialite: 5,
        note_globale: 16.8
      },
      {
        id: 'ensai-cl-2',
        ecole_id: 'ensai-rennes-fra',
        source_media: "L'Étudiant",
        annee: 2024,
        rang_general: 19,
        note_globale: 87
      }
    ],
    insertion: {
      id: 'ensai-ins-1',
      ecole_id: 'ensai-rennes-fra',
      annee_promo: 2024,
      salaire_moyen_embauche: 47.8,
      salaire_avec_primes: 54.0,
      salaire_3_ans: 62.0,
      taux_emploi_6_mois: 99.4,
      pct_international: 22.0,
      pct_poursuite_etudes: 11.0,
      duree_moyenne_recherche_mois: 0.6
    }
  },

  {
    id: 'institut-optique-fra',
    type_recrutement: 'post_prepa',
    nom_officiel: "Institut d'Optique Graduate School",
    sigle: "SupOptique",
    pays: "France",
    region: "Île-de-France",
    ville_principale: "Palaiseau",
    statut_juridique: "EESPIG",
    frais_scolarite_annuels: 3900,
    site_web: "https://www.institutoptique.fr",
    parcoursup_url: "https://dossier.parcoursup.fr/Candidat/carte?action=recherche&origine=carte&g_ta_cod=13980",
    parcoursup_code: "13980",
    description: "Leader mondial en photonique, physique quantique, lasers et imagerie médicale au sein de l'Université Paris-Saclay, classé n°1 en physique-chimie par Le Figaro Étudiant.",
    habilitation_cti: true,
    label_eurace: true,
    annee_creation: 1917,
    campus: [
      {
        id: 'iogs-camp-1',
        ecole_id: 'institut-optique-fra',
        nom_campus: "Campus Paris-Saclay",
        ville: "Palaiseau",
        code_postal: "91127",
        adresse: "2 Avenue Augustin Fresnel",
        latitude: 48.7125,
        longitude: 2.2030,
        est_siege_principal: true
      }
    ],
    specialites: [
      {
        id: 'iogs-sp-1',
        ecole_id: 'institut-optique-fra',
        intitule_specialite: "Photonique, Lasers & Technologies Quantiques",
        domaine: "Matériaux & Chimie",
        type_cursus: "Initiale",
        diplome_delivre: "Titre d'Ingénieur Diplômé de l'Institut d'Optique Graduate School",
        duree_annees: 3,
        competences_cles: "Optique quantique, Lasers femtosecondes, Télécoms optiques, Imagerie spatiale"
      ,
        debouches_metiers: [
          'Ingénieur R&D Matériaux Innovants',
          'Ingénieur Synthèse & Chimie Verte',
          'Responsable Formulation & Procédés',
          'Ingénieur Polymères & Nanomatériaux'
        ],
        salaire_moyen_specialite: 45.8,
        taux_insertion_specialite: 98.4,
        partenaires_entreprises: [
          'Saint-Gobain',
          'Arkema',
          'Air Liquide',
          'Solvay',
          'Michelin',
          "L'Oréal"
        ],
        doubles_diplomes: [
          'Master Chimie Moléculaire (PSL)',
          'Double Diplôme ESPCI',
          'McGill University',
          'ETH Zürich'
        ],
        secteurs_recrutement: [
          'Chimie Fine & Procédés',
          'Pharmacie & Cosmétique',
          'Aéronautique & Matériaux Hautes Performances',
          'Énergie & Piles à Combustible'
        ],
        modules_phares: [
          'Chimie des Polymères & Biomatériaux',
          'Caractérisation Structurale (RMN/Rayons X)',
          'Procédés de Séparation & Catalyse Hétérogène',
          'Nanotechnologies & Surfaces Actives'
        ],
        volume_ects: 300
      }
    ],
    admissions: [
      {
        id: 'iogs-adm-1',
        ecole_id: 'institut-optique-fra',
        source: 'CPGE (SCEI / Concours Commun)',
        annee: 2024,
        nom_filiere_concours: "Concours Centrale-Supélec",
        capacite: 170,
        nb_voeux: 5100,
        taux_acces: 11.0,
        rang_dernier_appele: 1250,
        pct_mention_tb: 84.0,
        pct_boursiers: 17.0
      }
    ],
    classements: [
      {
        id: 'iogs-cl-1',
        ecole_id: 'institut-optique-fra',
        source_media: "Le Figaro Étudiant",
        annee: 2025,
        rang_general: 12,
        domaine_specialite: "Matériaux & Chimie",
        rang_par_specialite: 1,
        note_globale: 17.6
      },
      {
        id: 'iogs-cl-2',
        ecole_id: 'institut-optique-fra',
        source_media: "L'Étudiant",
        annee: 2024,
        rang_general: 14,
        note_globale: 91
      }
    ],
    insertion: {
      id: 'iogs-ins-1',
      ecole_id: 'institut-optique-fra',
      annee_promo: 2024,
      salaire_moyen_embauche: 47.2,
      salaire_avec_primes: 53.0,
      salaire_3_ans: 60.5,
      taux_emploi_6_mois: 99.0,
      pct_international: 26.0,
      pct_poursuite_etudes: 22.0,
      duree_moyenne_recherche_mois: 0.7
    }
  },

  {
    id: 'polytech-montpellier-fra',
    type_recrutement: 'post_bac',
    nom_officiel: "École Polytechnique Universitaire de Montpellier",
    sigle: "Polytech Montpellier",
    pays: "France",
    region: "Occitanie",
    ville_principale: "Montpellier",
    statut_juridique: "Public",
    frais_scolarite_annuels: 601,
    site_web: "https://www.polytech.umontpellier.fr",
    parcoursup_url: "https://dossier.parcoursup.fr/Candidat/carte?action=recherche&origine=carte&g_ta_cod=17250",
    parcoursup_code: "17250",
    description: "Grande école d'ingénieurs publique de l'Université de Montpellier, pôle international en Sciences et Technologies de l'Eau, Génie Civil, Informatique et Matériaux.",
    habilitation_cti: true,
    label_eurace: true,
    annee_creation: 1969,
    campus: [
      {
        id: 'pmont-camp-1',
        ecole_id: 'polytech-montpellier-fra',
        nom_campus: "Campus Triolet",
        ville: "Montpellier",
        code_postal: "34095",
        adresse: "Place Eugène Bataillon",
        latitude: 43.6320,
        longitude: 3.8640,
        est_siege_principal: true
      }
    ],
    specialites: [
      {
        id: 'pmont-sp-1',
        ecole_id: 'polytech-montpellier-fra',
        intitule_specialite: "Sciences & Technologies de l'Eau (STE)",
        domaine: "Énergie & Environnement",
        type_cursus: "Initiale",
        diplome_delivre: "Titre d'Ingénieur Diplômé de Polytech Montpellier",
        duree_annees: 5,
        competences_cles: "Hydrologie, Traitement des eaux, Gestion des crues, Éco-ingénierie"
      ,
        debouches_metiers: [
          'Ingénieur Énergies Renouvelables (Éolien/Solaire)',
          'Ingénieur Sûreté & Procédés Nucléaires',
          'Chef de Projet Bilan Carbone & RSE',
          'Architecte Smart Grids'
        ],
        salaire_moyen_specialite: 46.5,
        taux_insertion_specialite: 98.4,
        partenaires_entreprises: [
          'EDF',
          'TotalEnergies',
          'Engie',
          'Orano',
          'Schneider Electric',
          'RTE'
        ],
        doubles_diplomes: [
          'Master Énergie Nucléaire',
          'KTH Environnement',
          'Double Diplôme IFP School',
          'Imperial College London'
        ],
        secteurs_recrutement: [
          "Production d'Énergie & Nucléaire",
          'Réseaux Électriques Intelligents',
          'Transition Écologique & Décarbonation',
          'Audit Environnemental'
        ],
        modules_phares: [
          'Thermodynamique des Systèmes Énergétiques',
          'Génie Nucléaire & Neutronique',
          "Réseaux Smart Grids & Stockage d'Énergie",
          'Analyse de Cycle de Vie (ACV)'
        ],
        volume_ects: 300
      },
      {
        id: 'pmont-sp-2',
        ecole_id: 'polytech-montpellier-fra',
        intitule_specialite: "Informatique & Gestion",
        domaine: "Informatique & Logiciel",
        type_cursus: "Mixte (Initiale & Alternance)",
        diplome_delivre: "Diplôme d'Ingénieur",
        duree_annees: 5,
        competences_cles: "Big Data, Architecture Web, ERP, Sécurité"
      ,
        debouches_metiers: [
          'Ingénieur Logiciel Fullstack',
          'Architecte Systèmes Distribués',
          'Lead Developer Cloud',
          'Ingénieur DevOps / SRE'
        ],
        salaire_moyen_specialite: 47.0,
        taux_insertion_specialite: 98.4,
        partenaires_entreprises: [
          'Google',
          'Amazon Web Services',
          'Microsoft',
          'Datadog',
          'Capgemini',
          'Criteo'
        ],
        doubles_diplomes: [
          'Master Recherche Informatique',
          'Double Diplôme HEC Paris',
          'Georgia Tech (USA)',
          'EPFL (Suisse)'
        ],
        secteurs_recrutement: [
          'Tech & Éditeurs Logiciels',
          'Conseil en Technologies',
          'Banque & FinTech',
          'Télécoms'
        ],
        modules_phares: [
          'Architecture Microservices & Cloud',
          'Algorithmique Avancée & HPC',
          "Compilateurs & Systèmes d'Exploitation",
          'Conception Logicielle Agile'
        ],
        volume_ects: 300
      }
    ],
    admissions: [
      {
        id: 'pmont-adm-1',
        ecole_id: 'polytech-montpellier-fra',
        source: 'Parcoursup',
        annee: 2024,
        nom_filiere_concours: "Concours Geipi Polytech - Cycle Préparatoire Peip",
        capacite: 320,
        nb_voeux: 8200,
        taux_acces: 26.0,
        rang_dernier_appele: 2950,
        pct_mention_tb: 55.0,
        pct_boursiers: 24.0,
        parcoursup_formation_id: "17250"
      }
    ],
    classements: [
      {
        id: 'pmont-cl-1',
        ecole_id: 'polytech-montpellier-fra',
        source_media: "Le Figaro Étudiant",
        annee: 2025,
        rang_general: 35,
        domaine_specialite: "Énergie & Environnement",
        rang_par_specialite: 5,
        note_globale: 15.3
      },
      {
        id: 'pmont-cl-2',
        ecole_id: 'polytech-montpellier-fra',
        source_media: "L'Étudiant",
        annee: 2024,
        rang_general: 38,
        note_globale: 75
      }
    ],
    insertion: {
      id: 'pmont-ins-1',
      ecole_id: 'polytech-montpellier-fra',
      annee_promo: 2024,
      salaire_moyen_embauche: 41.5,
      salaire_avec_primes: 45.0,
      salaire_3_ans: 50.0,
      taux_emploi_6_mois: 97.6,
      pct_international: 17.0,
      pct_poursuite_etudes: 8.0,
      duree_moyenne_recherche_mois: 1.1
    }
  },

  {
    id: 'icam-nantes-fra',
    type_recrutement: 'post_bac',
    nom_officiel: "Institut Catholique d'Arts et Métiers",
    sigle: "ICAM",
    pays: "France",
    region: "Pays de la Loire",
    ville_principale: "Nantes",
    statut_juridique: "EESPIG",
    frais_scolarite_annuels: 8900,
    site_web: "https://www.icam.fr",
    parcoursup_url: "https://dossier.parcoursup.fr/Candidat/carte?action=recherche&origine=carte&g_ta_cod=14500",
    parcoursup_code: "14500",
    description: "Grande école d'ingénieurs généralistes et en apprentissage, classée 1ère par L'Étudiant pour la proximité et le réseau entreprises (campus à Nantes, Lille, Toulouse, Paris-Sénart, Vannes, Strasbourg).",
    habilitation_cti: true,
    label_eurace: true,
    annee_creation: 1898,
    campus: [
      {
        id: 'icam-camp-1',
        ecole_id: 'icam-nantes-fra',
        nom_campus: "Campus de Nantes",
        ville: "Carquefou",
        code_postal: "44470",
        adresse: "35 Rue du Champ de Manœuvre",
        latitude: 47.2830,
        longitude: -1.5030,
        est_siege_principal: true
      },
      {
        id: 'icam-camp-2',
        ecole_id: 'icam-nantes-fra',
        nom_campus: "Campus de Lille",
        ville: "Lille",
        code_postal: "59000",
        adresse: "6 Rue Auber",
        latitude: 50.6310,
        longitude: 3.0450,
        est_siege_principal: false
      }
    ],
    specialites: [
      {
        id: 'icam-sp-1',
        ecole_id: 'icam-nantes-fra',
        intitule_specialite: "Ingénieur Généraliste & Usine du Futur",
        domaine: "Généraliste & Systèmes Complexes",
        type_cursus: "Mixte (Initiale & Alternance)",
        diplome_delivre: "Titre d'Ingénieur Diplômé de l'ICAM",
        duree_annees: 5,
        competences_cles: "Génie mécanique, Automatique, Énergie, Management industriel"
      ,
        debouches_metiers: [
          'Ingénieur Système & Intégration',
          'Chef de Projet Industriel Complexe',
          'Consultant en Stratégie & Organisation',
          "Directeur d'Usine & Supply Chain 4.0"
        ],
        salaire_moyen_specialite: 48.0,
        taux_insertion_specialite: 98.4,
        partenaires_entreprises: [
          'McKinsey & Company',
          'Boston Consulting Group',
          'Airbus',
          'Safran',
          'Saint-Gobain',
          'Capgemini Invent'
        ],
        doubles_diplomes: [
          'Double Diplôme Management HEC / ESSEC / ESCP',
          'Master Sciences & Génie des Systèmes',
          'MIT (USA)',
          'Imperial College London'
        ],
        secteurs_recrutement: [
          'Conseil en Stratégie & Management',
          'Grandes Entreprises Industrielles',
          'Direction de Programmes Stratégiques',
          'Aérospatiale & Énergie'
        ],
        modules_phares: [
          'Ingénierie Système & Modélisation MBSE',
          'Management de Projets Complexes & Gestion des Risques',
          "Économie Industrielle & Stratégie d'Entreprise",
          'Optimisation Multicritère & Décision'
        ],
        volume_ects: 300
      },
      {
        id: 'icam-sp-2',
        ecole_id: 'icam-nantes-fra',
        intitule_specialite: "Génie Électrique & Systèmes Numériques",
        domaine: "Électronique & Systèmes Embarqués",
        type_cursus: "Alternance / Apprentissage",
        diplome_delivre: "Diplôme d'Ingénieur",
        duree_annees: 5,
        competences_cles: "Réseaux électriques intelligents, IoT industriel, Électronique de puissance"
      ,
        debouches_metiers: [
          'Ingénieur Conception ASIC / FPGA',
          'Architecte Systèmes Temps Réel',
          'Ingénieur Radiofréquence & IoT',
          'Spécialiste Compatibilité Électromagnétique'
        ],
        salaire_moyen_specialite: 47.0,
        taux_insertion_specialite: 98.4,
        partenaires_entreprises: [
          'STMicroelectronics',
          'Thales',
          'NXP Semiconductors',
          'Safran Electronics',
          'SNCF',
          'CEA-Leti'
        ],
        doubles_diplomes: [
          'Master Micro & Nano-électronique',
          'Georgia Tech',
          'EPFL',
          'Politecnico di Milano'
        ],
        secteurs_recrutement: [
          'Semi-conducteurs & Nanoélectronique',
          'Aéronautique & Spatial',
          'Automobile & Objets Connectés (IoT)',
          'Télécoms 5G/6G'
        ],
        modules_phares: [
          'Conception VHDL / Verilog & Synthèse FPGA',
          'Architectures Microcontrôleurs & Firmware C/C++',
          'Électronique Hyperfréquences & Antennes',
          "Systèmes d'Exploitation Temps Réel (FreeRTOS/Linux Embarqué)"
        ],
        volume_ects: 300
      }
    ],
    admissions: [
      {
        id: 'icam-adm-1',
        ecole_id: 'icam-nantes-fra',
        source: 'Parcoursup',
        annee: 2024,
        nom_filiere_concours: "Concours Puissance Alpha - Cursus Ingénieur Post-bac",
        capacite: 600,
        nb_voeux: 6500,
        taux_acces: 48.0,
        rang_dernier_appele: 4200,
        pct_mention_tb: 39.0,
        pct_boursiers: 14.0,
        parcoursup_formation_id: "14500"
      }
    ],
    classements: [
      {
        id: 'icam-cl-1',
        ecole_id: 'icam-nantes-fra',
        source_media: "Le Figaro Étudiant",
        annee: 2025,
        rang_general: 34,
        rang_post_bac: 11,
        domaine_specialite: "Généraliste & Systèmes Complexes",
        rang_par_specialite: 6,
        note_globale: 15.6
      },
      {
        id: 'icam-cl-2',
        ecole_id: 'icam-nantes-fra',
        source_media: "L'Étudiant",
        annee: 2024,
        rang_general: 34,
        note_globale: 79
      }
    ],
    insertion: {
      id: 'icam-ins-1',
      ecole_id: 'icam-nantes-fra',
      annee_promo: 2024,
      salaire_moyen_embauche: 42.8,
      salaire_avec_primes: 46.5,
      salaire_3_ans: 53.0,
      taux_emploi_6_mois: 98.7,
      pct_international: 20.0,
      pct_poursuite_etudes: 5.0,
      duree_moyenne_recherche_mois: 0.9
    }
  }
];
