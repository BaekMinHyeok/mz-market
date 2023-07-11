document.addEventListener("DOMContentLoaded", async function () {
    // 여기에 await를 사용하여 비동기 코드를 작성할 수 있습니다.
    // ...
  });












//삭제버튼 클릭시
const deleteBtn = document.querySelector("#deleteBtn");

deleteBtn.addEventListener("click",function(){
    const trElement = this.parentNode.parentNode;
    trElement.remove();
});