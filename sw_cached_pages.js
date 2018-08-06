const cacheName = 'v1';

const cacheAssets = [
  'https://djordje47.github.io/simpleServiceWorker/index.html',
  'https://djordje47.github.io/simpleServiceWorker/about.html',
  'https://djordje47.github.io/simpleServiceWorker/css/style.css',
  'https://djordje47.github.io/simpleServiceWorker/js/main.js'
];
// Call install event 
self.addEventListener('install', (e) => {
  console.log('Service Worker: Installed');
  e.waitUntil(
    caches
      .open(cacheName)
      .then(cache => {
        console.log('Service Worker: Caching Assets');
        cache.addAll(cacheAssets)
      })
      .then(() => self.skipWaiting())
  );
});

// Call Activate Event
self.addEventListener('activate', (e) => {
  console.log('Service worker: Activated');
  // Remove old caches 
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== cacheName) {
            console.log('SW Clearing old caches');
            return caches.delete(cache);
          }
        })
      );
    })
  )
});

// Call Fetch Event
self.addEventListener('fetch', e => {
  console.log('Service worker: Fetching');
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request)));
})