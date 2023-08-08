const CACHE_NAME = "version1";
const urlsToCache = ['/'
];
const self = this;
//install

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("cache opend");

      return cache.addAll(urlsToCache);
    })
  );  
});

//listen
self.addEventListener("fetch", (e) => {
  console.log(e.request);
  console.log(caches);
    if(!navigator.onLine){
        e.respondWith(
            caches.match(e.request).then((res)=>{
                console.log(res, "res");
                if(res) return res || fetch(event.request);
            })
        )
    }
});

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
