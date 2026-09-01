const APP_CACHE = 'duck-habit-hub-app-v24-48';
const RUNTIME_CACHE = 'duck-habit-hub-runtime-v24-48';
const IMAGE_CACHE = 'duck-habit-hub-images-v24-48';

const APP_SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './style-v24-48.css',
  './script-v24-48.js',
  './sw-v24-48.js',
  './apple-touch-icon-v4.png',
  './favicon-32-v4.png',
  './icon-192-v4.png',
  './icon-512-v4.png',
  './icon-maskable-512-v4.png',
  './assets/ui/book-room.png',
  './assets/ui/book-icon.png',
  './assets/ui/mirror.png',
  './assets/ui/pink-coin.png'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(APP_CACHE).then(cache => cache.addAll(APP_SHELL))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const valid = new Set([APP_CACHE, RUNTIME_CACHE, IMAGE_CACHE]);
    const keys = await caches.keys();
    await Promise.all(keys.map(key => valid.has(key) ? Promise.resolve() : caches.delete(key)));
    await self.clients.claim();
  })());
});

async function trimCache(cacheName, maxEntries) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  const overflow = keys.length - maxEntries;
  if (overflow > 0) {
    for (const request of keys.slice(0, overflow)) {
      await cache.delete(request);
    }
  }
}

async function networkFirst(request, cacheName = RUNTIME_CACHE) {
  const cache = await caches.open(cacheName);
  try {
    const response = await fetch(request);
    if (response && response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    const cached = await cache.match(request, { ignoreSearch: true });
    if (cached) return cached;

    if (request.mode === 'navigate') {
      return (await caches.match('./index.html')) || (await caches.match('./'));
    }
    throw error;
  }
}

async function staleWhileRevalidate(request, cacheName = RUNTIME_CACHE, maxEntries = 80) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request, { ignoreSearch: true });

  const networkPromise = fetch(request)
    .then(async response => {
      if (response && response.ok) {
        await cache.put(request, response.clone());
        trimCache(cacheName, maxEntries);
      }
      return response;
    })
    .catch(() => null);

  return cached || (await networkPromise) || Response.error();
}

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  const pathname = url.pathname;
  const extension = pathname.includes('.') ? pathname.split('.').pop().toLowerCase() : '';
  const isNavigation = request.mode === 'navigate';
  const isImageOrMedia = ['png', 'jpg', 'jpeg', 'webp', 'gif', 'svg', 'ico', 'mp3', 'wav', 'ogg', 'mp4', 'webm'].includes(extension);
  const isStaticText = ['css', 'js', 'json', 'webmanifest', 'txt'].includes(extension);

  if (isNavigation) {
    event.respondWith(networkFirst(request, RUNTIME_CACHE));
    return;
  }

  // Duck Quest is under active development. Prefer the network for its
  // HTML/CSS/JS so old RPG code is much less likely to stick around.
  if (pathname.includes('/duck-quest/') && !isImageOrMedia) {
    event.respondWith(networkFirst(request, RUNTIME_CACHE));
    return;
  }

  if (isImageOrMedia) {
    event.respondWith(staleWhileRevalidate(request, IMAGE_CACHE, 180));
    return;
  }

  if (isStaticText) {
    event.respondWith(staleWhileRevalidate(request, RUNTIME_CACHE, 120));
    return;
  }

  event.respondWith(networkFirst(request, RUNTIME_CACHE));
});
