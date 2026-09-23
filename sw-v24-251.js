const APP_CACHE = 'duck-habit-hub-app-v24-251';
const RUNTIME_CACHE = 'duck-habit-hub-runtime-v24-251';
const IMAGE_CACHE = 'duck-habit-hub-images-stable-v1';

const APP_SHELL = [
  './trading-cards-v250.css?v=24-251','./trading-cards-v250.js?v=24-251','./trading-cards-ui-v250.js?v=24-251',
  './assets/trading-cards/card-common.png','./assets/trading-cards/card-uncommon.png','./assets/trading-cards/card-rare.png','./assets/trading-cards/card-back.png','./assets/trading-cards/card-pack-unopened.png','./assets/trading-cards/card-pack-ripped.png','./assets/trading-cards/card-pack-torn-top.png',
  './memory-game/trading-card-memory-v235.js?v=24-251','./duck-quest/js/trading-card-drops-v235.js?v=24-251',
  './','./index.html','./manifest.webmanifest?v=24-251','./version.json',
  './style-v24-201.css?v=24-251','./script-v24-201.js?v=24-251','./sw-v24-251.js','./sw.js',
  './apple-touch-icon-v5.png','./favicon-32-v5.png','./icon-192-v5.png','./icon-512-v5.png','./icon-maskable-512-v5.png',
  './assets/ui/pink-coin.webp','./assets/ui/icons/duckipedia.webp','./assets/ducks/Standard-duck.webp','./assets/ducks/Top-hat-duck.webp',
  './duck-quest/assets/dash/Jump-Token.png','./duck-quest/assets/eggs/Common-egg.png','./duck-quest/assets/eggs/Rare-egg.png',
  './duck-quest/assets/eggs/Hatching-background-new.png','./duck-quest/assets/eggs/Hatch-nest.png','./assets/miko/Miko-angry.PNG',
  './duck-quest/assets/charms/Fortune-green-charm.png',
  './duck-quest/assets/enemies/mimic/lucky/closed.webp','./duck-quest/assets/enemies/mimic/lucky/open.webp','./duck-quest/assets/enemies/mimic/lucky/idle-1.webp','./duck-quest/assets/enemies/mimic/lucky/idle-2.webp',
  './duck-quest/assets/enemies/mimic/healthy/closed.webp','./duck-quest/assets/enemies/mimic/healthy/open.webp','./duck-quest/assets/enemies/mimic/healthy/idle-1.webp','./duck-quest/assets/enemies/mimic/healthy/idle-2.webp',
  './assets/ui/profile-borders/Sparkle-border.png','./assets/ui/profile-borders/Stitched-border.png','./assets/ui/profile-borders/Sakura-border.png',
  './shared-ui-theme-v24-131.css','./shared-ui-theme-v24-131.js',
  './memory-game/index.html','./sort-game/index.html','./crane-game/index.html?v=24-251','./crane-game/play-v24-40.html?v=24-251','./crane-game/style-v24-40.css?v=24-251','./crane-game/script-v24-40.js?v=24-251',
  './duck-quest/index.html','./duck-quest/js/game-v96.js?v=24-251','./duck-quest/js/quest-fixes-v204.js?v=24-251','./duck-quest/js/quest-fixes-v207.js?v=24-251','./duck-quest/js/quest-fixes-v209.js?v=24-251','./duck-quest/js/theme-refresh-v211.js?v=24-251','./duck-quest/js/theme-fixes-v212.js?v=24-251','./duck-quest/js/boost-items-v213.js?v=24-251','./duck-quest/js/boost-labels-v215.js?v=24-251','./assets/bakery/drops/Gold-heart-refill.webp','./assets/bakery/drops/Pink-heart-refill.webp','./assets/items/quest-boosts/Warm-blanket.png','./assets/items/quest-boosts/Exp-candy-large.png','./assets/items/quest-boosts/Exp-candy-small.png','./hub-shop-boosts-v213.js?v=24-251','./hub-exp-candy-use-v215.js?v=24-251','./duck-quest/js/hatchery-v179.js?v=24-251','./duck-quest/js/hatchery-egg-position-v192.js?v=24-251','./duck-quest/js/hatchery-ui-v193.js?v=24-251','./duck-quest/js/dash-home-v180.js?v=24-251','./duck-quest/js/dash-screen-v184.js?v=24-251','./duck-quest/js/dash-screen-v193.js?v=24-251','./duck-quest/js/token-shop-v200.js?v=24-251','./duck-quest/css/style-v82.css?v=24-251',
  './bakery/index.html',
  './duck-quest/js/dash-background-fix-v226.js?v=24-251',
  './duck-quest/js/merchant-fix-v218.js?v=24-251',
  './duck-quest/assets/dash/Angel-Wing.png',
  './duck-quest/assets/dash/Bubble-icon.png',
  './duck-quest/assets/dash/Bubble.png',
  './duck-quest/assets/dash/backgrounds/DD-Meadow-3x.png',
  './duck-quest/assets/dash/backgrounds/DD-Ocean-3x.png',
  './duck-quest/assets/dash/backgrounds/DD-Candyland-3x.png',
  './duck-quest/assets/dash/backgrounds/DD-CloudGarden-3x.png',
  './duck-quest/assets/trading-cards/fabled/F-acorn-mouse.png',
  './duck-quest/assets/trading-cards/fabled/F-flower.png',
  './duck-quest/assets/trading-cards/fabled/F-bee.png',
  './duck-quest/assets/trading-cards/fabled/F-slime-kitty.png',
  './duck-quest/assets/trading-cards/fabled/F-mimic.png',
  './duck-quest/assets/love-interests/lukio/Lukio-duck.png',
  './duck-quest/assets/love-interests/lukio/Lukio-idle-1.png',
  './duck-quest/assets/love-interests/lukio/Lukio-idle-2.png',
  './duck-quest/assets/love-interests/lukio/Lukio-wink.png',
  './duck-quest/assets/love-interests/lukio/Pixel-heart.png',
  './assets/miko/Miko-Lukio-Booties.png',
  './assets/miko/Miko-Lukio-Hair-Streak.png',
  './assets/miko/Miko-Lukio-Shorts.png',
  './assets/miko/Miko-Lukio-Socks.png',
  './assets/miko/Miko-Lukio-hoodie-shop.png',
  './assets/miko/Miko-Lukio-hoodie.png',
  './assets/miko/Miko-lukio-sleeve.png',
  './duck-quest/js/love-interests-v251.js?v=24-251',
  './duck-quest/css/love-interests-v251.css?v=24-251',
  './duck-quest/assets/love-interests/shinobu/Shinobu-duck.png',
  './duck-quest/assets/love-interests/shinobu/Shinobu-idle-1.png',
  './duck-quest/assets/love-interests/shinobu/Shinobu-idle-2.png',
  './duck-quest/assets/love-interests/shinobu/Shinobu-happy.png',
  './duck-quest/assets/love-interests/shinobu/Miko-Shino-Baret.png',
  './duck-quest/assets/love-interests/shinobu/Miko-Shino-Boots.png',
  './duck-quest/assets/love-interests/shinobu/Miko-Shino-Jeans.png',
  './duck-quest/assets/love-interests/shinobu/Miko-Shino-Sweater.png',
  './duck-quest/assets/love-interests/shinobu/Miko-Shino-Sweater-Shop.png',
  './duck-quest/assets/love-interests/shinobu/Miko-Shino-sleeve.png',
  './duck-quest/assets/love-interests/cheryln/Cheryln-duck.png',
  './duck-quest/assets/love-interests/cheryln/Cheryln-idle-1.png',
  './duck-quest/assets/love-interests/cheryln/Cheryln-idle-2.png',
  './duck-quest/assets/love-interests/cheryln/Cheryln-happy.png',
  './duck-quest/assets/love-interests/cheryln/Miko-Cheryln-Banana-Hairpin.png',
  './duck-quest/assets/love-interests/cheryln/Miko-Cheryln-boots.png',
  './duck-quest/assets/love-interests/cheryln/Miko-Cheryln-shorts.png',
  './duck-quest/assets/love-interests/cheryln/Miko-Cheryln-sweater.png',
  './duck-quest/assets/love-interests/cheryln/Miko-Cheryln-white-tights.png',
  './duck-quest/assets/love-interests/hibiki/Hibiki-duck.png',
  './duck-quest/assets/love-interests/hibiki/Hibiki-idle-1.png',
  './duck-quest/assets/love-interests/hibiki/Hibiki-idle-2.png',
  './duck-quest/assets/love-interests/hibiki/Hibiki-happy.png',
  './duck-quest/assets/love-interests/hibiki/Miko-Hibiki-Ribbon.png',
  './duck-quest/assets/love-interests/hibiki/Miko-Hibiki-back-coat.png',
  './duck-quest/assets/love-interests/hibiki/Miko-Hibiki-boots.png',
  './duck-quest/assets/love-interests/hibiki/Miko-Hibiki-coat-shop.png',
  './duck-quest/assets/love-interests/hibiki/Miko-Hibiki-coat-sleeve.png',
  './duck-quest/assets/love-interests/hibiki/Miko-Hibiki-coat.png',
  './duck-quest/assets/love-interests/hibiki/Miko-Hibiki-shirt.png',
  './duck-quest/assets/love-interests/hibiki/Miko-Hibiki-shorts.png',
  './duck-quest/assets/love-interests/hibiki/Miko-Hibiki-stockings.png',
  './duck-quest/assets/love-interests/devlin/Devlin-duck.png',
  './duck-quest/assets/love-interests/devlin/Devlin-idle-1.png',
  './duck-quest/assets/love-interests/devlin/Devlin-idle-2.png',
  './duck-quest/assets/love-interests/devlin/Devlin-angry.png',
  './duck-quest/assets/love-interests/devlin/Miko-Devlin-Belt.png',
  './duck-quest/assets/love-interests/devlin/Miko-Devlin-Tie.png',
  './duck-quest/assets/love-interests/devlin/Miko-Devlin-Vest.png',
  './duck-quest/assets/love-interests/devlin/Miko-Devlin-loafers.png',
  './duck-quest/assets/love-interests/devlin/Miko-Devlin-pants.png',
  './duck-quest/assets/love-interests/devlin/Miko-Devlin-shirt.png',
  './duck-quest/assets/love-interests/devlin/Miko-bangs-pinned.png',
  './duck-quest/assets/love-interests/yuzuru/Yuzuru-duck.png',
  './duck-quest/assets/love-interests/yuzuru/Yuzuru-idle-1.png',
  './duck-quest/assets/love-interests/yuzuru/Yuzuru-idle-2.png',
  './duck-quest/assets/love-interests/yuzuru/Yuzuru-content.png',
  './duck-quest/assets/love-interests/yuzuru/Miko-Yuzuru-bracelet.png',
  './duck-quest/assets/love-interests/yuzuru/Miko-Yuzuru-shirt.png',
  './duck-quest/assets/love-interests/yuzuru/Miko-Yuzuru-shorts.png',
  './duck-quest/assets/love-interests/yuzuru/Miko-Yuzuru-socks.png',
  './duck-quest/assets/love-interests/yuzuru/Miko-Yuzuru-shoes.png',
  './duck-quest/assets/love-interests/westley/Westley-duck.png',
  './duck-quest/assets/love-interests/westley/Westley-idle-1.png',
  './duck-quest/assets/love-interests/westley/Westley-idle-2.png',
  './duck-quest/assets/love-interests/westley/Westley-happy.png',
  './duck-quest/assets/love-interests/westley/Miko-Westley-top.png',
  './duck-quest/assets/love-interests/westley/Miko-Westley-Jacket.png',
  './duck-quest/assets/love-interests/westley/Miko-Westley-Jacket-shop.png',
  './duck-quest/assets/love-interests/westley/Miko-Westley-sleeve.png',
  './duck-quest/assets/love-interests/westley/Miko-Westley-pants.png',
  './duck-quest/assets/love-interests/westley/Miko-Westley-boots.png',
  './duck-quest/assets/love-interests/westley/Miko-Westley-Face-makeup.png',
  './duck-quest/assets/love-interests/circe/Circe-duck.png',
  './duck-quest/assets/love-interests/circe/Circe-idle-1.png',
  './duck-quest/assets/love-interests/circe/Circe-idle-2.png',
  './duck-quest/assets/love-interests/circe/Circe-happy.png',
  './duck-quest/assets/love-interests/circe/Miko-circe-tank-top.png',
  './duck-quest/assets/love-interests/circe/Miko-circe-sweater.png',
  './duck-quest/assets/love-interests/circe/Miko-circe-sweater-shop.png',
  './duck-quest/assets/love-interests/circe/Miko-circe-sleeve.png',
  './duck-quest/assets/love-interests/circe/Miko-circe-shorts.png',
  './duck-quest/assets/love-interests/circe/Miko-circe-stockings.png',
  './duck-quest/assets/love-interests/circe/Miko-circe-shoes.png',
  './duck-quest/assets/love-interests/circe/Miko-circe-choker.png',
  './duck-quest/assets/love-interests/quin/Quin-duck.png',
  './duck-quest/assets/love-interests/quin/Quin-idle-1.png',
  './duck-quest/assets/love-interests/quin/Quin-idle-2.png',
  './duck-quest/assets/love-interests/quin/Quin-threaten.png',
  './duck-quest/assets/love-interests/quin/Miko-Quin-shirt.png',
  './duck-quest/assets/love-interests/quin/Miko-Quin-jacket.png',
  './duck-quest/assets/love-interests/quin/Miko-Quin-jacket-shop.png',
  './duck-quest/assets/love-interests/quin/Miko-Quin-back-jacket.png',
  './duck-quest/assets/love-interests/quin/Miko-Quin-sleeve.png',
  './duck-quest/assets/love-interests/quin/Miko-Quin-shorts.png',
  './duck-quest/assets/love-interests/quin/Miko-Quin-boots.png',
  './duck-quest/assets/love-interests/quin/Miko-Quin-Hairpins.png',
  './duck-quest/assets/trading-cards/fabled/F-peep.png',
  './duck-quest/assets/trading-cards/fabled/F-io.png',
  './duck-quest/assets/trading-cards/fabled/F-annika.png',
  './duck-quest/assets/trading-cards/fabled/F-miho.png',
  './duck-quest/assets/trading-cards/fabled/F-shinobu-cheryln.png',
  './sw-v24-244.js',
];

