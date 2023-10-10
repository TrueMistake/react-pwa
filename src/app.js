if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then(reg => console.log('serviceWorker', reg))
    .catch(err => console.log('serviceWorker not registered', err))
}