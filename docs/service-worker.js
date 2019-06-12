importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');
const CACHE_NAME = "firstpwa-v1";



workbox.precaching.precacheAndRoute([
  {url:'./index.html',revision:'1'},
  {url:'./teamdetail.html',revision:'1'},
  {url:'./playerdetail.html',revision:'1'},
  {url:'./pages/home.html',revision:'1'},
  {url:'./pages/about.html',revision:'1'},
  {url:'./pages/contact.html',revision:'1'},
  {url:'./pages/saved.html',revision:'1'},
  {url:'./css/materialize.min.css',revision:'1'},
  {url:'./js/materialize.min.js',revision:'1'},
  {url:'./manifest.json',revision:'1'},
  {url:'./js/nav.js',revision:'1'},
  {url:'./js/api.js',revision:'1'},
  {url:'./js/dbmanager.js',revision:'1'},
  {url:'./js/idb.js',revision:'1'},
  {url:'./main.js',revision:'1'},
  {url:'./icon.png',revision:'1'}
]);



workbox.routing.registerRoute(
  new RegExp('/pages/'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'pages'
    })
);


workbox.routing.registerRoute(
  /\.(?:png|gif|jpg|jpeg|svg)$/,
  workbox.strategies.cacheFirst({
    cacheName: 'images',
  })
);




workbox.routing.registerRoute(
  new RegExp('^https://private-044be-dicodingfootball.apiary-mock.com/'),
  new workbox.strategies.CacheFirst({
    cacheName: 'playerdata',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 30,
      }),
    ]
  })
);


  

self.addEventListener('push', function(event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  var options = {
    body: body,
    icon: 'icon.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});
