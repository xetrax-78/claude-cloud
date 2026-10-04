export type Pays = 'France' | 'Suisse' | 'Belgique' | 'Canada';
export type Statut = 'Public' | 'Privé' | 'Consulaire' | 'EESPIG';

export type ProfilCandidat = 
  | 'Post-bac'
  | 'Prépa CPGE'
  | 'Admissions Parallèles (BUT/BTS/Licence)'
  | 'Master / Double Diplôme International';

export type DomaineIngenierie =
  | 'Informatique & Logiciel'
  | 'Cybersécurité'
  | 'Intelligence Artificielle & Data'
  | 'Aéronautique & Spatial'
  | 'Automobile & Transports'
  | 'Génie Civil & BTP'
  | 'Énergie & Environnement'
  | 'Biotechnologies & Santé'
  | 'Matériaux & Chimie'
  | 'Robotique & Mécatronique'
  | 'Électronique & Systèmes Embarqués'
  | 'Télécommunications & Réseaux'
  | 'Génie Industriel & Supply Chain'
  | 'Généraliste & Systèmes Complexes'
  | 'Mathématiques Financières & Modélisation';

export interface Campus {
  id: string;
  ecole_id: string;
  nom_campus: string;
  ville: string;
  code_postal?: string;
  adresse?: string;
  latitude?: number;
  longitude?: number;
  est_siege_principal: boolean;
}

export interface SpecialiteDiplome {
  id: string;
  ecole_id: string;
  intitule_specialite: string;
  domaine: DomaineIngenierie;
  type_cursus: 'Initiale' | 'Alternance / Apprentissage' | 'Continue' | 'Mixte (Initiale & Alternance)';
  diplome_delivre: string;
  duree_annees: number;
  competences_cles?: string;
  debouches_metiers?: string[];
  salaire_moyen_specialite?: number; // en k€
  taux_insertion_specialite?: number; // en %
  partenaires_entreprises?: string[];
  doubles_diplomes?: string[];
  secteurs_recrutement?: string[];
  modules_phares?: string[];
  volume_ects?: number;
}

export type SourceRecrutement = 
  | 'Parcoursup' 
  | 'CPGE (SCEI / Concours Commun)' 
  | 'Concours CPGE (SCEI)' 
  | 'Admissions Parallèles (Titre)' 
  | 'Admission sur Titres Universitaires (AST)' 
  | 'Admission sur Titre (AST)' 
  | 'Examen Universitaire / Équivalence' 
  | 'Admission Internationale Directe';

export interface AdmissionsStats {
  id: string;
  ecole_id: string;
  source: SourceRecrutement;
  annee: number;
  nom_filiere_concours: string;
  capacite: number;
  nb_voeux: number;
  taux_acces?: number; // en %
  rang_dernier_appele?: number;
  pct_mention_tb?: number; // %
  pct_boursiers?: number; // %
  raw_payload?: Record<string, any>;
  parcoursup_formation_id?: string;
  code_formation?: string;
  source_url?: string;
}

export interface ClassementMedia {
  id: string;
  ecole_id: string;
  source_media: "L'Étudiant" | "Le Figaro Étudiant" | "L'Usine Nouvelle" | "QS World University Rankings" | "Times Higher Education (THE)";
  annee: number;
  rang_general?: number;
  domaine_specialite?: string;
  rang_par_specialite?: number;
  note_globale?: number;
  rang_post_bac?: number;
  rang_post_prepa?: number;
  raw_metrics?: Record<string, any>;
  source_url?: string;
}

export interface PrepaIntegrationStats {
  filiere: 'MPSI' | 'PCSI' | 'PSI' | 'PTSI' | 'MPI' | 'BCPST';
  taux_integration_x_ens: number; // % (X, ENS Ulm/Lyon/Paris-Saclay/Rennes)
  taux_integration_top_ecoles: number; // % (X, Mines-Ponts, CentraleSupélec, Telecom, Ponts, ENSTA, ISAE)
  taux_integration_global: number; // %
  effectif: number;
  rang_national_filiere?: number;
}

export interface InsertionProfessionnelle {
  id: string;
  ecole_id: string;
  annee_promo: number;
  salaire_moyen_embauche: number; // en k€
  salaire_avec_primes?: number; // en k€
  salaire_3_ans?: number; // en k€
  taux_emploi_6_mois: number; // en %
  pct_international?: number; // en %
  pct_poursuite_etudes?: number; // en %
  duree_moyenne_recherche_mois?: number;
  source?: string; // ex. "Enquête CGE", "L'Étudiant"
  source_url?: string;
}

export interface Ecole {
  id: string;
  nom_officiel: string;
  sigle: string;
  type_etablissement?: 'ecole_ingenieur' | 'prepa_cpge';
  type_recrutement?: 'post_prepa' | 'post_bac' | 'international';
  pays: Pays;
  region?: string;
  ville_principale: string;
  statut_juridique: Statut;
  frais_scolarite_annuels: number;
  site_web: string;
  description: string;
  logo_url?: string;
  habilitation_cti: boolean;
  label_eurace: boolean;
  annee_creation?: number;
  parcoursup_url?: string;
  parcoursup_code?: string;
  internat_disponible?: boolean;
  prix_internat_annuel?: number;
  filieres_cpge?: ('MPSI' | 'PCSI' | 'PSI' | 'PTSI' | 'MPI' | 'BCPST')[];
  banque_concours?: string;
  prepa_stats?: PrepaIntegrationStats[];
  campus: Campus[];
  specialites: SpecialiteDiplome[];
  admissions: AdmissionsStats[];
  classements: ClassementMedia[];
  insertion: InsertionProfessionnelle;
}

export interface MatchingPreferences {
  profil: ProfilCandidat | 'Tous';
  domaines: DomaineIngenierie[];
  alternance: 'Indifférent' | 'Souhaitée' | 'Obligatoire';
  budgetMax: number;
  pays: Pays[];
  statuts: Statut[];
  region?: string;
  salaireMin?: number;
  tauxAccesMax?: number;
  concoursFiltre?: string;
  poidsPrestige: number;
  poidsSalaire: number;
  poidsBudget: number;
  poidsInsertion: number;
}

export interface ScoredEcole {
  ecole: Ecole;
  scoreMatch: number;
  scorePrestige: number | null; // null : donnée non communiquée
  scoreSalaire: number | null;
  scoreBudget: number;
  scoreInsertion: number | null;
  scoreDomaine: number;
  bonusAlternance: number;
  pointsForts: string[];
  pointsVigilance: string[];
  admissible: boolean;
}
