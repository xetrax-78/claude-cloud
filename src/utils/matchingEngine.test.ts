import { describe, expect, it } from 'vitest';
import { getSelectivityTiers, getSpecialtyRankings, runMatchingAlgorithm } from './matchingEngine';
import { MatchingPreferences } from '../types';
import { makeEcole, psup } from '../test/fixtures';
import { ALL_ESTABLISHMENTS } from '../data';

const prefs = (over: Partial<MatchingPreferences> = {}): MatchingPreferences => ({
  profil: 'Tous',
  domaines: [],
  alternance: 'Indifférent',
  budgetMax: 20000,
  pays: [],
  statuts: [],
  poidsPrestige: 1,
  poidsSalaire: 1,
  poidsBudget: 1,
  poidsInsertion: 1,
  ...over,
});

describe('runMatchingAlgorithm', () => {
  const lyon = makeEcole({ id: 'lyon', pays: 'France', statut_juridique: 'Public' });
  const lausanne = makeEcole({ id: 'lausanne', pays: 'Suisse', ville_principale: 'Lausanne' });
  const prive = makeEcole({ id: 'prive', statut_juridique: 'Privé', frais_scolarite_annuels: 9000 });

  it('filtre par pays et par statut', () => {
    expect(runMatchingAlgorithm([lyon, lausanne], prefs({ pays: ['Suisse'] })).map(r => r.ecole.id)).toEqual(['lausanne']);
    expect(runMatchingAlgorithm([lyon, prive], prefs({ statuts: ['Privé'] })).map(r => r.ecole.id)).toEqual(['prive']);
  });

  it('exclut les écoles sous le salaire minimum', () => {
    const riche = makeEcole({ id: 'riche', insertion: { id: 'i', ecole_id: 'riche', annee_promo: 2024, salaire_moyen_embauche: 55, taux_emploi_6_mois: 95 } });
    expect(runMatchingAlgorithm([lyon, riche], prefs({ salaireMin: 50 })).map(r => r.ecole.id)).toEqual(['riche']);
  });

  it('salaire inconnu : exclu du filtre salaire minimum et critère ignoré dans le score', () => {
    const sansDonnees = makeEcole({ id: 'nd', insertion: { id: 'i', ecole_id: 'nd', annee_promo: 2024, salaire_moyen_embauche: 0, taux_emploi_6_mois: 0 } });
    expect(runMatchingAlgorithm([sansDonnees], prefs({ salaireMin: 30 }))).toHaveLength(0);
    const [r] = runMatchingAlgorithm([sansDonnees, lyon], prefs()).filter(x => x.ecole.id === 'nd');
    expect(r.scoreSalaire).toBeNull();
    expect(r.scoreInsertion).toBeNull();
    expect(r.scorePrestige).toBeNull();
    expect(r.pointsVigilance.join(' ')).toMatch(/Non communiqué/);
  });

  it('taux d’accès inconnu : exclu du filtre de sélectivité', () => {
    expect(runMatchingAlgorithm([lyon], prefs({ tauxAccesMax: 50 }))).toHaveLength(0);
  });

  it('signale le dépassement de budget', () => {
    const [r] = runMatchingAlgorithm([prive], prefs({ budgetMax: 5000 }));
    expect(r.pointsVigilance.join(' ')).toMatch(/Dépasse votre budget/);
  });

  it('trie par score décroissant, scores bornés', () => {
    const results = runMatchingAlgorithm(ALL_ESTABLISHMENTS, prefs());
    expect(results.length).toBeGreaterThan(0);
    for (let i = 1; i < results.length; i++) expect(results[i - 1].scoreMatch).toBeGreaterThanOrEqual(results[i].scoreMatch);
    for (const r of results) expect(Number.isFinite(r.scoreMatch)).toBe(true);
  });
});

describe('getSelectivityTiers', () => {
  it('écarte les écoles sans sélectivité ni classement connus', () => {
    const tiers = getSelectivityTiers([makeEcole({ id: 'x' })]);
    expect(tiers.flatMap(t => t.schools)).toHaveLength(0);
  });

  it('répartit chaque école dans exactement un groupe', () => {
    const schools = [10, 25, 60].map((t, i) => makeEcole({ id: `s${i}`, admissions: [psup(`s${i}`, t)] }));
    const tiers = getSelectivityTiers(schools);
    expect(tiers.map(t => t.category)).toEqual(['Ambitieux', 'Cible', 'Sécurité']);
    expect(tiers.map(t => t.schools.map(s => s.ecole.id))).toEqual([['s0'], ['s1'], ['s2']]);
  });
});

describe('getSpecialtyRankings', () => {
  it('ne renvoie que des écoles du domaine, rangs croissants', () => {
    const r = getSpecialtyRankings(ALL_ESTABLISHMENTS, 'Informatique & Logiciel');
    expect(r.length).toBeGreaterThan(0);
    for (let i = 1; i < r.length; i++) expect(r[i].rank).toBeGreaterThanOrEqual(r[i - 1].rank);
  });
});
