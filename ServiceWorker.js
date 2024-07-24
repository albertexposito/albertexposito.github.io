const cacheName = "CUPRA-CUPRA America's Cup-0.1";
const contentToCache = [
    "Build/albertexposito.github.io.loader.js",
    "Build/622ed8ecd3b0c1a98ccd390c00f99eb2.js",
    "Build/0259e3d8a7c5cbdb132e53910dd1b36f.data",
    "Build/4149e3a16514d1bcc34af9d657992f73.wasm",
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
