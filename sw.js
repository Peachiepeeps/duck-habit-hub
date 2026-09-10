const APP_CACHE = 'duck-habit-hub-app-v24-132';
const RUNTIME_CACHE = 'duck-habit-hub-runtime-v24-132';
const IMAGE_CACHE = 'duck-habit-hub-images-stable-v1';

// v24.132: keep the install shell intentionally small. Character art, enemy
// variants and backgrounds are cached only when viewed instead of blocking the
// initial service-worker install with hundreds of image requests.
const APP_SHELL = [
  './','./index.html','./manifest.webmanifest','./version.json','./style-v24-132.css','./script-v24-132.js','./sw.js',
  './apple-touch-icon-v5.png','./favicon-32-v5.png','./icon-192-v5.png','./icon-512-v5.png','./icon-maskable-512-v5.png',
  './assets/ui/pink-coin.webp','./assets/ducks/Standard-duck.webp',
  './assets/ui/profile-borders/Sparkle-border.png','./assets/ui/profile-borders/Stitched-border.png','./assets/ui/profile-borders/Sakura-border.png',
  './shared-ui-theme-v24-131.css','./shared-ui-theme-v24-131.js',
  './memory-game/index.html','./sort-game/index.html','./crane-game/index.html','./crane-game/play-v24-40.html',
  './duck-quest/index.html','./duck-quest/js/game-v62.js','./duck-quest/css/style-v54.css',
  './bakery/index.html'
];

self.addEventListener('install',event=>{
  self.skipWaiting();
  event.waitUntil(caches.open(APP_CACHE).then(cache=>cache.addAll(APP_SHELL)));
});

async function migrateImageCaches(){
  const keys=await caches.keys();
  const legacy=keys.filter(key=>key.startsWith('duck-habit-hub-images-')&&key!==IMAGE_CACHE);
  if(!legacy.length)return;
  const target=await caches.open(IMAGE_CACHE);
  for(const cacheName of legacy){
    const oldCache=await caches.open(cacheName);
    const requests=await oldCache.keys();
    for(const request of requests){
      if(await target.match(request,{ignoreSearch:true}))continue;
      const response=await oldCache.match(request);
      if(response)await target.put(request,response);
    }
  }
  await trimCache(IMAGE_CACHE,1500);
}

self.addEventListener('activate',event=>{
  event.waitUntil((async()=>{
    await migrateImageCaches();
    const valid=new Set([APP_CACHE,RUNTIME_CACHE,IMAGE_CACHE]);
    const keys=await caches.keys();
    await Promise.all(keys.map(key=>valid.has(key)?Promise.resolve():caches.delete(key)));
    await self.clients.claim();
  })());
});

async function trimCache(cacheName,maxEntries){
  const cache=await caches.open(cacheName);const keys=await cache.keys();
  const overflow=keys.length-maxEntries;
  if(overflow>0) for(const request of keys.slice(0,overflow)) await cache.delete(request);
}

async function networkFirst(request,cacheName=RUNTIME_CACHE){
  const cache=await caches.open(cacheName);
  try{
    const response=await fetch(request,{cache:'no-store'});
    if(response&&response.ok) await cache.put(request,response.clone());
    return response;
  }catch(error){
    const cached=await cache.match(request,{ignoreSearch:true});
    if(cached) return cached;
    if(request.mode==='navigate') return (await caches.match('./index.html'))||(await caches.match('./'));
    throw error;
  }
}

async function staleWhileRevalidate(request,cacheName=RUNTIME_CACHE,maxEntries=160){
  const cache=await caches.open(cacheName);
  const cached=await cache.match(request,{ignoreSearch:true});
  const network=fetch(request,{cache:'no-store'}).then(async response=>{
    if(response&&response.ok){await cache.put(request,response.clone());trimCache(cacheName,maxEntries);}
    return response;
  }).catch(()=>null);
  return cached||(await network)||Response.error();
}

function isPwaIcon(pathname){
  const name=pathname.split('/').pop()||'';
  return ['apple-touch-icon-v5.png','favicon-32-v5.png','icon-192-v5.png','icon-512-v5.png','icon-maskable-512-v5.png'].includes(name);
}

self.addEventListener('fetch',event=>{
  const request=event.request;
  if(request.method!=='GET') return;
  const url=new URL(request.url);
  if(url.origin!==self.location.origin) return;
  if(request.mode==='navigate'){event.respondWith(networkFirst(request));return;}
  const pathname=url.pathname;
  if(pathname.endsWith('.png')||pathname.endsWith('.webp')||pathname.endsWith('.jpg')||pathname.endsWith('.jpeg')||pathname.endsWith('.gif')||pathname.endsWith('.svg')||isPwaIcon(pathname)){
    event.respondWith(staleWhileRevalidate(request,IMAGE_CACHE,1500));return;
  }
  if(pathname.endsWith('.js')||pathname.endsWith('.css')||pathname.endsWith('.html')||pathname.endsWith('.json')||pathname.endsWith('.webmanifest')){
    event.respondWith(networkFirst(request));return;
  }
  event.respondWith(staleWhileRevalidate(request));
});
