const cacheName = 'v2';

// Call install event 
self.addEventListener('install', (e) => {
  console.log('Service Worker: Installed');
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
      )
    })
  )
});

// Call Fetch Event
self.addEventListener('fetch', e => {
  console.log('Service worker: Fetching');
  e.respondWith(fetch(e.request).then(response => {
    // Make clone of response from the server
    const resClone = response.clone();
    // Open cache 
    caches
      .open(cacheName)
      .then(cache => {
        // Add response to cache
        cache.put(e.request, resClone);
      });
    return response;
  }).catch(err => caches.match(e.request).then(response => response))
  );
})