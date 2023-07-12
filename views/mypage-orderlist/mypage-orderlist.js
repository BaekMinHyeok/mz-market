import { getApi, putApi, deleteApi } from "http://localhost:3000/api.js";


const orderList = document.querySelector(".orderlist");

document.addEventListener("DOMContentLoaded", async function () {
  try {
    const result = await getApi("http://localhost:3000/api/order/email");
    console.log(result);
    result.products.forEach((data) => {
      console.log(data);
      const newOrderlist = document.createElement("li");

      newOrderlist.innerHTML = `
        <li class="order-list">
          <div class="order-list-img"></div>
          <div class="order-list-box">
            <div class="order-list-info">
              <p class="product-name">${data.name}</p>
              <p class="product-size">${data.size}</p>
              <button class="minus-quantity">
                <i class="fa-regular fa-circle-minus"></i>
              </button>
               ${data.name}
              <button class="plus-quantity">
                <i class="fa-solid fa-circle-plus"></i>
              </button>
              <p class="product-status">${data.price}</p>
            </div>
          </div>
          <button class="edit-button">수정하기</button>
          <button class="delete-button">삭제하기</button>
        </li>
      `;

      //수량 추가,감소 버튼과 수정하기 및 취소하기 버튼
      const minusQuantityButton = newOrderlist.querySelector(".minus-quantity");
      const plusQuantityButton = newOrderlist.querySelector(".plus-quantity");
      const editButton = newOrderlist.querySelector(".edit-button");
      const deleteButton = newOrderlist.querySelector(".delete-button");

      // minusQuantityButton.addEventListener("click", () => {
      //   decreaseQuantity(data.);
      // });

      // plusQuantityButton.addEventListener("click", () => {
      //   increaseQuantity(data.);
      // });

      // editButton.addEventListener("click", () => {
      //   sendQuantityUpdateRequest(data.id, data..innerText);
      // });

      // deleteButton.addEventListener("click", () => {
      //   deleteOrder(newOrderlist);
      // });

      orderList.appendChild(newOrderlist);
    });
  } catch (error) {
    console.error("Failed to fetch order data:", error);
  }
});

// function decreaseQuantity(data.) {
//   let quantity = parseInt(data..innerText);
//   if (quantity > 1) {
//     quantity--;
//     data..innerText = quantity;
//   }
// }

// function increaseQuantity(data.) {
//   let quantity = parseInt(data..innerText);
//   quantity++;
//   data..innerText = quantity;
// }

// async function sendQuantityUpdateRequest(orderId, quantity) {
//   try {
//     const response = await putApi(`http://localhost:3000/api/order/:orderId`, {
//       quantity: parseInt(quantity)
//     });
//     if (response) {
//       alert("Quantity updated successfully.");
//     } else {
//       alert("Failed to update quantity.");
//     }
//   } catch (error) {
//     alert("Failed to update quantity:", error);
//   }
// }

// async function deleteOrder(orderElement) {
//   const confirmation = confirm("주문을 삭제하시겠습니까?");
//   if (confirmation) {
//     try {
//       const orderId = orderElement.dataset.orderId; 
//       await deleteApi(`http://localhost:3000/api/order/:orderId`);
//       orderElement.remove();
//       alert("주문이 삭제되었습니다.");
//     } catch (error) {
//       console.error("Failed to delete the order:", error);
//     }
//   }
// }
