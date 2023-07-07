const modifyBtn = document.querySelector("#modifyBtn");
const modalContainer = document.querySelector('#adminModalContainer');


// 클릭시 모달창 띄우기 
modifyBtn.addEventListener("click",function(){
  // CSS 파일 가져오기
const cssUrl = 'modal/adminpage_modal.css';
const cssLink = document.createElement('link');
cssLink.rel = 'stylesheet';
cssLink.href = cssUrl;
document.head.appendChild(cssLink);

// HTML 파일 가져오기
fetch('modal/adminpage_modal.html')
  .then(response => response.text())
  .then(html => {
    modalContainer.innerHTML = html;
  })
  .then(() => {
    // JavaScript 파일 가져오기
    const jsUrl = 'modal/adminpage_modal.js';
    const scriptElement = document.createElement('script');
    scriptElement.src = jsUrl;
    document.body.appendChild(scriptElement);
  });

})







