-- ============================================================================
-- SCHEMA RELATIONNEL : BASE DE DONNÉES DES ÉCOLES D'INGÉNIEURS FRANCOPHONES
-- Compatible : PostgreSQL 14+ (JSONB) & SQLite 3.35+ (JSON)
-- Auteur : Senior Data Engineering & Web Scraping Architect
-- ============================================================================

PRAGMA foreign_keys = ON;

-- ----------------------------------------------------------------------------
-- 1. Table : ecoles
-- Entité centrale canonique après résolution d'entités (Entity Resolution)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS ecoles (
    id VARCHAR(64) PRIMARY KEY,
    nom_officiel VARCHAR(255) NOT NULL,
    sigle VARCHAR(50) NOT NULL,
    pays VARCHAR(64) NOT NULL CHECK (pays IN ('France', 'Suisse', 'Belgique', 'Canada')),
    ville_principale VARCHAR(100) NOT NULL,
    statut_juridique VARCHAR(30) NOT NULL CHECK (statut_juridique IN ('Public', 'Privé', 'Consulaire', 'EESPIG')),
    frais_scolarite_annuels INTEGER NOT NULL DEFAULT 0, -- en EUR
    site_web VARCHAR(500) NOT NULL,
    description TEXT,
    logo_url VARCHAR(500),
    habilitation_cti BOOLEAN NOT NULL DEFAULT 1,
    label_eurace BOOLEAN NOT NULL DEFAULT 1,
    annee_creation INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_ecoles_pays_statut ON ecoles(pays, statut_juridique);
CREATE INDEX IF NOT EXISTS idx_ecoles_ville ON ecoles(ville_principale);
CREATE INDEX IF NOT EXISTS idx_ecoles_sigle ON ecoles(sigle);

