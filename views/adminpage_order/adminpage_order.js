import fetchData from "./order_getdata.js";
import deleteData from "./order_deletedata.js";

document.addEventListener("DOMContentLoaded", async function () {
  //주문 조회
  const orderList = document.querySelector(".orderList");

  try{
    const result = await fetchData();
    result.orders.forEach(data=>{
      console.log(data._id);
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>1</td>
        <td>2번째 칸</td>
        <td>3번째 칸</td>
        <td>4번째 칸</td>
        <td>
          <select id="category" name="category">
            <option value="">배송 준비</option>
            <option value="">배송 진행</option>
            <option value="">배송 완료</option>
          </select>
        </td>
        <td>
          <img src="./imges/img2.png" alt="삭제버튼" class="delete-btn" id="deleteBtn" data-orderid="${data._id}">
        </td>`;
      orderList.appendChild(tr);
    })
// 삭제 
const deleteBtn = document.querySelectorAll(".delete-btn");
deleteBtn.forEach(button => {
  button.addEventListener("click", async function (event) {
    const orderId = event.target.dataset.orderid;
    console.log(orderId);
    const trElement = this.parentNode.parentNode;
    trElement.remove();
    await deleteData(orderId);
  });
});

  }catch(err){
    console.log(err);
  }

});

















//삭제버튼 클릭시
