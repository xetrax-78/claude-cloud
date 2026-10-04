import { describe, expect, it } from 'vitest';
import { searchSchools } from './SearchDialog';
import { makeEcole } from '../test/fixtures';

const schools = [
  makeEcole({ id: 'insa', nom_officiel: 'Institut National des Sciences Appliquées de Lyon', sigle: 'INSA Lyon', ville_principale: 'Villeurbanne' }),
  makeEcole({ id: 'utc', nom_officiel: 'Université de Technologie de Compiègne', sigle: 'UTC', ville_principale: 'Compiègne' }),
  makeEcole({ id: 'ensi', nom_officiel: 'École Nationale Supérieure d’Informatique', sigle: 'ENSI', ville_principale: 'Caen' }),
];

describe('searchSchools', () => {
  it('ignore la casse et les accents', () => {
    expect(searchSchools(schools, 'compiegne').map(e => e.id)).toEqual(['utc']);
    expect(searchSchools(schools, 'APPLIQUEES').map(e => e.id)).toEqual(['insa']);
  });

  it('place le sigle exact en premier', () => {
    expect(searchSchools(schools, 'utc')[0].id).toBe('utc');
  });

  it('trouve par ville', () => {
    expect(searchSchools(schools, 'villeurbanne').map(e => e.id)).toEqual(['insa']);
  });

  it('requête vide : aucun résultat', () => {
    expect(searchSchools(schools, '   ')).toEqual([]);
  });
});
