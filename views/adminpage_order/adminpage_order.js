import fetchData from "./order_getdata.js";
import deleteData from "./order_deletedata.js";
import ModifyData from "./order_Modify.js";
document.addEventListener("DOMContentLoaded", async function () {
  try {
    //주문 조회
    const result = await fetchData();
    //주문 수정
    const selectElement = document.querySelectorAll("#shipping");
    selectElement.forEach((select, index) => {
      select.addEventListener("change", async function (event) {
        const status = selectElement[index].value;
        await ModifyData(status);
      });
    });
    //삭제 기능
    const deleteBtn = document.querySelectorAll(".delete-btn");
    deleteBtn.forEach((button, i) => {
      button.addEventListener("click", async function (event) {
        const orderName = result.orders[i].name;
        const confirmDelete = confirm(
          `${orderName}님 주문을 삭제 하시겠습니까??`
        );
        if (confirmDelete) {
          const orderId = event.target.dataset.orderid;
          // console.log(orderId);
          const trElement = this.parentNode.parentNode;
          trElement.remove();
          await deleteData(orderId);
        }
      });
    });
  } catch (err) {
    // console.log(err);
  }
});
