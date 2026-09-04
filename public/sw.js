/* Esslinger Burg – static-site service worker.
   Strategy: network-first for navigation, cache-first (with background refresh)
   for same-origin static assets. The site is a fully static export, so any
   visited page works offline after first load.
*/
const CACHE_NAME = 'esslinger-burg-v1';
const CORE_ASSETS = [
  '/',
  '/de/',
  '/en/',
  '/zh/',
  '/manifest.webmanifest',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(CORE_ASSETS))
      .catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
      )
  );
  self.clients.claim();
});

function putInCache(request, response) {
  if (response && response.ok && request.method === 'GET') {
    const copy = response.clone();
    caches.open(CACHE_NAME).then((cache) => cache.put(request, copy)).catch(() => {});
  }
  return response;
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Page navigations: always try the network, fall back to cache (or /de/).
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((res) => putInCache(request, res))
        .catch(() =>
          caches.match(request).then((hit) => hit || caches.match('/de/'))
        )
    );
    return;
  }

  // Assets: cache-first with a background refresh.
  event.respondWith(
    caches.match(request).then((hit) => {
      const network = fetch(request).then((res) => putInCache(request, res));
      return hit || network;
    })
  );
});
