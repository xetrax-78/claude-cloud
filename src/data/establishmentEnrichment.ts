import { Ecole, ClassementMedia, AdmissionsStats } from '../types';
import { SCHOOLS_DATA } from './schoolsData';
import { PREPAS_DATA } from './prepasData';
import { CANONICAL_PREPAS_RANKINGS } from './canonicalPrepasRankings';

// 1. Post-Prépa Schools Directory (Recruitment exclusively through Concours CPGE / SCEI + AST universitaire L3)
const POST_PREPA_SPECS: Record<string, {
  banque_concours: string;
  concours_admissions: AdmissionsStats[];
  classements: ClassementMedia[];
}> = {
  'polytechnique-fra': {
    banque_concours: 'Concours X-ENS (Filières MP, PC, PSI, PT, MPI, BCPST)',
    concours_admissions: [
      {
        id: 'x-adm-cpge',
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
        id: 'x-adm-ast',
        ecole_id: 'polytechnique-fra',
        source: 'Admission sur Titres Universitaires (AST)',
        annee: 2024,
        nom_filiere_concours: 'Filière Universitaire Française L3 (Maths, Physique)',
        capacite: 40,
        nb_voeux: 450,
        taux_acces: 8.9,
        rang_dernier_appele: 42,
        pct_mention_tb: 98.0,
        pct_boursiers: 18.0
      }
    ],
    classements: [
      { id: 'x-cl-figaro', ecole_id: 'polytechnique-fra', source_media: 'Le Figaro Étudiant', annee: 2025, rang_general: 1, note_globale: 19.8 },
      { id: 'x-cl-etudiant', ecole_id: 'polytechnique-fra', source_media: "L'Étudiant", annee: 2025, rang_general: 1, note_globale: 104 },
      { id: 'x-cl-usine', ecole_id: 'polytechnique-fra', source_media: "L'Usine Nouvelle", annee: 2025, rang_general: 1, note_globale: 98.5 },
      { id: 'x-cl-qs', ecole_id: 'polytechnique-fra', source_media: 'QS World University Rankings', annee: 2025, rang_general: 46 }
    ]
  },
  'centralesupelec-fra': {
    banque_concours: 'Concours CentraleSupélec (Filières MP, PC, PSI, PT, MPI, TSI)',
    concours_admissions: [
      {
        id: 'cs-adm-cpge',
        ecole_id: 'centralesupelec-fra',
        source: 'Concours CPGE (SCEI)',
        annee: 2024,
        nom_filiere_concours: 'Concours CentraleSupélec (Filières MP, PC, PSI, PT, MPI, TSI)',
        capacite: 820,
        nb_voeux: 9600,
        taux_acces: 8.5,
        rang_dernier_appele: 860,
        pct_mention_tb: 98.0,
        pct_boursiers: 16.5
      },
      {
        id: 'cs-adm-ast',
        ecole_id: 'centralesupelec-fra',
        source: 'Admission sur Titres Universitaires (AST)',
        annee: 2024,
        nom_filiere_concours: 'Voie Universitaire CASTing (Licence L3 & BUT)',
        capacite: 60,
        nb_voeux: 600,
        taux_acces: 10.0,
        rang_dernier_appele: 62,
        pct_mention_tb: 95.0,
        pct_boursiers: 18.0
      }
    ],
    classements: [
      { id: 'cs-cl-figaro', ecole_id: 'centralesupelec-fra', source_media: 'Le Figaro Étudiant', annee: 2025, rang_general: 2, note_globale: 19.4 },
      { id: 'cs-cl-etudiant', ecole_id: 'centralesupelec-fra', source_media: "L'Étudiant", annee: 2025, rang_general: 2, note_globale: 101 },
      { id: 'cs-cl-usine', ecole_id: 'centralesupelec-fra', source_media: "L'Usine Nouvelle", annee: 2025, rang_general: 2, note_globale: 96.0 }
    ]
  },
  'mines-paris-fra': {
    banque_concours: 'Concours Commun Mines-Ponts (Filières MP, PC, PSI, PT, MPI)',
    concours_admissions: [
      {
        id: 'mp-adm-cpge',
        ecole_id: 'mines-paris-fra',
        source: 'Concours CPGE (SCEI)',
        annee: 2024,
        nom_filiere_concours: 'Concours Commun Mines-Ponts (Ingénieur Civil des Mines)',
        capacite: 155,
        nb_voeux: 6200,
        taux_acces: 6.8,
        rang_dernier_appele: 160,
        pct_mention_tb: 98.5,
        pct_boursiers: 15.0
      },
      {
        id: 'mp-adm-ast',
        ecole_id: 'mines-paris-fra',
        source: 'Admission sur Titres Universitaires (AST)',
        annee: 2024,
        nom_filiere_concours: 'Voie Universitaire GEI-UNIV (Licence L3)',
        capacite: 25,
        nb_voeux: 380,
        taux_acces: 6.5,
        rang_dernier_appele: 26,
        pct_mention_tb: 96.0,
        pct_boursiers: 17.0
      }
    ],
    classements: [
      { id: 'mp-cl-figaro', ecole_id: 'mines-paris-fra', source_media: 'Le Figaro Étudiant', annee: 2025, rang_general: 3, note_globale: 19.3 },
      { id: 'mp-cl-etudiant', ecole_id: 'mines-paris-fra', source_media: "L'Étudiant", annee: 2025, rang_general: 3, note_globale: 100 },
      { id: 'mp-cl-usine', ecole_id: 'mines-paris-fra', source_media: "L'Usine Nouvelle", annee: 2025, rang_general: 3, note_globale: 95.0 }
    ]
  },
  'telecom-paris-fra': {
    banque_concours: 'Concours Commun Mines-Ponts (Filières MP, PC, PSI, PT, MPI)',
    concours_admissions: [
      {
        id: 'tp-adm-cpge',
        ecole_id: 'telecom-paris-fra',
        source: 'Concours CPGE (SCEI)',
        annee: 2024,
        nom_filiere_concours: 'Concours Commun Mines-Ponts (Télécom Paris)',
        capacite: 210,
        nb_voeux: 6100,
        taux_acces: 9.0,
        rang_dernier_appele: 220,
        pct_mention_tb: 97.0,
        pct_boursiers: 17.0
      }
    ],
    classements: [
      { id: 'tp-cl-figaro', ecole_id: 'telecom-paris-fra', source_media: 'Le Figaro Étudiant', annee: 2025, rang_general: 4, note_globale: 19.2 },
      { id: 'tp-cl-etudiant', ecole_id: 'telecom-paris-fra', source_media: "L'Étudiant", annee: 2025, rang_general: 4, note_globale: 99 },
      { id: 'tp-cl-usine', ecole_id: 'telecom-paris-fra', source_media: "L'Usine Nouvelle", annee: 2025, rang_general: 4, note_globale: 94.0 }
    ]
  },
  'ponts-paristech-fra': {
    banque_concours: 'Concours Commun Mines-Ponts (Filières MP, PC, PSI, PT, MPI)',
    concours_admissions: [
      {
        id: 'enpc-adm-cpge',
        ecole_id: 'ponts-paristech-fra',
        source: 'Concours CPGE (SCEI)',
        annee: 2024,
        nom_filiere_concours: 'Concours Commun Mines-Ponts (École des Ponts)',
        capacite: 180,
        nb_voeux: 5900,
        taux_acces: 8.0,
        rang_dernier_appele: 190,
        pct_mention_tb: 97.5,
        pct_boursiers: 16.0
      }
    ],
    classements: [
      { id: 'enpc-cl-figaro', ecole_id: 'ponts-paristech-fra', source_media: 'Le Figaro Étudiant', annee: 2025, rang_general: 5, note_globale: 19.0 },
      { id: 'enpc-cl-etudiant', ecole_id: 'ponts-paristech-fra', source_media: "L'Étudiant", annee: 2025, rang_general: 5, note_globale: 98 },
      { id: 'enpc-cl-usine', ecole_id: 'ponts-paristech-fra', source_media: "L'Usine Nouvelle", annee: 2025, rang_general: 5, note_globale: 93.0 }
    ]
  },
  'ensam-paristech-fra': {
    banque_concours: 'Banque PT, CCINP, CentraleSupélec, Mines-Ponts',
    concours_admissions: [
      {
        id: 'ensam-adm-cpge',
        ecole_id: 'ensam-paristech-fra',
        source: 'Concours CPGE (SCEI)',
        annee: 2024,
        nom_filiere_concours: 'Banque PT (550 places), CCINP, Centrale-Supélec',
        capacite: 1050,
        nb_voeux: 7200,
        taux_acces: 18.0,
        rang_dernier_appele: 1100,
        pct_mention_tb: 92.0,
        pct_boursiers: 20.0
      }
    ],
    classements: [
      { id: 'ensam-cl-figaro', ecole_id: 'ensam-paristech-fra', source_media: 'Le Figaro Étudiant', annee: 2025, rang_general: 8, note_globale: 18.2 },
      { id: 'ensam-cl-etudiant', ecole_id: 'ensam-paristech-fra', source_media: "L'Étudiant", annee: 2025, rang_general: 7, note_globale: 95 },
      { id: 'ensam-cl-usine', ecole_id: 'ensam-paristech-fra', source_media: "L'Usine Nouvelle", annee: 2025, rang_general: 6, note_globale: 91.5 }
    ]
  },
  'ensta-paris-fra': {
    banque_concours: 'Concours Commun Mines-Ponts (Filières MP, PC, PSI, PT, MPI)',
    concours_admissions: [
      {
        id: 'ensta-adm-cpge',
        ecole_id: 'ensta-paris-fra',
        source: 'Concours CPGE (SCEI)',
        annee: 2024,
        nom_filiere_concours: 'Concours Commun Mines-Ponts (ENSTA Paris)',
        capacite: 190,
        nb_voeux: 5800,
        taux_acces: 11.0,
        rang_dernier_appele: 200,
        pct_mention_tb: 96.0,
        pct_boursiers: 16.0
      }
    ],
    classements: [
      { id: 'ensta-cl-figaro', ecole_id: 'ensta-paris-fra', source_media: 'Le Figaro Étudiant', annee: 2025, rang_general: 6, note_globale: 18.8 },
      { id: 'ensta-cl-etudiant', ecole_id: 'ensta-paris-fra', source_media: "L'Étudiant", annee: 2025, rang_general: 6, note_globale: 96 },
      { id: 'ensta-cl-usine', ecole_id: 'ensta-paris-fra', source_media: "L'Usine Nouvelle", annee: 2025, rang_general: 7, note_globale: 91.0 }
    ]
  },
  'centrale-lyon-fra': {
    banque_concours: 'Concours CentraleSupélec (Filières MP, PC, PSI, PT, MPI)',
    concours_admissions: [
      {
        id: 'ecl-adm-cpge',
        ecole_id: 'centrale-lyon-fra',
        source: 'Concours CPGE (SCEI)',
        annee: 2024,
        nom_filiere_concours: 'Concours CentraleSupélec (École Centrale de Lyon)',
        capacite: 380,
        nb_voeux: 6400,
        taux_acces: 12.0,
        rang_dernier_appele: 400,
        pct_mention_tb: 95.5,
        pct_boursiers: 18.0
      }
    ],
    classements: [
      { id: 'ecl-cl-figaro', ecole_id: 'centrale-lyon-fra', source_media: 'Le Figaro Étudiant', annee: 2025, rang_general: 7, note_globale: 18.5 },
      { id: 'ecl-cl-etudiant', ecole_id: 'centrale-lyon-fra', source_media: "L'Étudiant", annee: 2025, rang_general: 8, note_globale: 94 },
      { id: 'ecl-cl-usine', ecole_id: 'centrale-lyon-fra', source_media: "L'Usine Nouvelle", annee: 2025, rang_general: 8, note_globale: 90.0 }
    ]
  },
  'ensimag-grenoble-fra': {
    banque_concours: 'Concours Commun INP (CCINP - Filières MP, MPI, PC, PSI)',
    concours_admissions: [
      {
        id: 'ensimag-adm-cpge',
        ecole_id: 'ensimag-grenoble-fra',
        source: 'Concours CPGE (SCEI)',
        annee: 2024,
        nom_filiere_concours: 'Concours Commun INP (CCINP Informatique & Maths Appliquées)',
        capacite: 250,
        nb_voeux: 6800,
        taux_acces: 14.5,
        rang_dernier_appele: 310,
        pct_mention_tb: 94.0,
        pct_boursiers: 19.0
      }
    ],
    classements: [
      { id: 'ensimag-cl-figaro', ecole_id: 'ensimag-grenoble-fra', source_media: 'Le Figaro Étudiant', annee: 2025, rang_general: 9, note_globale: 18.0 },
      { id: 'ensimag-cl-etudiant', ecole_id: 'ensimag-grenoble-fra', source_media: "L'Étudiant", annee: 2025, rang_general: 10, note_globale: 91 },
      { id: 'ensimag-cl-usine', ecole_id: 'ensimag-grenoble-fra', source_media: "L'Usine Nouvelle", annee: 2025, rang_general: 11, note_globale: 88.0 }
    ]
  },
  'isae-supaero-fra': {
    banque_concours: 'Concours Commun Mines-Ponts (Filières MP, PC, PSI, PT, MPI)',
    concours_admissions: [
      {
        id: 'isae-adm-cpge',
        ecole_id: 'isae-supaero-fra',
        source: 'Concours CPGE (SCEI)',
        annee: 2024,
        nom_filiere_concours: 'Concours Commun Mines-Ponts (Ingénieur ISAE-SUPAERO)',
        capacite: 240,
        nb_voeux: 6500,
        taux_acces: 9.5,
        rang_dernier_appele: 255,
        pct_mention_tb: 97.0,
        pct_boursiers: 16.0
      }
    ],
    classements: [
      { id: 'isae-cl-figaro', ecole_id: 'isae-supaero-fra', source_media: 'Le Figaro Étudiant', annee: 2025, rang_general: 10, note_globale: 17.8 },
      { id: 'isae-cl-etudiant', ecole_id: 'isae-supaero-fra', source_media: "L'Étudiant", annee: 2025, rang_general: 9, note_globale: 93 },
      { id: 'isae-cl-usine', ecole_id: 'isae-supaero-fra', source_media: "L'Usine Nouvelle", annee: 2025, rang_general: 9, note_globale: 89.5 }
    ]
  },
  'mines-nancy-fra': {
    banque_concours: 'Concours Commun Mines-Ponts (Filières MP, PC, PSI, PT, MPI)',
    concours_admissions: [
      {
        id: 'mn-adm-cpge',
        ecole_id: 'mines-nancy-fra',
        source: 'Concours CPGE (SCEI)',
        annee: 2024,
        nom_filiere_concours: 'Concours Commun Mines-Ponts (Mines Nancy)',
        capacite: 180,
        nb_voeux: 5700,
        taux_acces: 13.0,
        rang_dernier_appele: 210,
        pct_mention_tb: 94.0,
        pct_boursiers: 18.0
      }
    ],
    classements: [
      { id: 'mn-cl-figaro', ecole_id: 'mines-nancy-fra', source_media: 'Le Figaro Étudiant', annee: 2025, rang_general: 11, note_globale: 17.5 },
      { id: 'mn-cl-etudiant', ecole_id: 'mines-nancy-fra', source_media: "L'Étudiant", annee: 2025, rang_general: 12, note_globale: 89 },
      { id: 'mn-cl-usine', ecole_id: 'mines-nancy-fra', source_media: "L'Usine Nouvelle", annee: 2025, rang_general: 12, note_globale: 87.0 }
    ]
  },
  'mines-saint-etienne-fra': {
    banque_concours: 'Concours Commun Mines-Ponts (Filières MP, PC, PSI, PT, MPI)',
    concours_admissions: [
      {
        id: 'mse-adm-cpge',
        ecole_id: 'mines-saint-etienne-fra',
        source: 'Concours CPGE (SCEI)',
        annee: 2024,
        nom_filiere_concours: 'Concours Commun Mines-Ponts (Mines Saint-Étienne)',
        capacite: 200,
        nb_voeux: 5800,
        taux_acces: 13.5,
        rang_dernier_appele: 230,
        pct_mention_tb: 93.5,
        pct_boursiers: 18.5
      }
    ],
    classements: [
      { id: 'mse-cl-figaro', ecole_id: 'mines-saint-etienne-fra', source_media: 'Le Figaro Étudiant', annee: 2025, rang_general: 12, note_globale: 17.4 },
      { id: 'mse-cl-etudiant', ecole_id: 'mines-saint-etienne-fra', source_media: "L'Étudiant", annee: 2025, rang_general: 13, note_globale: 88 },
      { id: 'mse-cl-usine', ecole_id: 'mines-saint-etienne-fra', source_media: "L'Usine Nouvelle", annee: 2025, rang_general: 13, note_globale: 86.5 }
    ]
  },
  'telecom-sudparis-fra': {
    banque_concours: 'Concours Mines-Télécom (Filières MP, PC, PSI, PT, MPI)',
    concours_admissions: [
      {
        id: 'tsp-adm-cpge',
        ecole_id: 'telecom-sudparis-fra',
        source: 'Concours CPGE (SCEI)',
        annee: 2024,
        nom_filiere_concours: 'Concours Mines-Télécom (Télécom SudParis)',
        capacite: 210,
        nb_voeux: 6200,
        taux_acces: 15.0,
        rang_dernier_appele: 240,
        pct_mention_tb: 93.0,
        pct_boursiers: 20.0
      }
    ],
    classements: [
      { id: 'tsp-cl-figaro', ecole_id: 'telecom-sudparis-fra', source_media: 'Le Figaro Étudiant', annee: 2025, rang_general: 13, note_globale: 17.2 },
      { id: 'tsp-cl-etudiant', ecole_id: 'telecom-sudparis-fra', source_media: "L'Étudiant", annee: 2025, rang_general: 14, note_globale: 87 },
      { id: 'tsp-cl-usine', ecole_id: 'telecom-sudparis-fra', source_media: "L'Usine Nouvelle", annee: 2025, rang_general: 14, note_globale: 86.0 }
    ]
  },
  'espci-paris-fra': {
    banque_concours: 'Concours X-ESPCI (Filières PC, BCPST, MP)',
    concours_admissions: [
      {
        id: 'espci-adm-cpge',
        ecole_id: 'espci-paris-fra',
        source: 'Concours CPGE (SCEI)',
        annee: 2024,
        nom_filiere_concours: 'Concours X-ESPCI (Filière PC & BCPST)',
        capacite: 90,
        nb_voeux: 3800,
        taux_acces: 8.8,
        rang_dernier_appele: 95,
        pct_mention_tb: 97.0,
        pct_boursiers: 16.0
      }
    ],
    classements: [
      { id: 'espci-cl-figaro', ecole_id: 'espci-paris-fra', source_media: 'Le Figaro Étudiant', annee: 2025, rang_general: 14, note_globale: 17.1 },
      { id: 'espci-cl-etudiant', ecole_id: 'espci-paris-fra', source_media: "L'Étudiant", annee: 2025, rang_general: 11, note_globale: 90 },
      { id: 'espci-cl-usine', ecole_id: 'espci-paris-fra', source_media: "L'Usine Nouvelle", annee: 2025, rang_general: 10, note_globale: 88.5 }
    ]
  },
  'chimie-paristech-fra': {
    banque_concours: 'Concours Commun CCINP (Filière PC) & Concours X',
    concours_admissions: [
      {
        id: 'chimie-adm-cpge',
        ecole_id: 'chimie-paristech-fra',
        source: 'Concours CPGE (SCEI)',
        annee: 2024,
        nom_filiere_concours: 'Concours Commun CCINP Filière PC Chimie',
        capacite: 105,
        nb_voeux: 4100,
        taux_acces: 10.5,
        rang_dernier_appele: 115,
        pct_mention_tb: 96.0,
        pct_boursiers: 17.5
      }
    ],
    classements: [
      { id: 'chimie-cl-figaro', ecole_id: 'chimie-paristech-fra', source_media: 'Le Figaro Étudiant', annee: 2025, rang_general: 15, note_globale: 17.0 },
      { id: 'chimie-cl-etudiant', ecole_id: 'chimie-paristech-fra', source_media: "L'Étudiant", annee: 2025, rang_general: 15, note_globale: 86 },
      { id: 'chimie-cl-usine', ecole_id: 'chimie-paristech-fra', source_media: "L'Usine Nouvelle", annee: 2025, rang_general: 15, note_globale: 85.0 }
    ]
  },
  'agroparistech-saclay-fra': {
    banque_concours: 'Concours Agro-Véto (Filières BCPST, TB)',
    concours_admissions: [
      {
        id: 'agro-adm-cpge',
        ecole_id: 'agroparistech-saclay-fra',
        source: 'Concours CPGE (SCEI)',
        annee: 2024,
        nom_filiere_concours: 'Concours Agro-Véto (Filière BCPST)',
        capacite: 340,
        nb_voeux: 3200,
        taux_acces: 15.0,
        rang_dernier_appele: 360,
        pct_mention_tb: 95.0,
        pct_boursiers: 19.0
      }
    ],
    classements: [
      { id: 'agro-cl-figaro', ecole_id: 'agroparistech-saclay-fra', source_media: 'Le Figaro Étudiant', annee: 2025, rang_general: 16, note_globale: 16.9 },
      { id: 'agro-cl-etudiant', ecole_id: 'agroparistech-saclay-fra', source_media: "L'Étudiant", annee: 2025, rang_general: 16, note_globale: 85 },
      { id: 'agro-cl-usine', ecole_id: 'agroparistech-saclay-fra', source_media: "L'Usine Nouvelle", annee: 2025, rang_general: 16, note_globale: 84.5 }
    ]
  },
  'ensae-paris-fra': {
    banque_concours: 'Concours X-Mines-Ponts (MP, PC, PSI) & Concours Économie B/L',
    concours_admissions: [
      {
        id: 'ensae-adm-cpge',
        ecole_id: 'ensae-paris-fra',
        source: 'Concours CPGE (SCEI)',
        annee: 2024,
        nom_filiere_concours: 'Concours Commun Mines-Ponts (ENSAE Paris Maths / Éco)',
        capacite: 140,
        nb_voeux: 4500,
        taux_acces: 10.0,
        rang_dernier_appele: 150,
        pct_mention_tb: 97.0,
        pct_boursiers: 16.0
      }
    ],
    classements: [
      { id: 'ensae-cl-figaro', ecole_id: 'ensae-paris-fra', source_media: 'Le Figaro Étudiant', annee: 2025, rang_general: 17, note_globale: 16.8 },
      { id: 'ensae-cl-etudiant', ecole_id: 'ensae-paris-fra', source_media: "L'Étudiant", annee: 2025, rang_general: 17, note_globale: 84 },
      { id: 'ensae-cl-usine', ecole_id: 'ensae-paris-fra', source_media: "L'Usine Nouvelle", annee: 2025, rang_general: 17, note_globale: 84.0 }
    ]
  },
  'centrale-nantes-fra': {
    banque_concours: 'Concours CentraleSupélec (Filières MP, PC, PSI, PT, MPI)',
    concours_admissions: [
      {
        id: 'ecn-adm-cpge',
        ecole_id: 'centrale-nantes-fra',
        source: 'Concours CPGE (SCEI)',
        annee: 2024,
        nom_filiere_concours: 'Concours CentraleSupélec (École Centrale de Nantes)',
        capacite: 410,
        nb_voeux: 6300,
        taux_acces: 13.0,
        rang_dernier_appele: 430,
        pct_mention_tb: 94.5,
        pct_boursiers: 19.0
      }
    ],
    classements: [
      { id: 'ecn-cl-figaro', ecole_id: 'centrale-nantes-fra', source_media: 'Le Figaro Étudiant', annee: 2025, rang_general: 18, note_globale: 16.7 },
      { id: 'ecn-cl-etudiant', ecole_id: 'centrale-nantes-fra', source_media: "L'Étudiant", annee: 2025, rang_general: 18, note_globale: 83 },
      { id: 'ecn-cl-usine', ecole_id: 'centrale-nantes-fra', source_media: "L'Usine Nouvelle", annee: 2025, rang_general: 18, note_globale: 83.5 }
    ]
  },
  'enac-toulouse-fra': {
    banque_concours: 'Concours Commun CCINP (Filières MP, PC, PSI, PT)',
    concours_admissions: [
      {
        id: 'enac-adm-cpge',
        ecole_id: 'enac-toulouse-fra',
        source: 'Concours CPGE (SCEI)',
        annee: 2024,
        nom_filiere_concours: 'Concours Commun CCINP (Ingénieur ENAC)',
        capacite: 150,
        nb_voeux: 5200,
        taux_acces: 12.5,
        rang_dernier_appele: 160,
        pct_mention_tb: 94.0,
        pct_boursiers: 18.0
      }
    ],
    classements: [
      { id: 'enac-cl-figaro', ecole_id: 'enac-toulouse-fra', source_media: 'Le Figaro Étudiant', annee: 2025, rang_general: 19, note_globale: 16.5 },
      { id: 'enac-cl-etudiant', ecole_id: 'enac-toulouse-fra', source_media: "L'Étudiant", annee: 2025, rang_general: 19, note_globale: 82 },
      { id: 'enac-cl-usine', ecole_id: 'enac-toulouse-fra', source_media: "L'Usine Nouvelle", annee: 2025, rang_general: 19, note_globale: 83.0 }
    ]
  },
  'enseeiht-toulouse-fra': {
    banque_concours: 'Concours Commun CCINP (Filières MP, MPI, PC, PSI)',
    concours_admissions: [
      {
        id: 'enseeiht-adm-cpge',
        ecole_id: 'enseeiht-toulouse-fra',
        source: 'Concours CPGE (SCEI)',
        annee: 2024,
        nom_filiere_concours: 'Concours Commun CCINP (Toulouse INP - ENSEEIHT)',
        capacite: 370,
        nb_voeux: 6500,
        taux_acces: 16.0,
        rang_dernier_appele: 410,
        pct_mention_tb: 93.0,
        pct_boursiers: 20.0
      }
    ],
    classements: [
      { id: 'enseeiht-cl-figaro', ecole_id: 'enseeiht-toulouse-fra', source_media: 'Le Figaro Étudiant', annee: 2025, rang_general: 20, note_globale: 16.4 },
      { id: 'enseeiht-cl-etudiant', ecole_id: 'enseeiht-toulouse-fra', source_media: "L'Étudiant", annee: 2025, rang_general: 20, note_globale: 81 },
      { id: 'enseeiht-cl-usine', ecole_id: 'enseeiht-toulouse-fra', source_media: "L'Usine Nouvelle", annee: 2025, rang_general: 20, note_globale: 82.0 }
    ]
  },
  'entpe-lyon-fra': {
    banque_concours: 'Concours Commun Mines-Ponts (Civil & Fonctionnaire de l\'État)',
    concours_admissions: [
      {
        id: 'entpe-adm-cpge',
        ecole_id: 'entpe-lyon-fra',
        source: 'Concours CPGE (SCEI)',
        annee: 2024,
        nom_filiere_concours: 'Concours Commun Mines-Ponts / ENTPE',
        capacite: 180,
        nb_voeux: 4900,
        taux_acces: 14.0,
        rang_dernier_appele: 195,
        pct_mention_tb: 93.0,
        pct_boursiers: 22.0
      }
    ],
    classements: [
      { id: 'entpe-cl-figaro', ecole_id: 'entpe-lyon-fra', source_media: 'Le Figaro Étudiant', annee: 2025, rang_general: 22, note_globale: 16.0 },
      { id: 'entpe-cl-etudiant', ecole_id: 'entpe-lyon-fra', source_media: "L'Étudiant", annee: 2025, rang_general: 22, note_globale: 79 },
      { id: 'entpe-cl-usine', ecole_id: 'entpe-lyon-fra', source_media: "L'Usine Nouvelle", annee: 2025, rang_general: 22, note_globale: 80.5 }
    ]
  },
  'estp-paris-fra': {
    banque_concours: 'Concours CentraleSupélec & Concours Post-Bac ESTP',
    concours_admissions: [
      {
        id: 'estp-adm-cpge',
        ecole_id: 'estp-paris-fra',
        source: 'Concours CPGE (SCEI)',
        annee: 2024,
        nom_filiere_concours: 'Concours Centrale-Supélec (Filières MP, PC, PSI, PT)',
        capacite: 580,
        nb_voeux: 5500,
        taux_acces: 22.0,
        rang_dernier_appele: 620,
        pct_mention_tb: 89.0,
        pct_boursiers: 16.0
      }
    ],
    classements: [
      { id: 'estp-cl-figaro', ecole_id: 'estp-paris-fra', source_media: 'Le Figaro Étudiant', annee: 2025, rang_general: 21, note_globale: 16.2 },
      { id: 'estp-cl-etudiant', ecole_id: 'estp-paris-fra', source_media: "L'Étudiant", annee: 2025, rang_general: 21, note_globale: 80 },
      { id: 'estp-cl-usine', ecole_id: 'estp-paris-fra', source_media: "L'Usine Nouvelle", annee: 2025, rang_general: 21, note_globale: 81.0 }
    ]
  },
  'eivp-paris-fra': {
    banque_concours: 'Concours Mines-Télécom (Génie Urbain Ville de Paris)',
    concours_admissions: [
      {
        id: 'eivp-adm-cpge',
        ecole_id: 'eivp-paris-fra',
        source: 'Concours CPGE (SCEI)',
        annee: 2024,
        nom_filiere_concours: 'Concours Mines-Télécom (Ingénieur Civil & Fonctionnaire)',
        capacite: 110,
        nb_voeux: 4200,
        taux_acces: 17.5,
        rang_dernier_appele: 125,
        pct_mention_tb: 91.0,
        pct_boursiers: 20.0
      }
    ],
    classements: [
      { id: 'eivp-cl-figaro', ecole_id: 'eivp-paris-fra', source_media: 'Le Figaro Étudiant', annee: 2025, rang_general: 25, note_globale: 15.6 },
      { id: 'eivp-cl-etudiant', ecole_id: 'eivp-paris-fra', source_media: "L'Étudiant", annee: 2025, rang_general: 26, note_globale: 76 },
      { id: 'eivp-cl-usine', ecole_id: 'eivp-paris-fra', source_media: "L'Usine Nouvelle", annee: 2025, rang_general: 26, note_globale: 77.0 }
    ]
  },
  'imt-mines-ales-fra': {
    banque_concours: 'Concours Mines-Télécom (Filières MP, PC, PSI, PT)',
    concours_admissions: [
      {
        id: 'ales-adm-cpge',
        ecole_id: 'imt-mines-ales-fra',
        source: 'Concours CPGE (SCEI)',
        annee: 2024,
        nom_filiere_concours: 'Concours Mines-Télécom (IMT Mines Alès)',
        capacite: 260,
        nb_voeux: 5800,
        taux_acces: 18.0,
        rang_dernier_appele: 290,
        pct_mention_tb: 91.0,
        pct_boursiers: 21.0
      }
    ],
    classements: [
      { id: 'ales-cl-figaro', ecole_id: 'imt-mines-ales-fra', source_media: 'Le Figaro Étudiant', annee: 2025, rang_general: 23, note_globale: 15.8 },
      { id: 'ales-cl-etudiant', ecole_id: 'imt-mines-ales-fra', source_media: "L'Étudiant", annee: 2025, rang_general: 23, note_globale: 78 },
      { id: 'ales-cl-usine', ecole_id: 'imt-mines-ales-fra', source_media: "L'Usine Nouvelle", annee: 2025, rang_general: 24, note_globale: 78.5 }
    ]
  },
  'telecom-nancy-fra': {
    banque_concours: 'Concours Mines-Télécom & CCINP',
    concours_admissions: [
      {
        id: 'tn-adm-cpge',
        ecole_id: 'telecom-nancy-fra',
        source: 'Concours CPGE (SCEI)',
        annee: 2024,
        nom_filiere_concours: 'Concours Mines-Télécom / CCINP',
        capacite: 140,
        nb_voeux: 4900,
        taux_acces: 19.0,
        rang_dernier_appele: 155,
        pct_mention_tb: 90.0,
        pct_boursiers: 22.0
      }
    ],
    classements: [
      { id: 'tn-cl-figaro', ecole_id: 'telecom-nancy-fra', source_media: 'Le Figaro Étudiant', annee: 2025, rang_general: 27, note_globale: 15.3 },
      { id: 'tn-cl-etudiant', ecole_id: 'telecom-nancy-fra', source_media: "L'Étudiant", annee: 2025, rang_general: 28, note_globale: 74 },
      { id: 'tn-cl-usine', ecole_id: 'telecom-nancy-fra', source_media: "L'Usine Nouvelle", annee: 2025, rang_general: 28, note_globale: 75.0 }
    ]
  },
  'enseirb-matmeca-fra': {
    banque_concours: 'Concours Commun CCINP (Filières MP, MPI, PC, PSI, PT)',
    concours_admissions: [
      {
        id: 'enseirb-adm-cpge',
        ecole_id: 'enseirb-matmeca-fra',
        source: 'Concours CPGE (SCEI)',
        annee: 2024,
        nom_filiere_concours: 'Concours Commun CCINP (Bordeaux INP - ENSEIRB-MATMECA)',
        capacite: 320,
        nb_voeux: 6100,
        taux_acces: 18.5,
        rang_dernier_appele: 350,
        pct_mention_tb: 91.5,
        pct_boursiers: 21.0
      }
    ],
    classements: [
      { id: 'enseirb-cl-figaro', ecole_id: 'enseirb-matmeca-fra', source_media: 'Le Figaro Étudiant', annee: 2025, rang_general: 24, note_globale: 15.7 },
      { id: 'enseirb-cl-etudiant', ecole_id: 'enseirb-matmeca-fra', source_media: "L'Étudiant", annee: 2025, rang_general: 25, note_globale: 77 },
      { id: 'enseirb-cl-usine', ecole_id: 'enseirb-matmeca-fra', source_media: "L'Usine Nouvelle", annee: 2025, rang_general: 25, note_globale: 77.5 }
    ]
  },
  'ensai-rennes-fra': {
    banque_concours: 'Concours Commun CCINP (Filières MP, MPI, PC, PSI, B/L)',
    concours_admissions: [
      {
        id: 'ensai-adm-cpge',
        ecole_id: 'ensai-rennes-fra',
        source: 'Concours CPGE (SCEI)',
        annee: 2024,
        nom_filiere_concours: 'Concours CCINP (Ingénieur Statisticien & Data Scientist)',
        capacite: 130,
        nb_voeux: 4300,
        taux_acces: 17.0,
        rang_dernier_appele: 145,
        pct_mention_tb: 92.0,
        pct_boursiers: 20.0
      }
    ],
    classements: [
      { id: 'ensai-cl-figaro', ecole_id: 'ensai-rennes-fra', source_media: 'Le Figaro Étudiant', annee: 2025, rang_general: 26, note_globale: 15.4 },
      { id: 'ensai-cl-etudiant', ecole_id: 'ensai-rennes-fra', source_media: "L'Étudiant", annee: 2025, rang_general: 27, note_globale: 75 },
      { id: 'ensai-cl-usine', ecole_id: 'ensai-rennes-fra', source_media: "L'Usine Nouvelle", annee: 2025, rang_general: 27, note_globale: 76.0 }
    ]
  },
  'institut-optique-fra': {
    banque_concours: 'Concours CentraleSupélec (Filières MP, PC, PSI)',
    concours_admissions: [
      {
        id: 'iogs-adm-cpge',
        ecole_id: 'institut-optique-fra',
        source: 'Concours CPGE (SCEI)',
        annee: 2024,
        nom_filiere_concours: 'Concours CentraleSupélec (Institut d\'Optique Paris-Saclay)',
        capacite: 150,
        nb_voeux: 4600,
        taux_acces: 15.5,
        rang_dernier_appele: 165,
        pct_mention_tb: 93.0,
        pct_boursiers: 18.0
      }
    ],
    classements: [
      { id: 'iogs-cl-figaro', ecole_id: 'institut-optique-fra', source_media: 'Le Figaro Étudiant', annee: 2025, rang_general: 20, note_globale: 16.3 },
      { id: 'iogs-cl-etudiant', ecole_id: 'institut-optique-fra', source_media: "L'Étudiant", annee: 2025, rang_general: 24, note_globale: 77 },
      { id: 'iogs-cl-usine', ecole_id: 'institut-optique-fra', source_media: "L'Usine Nouvelle", annee: 2025, rang_general: 23, note_globale: 79.0 }
    ]
  }
};

