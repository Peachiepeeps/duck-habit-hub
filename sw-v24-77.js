const APP_CACHE = 'duck-habit-hub-app-v24-77';
const RUNTIME_CACHE = 'duck-habit-hub-runtime-v24-77';
const IMAGE_CACHE = 'duck-habit-hub-images-v24-77';

const APP_SHELL = [
  './','./index.html','./manifest.webmanifest','./style-v24-77.css','./script-v24-77.js','./sw-v24-77.js',
  './apple-touch-icon-v4.png','./favicon-32-v4.png','./icon-192-v4.png','./icon-512-v4.png','./icon-maskable-512-v4.png',
  './assets/ui/book-room.webp','./assets/ui/book-icon.webp','./assets/ui/mirror.webp','./assets/ui/pink-coin.webp',
  './assets/gacha/gacha-machine.webp','./assets/gacha/gacha-menu-icon.webp','./assets/gacha/gacha-turn.webp','./assets/gacha/capsule-clear.webp','./assets/gacha/capsule-common.webp','./assets/gacha/capsule-uncommon.webp','./assets/gacha/capsule-rare.webp','./assets/gacha/capsule-super.webp',
  './assets/ui/icons/tasks.webp','./assets/ui/icons/dailies.webp','./assets/ui/icons/inventory.webp','./assets/ui/icons/shop.webp','./assets/ui/icons/duckipedia.webp','./assets/ui/icons/status.webp','./assets/ui/icons/profiles.webp','./assets/ui/icons/save-data.webp',
  './assets/items/buddy-pons/buddy-pon.png','./assets/items/buddy-pons/super-buddy-pon.png','./assets/items/buddy-pons/boss-buddy-pon.png',
  './assets/ducks/Standard-duck.webp','./assets/gifts/Gaming-controller.webp','./assets/achievements/trophies/trophy-gold.webp','./assets/paint/Pink-paint.webp','./assets/gifts/Heart-locket.webp',
  './assets/oc-invitations/Io-invitation.webp','./assets/ducks/io-duck.webp'
];

self.addEventListener('install',event=>{
  self.skipWaiting();
  event.waitUntil(caches.open(APP_CACHE).then(cache=>cache.addAll(APP_SHELL)));
});

self.addEventListener('activate',event=>{
  event.waitUntil((async()=>{
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
    const response=await fetch(request);
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
  const network=fetch(request).then(async response=>{
    if(response&&response.ok){await cache.put(request,response.clone());trimCache(cacheName,maxEntries);}
    return response;
  }).catch(()=>null);
  return cached||(await network)||Response.error();
}

function isPwaIcon(pathname){
  const name=pathname.split('/').pop()||'';
  return ['apple-touch-icon-v4.png','favicon-32-v4.png','icon-192-v4.png','icon-512-v4.png','icon-maskable-512-v4.png'].includes(name);
}

async function cacheFirstImage(request){
  const cache=await caches.open(IMAGE_CACHE);
  const cached=await cache.match(request,{ignoreSearch:true});
  if(cached) return cached;
  const url=new URL(request.url);
  const canUseWebp=!isPwaIcon(url.pathname)&&/\.(png|jpe?g)$/i.test(url.pathname);
  if(canUseWebp){
    const webpUrl=new URL(url.href);webpUrl.pathname=webpUrl.pathname.replace(/\.(png|jpe?g)$/i,'.webp');
    try{
      const response=await fetch(webpUrl.href,{cache:'force-cache'});
      if(response&&response.ok){await cache.put(request,response.clone());trimCache(IMAGE_CACHE,750);return response;}
    }catch(error){}
  }
  try{
    const response=await fetch(request,{cache:'force-cache'});
    if(response&&response.ok){await cache.put(request,response.clone());trimCache(IMAGE_CACHE,750);}
    return response;
  }catch(error){return Response.error();}
}

self.addEventListener('fetch',event=>{
  const request=event.request;if(request.method!=='GET')return;
  const url=new URL(request.url);if(url.origin!==self.location.origin)return;
  const pathname=url.pathname;const extension=pathname.includes('.')?pathname.split('.').pop().toLowerCase():'';
  const isNavigation=request.mode==='navigate';
  const isImage=['png','jpg','jpeg','webp','gif','svg','ico'].includes(extension);
  const isMedia=['mp3','wav','ogg','mp4','webm'].includes(extension);
  const isStaticText=['css','js','json','webmanifest','txt'].includes(extension);
  if(isNavigation){event.respondWith(networkFirst(request));return;}
  if(pathname.includes('/duck-quest/')&&!isImage&&!isMedia){event.respondWith(networkFirst(request));return;}
  if(isImage||isMedia){event.respondWith(cacheFirstImage(request));return;}
  if(isStaticText){event.respondWith(staleWhileRevalidate(request));return;}
  event.respondWith(networkFirst(request));
});
