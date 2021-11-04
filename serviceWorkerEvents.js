self.addEventListener('install', evt =>{
  evt.waitUntil(
    caches.open('v1').then((cache) => {
      return cache.addAll([
        'home/tomas/tomas/spawnDotSocial/views/manifest.json',
      ]);
    })
  );
});

self.importScripts('/dexie.js');

const db = new Dexie("post_cache");

db.version(1).stores({
  post_cache: 'cid,postContent,timestamp'
});
