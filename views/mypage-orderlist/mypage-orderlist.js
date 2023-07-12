import { getApi, putApi, deleteApi } from "../api.js";

const orderlistContainer = document.querySelector("#orderlistContainer");

addAllEvents();
insertOrders();
fetchOrderData();

async function fetchOrderData() {
  try {
    const orderData = await getApi("/api/order/data");
    const orderNumberElement = document.querySelector(".order-number");
    const orderStatus = document.querySelector(".order-status");

    orderNumberElement.textContent = orderData.orderNumber;
    orderStatus.textContent = orderData.orderStatus;
  } catch (error) {
    console.error("Error fetching order data:", error);
  }
}

function addAllEvents() {
  orderlistContainer.addEventListener("click", handleOrderListClick);
}

async function insertOrders() {
  try {
    const orders = await getApi("/api/orderlist");

    for (const order of orders) {
      const { _id, productName, productSize, quantity, productPrice, productStatus } = order;

      orderlistContainer.insertAdjacentHTML(
        "beforeend",
        `
        <li class="order-list" data-order-id="${_id}">
          <div class="order-list-img"></div>
          <div class="order-list-box">
            <div class="order-list-info">
              <p class="product-name">${productName}</p>
              <p class="product-size">${productSize}</p>
              <button class="minus-quantity"><i class="fa-regular fa-circle-minus"></i></button>
              <p class="product-quantity">${quantity}</p>
              <button class="plus-quantity"><i class="fa-solid fa-circle-plus"></i></button>
              <p class="product-price">${productPrice}원</p>
            </div>
            <p class="product-status">${productStatus}</p>
          </div>
        </li>
      `
      );
    }
  } catch (error) {
    console.error("Error inserting orders:", error);
  }
}

function handleOrderListClick(event) {
  const target = event.target;

  if (target.classList.contains("minus-quantity")) {
    const quantityElement = target.nextElementSibling;
    const quantity = parseInt(quantityElement.textContent);

    if (quantity > 1) {
      quantityElement.textContent = quantity - 1;
    }
  } else if (target.classList.contains("plus-quantity")) {
    const quantityElement = target.previousElementSibling;
    const quantity = parseInt(quantityElement.textContent);

    quantityElement.textContent = quantity + 1;
  } else if (target.classList.contains("edit-button")) {
    const orderListItem = target.closest(".order-list");
    const orderId = orderListItem.dataset.orderId;
    const quantityElement = orderListItem.querySelector(".product-quantity");
    const newQuantity = parseInt(quantityElement.textContent);

    // Send a request to update the quantity
    updateOrderQuantity(orderId, newQuantity);
  } else if (target.classList.contains("delete-button")) {
    const orderListItem = target.closest(".order-list");
    const orderId = orderListItem.dataset.orderId;
    const confirmation = confirm("주문을 취소하시겠습니까?");

    if (confirmation) {
      // Send a request to delete the order
      deleteOrder(orderId);
    }
  }
}

async function updateOrderQuantity(orderId, newQuantity) {
  try {
    const data = { quantity: newQuantity };
    await putApi(`/api/orders/${orderId}`, data);

    alert("수량이 업데이트되었습니다.");
  } catch (error) {
    console.error("Error updating quantity:", error);
    alert("수량을 업데이트하는 중에 오류가 발생했습니다. 다시 시도해주세요.");
  }
}

async function deleteOrder(orderId) {
  try {
    await deleteApi(`/api/orders/${orderId}`);
    alert("주문이 취소되었습니다.");

    const orderListItem = orderlistContainer.querySelector(`[data-order-id="${orderId}"]`);
    orderListItem.remove();
  } catch (error) {
    console.error("Error deleting order:", error);
    alert("주문을 취소하는 중에 오류가 발생했습니다. 다시 시도해주세요.");
  }
}
