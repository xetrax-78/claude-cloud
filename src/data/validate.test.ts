import { describe, expect, it } from 'vitest';
import { ALL_ESTABLISHMENTS } from '.';
import { ENRICHED_PREPAS, ENRICHED_SCHOOLS } from './establishmentEnrichment';
import { validateEstablishments, validateUpdateFiles } from './validate';
import parcoursup from './updates/parcoursup.json';
import pipeline from './updates/pipeline.json';
import { makeEcole, psup } from '../test/fixtures';
import type { ParcoursupUpdatesFile, PipelineUpdatesFile } from './applyUpdates';

describe('données du site', () => {
  it('jeu complet (base + mises à jour) cohérent', () => {
    expect(validateEstablishments(ALL_ESTABLISHMENTS)).toEqual([]);
  });

  it('fichiers de mise à jour valides', () => {
    const ids = new Set([...ENRICHED_SCHOOLS, ...ENRICHED_PREPAS].map(e => e.id));
    expect(validateUpdateFiles(ids, parcoursup as unknown as ParcoursupUpdatesFile, pipeline as unknown as PipelineUpdatesFile)).toEqual([]);
  });
});

describe('validateEstablishments', () => {
  it('détecte les valeurs aberrantes', () => {
    const bad = makeEcole({
      id: 'bad',
      site_web: 'pas-une-url',
      admissions: [{ ...psup('bad', 130), pct_boursiers: -2 }],
      classements: [{ id: 'c', ecole_id: 'bad', source_media: 'Le Figaro Étudiant', annee: 2025, note_globale: 25 }],
    });
    const errors = validateEstablishments([bad, bad]).join('\n');
    expect(errors).toMatch(/double/);
    expect(errors).toMatch(/site web/);
    expect(errors).toMatch(/taux d'accès hors/);
    expect(errors).toMatch(/boursiers hors/);
    expect(errors).toMatch(/hors barème \/20/);
  });
});
