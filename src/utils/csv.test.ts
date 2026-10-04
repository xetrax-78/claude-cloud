import { describe, expect, it } from 'vitest';
import { comparisonRows, toCsv } from './csv';
import { makeEcole, psup } from '../test/fixtures';

describe('toCsv', () => {
  it('séparateur « ; », BOM et échappement', () => {
    const csv = toCsv([['a;b', 'dit "oui"', null], [1, 2.5, '']]);
    expect(csv.startsWith('﻿')).toBe(true);
    expect(csv).toContain('"a;b";"dit ""oui""";\r\n1;2.5;\r\n');
  });
});

describe('comparisonRows', () => {
  it('une ligne d’en-tête puis une ligne par établissement, données absentes vides', () => {
    const e = makeEcole({ id: 'e', admissions: [psup('e', 18)], insertion: { id: 'i', ecole_id: 'e', annee_promo: 2024, salaire_moyen_embauche: 0, taux_emploi_6_mois: 92 } });
    const [head, row] = comparisonRows([e], 'ecoles');
    expect(head).toContain('Taux d’accès (%)');
    expect(row[head.indexOf('Taux d’accès (%)')]).toBe(18);
    expect(row[head.indexOf('Salaire embauche (k€)')]).toBeNull();
    expect(row[head.indexOf('Session / source')]).toBe('Parcoursup 2024');
  });
});
