const CACHE_NAME = 'mumo-cache-v3';  // 🔷 increment version on each deploy
const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/styles.css',
  '/script.js',
  '/icon-192.png',
  '/icon-512.png'
];

// Install: cache fresh files
self.addEventListener('install', event => {
  console.log('[ServiceWorker] Install');
  self.skipWaiting(); // 🔷 activate new SW immediately
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

// Activate: clean old caches
self.addEventListener('activate', event => {
  console.log('[ServiceWorker] Activate');
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        })
      );
    })
  );
  return self.clients.claim(); // take control of pages immediately
});

// Fetch: network-first, fallback to cache
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
