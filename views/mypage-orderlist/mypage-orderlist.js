import { getApi, putApi, deleteApi } from "http://localhost:3000/api.js";

const orderList = document.querySelector("#orderlistContainer");

document.addEventListener("DOMContentLoaded", async function () {
  try {
    const result = await getApi("http://localhost:3000/api/order/user");
    result.orders.reverse().forEach((data) => {
      const newOrderlist = document.createElement("div");
      newOrderlist.classList.add("order-container");

      let status;
      if (data.status === "ready") status = "배송 준비 중입니다.";
      if (data.status === "shipping") status = "배송이 시작되었습니다.";
      if (data.status === "complete") status = "배송이 완료되었습니다.";

      newOrderlist.innerHTML = `
      <div class="order-info">
        <div>
          <h1 class="order-number">주문 번호: ${data.orderId}</h1>
        </div>
        <div>
          <p class="order-status">${status}</p>
        </div>
        <div class="orderlist-edit">
          ${
            data.status !== "complete"
              ? '<button class="edit-button">수정하기</button>'
              : ""
          }
          ${
            data.status !== "complete"
              ? '<button class="delete-button">취소하기</button>'
              : ""
          }
        </div>
      </div>
      `;

      data.productName.forEach((product) => {
        newOrderlist.innerHTML += `
        <ul class="orderlist">
        <li class="order-list">
          <div class="order-list-img"><img src="" /></div>
          <div class="order-list-box">
            <div class="order-list-info">
              <p class="product-name">${product}</p>
              <p class="product-size">red/xl</p>
              <button class="minus-quantity">
                <i class="fa-regular fa-circle-minus"></i>
              </button>
              <p class="product-price">1</p>
              <button class="plus-quantity">
                <i class="fa-solid fa-circle-plus"></i>
              </button>
              <p class="product-status">10000원</p>
            </div>
          </div>
        </li>
        </ul>
        `;
      });

      orderList.appendChild(newOrderlist);
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
