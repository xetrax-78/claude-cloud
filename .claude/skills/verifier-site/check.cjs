const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim() + '/playwright');
const BASE = process.env.BASE || 'http://localhost:4174/';
require('fs').mkdirSync('shots2', { recursive: true });
(async () => {
  const b = await chromium.launch();
  const errs = [];
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
  const p = await ctx.newPage();
  p.on('pageerror', e => errs.push('pageerror: ' + e.message));
  p.on('console', m => { if (m.type() === 'error' && !/CERT|fonts/.test(m.text())) errs.push(m.text()); });
  await p.goto(BASE, { waitUntil: 'networkidle' });
  console.log('title', await p.title());
  console.log('hero loaded', await p.$eval('section img', i => i.complete && i.naturalWidth > 0).catch(() => 'noimg'));
  await p.screenshot({ path: 'shots2/desk-boussole.png' });
  console.log('compare link initially', JSON.stringify(await p.locator('header nav a', { hasText: 'Comparateur' }).innerText()));
  await p.click('header nav >> text=Répertoire'); await p.waitForTimeout(400);
  console.log('hash', await p.evaluate(() => location.hash), 'title', await p.title());
  await p.screenshot({ path: 'shots2/desk-repertoire.png' });
  await p.locator('main button', { hasText: /Comparer/ }).first().click();
  await p.locator('main').getByText('Fiche détaillée').first().click(); await p.waitForTimeout(400);
  const h = await p.evaluate(() => location.hash);
  console.log('detail hash', h, 'title', await p.title());
  await p.screenshot({ path: 'shots2/desk-detail.png' });
  await p.goBack(); await p.waitForTimeout(300);
  console.log('after back', await p.evaluate(() => location.hash));
  await p.reload({ waitUntil: 'networkidle' });
  console.log('compare after reload', JSON.stringify(await p.locator('header nav a', { hasText: 'Comparateur' }).first().innerText()));
  const p2 = await ctx.newPage();
  await p2.goto(BASE + h, { waitUntil: 'networkidle' });
  console.log('deeplink h1', await p2.locator('main h1').first().innerText().catch(() => 'none'));
  await p2.goto(BASE + '#/ecole/nexistepas', { waitUntil: 'networkidle' });
  console.log('404', JSON.stringify(await p2.locator('main').innerText()));
  for (const t of ['Comparateur', 'Analytique']) {
    await p.click(`header nav >> text=${t}`); await p.waitForTimeout(400);
    await p.screenshot({ path: `shots2/desk-${t}.png` });
  }
  const m = await b.newPage({ viewport: { width: 390, height: 844 } });
  m.on('pageerror', e => errs.push('mob pageerror: ' + e.message));
  for (const hash of ['', '#/repertoire', '#/comparateur', '#/analytique', h]) {
    await m.goto(BASE + hash, { waitUntil: 'networkidle' }); await m.waitForTimeout(300);
    const wide = await m.evaluate(() => {
      const W = document.documentElement.clientWidth;
      return [document.documentElement.scrollWidth, [...document.querySelectorAll('main *')].filter(e => e.getBoundingClientRect().right > W + 1).slice(0, 3).map(e => e.tagName + '.' + String(e.className).slice(0, 60))];
    });
    console.log('mobile', hash || '#/', JSON.stringify(wide));
    await m.screenshot({ path: `shots2/mob-${(hash || 'home').replace(/[#/]/g, '_')}.png` });
  }
  console.log('ERRS', errs);
  await b.close();
})();
