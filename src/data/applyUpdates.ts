import { AdmissionsStats, Campus, ClassementMedia, Ecole, InsertionProfessionnelle } from '../types';

/**
 * Données fraîches générées par les scripts Python (scripts/update_parcoursup.py,
 * scripts/export_pipeline.py) et fusionnées par-dessus le jeu de base au chargement.
 * Une valeur plus récente remplace la plus ancienne ; rien n'est supprimé.
 */
export interface ParcoursupUpdate {
  session: number;
  nom_filiere_concours: string;
  capacite: number;
  nb_voeux: number;
  taux_acces?: number;
  rang_dernier_appele?: number;
  pct_mention_tb?: number;
  pct_boursiers?: number;
  code_formation?: string;
  url?: string;
}

export interface ParcoursupUpdatesFile {
  generated_at: string | null;
  dataset?: string;
  entries: Record<string, ParcoursupUpdate>;
}

export interface PipelineUpdatesFile {
  generated_at: string | null;
  ecoles: Record<string, {
    classements?: Omit<ClassementMedia, 'ecole_id'>[];
    insertion?: Omit<InsertionProfessionnelle, 'ecole_id'>;
    campus?: Omit<Campus, 'ecole_id'>[];
  }>;
}

const PARCOURSUP_DATASET_URL = 'https://data.enseignementsup-recherche.gouv.fr/explore/dataset/fr-esr-parcoursup/';

function mergeAdmission(ecole: Ecole, u: ParcoursupUpdate, dataset?: string): AdmissionsStats[] {
  const fresh: AdmissionsStats = {
    id: `${ecole.id}-psup-${u.session}`,
    ecole_id: ecole.id,
    source: 'Parcoursup',
    annee: u.session,
    nom_filiere_concours: u.nom_filiere_concours,
    capacite: u.capacite,
    nb_voeux: u.nb_voeux,
    taux_acces: u.taux_acces,
    rang_dernier_appele: u.rang_dernier_appele,
    pct_mention_tb: u.pct_mention_tb,
    pct_boursiers: u.pct_boursiers,
    code_formation: u.code_formation,
    source_url: u.url ?? (dataset ? `https://data.enseignementsup-recherche.gouv.fr/explore/dataset/${dataset}/` : PARCOURSUP_DATASET_URL),
  };
  const others = ecole.admissions.filter(a => !(a.source === 'Parcoursup' && a.annee === u.session));
  // La plus récente en tête : les vues lisent la première entrée Parcoursup
  return [fresh, ...others].sort((a, b) => (a.source === b.source ? b.annee - a.annee : 0));
}

function mergeClassements(current: ClassementMedia[], fresh: Omit<ClassementMedia, 'ecole_id'>[], ecoleId: string) {
  const key = (c: Pick<ClassementMedia, 'source_media' | 'domaine_specialite'>) => `${c.source_media}|${c.domaine_specialite ?? ''}`;
  const byKey = new Map(current.map(c => [key(c), c]));
  for (const c of fresh) {
    const existing = byKey.get(key(c));
    if (!existing || c.annee >= existing.annee) byKey.set(key(c), { ...c, ecole_id: ecoleId });
  }
  return [...byKey.values()];
}

// Un campus du pipeline complète celui du site de même id ou de même ville (ids différents entre les deux sources)
function mergeCampus(current: Campus[], fresh: Omit<Campus, 'ecole_id'>[], ecoleId: string) {
  const ville = (v: string) => v.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
  const result = [...current];
  for (const c of fresh) {
    const i = result.findIndex(r => r.id === c.id || ville(r.ville) === ville(c.ville));
    if (i >= 0) result[i] = { ...result[i], ...c, id: result[i].id, ecole_id: ecoleId };
    else result.push({ ...c, ecole_id: ecoleId });
  }
  return result;
}

export function applyUpdates(base: Ecole[], parcoursup: ParcoursupUpdatesFile, pipeline: PipelineUpdatesFile): Ecole[] {
  return base.map(ecole => {
    let next = ecole;
    const psup = parcoursup.entries[ecole.id];
    if (psup) next = { ...next, admissions: mergeAdmission(next, psup, parcoursup.dataset) };

    const pipe = pipeline.ecoles[ecole.id];
    if (pipe?.classements?.length) next = { ...next, classements: mergeClassements(next.classements, pipe.classements, ecole.id) };
    if (pipe?.insertion && pipe.insertion.annee_promo >= next.insertion.annee_promo) {
      next = { ...next, insertion: { ...next.insertion, ...pipe.insertion, ecole_id: ecole.id } };
    }
    if (pipe?.campus?.length) next = { ...next, campus: mergeCampus(next.campus, pipe.campus, ecole.id) };
    return next;
  });
}
