import { DomaineIngenierie } from '../../types';

// Listes partagées par les sections de la Boussole
export type StudioSection = 'specialties_studio' | 'specialties_compare' | 'parcoursup_strategy' | 'multicriteria_engine' | 'rankings_table';

export const ALL_DOMAINS: DomaineIngenierie[] = [
  'Informatique & Logiciel',
  'Intelligence Artificielle & Data',
  'Cybersécurité',
  'Aéronautique & Spatial',
  'Génie Civil & BTP',
  'Énergie & Environnement',
  'Matériaux & Chimie',
  'Robotique & Mécatronique',
  'Électronique & Systèmes Embarqués',
  'Mathématiques Financières & Modélisation',
  'Automobile & Transports',
  'Biotechnologies & Santé',
  'Télécommunications & Réseaux',
  'Généraliste & Systèmes Complexes'
];

export const FRENCH_REGIONS = [
  'Toutes',
  'Île-de-France',
  'Auvergne-Rhône-Alpes',
  'Occitanie',
  'Bretagne',
  'Grand Est',
  'Normandie',
  'Nouvelle-Aquitaine',
  'Pays de la Loire',
  'Hauts-de-France',
  'Bourgogne-Franche-Comté'
];

export const ADMISSION_TRACKS = [
  'Tous',
  'Concours Puissance Alpha',
  'Concours Avenir',
  'Concours Geipi Polytech',
  'Concours Advance',
  'Groupe INSA',
  'Groupe UT',
  'Concours Commun Mines-Télécom',
  'Concours Centrale-Supélec',
  'Concours CCINP',
  'Concours X'
];
