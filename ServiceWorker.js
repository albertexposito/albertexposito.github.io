const cacheName = "DefaultCompany-test-cupra-copa-america-features-0.1.0";
const contentToCache = [
    "Build/ab82a99600a763aa617ce0e1ae2d9ee8.loader.js",
    "Build/fcbda453372da9e5445f7220b2e07004.framework.js",
    "Build/99cfed9f1f9543cb4aa6e742e15320c1.data",
    "Build/f59737af872104dcdd3c342b7bf4b544.wasm",
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