self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(caches.open(APP_CACHE).then(cache => cache.addAll(APP_SHELL)));
});

async function migrateImageCaches() {
  const keys = await caches.keys();
  const legacy = keys.filter(key => key.startsWith('duck-habit-hub-images-') && key !== IMAGE_CACHE);
  if (!legacy.length) return;
  const target = await caches.open(IMAGE_CACHE);
  for (const cacheName of legacy) {
    const oldCache = await caches.open(cacheName);
    const requests = await oldCache.keys();
    for (const request of requests) {
      if (await target.match(request, {ignoreSearch:true})) continue;
      const response = await oldCache.match(request);
      if (response) await target.put(request, response);
    }
  }
  await trimCache(IMAGE_CACHE, 1500);
}

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    await migrateImageCaches();
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
    for (const request of keys.slice(0, overflow)) await cache.delete(request);
  }
}

async function networkFirst(request, cacheName = RUNTIME_CACHE) {
  const cache = await caches.open(cacheName);
  try {
    const response = await fetch(request, {cache:'no-store'});
    if (response && response.ok) await cache.put(request, response.clone());
    return response;
  } catch (error) {
    const cached = await cache.match(request, {ignoreSearch:true});
    if (cached) return cached;
    if (request.mode === 'navigate') {
      return (await caches.match('./index.html')) || (await caches.match('./'));
    }
    throw error;
  }
}

