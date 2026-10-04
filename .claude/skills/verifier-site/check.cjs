// Contrôle navigateur d'IngéFinder (build servi par `vite preview`). Usage : BASE=http://localhost:4174/ node check.cjs
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim() + '/playwright');
const BASE = (process.env.BASE || 'http://localhost:4174/').replace(/\/$/, '');
require('fs').mkdirSync('shots', { recursive: true });

(async () => {
  const b = await chromium.launch();
  const errs = [];
  const watch = (p, tag) => {
    p.on('pageerror', e => errs.push(`${tag} pageerror: ${e.message}`));
    p.on('console', m => { if (m.type() === 'error' && !/CERT|tile\.openstreetmap|ERR_TUNNEL|ERR_CONNECTION/.test(m.text())) errs.push(`${tag}: ${m.text()}`); });
  };
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: 'light' });
  await ctx.grantPermissions(['clipboard-read', 'clipboard-write'], { origin: BASE });
  const p = await ctx.newPage(); watch(p, 'desk');

  await p.goto(BASE + '/', { waitUntil: 'networkidle' });
  console.log('title', await p.title());
  console.log('hero loaded', await p.$eval('section img', i => i.complete && i.naturalWidth > 0).catch(() => 'noimg'));

  await p.locator('header nav').getByRole('link', { name: /Répertoire/ }).click(); await p.waitForTimeout(400);
  console.log('url', new URL(p.url()).pathname, 'title', await p.title());
  await p.locator('main button', { hasText: /Comparer/ }).first().click();
  await p.locator('main h2 a').first().click(); await p.waitForTimeout(400);
  const detail = new URL(p.url()).pathname;
  console.log('detail', detail, 'sources', await p.locator('main').getByText(/^Source :/).count());
  await p.screenshot({ path: 'shots/desk-detail.png' });
  await p.goBack(); await p.waitForTimeout(300);
  console.log('after back', new URL(p.url()).pathname);

  // Prépa : Retour revient sur l'onglet prépas
  await p.goto(BASE + '/repertoire/?type=prepas', { waitUntil: 'networkidle' });
  await p.locator('main h2 a').first().click(); await p.waitForTimeout(300);
  await p.getByRole('navigation', { name: "Fil d'Ariane" }).getByRole('link', { name: /Prépas CPGE/ }).click(); await p.waitForTimeout(300);
  console.log('prepa back', new URL(p.url()).pathname + new URL(p.url()).search);

  // Filtres dans l'URL, restaurés après une fiche + retour
  await p.goto(BASE + '/repertoire/', { waitUntil: 'networkidle' });
  await p.getByPlaceholder(/Rechercher une école/).fill('lyon'); await p.waitForTimeout(200);
  console.log('filter url', new URL(p.url()).search);
  await p.locator('main h2 a').first().click(); await p.waitForTimeout(300);
  await p.goBack(); await p.waitForTimeout(400);
  console.log('filter restored', await p.getByPlaceholder(/Rechercher une école/).inputValue(), new URL(p.url()).search);

  // Carte du répertoire au clavier (lien étiré)
  await p.locator('main h2 a').first().focus(); await p.keyboard.press('Enter'); await p.waitForTimeout(300);
  console.log('keyboard card', new URL(p.url()).pathname);

  // Recherche globale Ctrl+K
  await p.keyboard.press('Control+k');
  await p.locator('dialog[open] input').fill('compiegne');
  await p.keyboard.press('Enter'); await p.waitForTimeout(400);
  console.log('search → ', new URL(p.url()).pathname, '| dialog closed', await p.locator('dialog[open]').count() === 0);

  // Carte
  await p.goto(BASE + '/repertoire/', { waitUntil: 'networkidle' });
  await p.getByRole('button', { name: 'Carte' }).click();
  await p.waitForSelector('.leaflet-container', { timeout: 10000 });
  await p.waitForTimeout(500);
  console.log('map markers', await p.locator('path.leaflet-interactive').count());
  await p.screenshot({ path: 'shots/desk-map.png' });

  // Lien de comparaison partagé
  await p.goto(BASE + '/comparateur/', { waitUntil: 'networkidle' });
  await p.getByRole('button', { name: /Copier le lien/ }).click();
  const shared = await p.evaluate(() => navigator.clipboard.readText());
  console.log('share link', shared.replace(BASE, ''));
  const p3 = await (await b.newContext()).newPage(); watch(p3, 'share');
  await p3.goto(shared, { waitUntil: 'networkidle' });
  console.log('shared opens', new URL(p3.url()).pathname, 'badge', JSON.stringify(await p3.locator('header nav').getByRole('link', { name: /Compar/ }).innerText()));

  // Lien direct, ancien lien #/, 404, page pré-rendue sans JS
  const p2 = await ctx.newPage(); watch(p2, 'deep');
  await p2.goto(BASE + detail, { waitUntil: 'networkidle' });
  console.log('deeplink h1', await p2.locator('main h1').first().innerText().catch(() => 'none'));
  await p2.goto(BASE + '/#/ecole/insa-lyon-fra', { waitUntil: 'networkidle' });
  console.log('legacy hash →', new URL(p2.url()).pathname);
  await p2.goto(BASE + '/ecole/nexistepas/', { waitUntil: 'networkidle' });
  console.log('unknown', JSON.stringify((await p2.locator('main').innerText()).slice(0, 40)));
  const nojs = await (await b.newContext({ javaScriptEnabled: false })).newPage();
  await nojs.goto(BASE + detail);
  console.log('prerender h1', await nojs.locator('h1').first().innerText(), '| jsonld', await nojs.locator('script[type="application/ld+json"]').count());

  // Vœux : export PDF (impression interceptée)
  await p.goto(BASE + '/', { waitUntil: 'networkidle' });
  await p.getByRole('button', { name: /Mes vœux Parcoursup/ }).click();
  await p.locator('main button', { hasText: /^\s*\+|Ajouter/ }).first().click().catch(() => {});
  const printBtn = p.getByRole('button', { name: /PDF/ });
  console.log('print button', await printBtn.count());

  // Thème sombre
  await p.getByRole('button', { name: /thème sombre/ }).first().click();
  console.log('dark class', await p.evaluate(() => document.documentElement.classList.contains('dark')),
    'bg', await p.evaluate(() => getComputedStyle(document.body.firstElementChild).backgroundColor));
  await p.screenshot({ path: 'shots/desk-dark.png' });
  await p.reload({ waitUntil: 'networkidle' });
  console.log('dark persists', await p.evaluate(() => document.documentElement.classList.contains('dark')));

  // Mobile : aucun débordement horizontal
  const m = await (await b.newContext({ viewport: { width: 390, height: 844 } })).newPage(); watch(m, 'mob');
  const t = await (await b.newContext({ viewport: { width: 768, height: 1024 } })).newPage(); watch(t, 'tab');
  await t.goto(BASE + '/', { waitUntil: 'networkidle' });
  console.log('tablet 768', await t.evaluate(() => document.documentElement.scrollWidth));
  await t.screenshot({ path: 'shots/tablet.png' });

  for (const path of ['/', '/repertoire/', '/comparateur/', '/analytique/', detail]) {
    await m.goto(BASE + path, { waitUntil: 'networkidle' }); await m.waitForTimeout(300);
    const sw = await m.evaluate(() => document.documentElement.scrollWidth);
    console.log('mobile', path, sw);
    await m.screenshot({ path: `shots/mob${path.replace(/\//g, '_')}.png` });
  }
  console.log('ERRS', errs);
  await b.close();
})();
