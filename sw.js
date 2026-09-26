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

const APP_CACHE='duck-habit-hub-app-v24-287';
const APP_SHELL=[
 './',
 './index.html',
 './version.json',
 './sw.js?v=24.287',
 './manifest.webmanifest?v=24.287',
 './app.css?v=24.287',
 './trading-cards-base.css?v=24.287',
 './trading-cards-extra.css?v=24.287',
 './tasks.css?v=24.287',
 './hub.css?v=24.287',
 './task-reminders.css?v=24.287',
 './trading-cards-base.js?v=24.287',
 './trading-cards-extra.js?v=24.287',
 './app.js?v=24.287',
 './hub-boosts.js?v=24.287',
 './trading-cards-ui.js?v=24.287',
 './tasks.js?v=24.287',
 './firebase-reminders.mjs?v=24.287',
 './task-reminders.js?v=24.287',
 './hub.js?v=24.287',
 './duck-quest/index.html',
 './duck-quest/css/quest-v265.css?v=24-265',
 './duck-quest/css/quest-v269.css?v=24-269',
 './duck-quest/css/quest-v270.css?v=24-270',
 './duck-quest/css/quest-v274.css?v=24-274',
 './duck-quest/css/quest-v276.css?v=24-276',
 './duck-quest/css/quest-v277.css?v=24-277',
 './duck-quest/css/quest-v278.css?v=24-280',
 './duck-quest/js/game-v96.js?v=24-284',
 './duck-quest/js/task-buddy-boost-v254.js?v=24-255',
 './duck-quest/js/quest-v265.js?v=24-283',
 './duck-quest/js/quest-v269.js?v=24-269',
 './duck-quest/js/quest-v270.js?v=24-284',
 './assets/ingredients/Sparkle.webp',
 './duck-quest/assets/enemies/mimic/base/open-1.webp',
 './duck-quest/assets/enemies/mimic/lucky/open.webp',
 './duck-quest/assets/enemies/mimic/healthy/open.webp',
 './assets/furniture/book-shelves/book-shelf-brown.png',
 './assets/furniture/book-shelves/book-shelf-white.png',
 './assets/furniture/book-shelves/book-shelf-dark.png',
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
