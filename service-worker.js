self.addEventListener('install', function(event) {
  console.log('[Service Worker] Installing Service Worker ...', event);
  self.skipWaiting();
  event.waitUntil(
    caches.open('static')
      .then(function(cache) {
        console.log('[Service Worker] Precaching App Shell');
        cache.addAll([
          '/',
          '/index.html',
          '/app.js',
          '/blog.html',
          '/about.html',
          '/style.css',
          '/contact.html'
        ]);
      })
  )
});

self.addEventListener('activate', function(event) {
  console.log('[Service Worker] Activating Service Worker ....', event);
  event.waitUntil(
    caches.keys()
      .then(function(keyList) {
        return Promise.all(keyList.map(function(key) {
          if (key !== CACHE_STATIC_ONE && key !== CACHE_DYNAMIC_ONE) {
            console.log('[Service Worker] Deleting cache.', key);
            return caches.delete(key);
          }
        }));
      })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.open(CACHE_DYNAMIC_ONE)
      .then(function(cache) {
        return fetch(event.request)
          .then(function(res) {
            cache.put(event.request, res.clone());
            return res;
          });
      })
  );
});