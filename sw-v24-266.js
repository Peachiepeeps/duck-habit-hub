self.__DUCKIE_SW_VERSION__ = '24.266';
const CACHE_NAME = 'duck-habit-hub-app-v24-266';
const APP_SHELL = [
  './',
  './index.html',
  './version.json',
  './sw.js?v=24-266',
  './hub-v266.css?v=24-266',
  './hub-v266.js?v=24-266',
  './trading-cards-ui-v266.js?v=24-266',
  './duck-quest/css/quest-v266.css?v=24-266',
  './duck-quest/js/quest-v266.js?v=24-266'
];
self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  event.respondWith(caches.match(req, {ignoreSearch:true}).then((cached) => cached || fetch(req)));
});