async function staleWhileRevalidate(request, cacheName = RUNTIME_CACHE, maxEntries = 160) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request, {ignoreSearch:true});
  const network = fetch(request, {cache:'no-store'}).then(async response => {
    if (response && response.ok) {
      await cache.put(request, response.clone());
      trimCache(cacheName, maxEntries);
    }
    return response;
  }).catch(() => null);
  return cached || (await network) || Response.error();
}

function isPwaIcon(pathname) {
  const name = pathname.split('/').pop() || '';
  return ['apple-touch-icon-v5.png','favicon-32-v5.png','icon-192-v5.png','icon-512-v5.png','icon-maskable-512-v5.png'].includes(name);
}

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === 'navigate') {
    event.respondWith(networkFirst(request));
    return;
  }

  const pathname = url.pathname;
  if (pathname.endsWith('.png') || pathname.endsWith('.webp') || pathname.endsWith('.jpg') ||
      pathname.endsWith('.jpeg') || pathname.endsWith('.gif') || pathname.endsWith('.svg') || isPwaIcon(pathname)) {
    event.respondWith(staleWhileRevalidate(request, IMAGE_CACHE, 1500));
    return;
  }

  if (pathname.endsWith('.js') || pathname.endsWith('.css') || pathname.endsWith('.html') ||
      pathname.endsWith('.json') || pathname.endsWith('.webmanifest')) {
    event.respondWith(networkFirst(request));
    return;
  }

  event.respondWith(staleWhileRevalidate(request));
});
