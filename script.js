const btn1 = document.getElementById('btn1');
const btn2 = document.getElementById('btn2');
const btn3 = document.getElementById('btn3');
const btn4 = document.getElementById('btn4');

const contentDiv = document.getElementById('content');

/**
 * @param {string} src 
 */
function displayContent(src) {

  contentDiv.innerHTML = '';


  const iframe = document.createElement('iframe');
  iframe.src = src;

  iframe.style.width = '100%';
  iframe.style.border = 'none'; 
  iframe.style.backgroundColor = '#f9f9f9';
  iframe.style.borderRadius = '10px';
  iframe.style.display = 'block'; 


  iframe.onload = function() {
    try {

      const contentHeight = iframe.contentWindow.document.body.scrollHeight;
      
      iframe.style.height = contentHeight + 'px';
    } catch (e) {
      console.error("Could not access iframe content. Make sure all files are served from the same origin.", e);
      // Fallback height in case of security errors
      iframe.style.height = '80vh';
    }
  };
  

  contentDiv.appendChild(iframe);
}


btn1.addEventListener('click', () => {
  displayContent('index.html');
});

btn2.addEventListener('click', () => {
  displayContent('index2.html');
});

btn3.addEventListener('click', () => {
  displayContent('indexprob3.html');
});

btn4.addEventListener('click', () => {
  displayContent('qprob5.html');
});
