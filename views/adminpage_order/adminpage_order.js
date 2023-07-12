import fetchData from "./order_getdata.js";
import deleteData from "./order_deletedata.js";

document.addEventListener("DOMContentLoaded", async function () {
  //주문 조회
  const result = await fetchData();
  console.log(result);
  
  //삭제 
  const deleteBtn = document.querySelectorAll("#deleteBtn");
  deleteBtn.forEach(ary=>{
    ary.addEventListener("click",async function(){
      const trElement = this.parentNode.parentNode;
      trElement.remove();
      await deleteData()
      });
    })
});

















//삭제버튼 클릭시
