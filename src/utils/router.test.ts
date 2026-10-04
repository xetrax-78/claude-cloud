import { describe, expect, it } from 'vitest';
import { explorerHref, parseLocation, schoolHref, tabHref } from './router';

describe('router', () => {
  it('lit les routes principales', () => {
    expect(parseLocation('/', '').tab).toBe('boussole');
    expect(parseLocation('/repertoire/', '').tab).toBe('explorer');
    expect(parseLocation('/comparateur/', '?ecoles=a,b').params.get('ecoles')).toBe('a,b');
    expect(parseLocation('/inconnu/', '').tab).toBe('boussole');
  });

  it('lit une fiche école et le type du répertoire', () => {
    expect(parseLocation('/ecole/insa-lyon-fra/', '')).toMatchObject({ tab: 'explorer', schoolId: 'insa-lyon-fra' });
    expect(parseLocation('/repertoire/', '?type=prepas').explorerType).toBe('prepas');
  });

  it('génère des liens cohérents avec le parseur', () => {
    expect(tabHref('analytics')).toBe('/analytique/');
    expect(tabHref('boussole')).toBe('/');
    expect(explorerHref('prepas')).toBe('/repertoire/?type=prepas');
    const href = schoolHref('x y');
    expect(parseLocation(href, '').schoolId).toBe('x y');
  });
});
