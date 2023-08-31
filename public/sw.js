const CACHE_NAME = "version1";
const urlsToCache = ['/'
];
const self = this;
//install

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {;

      return cache.addAll(urlsToCache);
    })
  );  
});

//listen
self.addEventListener("fetch", (e) => {
    if(!navigator.onLine){
        e.respondWith(
            caches.match(e.request).then((res)=>{
                console.log(res, "res");
                if(res) return res || fetch(event.request);
            })
        )
    }
});

self.addEventListener('push', function(e) {
  const data = e.data.json();
  console.log(data);
  self.registration.showNotification(
      data.title,
      {
        icon:'logo192.png',
          body: data.body,
      }
  );
})
//activate
// self.addEventListener("activate", (e) => {
//     const cacheWhitelist = [];
//     cacheWhitelist.push(CACHE_NAME);

//     e.waitUntil(
//         caches.keys().then((cacheNames)=> Promise.all(
//             cacheNames.map((c)=>{
//                 if(!cacheWhitelist.includes(c));
//                 return caches.delete(c)
//             })
//         ))
//     )
// });
