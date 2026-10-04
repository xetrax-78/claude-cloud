import { Ecole } from '../types';

// École minimale valide, surchargeable champ par champ
export function makeEcole(overrides: Partial<Ecole> = {}): Ecole {
  const id = overrides.id ?? 'test-fra';
  return {
    id,
    nom_officiel: 'École de test',
    sigle: 'ET',
    type_etablissement: 'ecole_ingenieur',
    type_recrutement: 'post_bac',
    pays: 'France',
    ville_principale: 'Lyon',
    statut_juridique: 'Public',
    frais_scolarite_annuels: 600,
    site_web: 'https://example.org',
    description: 'Une école',
    habilitation_cti: true,
    label_eurace: true,
    campus: [{ id: `${id}-c1`, ecole_id: id, nom_campus: 'Campus', ville: 'Lyon', est_siege_principal: true }],
    specialites: [],
    admissions: [],
    classements: [],
    insertion: { id: `${id}-ins`, ecole_id: id, annee_promo: 2024, salaire_moyen_embauche: 40, taux_emploi_6_mois: 90 },
    ...overrides,
  };
}

export const psup = (ecoleId: string, taux: number, annee = 2024) => ({
  id: `${ecoleId}-psup-${annee}`,
  ecole_id: ecoleId,
  source: 'Parcoursup' as const,
  annee,
  nom_filiere_concours: 'Formation',
  capacite: 100,
  nb_voeux: 1000,
  taux_acces: taux,
});
