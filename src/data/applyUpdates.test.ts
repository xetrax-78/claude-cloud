import { describe, expect, it } from 'vitest';
import { applyUpdates } from './applyUpdates';
import { makeEcole, psup } from '../test/fixtures';

const empty = { generated_at: null, ecoles: {} };

describe('applyUpdates', () => {
  const base = [makeEcole({ id: 'e', admissions: [psup('e', 30, 2024)] })];

  it('sans mise à jour, renvoie les mêmes données', () => {
    expect(applyUpdates(base, { generated_at: null, entries: {} }, empty)).toEqual(base);
  });

  it('place la session Parcoursup la plus récente en tête et garde l’ancienne', () => {
    const [e] = applyUpdates(base, {
      generated_at: '2026-10-01',
      dataset: 'fr-esr-parcoursup',
      entries: { e: { session: 2026, nom_filiere_concours: 'F', capacite: 50, nb_voeux: 900, taux_acces: 18 } },
    }, empty);
    expect(e.admissions.map(a => a.annee)).toEqual([2026, 2024]);
    expect(e.admissions[0].taux_acces).toBe(18);
    expect(e.admissions[0].source_url).toContain('fr-esr-parcoursup');
  });

  it('n’écrase pas une insertion plus récente par une plus ancienne', () => {
    const [e] = applyUpdates(base, { generated_at: null, entries: {} }, {
      generated_at: 'x',
      ecoles: { e: { insertion: { id: 'old', annee_promo: 2022, salaire_moyen_embauche: 1, taux_emploi_6_mois: 1 } } },
    });
    expect(e.insertion.annee_promo).toBe(2024);
  });

  it('complète les coordonnées d’un campus de même ville sans le dupliquer', () => {
    const [e] = applyUpdates(base, { generated_at: null, entries: {} }, {
      generated_at: 'x',
      ecoles: { e: { campus: [{ id: 'autre-id', nom_campus: 'Campus', ville: 'LYON', latitude: 45.7, longitude: 4.8, est_siege_principal: true }] } },
    });
    expect(e.campus).toHaveLength(1);
    expect(e.campus[0]).toMatchObject({ id: 'e-c1', latitude: 45.7 });
  });

  it('remplace un classement par un plus récent du même média', () => {
    const withRank = [makeEcole({ id: 'e', classements: [{ id: 'c', ecole_id: 'e', source_media: "L'Étudiant", annee: 2024, rang_general: 9 }] })];
    const [e] = applyUpdates(withRank, { generated_at: null, entries: {} }, {
      generated_at: 'x',
      ecoles: { e: { classements: [{ id: 'c2', source_media: "L'Étudiant", annee: 2026, rang_general: 4 }] } },
    });
    expect(e.classements).toHaveLength(1);
    expect(e.classements[0].rang_general).toBe(4);
  });
});
