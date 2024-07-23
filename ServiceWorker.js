const cacheName = "CUPRA-CUPRA America's Cup-0.1";
const contentToCache = [
    "Build/albertexposito.github.io.loader.js",
    "Build/d34c900f622537303866cad825ff178e.js",
    "Build/75d9113cd425b1dcd78644d2156542b5.data",
    "Build/69f7bb516287e8a548b7ddfdc1614575.wasm",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
//      const cache = await caches.open(cacheName);
//      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
//      cache.put(e.request, response.clone());
      return response;
    })());
});
