// Service Worker for Braille Vision App (v2 - Silent No-Audio)
const CACHE_NAME = 'braille-vision-app-v2';

self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(keys.map((k) => caches.delete(k)));
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  // Always fetch fresh network first
  e.respondWith(
    fetch(e.request)
      .then((response) => {
        return response;
      })
      .catch(() => caches.match(e.request))
  );
});
