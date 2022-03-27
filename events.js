/*  eslint quotes: ["error", "backtick"]  */
/*  eslint-env es6  */

window.addEventListener(`DOMContentLoaded`, () => {
  if (`serviceWorker` in navigator) {
    navigator.serviceWorker.register(`sw.js`, { scope: `/` })
      .then(() => {

      })
      .catch((err) => {
        console.warn(err);
      });
  }
  (async () => {
    await ipfsInt.init();
    const posts = await ipfsInt.fetchAllLocalContent();
    ipfsInt.reUpLocalContent(posts);
    addPostsAndLinks(posts);
  })();
});

async function saveMenuPage () {
  const menu = new XMLSerializer().serializeToString(document.doctype) + document.getElementsByTagName('html')[0].outerHTML;
  const cid = await ipfsInt.add(menu);
}

async function invite (peer) {
  //  create Common Doc
  const postContent = document.querySelector(`.blogInput`).value;
  /* encrypt, then share key doc exists publicly on IPFS, but can only be seen
  (easily) with the encryption key
  */
  const enc = await SubtleCrypto.encrypt(postContent);
}

document.addEventListener(`click`, (e) => {
  if (e.target.classList.contains(`blogPublish`)) {
    (async () => {
      const postContent = document.querySelector(`.blogInput`).value;
      //  Publish to IPFS
      const cid = await ipfsInt.add(postContent);
      console.log(cid);
      // for mutable content:
      //const publish = await ipfsInt.publish(cid);
      //console.log('publish');
      //console.log(publish);
      ipfsInt.saveLocally(postContent, cid.path);
      const readBack = await ipfsInt.read(cid);
      const posts = await ipfsInt.fetchAllLocalContent();
      addPostsAndLinks(posts);
      saveMenuPage();
      console.log(`Data read back from IPFS ${readBack}`);
    })();
  }
});
