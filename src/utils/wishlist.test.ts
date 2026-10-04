import { describe, expect, it } from 'vitest';
import { analyzeWishlist, classifyWish, wishlistPrintHtml } from './wishlist';
import { makeEcole, psup } from '../test/fixtures';

const ecole = (id: string, taux: number, rang?: number) =>
  makeEcole({
    id,
    admissions: [psup(id, taux)],
    classements: rang ? [{ id: `${id}-cl`, ecole_id: id, source_media: "L'Étudiant", annee: 2025, rang_general: rang }] : [],
  });

describe('classifyWish', () => {
  it('classe selon le taux d’accès', () => {
    expect(classifyWish(ecole('a', 10))).toBe('ambitieux');
    expect(classifyWish(ecole('b', 25))).toBe('cible');
    expect(classifyWish(ecole('c', 60))).toBe('securite');
  });

  it('sans taux ni rang : non classé (aucune catégorie devinée)', () => {
    expect(classifyWish(makeEcole({ id: 'z' }))).toBeNull();
  });

  it('un rang national élevé rend le vœu ambitieux quel que soit le taux', () => {
    expect(classifyWish(ecole('d', 60, 3))).toBe('ambitieux');
    expect(classifyWish(ecole('e', 60, 20))).toBe('cible');
  });
});

describe('analyzeWishlist', () => {
  const schools = [ecole('a', 10), ecole('b', 25), ecole('c', 60), ecole('d', 70)];

  it('liste vide', () => {
    const r = analyzeWishlist(schools, []);
    expect(r.total).toBe(0);
    expect(r.scoreSecurite).toBe(0);
  });

  it('alerte quand aucun vœu de sécurité', () => {
    const r = analyzeWishlist([ecole('x', 10), ecole('y', 12), ecole('z', 20)], ['x', 'y', 'z']);
    expect(r.securite).toBe(0);
    expect(r.scoreSecurite).toBe(45);
    expect(r.diagnostic).toMatch(/aucun vœu de sécurité/);
  });

  it('compte les catégories et conserve l’ordre des vœux', () => {
    const r = analyzeWishlist(schools, ['d', 'a', 'b', 'c']);
    expect([r.ambitieux, r.cibles, r.securite]).toEqual([1, 1, 2]);
    expect(r.schools.map(s => s.id)).toEqual(['d', 'a', 'b', 'c']);
    expect(r.diagnostic).toMatch(/équilibrée/);
  });

  it('signale les vœux non classés sans les compter', () => {
    const r = analyzeWishlist([...schools, makeEcole({ id: 'inconnu' })], ['c', 'd', 'inconnu']);
    expect(r.nonClasses).toBe(1);
    expect(r.securite).toBe(2);
    expect(r.diagnostic).toMatch(/non pris en compte/);
  });

  it('ignore les identifiants inconnus', () => {
    expect(analyzeWishlist(schools, ['a', 'inconnu']).total).toBe(1);
  });
});

describe('wishlistPrintHtml', () => {
  it('échappe le HTML des noms', () => {
    const s = makeEcole({ id: 'h', nom_officiel: '<script>alert(1)</script>', admissions: [psup('h', 30)] });
    const html = wishlistPrintHtml(analyzeWishlist([s], ['h']));
    expect(html).not.toContain('<script>alert');
    expect(html).toContain('&lt;script&gt;');
    expect(html).toContain('Parcoursup 2024');
  });
});
