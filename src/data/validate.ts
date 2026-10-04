import { Ecole } from '../types';
import type { ParcoursupUpdatesFile, PipelineUpdatesFile } from './applyUpdates';

/**
 * Contrôles de cohérence des données : renvoie la liste des anomalies (vide si tout est bon).
 * Exécuté par les tests (et donc la CI) pour qu'une mise à jour erronée n'arrive pas en ligne.
 */
const CURRENT_YEAR = new Date().getFullYear();
const MIN_YEAR = 2015;

// Barèmes publiés par chaque média (note_globale)
const SCORE_MAX: Record<string, number> = {
  'Le Figaro Étudiant': 20,
  "L'Étudiant": 120,
  "L'Usine Nouvelle": 100,
};

export function validateEstablishments(schools: Ecole[]): string[] {
  const errors: string[] = [];
  const err = (e: Ecole, msg: string) => errors.push(`${e.id} : ${msg}`);
  const pct = (e: Ecole, label: string, v: number | undefined) => {
    if (v != null && (Number.isNaN(v) || v < 0 || v > 100)) err(e, `${label} hors de 0–100 (${v})`);
  };
  const year = (e: Ecole, label: string, v: number | undefined) => {
    if (v != null && (v < MIN_YEAR || v > CURRENT_YEAR + 1)) err(e, `${label} invraisemblable (${v})`);
  };

  const ids = new Set<string>();
  for (const e of schools) {
    if (ids.has(e.id)) err(e, 'identifiant en double');
    ids.add(e.id);
    if (!e.nom_officiel?.trim()) err(e, 'nom manquant');
    if (!/^https?:\/\//.test(e.site_web)) err(e, `site web invalide (${e.site_web})`);
    if (e.frais_scolarite_annuels < 0) err(e, 'frais négatifs');

    for (const c of e.campus) {
      if (c.latitude != null && (c.latitude < -90 || c.latitude > 90)) err(e, `latitude invalide (${c.id})`);
      if (c.longitude != null && (c.longitude < -180 || c.longitude > 180)) err(e, `longitude invalide (${c.id})`);
    }

    for (const a of e.admissions) {
      year(e, `session ${a.source}`, a.annee);
      pct(e, "taux d'accès", a.taux_acces);
      pct(e, '% mention TB', a.pct_mention_tb);
      pct(e, '% boursiers', a.pct_boursiers);
      if (a.capacite < 0 || a.nb_voeux < 0) err(e, `capacité ou vœux négatifs (${a.id})`);
      if (a.capacite > 0 && a.nb_voeux > 0 && a.nb_voeux < a.capacite / 2) err(e, `moins de vœux que la moitié des places (${a.id})`);
    }

    for (const c of e.classements) {
      year(e, `classement ${c.source_media}`, c.annee);
      const max = SCORE_MAX[c.source_media];
      if (max != null && c.note_globale != null && (c.note_globale < 0 || c.note_globale > max)) {
        err(e, `note ${c.source_media} hors barème /${max} (${c.note_globale})`);
      }
      for (const r of [c.rang_general, c.rang_par_specialite]) {
        if (r != null && (!Number.isInteger(r) || r < 1)) err(e, `rang invalide (${c.id})`);
      }
    }

    const ins = e.insertion;
    if (ins) {
      year(e, 'promotion insertion', ins.annee_promo);
      pct(e, 'taux emploi 6 mois', ins.taux_emploi_6_mois);
      pct(e, '% international', ins.pct_international);
      pct(e, '% poursuite études', ins.pct_poursuite_etudes);
      for (const [label, v] of [['salaire embauche', ins.salaire_moyen_embauche], ['salaire primes', ins.salaire_avec_primes], ['salaire 3 ans', ins.salaire_3_ans]] as const) {
        // En k€ brut annuel : 0 = non communiqué
        if (v != null && v !== 0 && (v < 15 || v > 200)) err(e, `${label} invraisemblable (${v} k€)`);
      }
    }

    for (const p of e.prepa_stats ?? []) {
      pct(e, `intégration X-ENS ${p.filiere}`, p.taux_integration_x_ens);
      pct(e, `intégration top écoles ${p.filiere}`, p.taux_integration_top_ecoles);
      pct(e, `intégration globale ${p.filiere}`, p.taux_integration_global);
    }
  }
  return errors;
}

export function validateUpdateFiles(baseIds: Set<string>, parcoursup: ParcoursupUpdatesFile, pipeline: PipelineUpdatesFile): string[] {
  const errors: string[] = [];
  for (const [id, u] of Object.entries(parcoursup.entries)) {
    if (!baseIds.has(id)) errors.push(`parcoursup.json : établissement inconnu ${id}`);
    if (!Number.isInteger(u.session) || u.session < MIN_YEAR || u.session > CURRENT_YEAR + 1) errors.push(`parcoursup.json : session invalide pour ${id}`);
    if (typeof u.capacite !== 'number' || typeof u.nb_voeux !== 'number') errors.push(`parcoursup.json : capacité/vœux manquants pour ${id}`);
  }
  for (const id of Object.keys(pipeline.ecoles)) {
    if (!baseIds.has(id)) errors.push(`pipeline.json : établissement inconnu ${id}`);
  }
  return errors;
}
