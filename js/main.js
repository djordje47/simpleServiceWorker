if ('serviceWorker' in navigator) {
  // console.log('Service worker supported');
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('https://djordje47.github.io/simpleServiceWorker/sw_cached_pages.js')
      .then(reg => console.log('SW -> Registered'))
      .catch(err => console.log(err));
  })
}