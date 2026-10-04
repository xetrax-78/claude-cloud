/**
 * Exporte la liste des établissements du front (id, nom, sigle, villes…) pour les scripts
 * Python de mise à jour, qui ne savent pas lire le TypeScript.
 *   npm run data:index  →  data/etablissements_index.json
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { ALL_ESTABLISHMENTS } from '../src/data';

const out = ALL_ESTABLISHMENTS.map(e => {
  const psup = e.admissions.find(a => a.source === 'Parcoursup');
  return {
    id: e.id,
    nom_officiel: e.nom_officiel,
    sigle: e.sigle,
    type: e.type_etablissement === 'prepa_cpge' ? 'prepa' : 'ecole',
    recrutement: e.type_recrutement ?? null,
    pays: e.pays,
    villes: [...new Set([e.ville_principale, ...e.campus.map(c => c.ville)])],
    filieres_cpge: e.filieres_cpge ?? [],
    parcoursup_filiere: psup?.nom_filiere_concours ?? null,
    parcoursup_annee: psup?.annee ?? null,
  };
});

const dir = join(import.meta.dirname, '..', 'data');
mkdirSync(dir, { recursive: true });
writeFileSync(join(dir, 'etablissements_index.json'), JSON.stringify(out, null, 2) + '\n');
console.log(`${out.length} établissements exportés dans data/etablissements_index.json`);
