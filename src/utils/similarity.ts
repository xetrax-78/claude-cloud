import { Ecole } from '../types';

const isPrepa = (e: Ecole) => e.type_etablissement === 'prepa_cpge';

/**
 * Établissements les plus proches (même type uniquement) : spécialités ou filières en commun,
 * même modèle de recrutement, même région / pays, frais comparables. Uniquement des critères connus.
 */
export function similarityScore(a: Ecole, b: Ecole): number {
  let score = 0;
  if (isPrepa(a)) {
    const fa = new Set(a.filieres_cpge ?? []);
    score += (b.filieres_cpge ?? []).filter(f => fa.has(f)).length * 2;
  } else {
    const da = new Set(a.specialites.map(s => s.domaine));
    score += [...new Set(b.specialites.map(s => s.domaine))].filter(d => da.has(d)).length * 2;
    if (a.type_recrutement && a.type_recrutement === b.type_recrutement) score += 3;
  }
  if (a.region && a.region === b.region) score += 2;
  else if (a.pays === b.pays) score += 1;
  if (a.statut_juridique === b.statut_juridique) score += 1;
  return score;
}

export function findSimilar(ecole: Ecole, all: Ecole[], limit = 3): Ecole[] {
  return all
    .filter(s => s.id !== ecole.id && isPrepa(s) === isPrepa(ecole))
    .map(s => ({ s, score: similarityScore(ecole, s) }))
    .sort((x, y) => y.score - x.score || x.s.nom_officiel.localeCompare(y.s.nom_officiel, 'fr'))
    .slice(0, limit)
    .map(x => x.s);
}
