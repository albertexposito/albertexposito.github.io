const cacheName = "DefaultCompany-test-cupra-copa-america-features-0.1.0";
const contentToCache = [
    "Build/983e9336127fac358886e75e542b94a3.loader.js",
    "Build/4d325f9687ad533eb3e157a5e17c669b.framework.js",
    "Build/e2165ccc4019de312cdf5d32dcf48cda.data",
    "Build/37e49c48e063601a4714272c13b441ec.wasm",
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
