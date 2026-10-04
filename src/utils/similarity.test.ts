import { describe, expect, it } from 'vitest';
import { findSimilar } from './similarity';
import { makeEcole } from '../test/fixtures';

const spec = (id: string, domaine: any) => ({
  id: `${id}-${domaine}`, ecole_id: id, intitule_specialite: domaine, domaine,
  type_cursus: 'Initiale' as const, diplome_delivre: 'Ingénieur', duree_annees: 3,
});

describe('findSimilar', () => {
  const ref = makeEcole({ id: 'ref', region: 'Occitanie', type_recrutement: 'post_bac', specialites: [spec('ref', 'Cybersécurité'), spec('ref', 'Informatique & Logiciel')] });
  const proche = makeEcole({ id: 'proche', region: 'Occitanie', type_recrutement: 'post_bac', specialites: [spec('proche', 'Cybersécurité')] });
  const loin = makeEcole({ id: 'loin', region: 'Bretagne', type_recrutement: 'post_prepa', specialites: [spec('loin', 'Génie Civil & BTP')] });
  const prepa = makeEcole({ id: 'prepa', type_etablissement: 'prepa_cpge', region: 'Occitanie' });

  it('classe par proximité et exclut l’établissement lui-même et les autres types', () => {
    expect(findSimilar(ref, [ref, loin, prepa, proche]).map(e => e.id)).toEqual(['proche', 'loin']);
  });
});
