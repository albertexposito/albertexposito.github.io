const cacheName = "DefaultCompany-test-cupra-copa-america-features-0.1.0";
const contentToCache = [
    "Build/90e9db32fdba49471d29af1be9d211bd.loader.js",
    "Build/3792829eab79ed0fe50987ebed0fec30.framework.js",
    "Build/ffae4d8118d0d12b4e2f252c8ef6d0f7.data",
    "Build/c30ec9f088cf39759c79edbd20b55706.wasm",
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