-- ----------------------------------------------------------------------------
-- 2. Table : campus
-- Répartition géographique multi-sites (ex: Arts et Métiers, INSA, EPITA, HES)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS campus (
    id VARCHAR(64) PRIMARY KEY,
    ecole_id VARCHAR(64) NOT NULL REFERENCES ecoles(id) ON DELETE CASCADE,
    nom_campus VARCHAR(100) NOT NULL,
    ville VARCHAR(100) NOT NULL,
    code_postal VARCHAR(20),
    adresse VARCHAR(255),
    latitude REAL,
    longitude REAL,
    est_siege_principal BOOLEAN DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_campus_ecole ON campus(ecole_id);
CREATE INDEX IF NOT EXISTS idx_campus_ville ON campus(ville);

-- ----------------------------------------------------------------------------
-- 3. Table : specialites_diplomes
-- Cursus d'ingénieur habilités, filières d'excellence et modalités
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS specialites_diplomes (
    id VARCHAR(64) PRIMARY KEY,
    ecole_id VARCHAR(64) NOT NULL REFERENCES ecoles(id) ON DELETE CASCADE,
    intitule_specialite VARCHAR(255) NOT NULL,
    domaine VARCHAR(100) NOT NULL CHECK (domaine IN (
        'Informatique & Logiciel',
        'Cybersécurité',
        'Intelligence Artificielle & Data',
        'Aéronautique & Spatial',
        'Automobile & Transports',
        'Génie Civil & BTP',
        'Énergie & Environnement',
        'Biotechnologies & Santé',
        'Matériaux & Chimie',
        'Robotique & Mécatronique',
        'Électronique & Systèmes Embarqués',
        'Télécommunications & Réseaux',
        'Génie Industriel & Supply Chain',
        'Généraliste & Systèmes Complexes',
        'Mathématiques Financières & Modélisation'
    )),
    type_cursus VARCHAR(50) NOT NULL CHECK (type_cursus IN (
        'Initiale',
        'Alternance / Apprentissage',
        'Continue',
        'Mixte (Initiale & Alternance)'
    )),
    diplome_delivre VARCHAR(150) DEFAULT 'Titre d''Ingénieur Diplômé (Bac+5 / Grade de Master)',
    duree_annees INTEGER NOT NULL DEFAULT 3 CHECK (duree_annees IN (2, 3, 4, 5)),
    competences_cles TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_specialites_ecole ON specialites_diplomes(ecole_id);
CREATE INDEX IF NOT EXISTS idx_specialites_domaine ON specialites_diplomes(domaine);
CREATE INDEX IF NOT EXISTS idx_specialites_cursus ON specialites_diplomes(type_cursus);

-- ----------------------------------------------------------------------------
-- 4. Table : admissions_stats
-- Sélectivité détaillée : Parcoursup Open Data, CPGE (SCEI) ou Concours sur Titres
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS admissions_stats (
    id VARCHAR(64) PRIMARY KEY,
    ecole_id VARCHAR(64) NOT NULL REFERENCES ecoles(id) ON DELETE CASCADE,
    source VARCHAR(50) NOT NULL CHECK (source IN (
        'Parcoursup',
        'CPGE (SCEI / Concours Commun)',
        'Admissions Parallèles (Titre)',
        'Examen Universitaire / Équivalence'
    )),
    annee INTEGER NOT NULL CHECK (annee >= 2020),
    nom_filiere_concours VARCHAR(150),
    capacite INTEGER NOT NULL DEFAULT 0,
    nb_voeux INTEGER NOT NULL DEFAULT 0,
    taux_acces REAL,                   -- Pourcentage (ex: 12.5 pour 12.5%)
    rang_dernier_appele INTEGER,
    pct_mention_tb REAL,               -- % d'admis avec mention Très Bien au bac
    pct_boursiers REAL,                -- % de boursiers intégrés
    raw_payload TEXT,                  -- JSON des indicateurs secondaires
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_admission_ecole_source_annee UNIQUE (ecole_id, source, annee, nom_filiere_concours)
);

CREATE INDEX IF NOT EXISTS idx_admissions_ecole_annee ON admissions_stats(ecole_id, annee);
CREATE INDEX IF NOT EXISTS idx_admissions_taux_acces ON admissions_stats(taux_acces);

-- ----------------------------------------------------------------------------
-- 5. Table : classements
-- Palmarès médias et classements mondiaux avec métriques hétérogènes (JSONB)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS classements (
    id VARCHAR(64) PRIMARY KEY,
    ecole_id VARCHAR(64) NOT NULL REFERENCES ecoles(id) ON DELETE CASCADE,
    source_media VARCHAR(80) NOT NULL CHECK (source_media IN (
        'L''Étudiant',
        'Le Figaro Étudiant',
        'L''Usine Nouvelle',
        'QS World University Rankings',
        'Times Higher Education (THE)',
        'Shanghai Engineering'
    )),
    annee INTEGER NOT NULL CHECK (annee >= 2020),
    rang_general INTEGER,
    domaine_specialite VARCHAR(100),   -- ex: Informatique, BTP, Aéronautique, Généraliste
    rang_par_specialite INTEGER,
    note_globale REAL,                 -- Note normalisée sur 20 ou 100
    raw_metrics TEXT,                  -- Objet JSONB (ex: brevets, chaires, ratio prof/élève)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_classement_entry UNIQUE (ecole_id, source_media, annee, domaine_specialite)
);

CREATE INDEX IF NOT EXISTS idx_classements_source_annee ON classements(source_media, annee);
CREATE INDEX IF NOT EXISTS idx_classements_domaine ON classements(domaine_specialite);
CREATE INDEX IF NOT EXISTS idx_classements_rang_gen ON classements(rang_general);

-- ----------------------------------------------------------------------------
-- 6. Table : insertion_professionnelle
-- Données certifiées d'insertion à 6 mois et 3 ans (CGE, enquêtes d'écoles)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS insertion_professionnelle (
    id VARCHAR(64) PRIMARY KEY,
    ecole_id VARCHAR(64) NOT NULL REFERENCES ecoles(id) ON DELETE CASCADE,
    annee_promo INTEGER NOT NULL CHECK (annee_promo >= 2020),
    salaire_moyen_embauche REAL NOT NULL, -- en k€ (brut annuel hors primes)
    salaire_avec_primes REAL,             -- en k€
    salaire_3_ans REAL,                   -- en k€ après 3 ans d'ancienneté
    taux_emploi_6_mois REAL NOT NULL,     -- en % (ex: 97.4)
    pct_international REAL,               -- % en poste hors du pays de formation
    pct_poursuite_etudes REAL,            -- % en doctorat / double-diplôme
    duree_moyenne_recherche_mois REAL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_insertion_ecole_promo UNIQUE (ecole_id, annee_promo)
);

CREATE INDEX IF NOT EXISTS idx_insertion_ecole_promo ON insertion_professionnelle(ecole_id, annee_promo);
CREATE INDEX IF NOT EXISTS idx_insertion_salaire ON insertion_professionnelle(salaire_moyen_embauche);

-- ----------------------------------------------------------------------------
-- 7. Vue Synthétique : v_ecoles_cross_sources
-- Fait converger Parcoursup, Le Figaro, L'Étudiant et l'Usine Nouvelle
-- ----------------------------------------------------------------------------
CREATE VIEW IF NOT EXISTS v_ecoles_cross_sources AS
SELECT 
    e.id AS ecole_id,
    e.nom_officiel,
    e.sigle,
    e.pays,
    e.ville_principale,
    e.statut_juridique,
    e.frais_scolarite_annuels,
    adm.taux_acces AS taux_acces_parcoursup,
    adm.rang_dernier_appele AS rang_dernier_appele_parcoursup,
    ins.salaire_moyen_embauche AS salaire_embauche_letudiant,
    ins.salaire_3_ans AS salaire_3ans_letudiant,
    ins.taux_emploi_6_mois AS insertion_6m,
    cl_fig.rang_general AS rang_figaro_general,
    cl_etu.rang_general AS rang_letudiant_general,
    cl_un.rang_general AS rang_usinenouvelle_general
FROM ecoles e
LEFT JOIN admissions_stats adm 
    ON e.id = adm.ecole_id AND adm.source = 'Parcoursup' AND adm.annee = 2024
LEFT JOIN insertion_professionnelle ins 
    ON e.id = ins.ecole_id AND ins.annee_promo = 2024
LEFT JOIN classements cl_fig 
    ON e.id = cl_fig.ecole_id AND cl_fig.source_media = 'Le Figaro Étudiant' AND cl_fig.annee = 2025 AND cl_fig.domaine_specialite IS NULL
LEFT JOIN classements cl_etu 
    ON e.id = cl_etu.ecole_id AND cl_etu.source_media = 'L''Étudiant' AND cl_etu.annee = 2025
LEFT JOIN classements cl_un 
    ON e.id = cl_un.ecole_id AND cl_un.source_media = 'L''Usine Nouvelle' AND cl_un.annee = 2025;
