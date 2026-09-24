const APP_CACHE='duck-habit-hub-app-v24-267';
const APP_SHELL=[
 './','./index.html','./version.json','./sw.js?v=24-267',
 './hub-v265.css?v=24-265','./hub-v267.css?v=24-267','./hub-v265.js?v=24-265','./hub-v267.js?v=24-267',
 './trading-cards-ui-v265.js?v=24-265','./trading-cards-ui-v267.js?v=24-267',
 './duck-quest/css/quest-v265.css?v=24-265','./duck-quest/css/quest-v267.css?v=24-267',
 './duck-quest/js/quest-v265.js?v=24-265','./duck-quest/js/quest-v267.js?v=24-267',
 './assets/ingredients/Sparkle.webp','./duck-quest/assets/enemies/cat-slime/base/Strawberry-idle-1-neutral.webp'
];
self.addEventListener('message',e=>{if(e.data?.type==='SKIP_WAITING')self.skipWaiting();});
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(APP_CACHE).then(c=>c.addAll(APP_SHELL)));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('duck-habit-hub-app-')&&k!==APP_CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;const u=new URL(e.request.url);if(u.origin!==self.location.origin)return;e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(cached=>cached||fetch(e.request).then(r=>{if(r&&r.ok)caches.open(APP_CACHE).then(c=>c.put(e.request,r.clone()));return r;})));});
