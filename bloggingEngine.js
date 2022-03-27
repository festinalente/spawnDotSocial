window.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    // make new paragraph
    console.log('new p');
    makeEditableTextField('p', undefined, undefined);
  }
  if (e.key === '1' && e.altKey && e.ctrlKey) {
    console.log('new h1');
    makeEditableTextField('h1', undefined, undefined);
  }
  if(e.key === '2' && e.altKey && e.ctrlKey){
    console.log('new h2');
  }
  if(e.key === '3' && e.altKey && e.ctrlKey){
    console.log('new h3');
  }
  if(e.key === '4' && e.altKey && e.ctrlKey){
    console.log('new h4');
  }
  if(e.key === '5' && e.altKey && e.ctrlKey){
    console.log('new h5');
  }
  if(e.key === '6' && e.altKey && e.ctrlKey){
    console.log('new h6');
  }
  if(e.key === 'b' && e.ctrlKey){
    console.log('new bold text');
  }
  if(e.key === 'i' && e.ctrlKey){
    console.log('new italic text');
  }
  if(e.key === 'u' && e.ctrlKey){
    console.log('new underlined text');
  }
});

function makeEditableTextField(elementType, textContent, parentElement){
  let mainContent = document.querySelector('.content');
  let container = document.createElement('div');
      container.style.display = 'flex';

  let el = document.createElement(elementType);
      el.setAttribute('contentEditable', true);
      el.classList.add('fieldEditable', 'fieldEditableUp');
      el.textContent = textContent || 'Your text';
  //container.appendChild(el);
  //document.querySelector(parentElement).appendChild(container);
  mainContent.appendChild(el);
}
