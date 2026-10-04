import { Ecole } from '../types';

// CSV compatible Excel français : séparateur « ; », BOM UTF-8, champs entre guillemets si besoin
const cell = (v: string | number | null | undefined) => {
  if (v == null || v === '') return '';
  const s = String(v);
  return /[";\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

export function toCsv(rows: (string | number | null | undefined)[][]): string {
  return '﻿' + rows.map(r => r.map(cell).join(';')).join('\r\n') + '\r\n';
}

const psupOf = (e: Ecole) => e.admissions.find(a => a.source === 'Parcoursup') ?? e.admissions[0];

export function comparisonRows(list: Ecole[], mode: 'ecoles' | 'prepas') {
  const common: [string, (e: Ecole) => string | number | null | undefined][] = [
    ['Établissement', e => e.nom_officiel],
    ['Sigle', e => e.sigle],
    ['Ville', e => e.ville_principale],
    ['Pays', e => e.pays],
    ['Statut', e => e.statut_juridique],
    ['Frais annuels (€)', e => e.frais_scolarite_annuels],
    ['Voie d’admission', e => psupOf(e)?.nom_filiere_concours ?? e.banque_concours],
    ['Taux d’accès (%)', e => psupOf(e)?.taux_acces],
    ['Session / source', e => (psupOf(e) ? `${psupOf(e)!.source} ${psupOf(e)!.annee}` : null)],
    ['Site web', e => e.site_web],
  ];
  const specific: typeof common = mode === 'ecoles'
    ? [
        ['Salaire embauche (k€)', e => e.insertion?.salaire_moyen_embauche || null],
        ['Salaire 3 ans (k€)', e => e.insertion?.salaire_3_ans || null],
        ['Emploi à 6 mois (%)', e => e.insertion?.taux_emploi_6_mois || null],
        ['Promotion', e => e.insertion?.annee_promo],
        ['Meilleur classement presse', e => {
          const c = e.classements.filter(c => c.rang_general).sort((a, b) => a.rang_general! - b.rang_general!)[0];
          return c ? `#${c.rang_general} ${c.source_media} ${c.annee}` : null;
        }],
      ]
    : [
        ['Filières', e => (e.filieres_cpge ?? []).join(', ')],
        ['Intégration X-ENS (%)', e => e.prepa_stats?.[0]?.taux_integration_x_ens],
        ['Intégration top écoles (%)', e => e.prepa_stats?.[0]?.taux_integration_top_ecoles],
        ['Internat', e => (e.internat_disponible ? 'Oui' : 'Non')],
      ];
  const columns = [...common.slice(0, 9), ...specific, common[9]];
  return [columns.map(([label]) => label), ...list.map(e => columns.map(([, get]) => get(e)))];
}

export function downloadCsv(filename: string, content: string) {
  const url = URL.createObjectURL(new Blob([content], { type: 'text/csv;charset=utf-8' }));
  const a = Object.assign(document.createElement('a'), { href: url, download: filename });
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
