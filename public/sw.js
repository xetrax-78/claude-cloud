// Service worker IngéFinder : site consultable hors ligne après une première visite.
// - pages : réseau d'abord, copie en cache en secours (l'accueil sert de coquille pour toute route)
// - assets/ (fichiers versionnés) : cache d'abord
// - reste du même domaine : cache puis mise à jour en arrière-plan
const VERSION = 'v1';
const PAGES = `ingefinder-pages-${VERSION}`;
const ASSETS = `ingefinder-assets-${VERSION}`;
const SCOPE = self.registration.scope;
const MAX_ASSETS = 80;

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(PAGES).then((c) => c.add(SCOPE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith('ingefinder-') && ![PAGES, ASSETS].includes(k)).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

async function trim(cacheName, max) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  await Promise.all(keys.slice(0, Math.max(0, keys.length - max)).map((k) => cache.delete(k)));
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET' || !request.url.startsWith(SCOPE)) return;

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((res) => {
          if (res.ok) caches.open(PAGES).then((c) => c.put(request, res.clone()));
          return res;
        })
        .catch(async () => (await caches.match(request)) || (await caches.match(SCOPE)) || Response.error())
    );
    return;
  }

  if (request.url.startsWith(`${SCOPE}assets/`)) {
    event.respondWith(
      caches.match(request).then((hit) => hit || fetch(request).then((res) => {
        if (res.ok) caches.open(ASSETS).then((c) => c.put(request, res.clone())).then(() => trim(ASSETS, MAX_ASSETS));
        return res;
      }))
    );
    return;
  }

  event.respondWith(
    caches.open(PAGES).then(async (cache) => {
      const hit = await cache.match(request);
      const network = fetch(request).then((res) => {
        if (res.ok) cache.put(request, res.clone());
        return res;
      }).catch(() => hit || Response.error());
      return hit || network;
    })
  );
});
