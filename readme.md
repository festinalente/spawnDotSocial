# spawnDotSocial
## A self spawning serverless social webapp.

This is a simple attempt at making a very easy to use app that allows non-technical end-users a serverless, adminless, decentralized method of saving, editing and publishing content.

To run this app just simply serve it (e.g. via nginx on localhost), open it
in a Chromium based browser (e.g. Brave), write something and click publish.

The content you wrote will be retrievable via any browser via an ipfs gateway.
E.g. https://ipfs.io/ipfs/"your content cid here" and will be saved in your browser.  

### How it works

- We have the bones of a "server" built into our browsers, we are able to read and write data, make and serve requests,
- A seed server hosts a PWA that represents an interface, this PWA has no data, it's blank,
- A user "installs" or runs this PWA and can add content/data it,
- Content is saved locally in Indexed.DB which in effect gives access to the full scope of memory of a user's local environment.
- Content is publish to IPFS.

### TODO:

Right now it is just a crumby PWA that publishes text no one can find.

Things that need to be done are designing a routing and indexing system.

**Problems I haven't considered or resolved:**

- Persisting content on the network, if a users content is "pruned", can they pin it locally? Check it's been pruned from the network and resubmit?
- Eventual app design.