// 2. Post-Bac Schools Directory (Cycle préparatoire intégré + Concours Parcoursup)
const POST_BAC_SPECS: Record<string, {
  concours_nom: string;
  admissions: AdmissionsStats[];
  classements: ClassementMedia[];
}> = {
  'insa-lyon-fra': {
    concours_nom: 'Groupe INSA (Parcoursup - Bac Général)',
    admissions: [
      {
        id: 'insa-lyon-adm',
        ecole_id: 'insa-lyon-fra',
        source: 'Parcoursup',
        annee: 2024,
        nom_filiere_concours: 'Groupe INSA (Bac Général avec spécialités scientifiques)',
        capacite: 640,
        nb_voeux: 19800,
        taux_acces: 7.2,
        rang_dernier_appele: 1850,
        pct_mention_tb: 96.0,
        pct_boursiers: 23.0
      }
    ],
    classements: [
      { id: 'insa-lyon-figaro', ecole_id: 'insa-lyon-fra', source_media: 'Le Figaro Étudiant', annee: 2025, rang_general: 1, rang_post_bac: 1, note_globale: 18.9 },
      { id: 'insa-lyon-etudiant', ecole_id: 'insa-lyon-fra', source_media: "L'Étudiant", annee: 2025, rang_general: 1, rang_post_bac: 1, note_globale: 97 },
      { id: 'insa-lyon-usine', ecole_id: 'insa-lyon-fra', source_media: "L'Usine Nouvelle", annee: 2025, rang_general: 1, rang_post_bac: 1, note_globale: 92.0 }
    ]
  },
  'utc-compiegne-fra': {
    concours_nom: 'Réseau UT (Compiègne, Troyes, Belfort - Parcoursup)',
    admissions: [
      {
        id: 'utc-adm',
        ecole_id: 'utc-compiegne-fra',
        source: 'Parcoursup',
        annee: 2024,
        nom_filiere_concours: 'Réseau UT - Tronc Commun Ingénieur (Parcoursup)',
        capacite: 390,
        nb_voeux: 12500,
        taux_acces: 9.8,
        rang_dernier_appele: 1420,
        pct_mention_tb: 94.0,
        pct_boursiers: 20.0
      }
    ],
    classements: [
      { id: 'utc-figaro', ecole_id: 'utc-compiegne-fra', source_media: 'Le Figaro Étudiant', annee: 2025, rang_general: 2, rang_post_bac: 2, note_globale: 18.4 },
      { id: 'utc-etudiant', ecole_id: 'utc-compiegne-fra', source_media: "L'Étudiant", annee: 2025, rang_general: 2, rang_post_bac: 2, note_globale: 94 },
      { id: 'utc-usine', ecole_id: 'utc-compiegne-fra', source_media: "L'Usine Nouvelle", annee: 2025, rang_general: 2, rang_post_bac: 2, note_globale: 89.5 }
    ]
  },
  'insa-toulouse-fra': {
    concours_nom: 'Groupe INSA (Parcoursup)',
    admissions: [
      {
        id: 'insa-toulouse-adm',
        ecole_id: 'insa-toulouse-fra',
        source: 'Parcoursup',
        annee: 2024,
        nom_filiere_concours: 'Groupe INSA Toulouse (Parcoursup)',
        capacite: 320,
        nb_voeux: 14200,
        taux_acces: 10.5,
        rang_dernier_appele: 1550,
        pct_mention_tb: 93.0,
        pct_boursiers: 21.0
      }
    ],
    classements: [
      { id: 'insa-tls-figaro', ecole_id: 'insa-toulouse-fra', source_media: 'Le Figaro Étudiant', annee: 2025, rang_general: 3, rang_post_bac: 3, note_globale: 17.8 },
      { id: 'insa-tls-etudiant', ecole_id: 'insa-toulouse-fra', source_media: "L'Étudiant", annee: 2025, rang_general: 3, rang_post_bac: 3, note_globale: 90 },
      { id: 'insa-tls-usine', ecole_id: 'insa-toulouse-fra', source_media: "L'Usine Nouvelle", annee: 2025, rang_general: 3, rang_post_bac: 3, note_globale: 87.0 }
    ]
  },
  'epita-paris-fra': {
    concours_nom: 'Concours Advance (Parcoursup - EPITA)',
    admissions: [
      {
        id: 'epita-adm',
        ecole_id: 'epita-paris-fra',
        source: 'Parcoursup',
        annee: 2024,
        nom_filiere_concours: 'Concours Advance (Informatique & Cybersécurité)',
        capacite: 380,
        nb_voeux: 9200,
        taux_acces: 14.5,
        rang_dernier_appele: 1200,
        pct_mention_tb: 88.0,
        pct_boursiers: 18.0
      }
    ],
    classements: [
      { id: 'epita-figaro', ecole_id: 'epita-paris-fra', source_media: 'Le Figaro Étudiant', annee: 2025, rang_general: 4, rang_post_bac: 4, note_globale: 17.5 },
      { id: 'epita-etudiant', ecole_id: 'epita-paris-fra', source_media: "L'Étudiant", annee: 2025, rang_general: 5, rang_post_bac: 5, note_globale: 88 },
      { id: 'epita-usine', ecole_id: 'epita-paris-fra', source_media: "L'Usine Nouvelle", annee: 2025, rang_general: 8, rang_post_bac: 8, note_globale: 85.0 }
    ]
  },
  'efrei-paris-fra': {
    concours_nom: 'Concours Puissance Alpha (Parcoursup - EFREI)',
    admissions: [
      {
        id: 'efrei-adm',
        ecole_id: 'efrei-paris-fra',
        source: 'Parcoursup',
        annee: 2024,
        nom_filiere_concours: 'Concours Puissance Alpha (Ingénieur du Numérique)',
        capacite: 360,
        nb_voeux: 8500,
        taux_acces: 18.0,
        rang_dernier_appele: 1450,
        pct_mention_tb: 85.0,
        pct_boursiers: 19.0
      }
    ],
    classements: [
      { id: 'efrei-figaro', ecole_id: 'efrei-paris-fra', source_media: 'Le Figaro Étudiant', annee: 2025, rang_general: 7, rang_post_bac: 7, note_globale: 16.9 },
      { id: 'efrei-etudiant', ecole_id: 'efrei-paris-fra', source_media: "L'Étudiant", annee: 2025, rang_general: 8, rang_post_bac: 8, note_globale: 85 },
      { id: 'efrei-usine', ecole_id: 'efrei-paris-fra', source_media: "L'Usine Nouvelle", annee: 2025, rang_general: 10, rang_post_bac: 10, note_globale: 83.5 }
    ]
  },
  'estaca-paris-fra': {
    concours_nom: 'Concours Avenir (Parcoursup - ESTACA)',
    admissions: [
      {
        id: 'estaca-adm',
        ecole_id: 'estaca-paris-fra',
        source: 'Parcoursup',
        annee: 2024,
        nom_filiere_concours: 'Concours Avenir (Aéronautique & Transports)',
        capacite: 290,
        nb_voeux: 8900,
        taux_acces: 15.0,
        rang_dernier_appele: 1100,
        pct_mention_tb: 89.0,
        pct_boursiers: 16.0
      }
    ],
    classements: [
      { id: 'estaca-figaro', ecole_id: 'estaca-paris-fra', source_media: 'Le Figaro Étudiant', annee: 2025, rang_general: 5, rang_post_bac: 5, note_globale: 17.2 },
      { id: 'estaca-etudiant', ecole_id: 'estaca-paris-fra', source_media: "L'Étudiant", annee: 2025, rang_general: 6, rang_post_bac: 6, note_globale: 86 },
      { id: 'estaca-usine', ecole_id: 'estaca-paris-fra', source_media: "L'Usine Nouvelle", annee: 2025, rang_general: 7, rang_post_bac: 7, note_globale: 85.5 }
    ]
  },
  'esiea-paris-fra': {
    concours_nom: 'Concours Puissance Alpha (Parcoursup - ESIEA)',
    admissions: [
      {
        id: 'esiea-adm',
        ecole_id: 'esiea-paris-fra',
        source: 'Parcoursup',
        annee: 2024,
        nom_filiere_concours: 'Concours Puissance Alpha (Cybersécurité & Numérique)',
        capacite: 240,
        nb_voeux: 6200,
        taux_acces: 22.0,
        rang_dernier_appele: 1600,
        pct_mention_tb: 82.0,
        pct_boursiers: 20.0
      }
    ],
    classements: [
      { id: 'esiea-figaro', ecole_id: 'esiea-paris-fra', source_media: 'Le Figaro Étudiant', annee: 2025, rang_general: 12, rang_post_bac: 12, note_globale: 15.8 },
      { id: 'esiea-etudiant', ecole_id: 'esiea-paris-fra', source_media: "L'Étudiant", annee: 2025, rang_general: 14, rang_post_bac: 14, note_globale: 79 },
      { id: 'esiea-usine', ecole_id: 'esiea-paris-fra', source_media: "L'Usine Nouvelle", annee: 2025, rang_general: 15, rang_post_bac: 15, note_globale: 78.0 }
    ]
  }
};

