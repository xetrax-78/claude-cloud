import { Ecole } from '../types';

export type WishCategory = 'ambitieux' | 'cible' | 'securite';

export const WISH_CATEGORY_LABELS: Record<WishCategory, string> = {
  ambitieux: 'Ambitieux',
  cible: 'Cible',
  securite: 'Sécurité',
};

export const parcoursupStat = (ecole: Ecole) =>
  ecole.admissions.find(a => a.source === 'Parcoursup') || ecole.admissions[0];

// Seuils : taux d'accès < 15 % ou top 8 = ambitieux ; ≤ 32 % ou top 28 = cible ; sinon sécurité
export function classifyWish(ecole: Ecole): WishCategory {
  const taux = parcoursupStat(ecole)?.taux_acces ?? 25;
  const rang = ecole.classements[0]?.rang_general ?? 40;
  if (taux < 15 || rang <= 8) return 'ambitieux';
  if (taux <= 32 || rang <= 28) return 'cible';
  return 'securite';
}

export interface WishlistAnalysis {
  total: number;
  ambitieux: number;
  cibles: number;
  securite: number;
  scoreSecurite: number;
  diagnostic: string;
  statusColor: string;
  schools: Ecole[];
}

export function analyzeWishlist(schools: Ecole[], wishlistIds: string[]): WishlistAnalysis {
  // Ordre de la liste de vœux conservé
  const wishlistSchools = wishlistIds
    .map(id => schools.find(s => s.id === id))
    .filter((s): s is Ecole => Boolean(s));
  const counts = { ambitieux: 0, cible: 0, securite: 0 };
  wishlistSchools.forEach(s => { counts[classifyWish(s)]++; });
  const { ambitieux, cible: cibles, securite } = counts;
  const total = wishlistSchools.length;

  let scoreSecurite: number;
  let diagnostic: string;
  let statusColor: string;

  if (total === 0) {
    scoreSecurite = 0;
    diagnostic = 'Ajoutez jusqu’à 10 vœux pour tester la robustesse de votre stratégie d’admission.';
    statusColor = 'text-slate-600 bg-slate-50 border-slate-200';
  } else if (securite === 0 && total >= 3) {
    scoreSecurite = 45;
    diagnostic = '⚠️ Risque d’invalidation élevé : aucun vœu de sécurité (taux > 32%). Ajoutez au moins 2 formations de secours.';
    statusColor = 'text-amber-800 bg-amber-50 border-amber-200';
  } else if (ambitieux > 5) {
    scoreSecurite = 55;
    diagnostic = '⚠️ Trop de vœux ultra-sélectifs (< 15%). Rééquilibrez avec des formations cibles pour maximiser vos chances.';
    statusColor = 'text-rose-800 bg-rose-50 border-rose-200';
  } else {
    scoreSecurite = Math.min(100, Math.round((securite * 25 + cibles * 15 + ambitieux * 10) / total * 5));
    diagnostic = '✅ Liste équilibrée entre vœux ambitieux, cibles et de sécurité.';
    statusColor = 'text-emerald-800 bg-emerald-50 border-emerald-200';
  }

  return { total, ambitieux, cibles, securite, scoreSecurite, diagnostic, statusColor, schools: wishlistSchools };
}

const esc = (s: string | number) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function wishlistPrintHtml(analysis: WishlistAnalysis, date = new Date()): string {
  const rows = analysis.schools.map((s, i) => {
    const psup = parcoursupStat(s);
    const taux = psup?.taux_acces != null ? `${psup.taux_acces} %` : 'n.c.';
    return `<tr>
      <td>${i + 1}</td>
      <td><strong>${esc(s.nom_officiel)}</strong>${s.sigle ? ` (${esc(s.sigle)})` : ''}<br><small>${esc(s.ville_principale)}</small></td>
      <td>${esc(psup?.nom_filiere_concours ?? '—')}</td>
      <td>${taux}${psup ? `<br><small>${esc(psup.source)} ${psup.annee}</small>` : ''}</td>
      <td>${WISH_CATEGORY_LABELS[classifyWish(s)]}</td>
    </tr>`;
  }).join('');

  return `<!doctype html><html lang="fr"><head><meta charset="utf-8"><title>Mes vœux Parcoursup — IngéFinder</title>
<style>
  body{font-family:system-ui,-apple-system,sans-serif;color:#0f172a;margin:32px;font-size:12px}
  h1{font-size:20px;margin:0 0 4px} .meta{color:#64748b;margin-bottom:16px}
  table{width:100%;border-collapse:collapse} th,td{border-bottom:1px solid #e2e8f0;padding:8px 6px;text-align:left;vertical-align:top}
  th{font-size:11px;text-transform:uppercase;color:#64748b} small{color:#64748b}
  .bilan{margin-top:16px;padding:10px;border:1px solid #e2e8f0;border-radius:8px}
  .note{margin-top:16px;color:#64748b;font-size:10px}
</style></head><body>
<h1>Mes vœux Parcoursup</h1>
<div class="meta">${analysis.total} vœu(x) · ${esc(date.toLocaleDateString('fr-FR', { dateStyle: 'long' }))}</div>
<table><thead><tr><th>#</th><th>Établissement</th><th>Formation</th><th>Taux d'accès</th><th>Catégorie</th></tr></thead><tbody>${rows}</tbody></table>
<div class="bilan"><strong>Bilan :</strong> ${analysis.ambitieux} ambitieux · ${analysis.cibles} cibles · ${analysis.securite} sécurité — indice de sécurité ${analysis.scoreSecurite} %<br>${esc(analysis.diagnostic)}</div>
<p class="note">Généré par IngéFinder. Données indicatives : vérifiez chaque formation sur parcoursup.fr avant de valider vos vœux.</p>
</body></html>`;
}

// Impression via une iframe cachée (évite le blocage des pop-ups) ; « Enregistrer en PDF » dans la boîte d'impression
export function printWishlist(analysis: WishlistAnalysis) {
  const iframe = document.createElement('iframe');
  iframe.setAttribute('aria-hidden', 'true');
  iframe.style.cssText = 'position:fixed;right:0;bottom:0;width:0;height:0;border:0';
  document.body.appendChild(iframe);
  const doc = iframe.contentDocument!;
  doc.open();
  doc.write(wishlistPrintHtml(analysis));
  doc.close();
  iframe.contentWindow!.focus();
  iframe.contentWindow!.print();
  setTimeout(() => iframe.remove(), 1000);
}
