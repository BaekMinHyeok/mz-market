import {
  getApi,
  putApi,
  deleteApi,
} from "http://kdt-sw-5-team11.elicecoding.com/api.js";
import {
  getApi,
  putApi,
  deleteApi,
} from "http://kdt-sw-5-team11.elicecoding.com/api.js";

const orderList = document.querySelector("#orderlistContainer");
document.addEventListener("DOMContentLoaded", async function () {
  try {
    const result = await getApi(
      "http://kdt-sw-5-team11.elicecoding.com/api/order/user"
    );
    const result = await getApi(
      "http://kdt-sw-5-team11.elicecoding.com/api/order/user"
    );
    // console.log(result);
    if (result.success) {
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

        data.productInfo.forEach(async (product) => {
          newOrderlist.innerHTML += `
        <ul class="orderlist">
        <li class="order-list">
          <div class="order-list-img"><img src="" /></div>
          <div class="order-list-box">
            <div class="order-list-info">
              <p class="product-name">${product.productName}</p>
              <p class="product-size">${product.productColor}/${product.productSize}</p>
              <button class="minus-quantity">
                <i class="fa-regular fa-circle-minus"></i>
              </button>
              <p class="product-price">${product.productCount}개</p>
              <button class="plus-quantity">
                <i class="fa-solid fa-circle-plus"></i>
              </button>
              <p class="product-status">${product.productPrice}원</p>
            </div>
          </div>
        </li>
        </ul>
        `;
        });

        orderList.appendChild(newOrderlist);
        //수량 추가,감소 버튼과 수정하기 및 취소하기 버튼
        const minusQuantityButtons =
          newOrderlist.querySelectorAll(".minus-quantity");
        const plusQuantityButtons =
          newOrderlist.querySelectorAll(".plus-quantity");
        const editButton = newOrderlist.querySelector(".edit-button");
        const deleteButton = newOrderlist.querySelector(".delete-button");

        minusQuantityButtons.forEach((button) => {
          button.addEventListener("click", () => {
            if (data.status === "ready") {
              decreaseQuantity(button.nextElementSibling);
            }
          });
        });

        plusQuantityButtons.forEach((button) => {
          button.addEventListener("click", () => {
            if (data.status === "ready") {
              increaseQuantity(button.previousElementSibling);
            }
          });
        });

        editButton.addEventListener("click", async () => {
          if (data.status === "ready") {
            const orderId = data.orderId;
            const quantityElement =
              newOrderlist.querySelector(".product-price");
            const quantity = parseInt(quantityElement.innerText);
            await sendQuantityUpdateRequest(orderId, quantity);
            quantityElement.innerText = quantity.toString();
          }
        });

        deleteButton.addEventListener("click", () => {
          deleteOrder(newOrderlist);
        });
      });
    } else {
      const notFindOrder = document.createElement("div");
      notFindOrder.innerHTML = `
      <h2>주문 하신 상품 목록이 없습니다.</h2>
      `;
      orderList.appendChild(notFindOrder);
    }
  } catch (error) {
    console.error("Failed to fetch order data:", error);
  }
});

function decreaseQuantity(quantityElement) {
  let quantity = parseInt(quantityElement.innerText);
  if (quantity > 1) {
    quantity--;
    quantityElement.innerText = quantity.toString();
  }
}

function increaseQuantity(quantityElement) {
  let quantity = parseInt(quantityElement.innerText);
  quantity++;
  quantityElement.innerText = quantity.toString();
}

async function sendQuantityUpdateRequest(orderId, quantity) {
  try {
    const response = await putApi(
      `http://kdt-sw-5-team11.elicecoding.com/api/order/:orderId`,
      {
        quantity: quantity,
      }
    );
    const response = await putApi(
      `http://kdt-sw-5-team11.elicecoding.com/api/order/:orderId`,
      {
        quantity: quantity,
      }
    );
    if (response) {
      alert("Quantity updated successfully.");
    } else {
      alert("Failed to update quantity.");
    }
  } catch (error) {
    alert("Failed to update quantity:", error);
  }
}

async function deleteOrder(orderElement) {
  const confirmation = confirm("주문을 삭제하시겠습니까?");
  if (confirmation) {
    try {
      const orderId = orderElement.querySelector(".order-number").innerText;
      await deleteApi(
        `http://kdt-sw-5-team11.elicecoding.com/api/order/:orderId`
      );
      await deleteApi(
        `http://kdt-sw-5-team11.elicecoding.com/api/order/:orderId`
      );
      orderElement.remove();
      alert("주문이 삭제되었습니다.");
    } catch (error) {
      console.error("Failed to delete the order:", error);
    }
  }
}
