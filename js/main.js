if ('serviceWorker' in navigator) {
  // console.log('Service worker supported');
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('../sw_cached_pages.js')
      .then(reg => console.log('SW -> Registered'))
      .catch(err => console.log());
  })

  // window.addEventListener('load', () => {
  //   navigator.serviceWorker
  //     .register('../sw_cached_site.js')
  //     .then(reg => console.log('SW -> Site Caching!'))
  //     .catch(err => console.log());
  // })
}