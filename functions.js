/*  eslint quotes: ["error", "backtick"]  */
/*  eslint-env es6  */
const ipfsInt = new Interface();

function Interface () {
  let db, node;
  const options = {inps: { online: `true`}};
  /* {
    repo: `ok` + Math.random(), // random so we get a new peerid every time, useful for testing
    config: {
      Addresses: {
        Swarm: [
          `/dns4/star.thedisco.zone/tcp/9090/wss/p2p-webrtc-star`,
          `/dns6/star.thedisco.zone/tcp/9090/wss/p2p-webrtc-star`
        ]
      }
    }
  }; */

  this.node = () => {
    return node;
  };

  async function createDirectoryStucture () {
    const dirs = [`/content`, `/content/chat`, `/content/posts`];
    const p = [];
    for (var i = 0; i < dirs.length; i++) {

      p.push(node.files.mkdir(dirs[i]));
      if (i === dirs.lenght - 1) {
        return Promise.all(p);
      }
    }
  }

  this.init = async () => {
    const promise = new Promise((resolve, reject) => {
      Ipfs.create(options).then((n) => {
        console.log(`IPFS node set`);
        node = n;
        //createDirectoryStucture();
        resolve();
      });
      db = new Dexie(`post_cache`);
      db.version(1).stores({
        post_cache: `cid, postContent,timestamp`
      });
    });
    return promise;
  };

  this.add = (content) => {
    return add(content, `test`);
  };

  // add automaticaly pins things locally.
  async function add (content, title) {
    // const results = await node.files.write(`/content/posts/${title}`, new TextEncoder().encode(content), { create: true });
    // const msg = new TextEncoder().encode(content);
    // const results = await node.pubsub.publish(title, msg);
    const results = await node.add(content);
    console.log(results);
    return results;
  }

  this.publish = (cid) => {
    return publish(cid);
  };

  /**
    * @function publish
    * @param cid - A cid hash for mutable content.
    * @description - Calls the publish method of the name object on the IPFS node
    * @returns - A resolved promise containint the original hash and a new IPNS hash
    * analgous to and address. https://github.com/ipfs/js-ipfs/blob/master/docs/core-api/NAME.md#ipfsnamepublishvalue-options
    */
  function publish (cid) {
    const promise = new Promise((resolve, reject) => {
      (async () => {
        const pub = await node.name.publish(`/ipfs/${cid.path}`, { allowOffline: true, resolve: false, lifetime: '2h' });
        console.log(pub);
        resolve(pub);
      })();
    });
    return promise;
  }

  this.saveLocally = (content, cid) => {
    return saveToIndexedDB(content, cid);
  };

  async function saveToIndexedDB (content, cid) {
    await db.post_cache.add({
      cid: cid,
      postContent: content,
      timestamp: Date.now()
    });
    const exists = await db.post_cache.where(`cid`).equals(cid);
    if (exists) {
      await db.post_cache.update(cid, {
        postContent: content,
        timestamp: Date.now()
      });
    } else {
    }
  }

  this.fetchAllLocalContent = () => {
    return fetchTable(`post_cache`);
  };

  function fetchTable (table) {
    const promise = new Promise((resolve, reject) => {
      db[table].toArray().then((t) => {
        resolve(t);
      });
    });
    return promise;
  }

  /**
    * @description When your node goes offline, the network can forget content
    * (garbage collect unpinned content), this method by reading the content
    * stored locally ensures it's re-added to the network. It can take some time
    * (up to 10 min) for the content to be indexed on other nodes.
    */
  this.reUpLocalContent = (table) => {
    return reUpLocal(table);
  };

  async function reUpLocal (table) {
    if (!table) { return; }
    console.log(table);
    table.forEach((item, i) => {
      read(item.cid);
    });
  }

  this.read = (cid) => {
    return read(cid);
  };

  async function read (cid) {
    let data = ``;
    try {
      const stream = await node.cat(cid);
      for await (const chunk of stream) {
        data += chunk.toString();
      }
      return data;
    } catch (e) {
      console.log(e);
    }
  }
  return this;
}
