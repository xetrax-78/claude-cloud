/**
 * Pré-rendu statique après `vite build` : une page HTML par route (accueil, répertoire,
 * comparateur, analytique, chaque école/prépa) avec titre, description, Open Graph,
 * JSON-LD et un résumé lisible sans JavaScript. React remplace ce contenu au chargement.
 *
 * SITE_URL=https://mon-domaine.fr npm run build  → ajoute canonical, sitemap.xml et robots.txt
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { ALL_ESTABLISHMENTS } from '../src/data';
import type { Ecole } from '../src/types';

const DIST = join(import.meta.dirname, '..', 'dist');
const SITE_URL = (process.env.SITE_URL ?? '').replace(/\/$/, '');
const template = readFileSync(join(DIST, 'index.html'), 'utf-8');

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const clip = (s: string, n = 155) => (s.length > n ? `${s.slice(0, n - 1).trimEnd()}…` : s);

interface Page {
  path: string; // ex. /ecole/x/
  title: string;
  description: string;
  body: string;
  jsonLd?: object;
  noindex?: boolean;
}

function render(page: Page): string {
  const canonical = SITE_URL ? `${SITE_URL}${page.path}` : '';
  const head = [
    `<title>${esc(page.title)}</title>`,
    `<meta name="description" content="${esc(page.description)}" />`,
    `<meta property="og:title" content="${esc(page.title)}" />`,
    `<meta property="og:description" content="${esc(page.description)}" />`,
    canonical && `<link rel="canonical" href="${canonical}" />`,
    canonical && `<meta property="og:url" content="${canonical}" />`,
    page.noindex && `<meta name="robots" content="noindex" />`,
    page.jsonLd && `<script type="application/ld+json">${JSON.stringify(page.jsonLd).replace(/</g, '\\u003c')}</script>`,
  ].filter(Boolean).join('\n    ');

  return template
    .replace(/<title>[\s\S]*?<\/title>/, '')
    .replace(/<meta name="description"[^>]*>/, '')
    .replace(/<meta property="og:title"[^>]*>/, '')
    .replace(/<meta property="og:description"[^>]*>/, '')
    .replace('</head>', `    ${head}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${page.body}</div>`);
}

function write(path: string, html: string) {
  const file = join(DIST, path, path.endsWith('.html') ? '' : 'index.html');
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
}

const wrap = (inner: string) =>
  `<div style="max-width:72rem;margin:0 auto;padding:2rem 1rem;font-family:system-ui,sans-serif;line-height:1.5">${inner}</div>`;

const nav = `<nav><a href="/">Boussole</a> · <a href="/repertoire/">Répertoire</a> · <a href="/comparateur/">Comparateur</a> · <a href="/analytique/">Analytique</a></nav>`;

const isPrepa = (e: Ecole) => e.type_etablissement === 'prepa_cpge';
const ecoles = ALL_ESTABLISHMENTS.filter(e => !isPrepa(e));
const prepas = ALL_ESTABLISHMENTS.filter(isPrepa);

function schoolPage(e: Ecole): Page {
  const kind = isPrepa(e) ? 'Prépa CPGE' : "École d'ingénieurs";
  const psup = e.admissions.find(a => a.source === 'Parcoursup');
  const facts = [
    `${kind} · ${e.ville_principale} (${e.pays}) · ${e.statut_juridique}`,
    e.frais_scolarite_annuels ? `Frais de scolarité : ${e.frais_scolarite_annuels.toLocaleString('fr-FR')} €/an` : 'Frais de scolarité : gratuit',
    psup?.taux_acces != null && `Taux d'accès Parcoursup ${psup.annee} : ${psup.taux_acces} %`,
    !isPrepa(e) && e.insertion?.salaire_moyen_embauche && `Salaire moyen à l'embauche (promo ${e.insertion.annee_promo}) : ${e.insertion.salaire_moyen_embauche} k€`,
    e.specialites.length > 0 && `Spécialités : ${e.specialites.map(s => s.intitule_specialite).join(', ')}`,
  ].filter(Boolean) as string[];

  return {
    path: `/ecole/${encodeURIComponent(e.id)}/`,
    title: `${e.sigle ? `${e.sigle} — ` : ''}${e.nom_officiel} | IngéFinder`,
    description: clip(`${kind} à ${e.ville_principale}. ${e.description}`),
    body: wrap(`${nav}<h1>${esc(e.nom_officiel)}</h1><p>${esc(e.description)}</p><ul>${facts.map(f => `<li>${esc(f)}</li>`).join('')}</ul><p><a href="${esc(e.site_web)}" rel="noopener">Site de l'établissement</a></p>`),
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': isPrepa(e) ? 'HighSchool' : 'CollegeOrUniversity',
      name: e.nom_officiel,
      ...(e.sigle && { alternateName: e.sigle }),
      url: e.site_web,
      description: e.description,
      ...(e.annee_creation && { foundingDate: String(e.annee_creation) }),
      address: { '@type': 'PostalAddress', addressLocality: e.ville_principale, addressCountry: e.pays },
    },
  };
}

const listBody = (title: string, items: Ecole[]) =>
  `<h2>${esc(title)} (${items.length})</h2><ul>${items
    .map(e => `<li><a href="/ecole/${encodeURIComponent(e.id)}/">${esc(e.nom_officiel)}</a> — ${esc(e.ville_principale)}</li>`)
    .join('')}</ul>`;

const pages: Page[] = [
  {
    path: '/',
    title: "IngéFinder — Écoles d'ingénieurs & prépas CPGE",
    description: `Comparez ${ecoles.length} écoles d'ingénieurs (France, Suisse, Belgique, Québec) et ${prepas.length} prépas scientifiques : admissions, salaires, spécialités, classements et vœux Parcoursup.`,
    body: wrap(`${nav}<h1>Trouvez votre école d'ingénieurs et préparez vos vœux.</h1>${listBody("Écoles d'ingénieurs", ecoles)}`),
    jsonLd: { '@context': 'https://schema.org', '@type': 'WebSite', name: 'IngéFinder', ...(SITE_URL && { url: `${SITE_URL}/` }) },
  },
  {
    path: '/repertoire/',
    title: "Répertoire des écoles d'ingénieurs et prépas | IngéFinder",
    description: `${ecoles.length} écoles d'ingénieurs et ${prepas.length} prépas scientifiques CPGE : fiches détaillées, admissions, frais et débouchés.`,
    body: wrap(`${nav}<h1>Répertoire</h1>${listBody("Écoles d'ingénieurs", ecoles)}${listBody('Prépas CPGE', prepas)}`),
  },
  {
    path: '/comparateur/',
    title: 'Comparateur d’écoles d’ingénieurs | IngéFinder',
    description: "Comparez jusqu'à 4 écoles d'ingénieurs ou prépas : salaires, insertion, frais, concours et classements.",
    body: wrap(`${nav}<h1>Comparateur</h1>`),
  },
  {
    path: '/analytique/',
    title: "Statistiques des écoles d'ingénieurs | IngéFinder",
    description: "Salaires de sortie, sélectivité et insertion des écoles d'ingénieurs en un coup d'œil.",
    body: wrap(`${nav}<h1>Analytique</h1>`),
  },
  ...ALL_ESTABLISHMENTS.map(schoolPage),
];

for (const page of pages) write(page.path, render(page));

// Page de secours pour les adresses inconnues (servie par la plupart des hébergeurs statiques)
write('404.html', render({
  path: '/404.html',
  title: 'Page introuvable | IngéFinder',
  description: "Cette page n'existe pas.",
  body: wrap(`${nav}<h1>Page introuvable</h1>`),
  noindex: true,
}));

if (SITE_URL) {
  const today = new Date().toISOString().slice(0, 10);
  writeFileSync(join(DIST, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages
      .map(p => `  <url><loc>${SITE_URL}${p.path}</loc><lastmod>${today}</lastmod></url>`)
      .join('\n')}\n</urlset>\n`);
  writeFileSync(join(DIST, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${SITE_URL}/sitemap.xml\n`);
}

console.log(`Pré-rendu : ${pages.length} pages${SITE_URL ? ` + sitemap (${SITE_URL})` : ' (définir SITE_URL pour le sitemap)'}`);
