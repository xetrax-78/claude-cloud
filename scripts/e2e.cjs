// Contrôle navigateur d'IngéFinder sur le build servi par `vite preview`.
//   npm run build && npx vite preview --port 4175 &
//   BASE=http://localhost:4175/ npm run e2e
// Sort en erreur au premier écart ; captures dans ./shots (SHOTS=dossier pour changer).
let chromium;
try {
  ({ chromium } = require('playwright'));
} catch {
  ({ chromium } = require(require('child_process').execSync('npm root -g').toString().trim() + '/playwright'));
}
const fs = require('fs');

const BASE = (process.env.BASE || 'http://localhost:4175/').replace(/\/$/, '');
const SHOTS = process.env.SHOTS || 'shots';
fs.mkdirSync(SHOTS, { recursive: true });

const failures = [];
const check = (label, ok, detail = '') => {
  console.log(`${ok ? '✓' : '✗'} ${label}${detail ? ` — ${detail}` : ''}`);
  if (!ok) failures.push(label);
};
const path = (page) => { const u = new URL(page.url()); return u.pathname + u.search; };

(async () => {
  const executablePath = process.env.CHROMIUM_PATH || (fs.existsSync('/opt/pw-browsers/chromium-1194/chrome-linux/chrome') ? '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' : undefined);
  const b = await chromium.launch({ executablePath });
  const errs = [];
  const watch = (p, tag) => {
    p.on('pageerror', e => errs.push(`${tag} pageerror: ${e.message}`));
    p.on('console', m => { if (m.type() === 'error' && !/CERT|tile\.openstreetmap|ERR_TUNNEL|ERR_CONNECTION|ERR_NAME|plausible/.test(m.text())) errs.push(`${tag}: ${m.text()}`); });
  };
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: 'light' });
  await ctx.grantPermissions(['clipboard-read', 'clipboard-write'], { origin: BASE });
  const p = await ctx.newPage(); watch(p, 'desk');
  const nav = (name) => p.locator('header nav').getByRole('link', { name }).click();

  // Accueil + modules de la Boussole
  await p.goto(BASE + '/', { waitUntil: 'networkidle' });
  check('titre accueil', (await p.title()).includes('IngéFinder'));
  check('image hero', await p.$eval('section img', i => i.complete && i.naturalWidth > 0).catch(() => false));
  for (const name of [/Comparer des filières/, /Mes vœux Parcoursup/, /Recherche multicritère/, /Palmarès par spécialité/, /Spécialités & débouchés/]) {
    await p.getByRole('button', { name }).click(); await p.waitForTimeout(150);
    check(`module Boussole ${name.source}`, (await p.locator('main').innerText()).length > 500);
  }

  // Répertoire, fiche, retour
  await nav(/Répertoire/); await p.waitForTimeout(300);
  check('route répertoire', path(p) === '/repertoire/');
  await p.locator('main button', { hasText: /Comparer/ }).first().click();
  await p.locator('main h2 a').first().click(); await p.waitForTimeout(300);
  const detail = new URL(p.url()).pathname;
  check('fiche école', detail.startsWith('/ecole/'), detail);
  check('sources affichées', (await p.locator('main').getByText(/^Source :/).count()) > 0);
  await p.screenshot({ path: `${SHOTS}/desk-detail.png` });
  await p.goBack(); await p.waitForTimeout(300);
  check('retour répertoire', path(p) === '/repertoire/');

  // Fiche prépa → fil d'Ariane vers l'onglet prépas
  await p.goto(BASE + '/repertoire/?type=prepas', { waitUntil: 'networkidle' });
  await p.locator('main h2 a').first().click(); await p.waitForTimeout(300);
  await p.getByRole('navigation', { name: "Fil d'Ariane" }).getByRole('link', { name: /Prépas CPGE/ }).click(); await p.waitForTimeout(300);
  check('retour prépas', path(p) === '/repertoire/?type=prepas', path(p));

  // Filtres dans l'URL, restaurés au retour ; carte au clavier
  await p.goto(BASE + '/repertoire/', { waitUntil: 'networkidle' });
  await p.getByPlaceholder(/Rechercher une école/).fill('lyon'); await p.waitForTimeout(200);
  check('filtre dans l’URL', path(p) === '/repertoire/?q=lyon', path(p));
  await p.locator('main h2 a').first().click(); await p.waitForTimeout(300);
  await p.goBack(); await p.waitForTimeout(400);
  check('filtre restauré', (await p.getByPlaceholder(/Rechercher une école/).inputValue()) === 'lyon');
  await p.locator('main h2 a').first().focus(); await p.keyboard.press('Enter'); await p.waitForTimeout(300);
  check('carte ouverte au clavier', path(p).startsWith('/ecole/'));

  // « Comparer avec… » depuis la fiche
  const select = p.getByLabel('Comparer avec un autre établissement');
  await select.selectOption({ index: 1 }); await p.waitForTimeout(400);
  check('comparer avec → comparateur', path(p).startsWith('/comparateur/'), path(p));
  check('comparateur rempli', (await p.locator('main table thead th').count()) >= 3);

  // Recherche globale
  await p.keyboard.press('Control+k');
  await p.locator('dialog[open] input').fill('compiegne');
  await p.keyboard.press('Enter'); await p.waitForTimeout(400);
  check('recherche Ctrl+K', path(p) === '/ecole/utc-compiegne-fra/', path(p));
  check('dialogue refermé', (await p.locator('dialog[open]').count()) === 0);

  // Établissement étranger : encart du pays
  await p.goto(BASE + '/ecole/epfl-lausanne-che/', { waitUntil: 'networkidle' });
  check('encart admission Suisse', (await p.getByRole('heading', { name: /Suisse romande/ }).count()) === 1);

  // Carte
  await p.goto(BASE + '/repertoire/', { waitUntil: 'networkidle' });
  await p.getByRole('button', { name: 'Carte' }).click();
  await p.waitForSelector('.leaflet-container', { timeout: 10000 }); await p.waitForTimeout(500);
  check('marqueurs carte', (await p.locator('path.leaflet-interactive').count()) > 0);

  // Lien de comparaison partagé + CSV
  await p.goto(BASE + '/comparateur/', { waitUntil: 'networkidle' });
  const [download] = await Promise.all([p.waitForEvent('download'), p.getByRole('button', { name: 'CSV' }).click()]);
  check('export CSV', (await download.suggestedFilename()).endsWith('.csv'));
  await p.getByRole('button', { name: /Copier le lien/ }).click();
  const shared = await p.evaluate(() => navigator.clipboard.readText());
  const p3 = await (await b.newContext()).newPage(); watch(p3, 'share');
  await p3.goto(shared, { waitUntil: 'networkidle' });
  check('lien partagé', path(p3) === '/comparateur/' && /\d/.test(await p3.locator('header nav').getByRole('link', { name: /Compar/ }).innerText()));

  // Lien direct, ancien lien #/, adresse inconnue, pré-rendu sans JS
  const p2 = await ctx.newPage(); watch(p2, 'deep');
  await p2.goto(BASE + detail, { waitUntil: 'networkidle' });
  check('lien direct', (await p2.locator('main h1').count()) > 0);
  await p2.goto(BASE + '/#/ecole/insa-lyon-fra', { waitUntil: 'networkidle' });
  check('ancien lien #/', path(p2) === '/ecole/insa-lyon-fra/');
  await p2.goto(BASE + '/ecole/nexistepas/', { waitUntil: 'networkidle' });
  check('établissement inconnu', (await p2.locator('main').innerText()).includes('introuvable'));
  const nojs = await (await b.newContext({ javaScriptEnabled: false })).newPage();
  await nojs.goto(BASE + detail);
  check('pré-rendu sans JS', (await nojs.locator('h1').count()) > 0 && (await nojs.locator('script[type="application/ld+json"]').count()) > 0);

  // Vœux : bouton PDF
  await p.goto(BASE + '/', { waitUntil: 'networkidle' });
  await p.getByRole('button', { name: /Mes vœux Parcoursup/ }).click();
  await p.locator('main button', { hasText: /Ajouter/ }).first().click();
  check('bouton PDF des vœux', (await p.getByRole('button', { name: /PDF/ }).count()) === 1);

  // PWA
  const manifest = await p.evaluate(async () => (await fetch(document.querySelector('link[rel=manifest]').href)).json());
  check('manifeste PWA', manifest.short_name === 'IngéFinder' && manifest.icons.length >= 2);
  const swOk = await p.evaluate(async () => !!(await navigator.serviceWorker.getRegistration()));
  check('service worker enregistré', swOk);

  // Thème sombre
  await p.getByRole('button', { name: /thème sombre/ }).first().click();
  check('thème sombre', await p.evaluate(() => document.documentElement.classList.contains('dark')));
  await p.screenshot({ path: `${SHOTS}/desk-dark.png` });
  await p.reload({ waitUntil: 'networkidle' });
  check('thème mémorisé', await p.evaluate(() => document.documentElement.classList.contains('dark')));

  // Tablette et mobile : aucun débordement horizontal
  const t = await (await b.newContext({ viewport: { width: 768, height: 1024 } })).newPage(); watch(t, 'tab');
  await t.goto(BASE + '/', { waitUntil: 'networkidle' });
  check('tablette 768 px', (await t.evaluate(() => document.documentElement.scrollWidth)) === 768);
  const m = await (await b.newContext({ viewport: { width: 390, height: 844 } })).newPage(); watch(m, 'mob');
  await m.addInitScript(() => localStorage.setItem('ingefinder.compare.ecoles', JSON.stringify(['polytechnique-fra', 'insa-lyon-fra', 'utc-compiegne-fra'])));
  for (const route of ['/', '/repertoire/', '/comparateur/', '/analytique/', detail]) {
    await m.goto(BASE + route, { waitUntil: 'networkidle' }); await m.waitForTimeout(300);
    const sw = await m.evaluate(() => document.documentElement.scrollWidth);
    check(`mobile ${route}`, sw === 390, `${sw}px`);
    await m.screenshot({ path: `${SHOTS}/mob${route.replace(/\//g, '_')}.png` });
  }

  check('aucune erreur console', errs.length === 0, errs.join(' | '));
  await b.close();
  if (failures.length) {
    console.error(`\n${failures.length} échec(s) : ${failures.join(', ')}`);
    process.exit(1);
  }
  console.log('\nTout est vert.');
})().catch((e) => { console.error(e); process.exit(1); });
