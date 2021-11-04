self.addEventListener('install', evt =>{
  evt.waitUntil(
    caches.open('v1').then((cache) => {
      return cache.addAll([
        '/manifest.json',
        '/home.html',
        '/dexie.js'
      ]);
    })
  );
});

self.addEventListener('fetch', event =>{
    event.respondWith(
      (async ()=>{
        //open cache:
        let openCache = await caches.open('v1');
        //find match in cache:
        let cacheMatch = await openCache.match(event.request);

        if(cacheMatch){
          //fetch new if possible:
          fetchNew(event);
          return cacheMatch;
        }
        else{
          //networkFetch === network response
          let networkFetch = await fetch(event.request);
          let cacheNetworkFetch = await openCache.put(event.request.url, networkFetch.clone());
          return networkFetch;
        }
      }
     )()
   );
});

function fetchNew(event){
 (async ()=>{
   try {
     let openCache = await caches.open('v1');
     let networkFetch = await fetch(event.request);
     if(networkFetch){
       let cacheNetworkFetch = await openCache.put(event.request.url, networkFetch.clone());
     }else{
       console.warn('Network fetch failed, device is possibly offline');
     }
   } catch (e) {
     console.warn('Offline');
     return;
   }
 }
)()
}
