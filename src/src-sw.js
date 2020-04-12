console.log("serviceWorker loaded....");

/* eslint-disable no-restricted-globals */

/* eslint-disable no-undef */
self.addEventListener("push", (e) => {
  const data = e.data.json();
  console.log(e.data);
  console.log("push recieved...");
  self.registration.showNotification(data.title, {
    body: "Get your Favorite grocery at Discounted Rates!!",
    icon:
      "https://cdn.pixabay.com/photo/2012/04/13/11/06/shield-31869_960_720.png",
    badge:
      "https://cdn.pixabay.com/photo/2016/01/03/11/24/gear-1119298__340.png",
    image:
      "https://cdn.pixabay.com/photo/2015/09/02/12/25/basket-918416_960_720.jpg",
  });
});

workbox.core.skipWaiting();
workbox.core.clientsClaim();

workbox.precaching.precacheAndRoute(self.__precacheManifest);

// const precacheController = new PrecacheController();
// precacheController.addToCacheList([
//   {url: '/public/index.html', revision: null},
//   {url: '/public/logo192.png', revision: null},
//   {url: '/scripts/start.js', revision: null},

// ]);

workbox.precaching.precacheAndRoute([
  { url: "/src/logo.svg", revision: null },
  { url: "/scripts/test.js", revision: null },
]);

workbox.routing.registerRoute(
  new RegExp("https://api.exchangeratesapi.io/latest"),
  new workbox.strategies.CacheFirst({
    cacheName: "currencies",
    plugins: [
      new workbox.expiration.Plugin({
        maxAgeSeconds: 10 * 60,
      }),
    ],
  })
);

workbox.precaching.cleanupOutdatedCaches();
