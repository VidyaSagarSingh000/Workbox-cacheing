console.log('serviceWorker loaded....');

/* eslint-disable no-restricted-globals */

/* eslint-disable no-undef */
    self.addEventListener("push", (e) => {
        const data = e.data.json();
        console.log(e.data)
        console.log("push recieved...");
        self.registration.showNotification(data.title, {
          body: "notified by vidya sagar",
          icon:
            "https://cdn.pixabay.com/photo/2016/01/03/11/24/gear-1119298__340.png",
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
    { url:'/src/logo.svg',revision:null},
    {url:'/scripts/test.js',revision:null}
]);

workbox.routing.registerRoute(
    new RegExp('https://api.exchangeratesapi.io/latest'),
    new workbox.strategies.CacheFirst({
        cacheName:"currencies",
        plugins:[
            new workbox.expiration.Plugin({
                maxAgeSeconds: 10*60
            }),
            
        ]
    })
)

workbox.precaching.cleanupOutdatedCaches()
