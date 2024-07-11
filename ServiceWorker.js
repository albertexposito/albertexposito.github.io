const cacheName = "DefaultCompany-test-cupra-copa-america-features-0.1.0";
const contentToCache = [
    "Build/695aee5faec1918444e23ef14243d7ce.loader.js",
    "Build/3792829eab79ed0fe50987ebed0fec30.framework.js",
    "Build/32631fb10c29ef80fc0127fd2296f1e0.data",
    "Build/bbf39d8c1a6d2ca8979b60532bf85720.wasm",
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
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