// 3. International Universities (EPFL, Polytechnique Montréal, ULB, UCLouvain, etc.)
const INTERNATIONAL_IDS = [
  'epfl-lausanne-che', 'hes-so-vd-che', 'epl-louvain-bel', 'polytech-bruxelles-bel',
  'polymtl-montreal-can', 'ets-montreal-can', 'ulaval-genie-can', 'usherbrooke-genie-can',
  'polytech-liege-bel', 'fpms-mons-bel'
];

export function enrichSchool(school: Ecole): Ecole {
  const isIntl = INTERNATIONAL_IDS.includes(school.id) || school.pays !== 'France';
  const postPrepaSpec = POST_PREPA_SPECS[school.id];
  const postBacSpec = POST_BAC_SPECS[school.id];

  if (postPrepaSpec) {
    return {
      ...school,
      type_etablissement: 'ecole_ingenieur',
      type_recrutement: 'post_prepa',
      banque_concours: postPrepaSpec.banque_concours,
      parcoursup_code: undefined,
      parcoursup_url: undefined,
      admissions: postPrepaSpec.concours_admissions,
      classements: postPrepaSpec.classements
    };
  }

  if (isIntl) {
    return {
      ...school,
      type_etablissement: 'ecole_ingenieur',
      type_recrutement: 'international',
      banque_concours: school.pays === 'Suisse' ? 'Admission Directe Bac S / Maturité' : (school.pays === 'Belgique' ? "Examen Spécial d'Admission" : 'Sélection sur Dossier / DEC'),
      parcoursup_code: undefined,
      parcoursup_url: undefined,
      admissions: [
        {
          id: `${school.id}-adm-intl`,
          ecole_id: school.id,
          source: 'Admission Internationale Directe',
          annee: 2024,
          nom_filiere_concours: school.pays === 'Suisse' 
            ? 'Admission sur dossier bacheliers généraux (Mention TB > 16/20 exigée)' 
            : school.pays === 'Belgique'
            ? 'Examen spécial d\'admission aux études d\'ingénieur civil'
            : 'Admission directe étudiants internationaux (Moyenne Bac > 13.5/20)',
          capacite: 450,
          nb_voeux: 3800,
          taux_acces: school.id === 'epfl-lausanne-che' ? 24.0 : 42.0,
          pct_mention_tb: school.id === 'epfl-lausanne-che' ? 98.0 : 75.0,
          pct_boursiers: 12.0
        }
      ],
      classements: school.id === 'epfl-lausanne-che' ? [
        { id: 'epfl-cl-qs', ecole_id: school.id, source_media: 'QS World University Rankings', annee: 2025, rang_general: 26, note_globale: 92.5 },
        { id: 'epfl-cl-figaro', ecole_id: school.id, source_media: 'Le Figaro Étudiant', annee: 2025, rang_general: 1, note_globale: 19.9 }
      ] : school.classements.filter(c => c.source_media !== 'Le Figaro Étudiant' || !c.domaine_specialite)
    };
  }

  if (postBacSpec) {
    return {
      ...school,
      type_etablissement: 'ecole_ingenieur',
      type_recrutement: 'post_bac',
      banque_concours: postBacSpec.concours_nom,
      admissions: postBacSpec.admissions,
      classements: postBacSpec.classements
    };
  }

  // Fallback: check if known post-prepa or post-bac
  const isPostPrepaGeneral = school.type_recrutement === 'post_prepa' || 
    ['mines', 'centrale', 'telecom', 'ensam', 'ensta', 'ponts', 'polytechnique', 'espci', 'chimie', 'agro', 'ensae', 'enac', 'enseeiht', 'entpe', 'eivp', 'optique', 'ensimag', 'enseirb', 'ensai', 'matmeca'].some(k => school.id.includes(k));

  if (isPostPrepaGeneral) {
    const sanitizedRankings = sanitizeSchoolRankings(school);
    return {
      ...school,
      type_etablissement: 'ecole_ingenieur',
      type_recrutement: 'post_prepa',
      banque_concours: school.banque_concours || 'Concours Commun CPGE (SCEI)',
      parcoursup_code: undefined,
      parcoursup_url: undefined,
      admissions: school.admissions.map(adm => ({
        ...adm,
        source: 'Concours CPGE (SCEI)'
      })),
      classements: sanitizedRankings
    };
  }

  // Default Post-Bac
  const sanitizedRankings = sanitizeSchoolRankings(school);
  return {
    ...school,
    type_etablissement: 'ecole_ingenieur',
    type_recrutement: 'post_bac',
    banque_concours: school.banque_concours || 'Concours Parcoursup Cycle Intégré',
    classements: sanitizedRankings
  };
}

