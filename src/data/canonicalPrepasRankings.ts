export interface CanonicalPrepaInfo {
  id: string;
  rang_general: number;
  note_globale: number;
  filieres: {
    filiere: 'PTSI' | 'MPSI' | 'PCSI' | 'PSI' | 'BCPST' | 'MPI';
    rang: number;
    taux_top: number;
    taux_x_ens: number;
    effectif: number;
  }[];
}

export const CANONICAL_PREPAS_RANKINGS: Record<string, CanonicalPrepaInfo> = {
  // Top 10 Elite
  'ginette-versailles-fra': {
    id: 'ginette-versailles-fra',
    rang_general: 1,
    note_globale: 19.9,
    filieres: [
      { filiere: 'PTSI', rang: 2, taux_top: 96.0, taux_x_ens: 32.0, effectif: 38 },
      { filiere: 'MPSI', rang: 2, taux_top: 95.0, taux_x_ens: 52.0, effectif: 92 },
      { filiere: 'PCSI', rang: 1, taux_top: 96.5, taux_x_ens: 48.0, effectif: 85 },
      { filiere: 'PSI', rang: 1, taux_top: 97.0, taux_x_ens: 35.0, effectif: 80 },
      { filiere: 'BCPST', rang: 1, taux_top: 94.0, taux_x_ens: 30.0, effectif: 45 },
      { filiere: 'MPI', rang: 2, taux_top: 96.0, taux_x_ens: 45.0, effectif: 36 }
    ]
  },
  'louis-le-grand-paris-fra': {
    id: 'louis-le-grand-paris-fra',
    rang_general: 2,
    note_globale: 19.8,
    filieres: [
      { filiere: 'MPSI', rang: 1, taux_top: 96.0, taux_x_ens: 55.0, effectif: 135 },
      { filiere: 'PCSI', rang: 2, taux_top: 94.0, taux_x_ens: 44.0, effectif: 85 },
      { filiere: 'PSI', rang: 4, taux_top: 93.0, taux_x_ens: 28.0, effectif: 78 },
      { filiere: 'MPI', rang: 1, taux_top: 97.0, taux_x_ens: 50.0, effectif: 40 }
    ]
  },
  'henri-iv-paris-fra': {
    id: 'henri-iv-paris-fra',
    rang_general: 3,
    note_globale: 19.6,
    filieres: [
      { filiere: 'MPSI', rang: 3, taux_top: 92.0, taux_x_ens: 46.0, effectif: 88 },
      { filiere: 'PCSI', rang: 3, taux_top: 91.0, taux_x_ens: 38.0, effectif: 78 },
      { filiere: 'BCPST', rang: 2, taux_top: 91.0, taux_x_ens: 26.0, effectif: 45 }
    ]
  },
  'stanislas-paris-fra': {
    id: 'stanislas-paris-fra',
    rang_general: 4,
    note_globale: 19.4,
    filieres: [
      { filiere: 'MPSI', rang: 4, taux_top: 91.0, taux_x_ens: 38.0, effectif: 90 },
      { filiere: 'PCSI', rang: 4, taux_top: 90.0, taux_x_ens: 32.0, effectif: 80 },
      { filiere: 'PSI', rang: 3, taux_top: 94.0, taux_x_ens: 24.0, effectif: 75 },
      { filiere: 'MPI', rang: 3, taux_top: 93.0, taux_x_ens: 35.0, effectif: 35 }
    ]
  },
  'hoche-versailles-fra': {
    id: 'hoche-versailles-fra',
    rang_general: 5,
    note_globale: 19.3,
    filieres: [
      { filiere: 'MPSI', rang: 5, taux_top: 88.0, taux_x_ens: 32.0, effectif: 85 },
      { filiere: 'PCSI', rang: 7, taux_top: 84.0, taux_x_ens: 22.0, effectif: 75 },
      { filiere: 'PSI', rang: 2, taux_top: 95.0, taux_x_ens: 26.0, effectif: 70 },
      { filiere: 'BCPST', rang: 4, taux_top: 88.0, taux_x_ens: 20.0, effectif: 42 },
      { filiere: 'MPI', rang: 6, taux_top: 89.0, taux_x_ens: 25.0, effectif: 32 }
    ]
  },
  'lazaristes-lyon-fra': {
    id: 'lazaristes-lyon-fra',
    rang_general: 6,
    note_globale: 19.2,
    filieres: [
      { filiere: 'MPSI', rang: 6, taux_top: 89.0, taux_x_ens: 34.0, effectif: 80 },
      { filiere: 'PCSI', rang: 6, taux_top: 86.0, taux_x_ens: 24.0, effectif: 70 },
      { filiere: 'PSI', rang: 5, taux_top: 92.0, taux_x_ens: 22.0, effectif: 65 },
      { filiere: 'MPI', rang: 4, taux_top: 92.0, taux_x_ens: 30.0, effectif: 30 }
    ]
  },
  'le-parc-lyon-fra': {
    id: 'le-parc-lyon-fra',
    rang_general: 7,
    note_globale: 19.0,
    filieres: [
      { filiere: 'MPSI', rang: 7, taux_top: 86.0, taux_x_ens: 25.0, effectif: 125 },
      { filiere: 'PCSI', rang: 5, taux_top: 87.0, taux_x_ens: 26.0, effectif: 105 },
      { filiere: 'PSI', rang: 6, taux_top: 90.0, taux_x_ens: 20.0, effectif: 90 },
      { filiere: 'BCPST', rang: 5, taux_top: 86.0, taux_x_ens: 18.0, effectif: 45 },
      { filiere: 'MPI', rang: 5, taux_top: 90.0, taux_x_ens: 28.0, effectif: 35 }
    ]
  },
  'saint-louis-paris-fra': {
    id: 'saint-louis-paris-fra',
    rang_general: 8,
    note_globale: 18.8,
    filieres: [
      { filiere: 'MPSI', rang: 9, taux_top: 82.0, taux_x_ens: 18.0, effectif: 180 },
      { filiere: 'PCSI', rang: 8, taux_top: 82.0, taux_x_ens: 19.0, effectif: 160 },
      { filiere: 'PSI', rang: 9, taux_top: 88.0, taux_x_ens: 16.0, effectif: 130 },
      { filiere: 'BCPST', rang: 3, taux_top: 89.0, taux_x_ens: 22.0, effectif: 90 },
      { filiere: 'MPI', rang: 8, taux_top: 86.0, taux_x_ens: 20.0, effectif: 40 }
    ]
  },
  'blaise-pascal-orsay-fra': {
    id: 'blaise-pascal-orsay-fra',
    rang_general: 9,
    note_globale: 18.7,
    filieres: [
      { filiere: 'MPSI', rang: 8, taux_top: 84.0, taux_x_ens: 22.0, effectif: 85 },
      { filiere: 'PCSI', rang: 10, taux_top: 80.0, taux_x_ens: 16.0, effectif: 75 },
      { filiere: 'PSI', rang: 7, taux_top: 89.0, taux_x_ens: 18.0, effectif: 70 },
      { filiere: 'MPI', rang: 7, taux_top: 88.0, taux_x_ens: 22.0, effectif: 30 }
    ]
  },
  'pierre-de-fermat-toulouse-fra': {
    id: 'pierre-de-fermat-toulouse-fra',
    rang_general: 10,
    note_globale: 18.5,
    filieres: [
      { filiere: 'MPSI', rang: 10, taux_top: 81.0, taux_x_ens: 17.0, effectif: 120 },
      { filiere: 'PCSI', rang: 9, taux_top: 81.0, taux_x_ens: 17.0, effectif: 110 },
      { filiere: 'PSI', rang: 8, taux_top: 88.0, taux_x_ens: 17.0, effectif: 90 },
      { filiere: 'BCPST', rang: 6, taux_top: 84.0, taux_x_ens: 16.0, effectif: 45 }
    ]
  },
  'pasteur-neuilly-fra': {
    id: 'pasteur-neuilly-fra',
    rang_general: 11,
    note_globale: 18.3,
    filieres: [
      { filiere: 'MPSI', rang: 11, taux_top: 79.0, taux_x_ens: 15.0, effectif: 80 },
      { filiere: 'PCSI', rang: 11, taux_top: 78.0, taux_x_ens: 14.0, effectif: 75 }
    ]
  },

  // #1 PTSI Incontesté
  'jean-baptiste-say-paris-fra': {
    id: 'jean-baptiste-say-paris-fra',
    rang_general: 12,
    note_globale: 18.2,
    filieres: [
      { filiere: 'PTSI', rang: 1, taux_top: 98.0, taux_x_ens: 36.0, effectif: 45 },
      { filiere: 'PSI', rang: 10, taux_top: 86.0, taux_x_ens: 14.0, effectif: 40 }
    ]
  },

  'condorcet-paris-fra': {
    id: 'condorcet-paris-fra',
    rang_general: 13,
    note_globale: 18.1,
    filieres: [
      { filiere: 'MPSI', rang: 12, taux_top: 78.0, taux_x_ens: 14.0, effectif: 80 },
      { filiere: 'PCSI', rang: 15, taux_top: 73.0, taux_x_ens: 11.0, effectif: 70 }
    ]
  },
  'passy-buzenval-rueil-fra': {
    id: 'passy-buzenval-rueil-fra',
    rang_general: 14,
    note_globale: 18.0,
    filieres: [
      { filiere: 'PTSI', rang: 3, taux_top: 88.0, taux_x_ens: 18.0, effectif: 42 },
      { filiere: 'PCSI', rang: 32, taux_top: 58.0, taux_x_ens: 5.0, effectif: 65 },
      { filiere: 'PSI', rang: 12, taux_top: 82.0, taux_x_ens: 11.0, effectif: 60 }
    ]
  },
  'janson-sailly-paris-fra': {
    id: 'janson-sailly-paris-fra',
    rang_general: 15,
    note_globale: 17.9,
    filieres: [
      { filiere: 'MPSI', rang: 13, taux_top: 76.0, taux_x_ens: 13.0, effectif: 110 },
      { filiere: 'PCSI', rang: 12, taux_top: 76.0, taux_x_ens: 12.0, effectif: 100 },
      { filiere: 'PSI', rang: 13, taux_top: 80.0, taux_x_ens: 10.0, effectif: 85 }
    ]
  },
  'thiers-marseille-fra': {
    id: 'thiers-marseille-fra',
    rang_general: 16,
    note_globale: 17.8,
    filieres: [
      { filiere: 'MPSI', rang: 14, taux_top: 75.0, taux_x_ens: 12.0, effectif: 95 },
      { filiere: 'PCSI', rang: 13, taux_top: 75.0, taux_x_ens: 11.0, effectif: 85 },
      { filiere: 'PSI', rang: 14, taux_top: 79.0, taux_x_ens: 9.0, effectif: 75 },
      { filiere: 'BCPST', rang: 9, taux_top: 77.0, taux_x_ens: 11.0, effectif: 40 }
    ]
  },
  'clemenceau-nantes-fra': {
    id: 'clemenceau-nantes-fra',
    rang_general: 17,
    note_globale: 17.7,
    filieres: [
      { filiere: 'MPSI', rang: 15, taux_top: 74.0, taux_x_ens: 11.0, effectif: 105 },
      { filiere: 'PCSI', rang: 14, taux_top: 74.0, taux_x_ens: 10.0, effectif: 95 },
      { filiere: 'PSI', rang: 16, taux_top: 77.0, taux_x_ens: 8.0, effectif: 80 },
      { filiere: 'BCPST', rang: 7, taux_top: 82.0, taux_x_ens: 14.0, effectif: 45 }
    ]
  },
  'lakanal-sceaux-fra': {
    id: 'lakanal-sceaux-fra',
    rang_general: 18,
    note_globale: 17.6,
    filieres: [
      { filiere: 'MPSI', rang: 16, taux_top: 73.0, taux_x_ens: 10.0, effectif: 85 },
      { filiere: 'PCSI', rang: 16, taux_top: 72.0, taux_x_ens: 9.0, effectif: 75 },
      { filiere: 'PSI', rang: 17, taux_top: 76.0, taux_x_ens: 8.0, effectif: 70 }
    ]
  },
  'montaigne-bordeaux-fra': {
    id: 'montaigne-bordeaux-fra',
    rang_general: 19,
    note_globale: 17.5,
    filieres: [
      { filiere: 'MPSI', rang: 18, taux_top: 71.0, taux_x_ens: 9.0, effectif: 110 },
      { filiere: 'PCSI', rang: 17, taux_top: 71.0, taux_x_ens: 8.5, effectif: 95 },
      { filiere: 'PSI', rang: 18, taux_top: 75.0, taux_x_ens: 7.5, effectif: 80 },
      { filiere: 'BCPST', rang: 10, taux_top: 75.0, taux_x_ens: 10.0, effectif: 45 }
    ]
  },
  'charlemagne-paris-fra': {
    id: 'charlemagne-paris-fra',
    rang_general: 20,
    note_globale: 17.4,
    filieres: [
      { filiere: 'MPSI', rang: 17, taux_top: 72.0, taux_x_ens: 9.5, effectif: 80 },
      { filiere: 'PSI', rang: 19, taux_top: 74.0, taux_x_ens: 7.0, effectif: 70 }
    ]
  },
  'champollion-grenoble-fra': {
    id: 'champollion-grenoble-fra',
    rang_general: 21,
    note_globale: 17.3,
    filieres: [
      { filiere: 'MPSI', rang: 19, taux_top: 70.0, taux_x_ens: 8.5, effectif: 95 },
      { filiere: 'PCSI', rang: 18, taux_top: 70.0, taux_x_ens: 8.0, effectif: 85 },
      { filiere: 'PSI', rang: 20, taux_top: 73.0, taux_x_ens: 6.5, effectif: 75 }
    ]
  },
  'chateaubriand-rennes-fra': {
    id: 'chateaubriand-rennes-fra',
    rang_general: 22,
    note_globale: 17.2,
    filieres: [
      { filiere: 'MPSI', rang: 20, taux_top: 69.0, taux_x_ens: 8.0, effectif: 105 },
      { filiere: 'PCSI', rang: 19, taux_top: 69.0, taux_x_ens: 7.5, effectif: 90 },
      { filiere: 'PSI', rang: 21, taux_top: 72.0, taux_x_ens: 6.0, effectif: 75 },
      { filiere: 'BCPST', rang: 8, taux_top: 80.0, taux_x_ens: 12.0, effectif: 45 }
    ]
  },
  'michelet-vanves-fra': {
    id: 'michelet-vanves-fra',
    rang_general: 23,
    note_globale: 17.1,
    filieres: [
      { filiere: 'MPSI', rang: 21, taux_top: 68.0, taux_x_ens: 7.5, effectif: 75 },
      { filiere: 'PSI', rang: 11, taux_top: 84.0, taux_x_ens: 12.0, effectif: 70 }
    ]
  },
  'faidherbe-lille-fra': {
    id: 'faidherbe-lille-fra',
    rang_general: 24,
    note_globale: 17.0,
    filieres: [
      { filiere: 'MPSI', rang: 22, taux_top: 67.0, taux_x_ens: 7.0, effectif: 110 },
      { filiere: 'PCSI', rang: 20, taux_top: 68.0, taux_x_ens: 7.0, effectif: 95 },
      { filiere: 'PSI', rang: 22, taux_top: 71.0, taux_x_ens: 5.5, effectif: 85 }
    ]
  },
  'gustave-eiffel-cachan-fra': {
    id: 'gustave-eiffel-cachan-fra',
    rang_general: 25,
    note_globale: 16.9,
    filieres: [
      { filiere: 'PTSI', rang: 4, taux_top: 85.0, taux_x_ens: 14.0, effectif: 45 },
      { filiere: 'PCSI', rang: 36, taux_top: 55.0, taux_x_ens: 4.0, effectif: 55 },
      { filiere: 'PSI', rang: 15, taux_top: 78.0, taux_x_ens: 8.5, effectif: 50 }
    ]
  },
  'kleber-strasbourg-fra': {
    id: 'kleber-strasbourg-fra',
    rang_general: 26,
    note_globale: 16.8,
    filieres: [
      { filiere: 'MPSI', rang: 23, taux_top: 66.0, taux_x_ens: 6.5, effectif: 100 },
      { filiere: 'PCSI', rang: 21, taux_top: 67.0, taux_x_ens: 6.5, effectif: 90 },
      { filiere: 'PSI', rang: 23, taux_top: 70.0, taux_x_ens: 5.0, effectif: 80 }
    ]
  },
  'la-martiniere-lyon-fra': {
    id: 'la-martiniere-lyon-fra',
    rang_general: 27,
    note_globale: 16.7,
    filieres: [
      { filiere: 'PTSI', rang: 5, taux_top: 82.0, taux_x_ens: 12.0, effectif: 45 },
      { filiere: 'MPSI', rang: 26, taux_top: 63.0, taux_x_ens: 5.0, effectif: 120 },
      { filiere: 'PSI', rang: 24, taux_top: 69.0, taux_x_ens: 4.8, effectif: 80 }
    ]
  },
  'chaptal-paris-fra': {
    id: 'chaptal-paris-fra',
    rang_general: 28,
    note_globale: 16.6,
    filieres: [
      { filiere: 'PTSI', rang: 6, taux_top: 80.0, taux_x_ens: 10.0, effectif: 42 },
      { filiere: 'MPSI', rang: 24, taux_top: 65.0, taux_x_ens: 6.0, effectif: 90 },
      { filiere: 'PCSI', rang: 31, taux_top: 59.0, taux_x_ens: 5.2, effectif: 75 }
    ]
  },
  'massena-nice-fra': {
    id: 'massena-nice-fra',
    rang_general: 29,
    note_globale: 16.5,
    filieres: [
      { filiere: 'MPSI', rang: 25, taux_top: 64.0, taux_x_ens: 5.5, effectif: 85 },
      { filiere: 'PCSI', rang: 22, taux_top: 66.0, taux_x_ens: 6.0, effectif: 75 },
      { filiere: 'PSI', rang: 25, taux_top: 68.0, taux_x_ens: 4.5, effectif: 65 }
    ]
  },
  'fenelon-paris-fra': {
    id: 'fenelon-paris-fra',
    rang_general: 30,
    note_globale: 16.4,
    filieres: [
      { filiere: 'MPSI', rang: 27, taux_top: 62.0, taux_x_ens: 4.5, effectif: 75 }
    ]
  },
  'corneille-rouen-fra': {
    id: 'corneille-rouen-fra',
    rang_general: 31,
    note_globale: 16.3,
    filieres: [
      { filiere: 'MPSI', rang: 28, taux_top: 61.0, taux_x_ens: 4.2, effectif: 85 },
      { filiere: 'PCSI', rang: 23, taux_top: 65.0, taux_x_ens: 5.5, effectif: 75 },
      { filiere: 'PSI', rang: 26, taux_top: 67.0, taux_x_ens: 4.2, effectif: 65 }
    ]
  },
  'descartes-tours-fra': {
    id: 'descartes-tours-fra',
    rang_general: 32,
    note_globale: 16.2,
    filieres: [
      { filiere: 'MPSI', rang: 29, taux_top: 60.0, taux_x_ens: 4.0, effectif: 85 },
      { filiere: 'PCSI', rang: 24, taux_top: 64.0, taux_x_ens: 5.0, effectif: 75 },
      { filiere: 'PSI', rang: 27, taux_top: 66.0, taux_x_ens: 4.0, effectif: 65 }
    ]
  },
  'poincare-nancy-fra': {
    id: 'poincare-nancy-fra',
    rang_general: 33,
    note_globale: 16.1,
    filieres: [
      { filiere: 'MPSI', rang: 30, taux_top: 59.0, taux_x_ens: 3.8, effectif: 90 },
      { filiere: 'PCSI', rang: 25, taux_top: 63.0, taux_x_ens: 4.8, effectif: 80 },
      { filiere: 'PSI', rang: 28, taux_top: 65.0, taux_x_ens: 3.8, effectif: 70 }
    ]
  },
  'berthollet-annecy-fra': {
    id: 'berthollet-annecy-fra',
    rang_general: 34,
    note_globale: 16.0,
    filieres: [
      { filiere: 'MPSI', rang: 31, taux_top: 58.0, taux_x_ens: 3.6, effectif: 75 },
      { filiere: 'PCSI', rang: 27, taux_top: 61.0, taux_x_ens: 4.4, effectif: 65 },
      { filiere: 'PSI', rang: 29, taux_top: 64.0, taux_x_ens: 3.6, effectif: 60 }
    ]
  },
  'fabert-metz-fra': {
    id: 'fabert-metz-fra',
    rang_general: 35,
    note_globale: 15.9,
    filieres: [
      { filiere: 'MPSI', rang: 32, taux_top: 57.0, taux_x_ens: 3.5, effectif: 80 },
      { filiere: 'PCSI', rang: 26, taux_top: 62.0, taux_x_ens: 4.6, effectif: 70 },
      { filiere: 'PSI', rang: 30, taux_top: 63.0, taux_x_ens: 3.5, effectif: 60 }
    ]
  },
  'joffre-montpellier-fra': {
    id: 'joffre-montpellier-fra',
    rang_general: 36,
    note_globale: 15.8,
    filieres: [
      { filiere: 'MPSI', rang: 33, taux_top: 56.0, taux_x_ens: 3.4, effectif: 90 },
      { filiere: 'PCSI', rang: 28, taux_top: 60.0, taux_x_ens: 4.2, effectif: 80 },
      { filiere: 'PSI', rang: 31, taux_top: 62.0, taux_x_ens: 3.4, effectif: 70 }
    ]
  },
  'civ-valbonne-fra': {
    id: 'civ-valbonne-fra',
    rang_general: 37,
    note_globale: 15.7,
    filieres: [
      { filiere: 'MPSI', rang: 34, taux_top: 55.0, taux_x_ens: 3.2, effectif: 70 },
      { filiere: 'PCSI', rang: 30, taux_top: 59.0, taux_x_ens: 4.0, effectif: 60 },
      { filiere: 'PSI', rang: 32, taux_top: 61.0, taux_x_ens: 3.2, effectif: 55 }
    ]
  },
  'carnot-dijon-fra': {
    id: 'carnot-dijon-fra',
    rang_general: 38,
    note_globale: 15.6,
    filieres: [
      { filiere: 'MPSI', rang: 35, taux_top: 54.0, taux_x_ens: 3.0, effectif: 80 },
      { filiere: 'PCSI', rang: 29, taux_top: 60.0, taux_x_ens: 4.1, effectif: 70 },
      { filiere: 'PSI', rang: 33, taux_top: 60.0, taux_x_ens: 3.0, effectif: 60 }
    ]
  },
  'sainte-marie-antony-fra': {
    id: 'sainte-marie-antony-fra',
    rang_general: 39,
    note_globale: 15.5,
    filieres: [
      { filiere: 'MPSI', rang: 36, taux_top: 53.0, taux_x_ens: 2.8, effectif: 60 },
      { filiere: 'PCSI', rang: 33, taux_top: 57.0, taux_x_ens: 3.6, effectif: 50 },
      { filiere: 'PSI', rang: 34, taux_top: 59.0, taux_x_ens: 2.8, effectif: 45 }
    ]
  },
  'wallon-valenciennes-fra': {
    id: 'wallon-valenciennes-fra',
    rang_general: 40,
    note_globale: 15.4,
    filieres: [
      { filiere: 'MPSI', rang: 37, taux_top: 52.0, taux_x_ens: 2.6, effectif: 75 },
      { filiere: 'PCSI', rang: 34, taux_top: 56.0, taux_x_ens: 3.4, effectif: 65 },
      { filiere: 'PSI', rang: 35, taux_top: 58.0, taux_x_ens: 2.6, effectif: 55 }
    ]
  },
  'buffon-paris-fra': {
    id: 'buffon-paris-fra',
    rang_general: 41,
    note_globale: 15.3,
    filieres: [
      { filiere: 'MPSI', rang: 38, taux_top: 51.0, taux_x_ens: 2.5, effectif: 70 },
      { filiere: 'PSI', rang: 36, taux_top: 57.0, taux_x_ens: 2.5, effectif: 60 }
    ]
  },

  // Prépas PTSI Régionales majeures
  'ferdinand-buisson-voiron-fra': {
    id: 'ferdinand-buisson-voiron-fra',
    rang_general: 42,
    note_globale: 15.2,
    filieres: [
      { filiere: 'PTSI', rang: 7, taux_top: 76.0, taux_x_ens: 8.0, effectif: 38 },
      { filiere: 'PSI', rang: 38, taux_top: 55.0, taux_x_ens: 2.2, effectif: 35 }
    ]
  },
  'livet-nantes-fra': {
    id: 'livet-nantes-fra',
    rang_general: 43,
    note_globale: 15.1,
    filieres: [
      { filiere: 'PTSI', rang: 8, taux_top: 74.0, taux_x_ens: 7.5, effectif: 40 },
      { filiere: 'PSI', rang: 39, taux_top: 54.0, taux_x_ens: 2.1, effectif: 38 }
    ]
  },
  'bellevue-toulouse-fra': {
    id: 'bellevue-toulouse-fra',
    rang_general: 44,
    note_globale: 15.0,
    filieres: [
      { filiere: 'MPSI', rang: 39, taux_top: 50.0, taux_x_ens: 2.4, effectif: 75 },
      { filiere: 'PCSI', rang: 35, taux_top: 55.0, taux_x_ens: 3.2, effectif: 65 },
      { filiere: 'PSI', rang: 37, taux_top: 56.0, taux_x_ens: 2.4, effectif: 55 }
    ]
  },
  'montaigne-paris-fra': {
    id: 'montaigne-paris-fra',
    rang_general: 45,
    note_globale: 14.9,
    filieres: [
      { filiere: 'MPSI', rang: 40, taux_top: 49.0, taux_x_ens: 2.3, effectif: 70 }
    ]
  },
  'eucalyptus-nice-fra': {
    id: 'eucalyptus-nice-fra',
    rang_general: 46,
    note_globale: 14.8,
    filieres: [
      { filiere: 'PTSI', rang: 9, taux_top: 72.0, taux_x_ens: 7.0, effectif: 35 },
      { filiere: 'PSI', rang: 40, taux_top: 53.0, taux_x_ens: 2.0, effectif: 32 }
    ]
  },
  'cezanne-aix-fra': {
    id: 'cezanne-aix-fra',
    rang_general: 47,
    note_globale: 14.7,
    filieres: [
      { filiere: 'MPSI', rang: 41, taux_top: 48.0, taux_x_ens: 2.2, effectif: 65 }
    ]
  },
  'saint-joseph-toulouse-fra': {
    id: 'saint-joseph-toulouse-fra',
    rang_general: 48,
    note_globale: 14.6,
    filieres: [
      { filiere: 'MPSI', rang: 42, taux_top: 47.0, taux_x_ens: 2.1, effectif: 55 },
      { filiere: 'PCSI', rang: 40, taux_top: 51.0, taux_x_ens: 2.5, effectif: 45 }
    ]
  },
  'deodat-de-severac-toulouse-fra': {
    id: 'deodat-de-severac-toulouse-fra',
    rang_general: 49,
    note_globale: 14.5,
    filieres: [
      { filiere: 'PTSI', rang: 10, taux_top: 70.0, taux_x_ens: 6.5, effectif: 38 },
      { filiere: 'PSI', rang: 41, taux_top: 52.0, taux_x_ens: 1.9, effectif: 35 }
    ]
  },
  'pothier-orleans-fra': {
    id: 'pothier-orleans-fra',
    rang_general: 50,
    note_globale: 14.4,
    filieres: [
      { filiere: 'MPSI', rang: 43, taux_top: 46.0, taux_x_ens: 2.0, effectif: 75 },
      { filiere: 'PCSI', rang: 37, taux_top: 54.0, taux_x_ens: 3.0, effectif: 65 }
    ]
  },
  'saliege-balma-fra': {
    id: 'saliege-balma-fra',
    rang_general: 51,
    note_globale: 14.3,
    filieres: [
      { filiere: 'MPSI', rang: 44, taux_top: 45.0, taux_x_ens: 1.9, effectif: 50 },
      { filiere: 'PCSI', rang: 39, taux_top: 52.0, taux_x_ens: 2.6, effectif: 45 }
    ]
  },
  'baggio-lille-fra': {
    id: 'baggio-lille-fra',
    rang_general: 52,
    note_globale: 14.2,
    filieres: [
      { filiere: 'PTSI', rang: 11, taux_top: 68.0, taux_x_ens: 6.0, effectif: 35 },
      { filiere: 'PSI', rang: 42, taux_top: 51.0, taux_x_ens: 1.8, effectif: 32 }
    ]
  },
  'camille-guerin-poitiers-fra': {
    id: 'camille-guerin-poitiers-fra',
    rang_general: 53,
    note_globale: 14.1,
    filieres: [
      { filiere: 'MPSI', rang: 45, taux_top: 44.0, taux_x_ens: 1.8, effectif: 65 },
      { filiere: 'PCSI', rang: 38, taux_top: 53.0, taux_x_ens: 2.8, effectif: 55 }
    ]
  },
  'claude-fauriel-saint-etienne-fra': {
    id: 'claude-fauriel-saint-etienne-fra',
    rang_general: 54,
    note_globale: 14.0,
    filieres: [
      { filiere: 'MPSI', rang: 46, taux_top: 43.0, taux_x_ens: 1.7, effectif: 60 },
      { filiere: 'PCSI', rang: 41, taux_top: 50.0, taux_x_ens: 2.4, effectif: 50 }
    ]
  },
  'etienne-mimard-saint-etienne-fra': {
    id: 'etienne-mimard-saint-etienne-fra',
    rang_general: 55,
    note_globale: 13.9,
    filieres: [
      { filiere: 'PTSI', rang: 12, taux_top: 65.0, taux_x_ens: 5.5, effectif: 32 },
      { filiere: 'PSI', rang: 43, taux_top: 50.0, taux_x_ens: 1.7, effectif: 30 }
    ]
  },
  'kerichen-brest-fra': {
    id: 'kerichen-brest-fra',
    rang_general: 56,
    note_globale: 13.8,
    filieres: [
      { filiere: 'MPSI', rang: 47, taux_top: 42.0, taux_x_ens: 1.6, effectif: 65 },
      { filiere: 'PCSI', rang: 42, taux_top: 49.0, taux_x_ens: 2.2, effectif: 55 }
    ]
  },
  'saint-francois-xavier-vannes-fra': {
    id: 'saint-francois-xavier-vannes-fra',
    rang_general: 57,
    note_globale: 13.7,
    filieres: [
      { filiere: 'MPSI', rang: 48, taux_top: 41.0, taux_x_ens: 1.5, effectif: 45 },
      { filiere: 'PCSI', rang: 44, taux_top: 47.0, taux_x_ens: 2.0, effectif: 40 }
    ]
  },
  'marceau-chartres-fra': {
    id: 'marceau-chartres-fra',
    rang_general: 58,
    note_globale: 13.6,
    filieres: [
      { filiere: 'MPSI', rang: 49, taux_top: 40.0, taux_x_ens: 1.4, effectif: 50 },
      { filiere: 'PCSI', rang: 43, taux_top: 48.0, taux_x_ens: 2.1, effectif: 45 }
    ]
  },
  'alain-rene-lesage-vannes-fra': {
    id: 'alain-rene-lesage-vannes-fra',
    rang_general: 59,
    note_globale: 13.5,
    filieres: [
      { filiere: 'MPSI', rang: 50, taux_top: 39.0, taux_x_ens: 1.3, effectif: 45 },
      { filiere: 'PCSI', rang: 45, taux_top: 46.0, taux_x_ens: 1.9, effectif: 40 }
    ]
  }
};
