const cacheName = "DefaultCompany-test-cupra-copa-america-features-0.1.0";
const contentToCache = [
    "Build/529af6e1e1a456f8b3cfb99073b4ed72.loader.js",
    "Build/3792829eab79ed0fe50987ebed0fec30.framework.js",
    "Build/b9e0d92c8f0310a1a0b93063d278505d.data",
    "Build/67766b226b9e9dcab203fb8f0fd22271.wasm",
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
