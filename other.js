window.addEventListener('DOMContentLoaded', ()=>{
  if('serviceWorker' in navigator){
    navigator.serviceWorker.register('sw.js', { scope: "/" })
      .then(() => {

      })
      .catch((err)=>{
        console.warn(err);
      });
  }
});

const db = new Dexie("post_cache");

  db.version(1).stores({
    post_cache: 'cid, postContent, title, name||alias, timestamp'
  });

document.addEventListener('click', (e)=>{
  if(e.target.classList.contains('blogPublish')){

    (async ()=>{
      const postContent = document.querySelector('.blogInput').value;
      const node = await Ipfs.create();
      //Publish to IPFS
      const results = await node.add(postContent);
      const cid = results.path;

      //Save Locally
      const saveToIndexedDB = await db.post_cache.add({
    		cid: cid,
    		postContent: postContent,
    		timestamp: Date.now()
    	});

      console.log('CID created via ipfs.add:', cid);
      const data = await node.cat(cid);
      console.log(data);

      console.log('Data read back via ipfs.cat:', new TextDecoder().decode(data));
    })();
  }
});
