function addPostsAndLinks( content ) {
  content.forEach((post) => {
    const parent = document.querySelector(`.postsSavedLocally`);
    const p = document.createElement('p');
    parent.appendChild(p);
    const a = document.createElement('a');
    p.appendChild(a);
    a.href = `https://ipfs.io/ipfs/${post.cid}`;
    a.textContent = `Post ${post.cid} is pinned locally`;
  });
}