// Clean and deduplicate rankings
function sanitizeSchoolRankings(school: Ecole): ClassementMedia[] {
  const seenMedia = new Set<string>();
  const cleaned: ClassementMedia[] = [];

  for (const cl of school.classements) {
    // Drop duplicated thematic Le Figaro rankings that created "2 fois le Figaro"
    if (seenMedia.has(cl.source_media) && !cl.rang_par_specialite) {
      continue;
    }
    if (cl.source_media === 'Le Figaro Étudiant' && cl.domaine_specialite) {
      continue; // keep palmarès général
    }
    seenMedia.add(cl.source_media);

    // Ensure note /20 for Le Figaro, score /120 for L'Étudiant, score /100 for L'Usine Nouvelle
    let note = cl.note_globale;
    if (cl.source_media === "L'Étudiant" && note && note <= 20) {
      note = Math.round(note * 5.2); // normalize if was wrongly divided by 5
    }
    if (cl.source_media === 'Le Figaro Étudiant' && note && note > 20) {
      note = Number((note / 5).toFixed(1));
    }

    cleaned.push({
      ...cl,
      note_globale: note
    });
  }

  return cleaned;
}

// Enrich CPGE Prepa with canonical, deduplicated national and filière rankings
export function enrichPrepa(prepa: Ecole): Ecole {
  const canon = CANONICAL_PREPAS_RANKINGS[prepa.id];

  const filieresList: ('MPSI' | 'PCSI' | 'PSI' | 'PTSI' | 'MPI' | 'BCPST')[] = canon
    ? canon.filieres.map(f => f.filiere)
    : (prepa.filieres_cpge || ['MPSI', 'PCSI', 'PSI']);

  const prepaStats = canon ? canon.filieres.map(f => ({
    filiere: f.filiere,
    taux_integration_x_ens: f.taux_x_ens,
    taux_integration_top_ecoles: f.taux_top,
    taux_integration_global: 100.0,
    effectif: f.effectif,
    rang_national_filiere: f.rang
  })) : (prepa.prepa_stats || []);

  const generalRank = canon?.rang_general || 50;
  const noteFigaro = canon?.note_globale || 15.0;

  const classements: ClassementMedia[] = [
    {
      id: `${prepa.id}-cl-figaro`,
      ecole_id: prepa.id,
      source_media: 'Le Figaro Étudiant',
      annee: 2025,
      rang_general: generalRank,
      note_globale: noteFigaro
    },
    {
      id: `${prepa.id}-cl-etudiant`,
      ecole_id: prepa.id,
      source_media: "L'Étudiant",
      annee: 2025,
      rang_general: generalRank,
      note_globale: Math.round(noteFigaro * 5.2)
    }
  ];

  return {
    ...prepa,
    type_etablissement: 'prepa_cpge',
    filieres_cpge: filieresList,
    prepa_stats: prepaStats,
    classements: classements,
    parcoursup_url: prepa.parcoursup_url || 'https://dossier.parcoursup.fr/Candidat/carte',
    internat_disponible: prepa.internat_disponible ?? true,
    prix_internat_annuel: prepa.prix_internat_annuel ?? (prepa.statut_juridique === 'Public' ? 2400 : 7500)
  };
}

export const ENRICHED_SCHOOLS: Ecole[] = SCHOOLS_DATA.map(enrichSchool);
export const ENRICHED_PREPAS: Ecole[] = PREPAS_DATA.map(enrichPrepa);
export const ALL_ESTABLISHMENTS: Ecole[] = [
  ...ENRICHED_SCHOOLS,
  ...ENRICHED_PREPAS
];
