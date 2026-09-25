const FIREBASE_CONFIG={
  apiKey: "AIzaSyD1pZO7FDXyjBtc7idwVqe22p6wTub4lkg",
  authDomain: "duckie-days.firebaseapp.com",
  projectId: "duckie-days",
  storageBucket: "duckie-days.firebasestorage.app",
  messagingSenderId: "668038938575",
  appId: "1:668038938575:web:a41e327c86f3c43eb11cba"
};
try{
  importScripts('https://www.gstatic.com/firebasejs/12.19.0/firebase-app-compat.js');
  importScripts('https://www.gstatic.com/firebasejs/12.19.0/firebase-messaging-compat.js');
  firebase.initializeApp(FIREBASE_CONFIG);
  firebase.messaging();
}catch(error){
  console.warn('Duckie Days push setup could not start in the service worker:',error);
}

const APP_CACHE='duck-habit-hub-app-v24-271';
const APP_SHELL=[
 './','./index.html','./version.json','./sw.js?v=24-271',
 './hub-v265.css?v=24-265','./hub-v267.css?v=24-267','./hub-v268.css?v=24-268','./hub-v270.css?v=24-270',
 './task-reminders-v271.css?v=24-271',
 './hub-v265.js?v=24-265','./hub-v267.js?v=24-267',
 './trading-cards-ui-v265.js?v=24-265','./trading-cards-ui-v267.js?v=24-267','./trading-cards-ui-v268.js?v=24-268','./trading-cards-ui-v270.js?v=24-270',
 './task-progression-v254.js?v=24-261','./task-progression-v257.js?v=24-261','./task-progression-v260.js?v=24-261','./task-progression-v261.js?v=24-261',
 './firebase-reminders-v271.mjs?v=24-271','./task-reminders-v271.js?v=24-271',
 './duck-quest/index.html',
 './duck-quest/css/quest-v265.css?v=24-265','./duck-quest/css/quest-v269.css?v=24-269','./duck-quest/css/quest-v270.css?v=24-270',
 './duck-quest/js/game-v96.js?v=24-269',
 './duck-quest/js/task-buddy-boost-v254.js?v=24-255',
 './duck-quest/js/quest-v265.js?v=24-269-core',
 './duck-quest/js/quest-v269.js?v=24-269',
 './duck-quest/js/quest-v270.js?v=24-270',
 './assets/ingredients/Sparkle.webp',
 './duck-quest/assets/enemies/mimic/lucky/idle-1.webp',
 './duck-quest/assets/enemies/mimic/lucky/idle-2.webp',
 './duck-quest/assets/enemies/mimic/healthy/idle-1.webp',
 './duck-quest/assets/enemies/mimic/healthy/idle-2.webp',
 './duck-quest/assets/shinies/amethyst-mimic-idle-1.webp',
 './duck-quest/assets/shinies/amethyst-mimic-idle-2.webp'
];
self.addEventListener('message',e=>{if(e.data?.type==='SKIP_WAITING')self.skipWaiting();});
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(APP_CACHE).then(c=>c.addAll(APP_SHELL)));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('duck-habit-hub-app-')&&k!==APP_CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  const u=new URL(e.request.url);
  if(u.origin!==self.location.origin)return;
  e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(cached=>cached||fetch(e.request).then(r=>{if(r&&r.ok)caches.open(APP_CACHE).then(c=>c.put(e.request,r.clone()));return r;})));
});
