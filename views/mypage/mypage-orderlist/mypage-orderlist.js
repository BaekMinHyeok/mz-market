import * as Api from "../../api.js";

const orderlistContainer = document.querySelector("#orderlistContainer");
const modal = document.querySelector("#modal");
const modalBackground = document.querySelector("#modalBackground");
const modalCloseButton = document.querySelector("#modalCloseButton");
const deleteCompleteButton = document.querySelector("#deleteCompleteButton");
const deleteCancelButton = document.querySelector("#deleteCancelButton");

addAllEvents();
insertOrders();
fetchOrderData();

async function fetchOrderData() {
  try {
    const orderData = await Api.getApi("/api/order/data");

    const orderNumberElement = document.querySelector(".order-number");
    const orderDateElement = document.querySelector(".order-date");

    orderNumberElement.textContent = orderData.orderNumber;
    orderDateElement.textContent = orderData.orderDate;
  } catch (error) {
    console.error("Error fetching order data:", error);
  }
}

function addAllEvents() {
  modalBackground.addEventListener("click", closeModal);
  modalCloseButton.addEventListener("click", closeModal);
  document.addEventListener("keydown", keyDownCloseModal);
  deleteCompleteButton.addEventListener("click", deleteOrderData);
  deleteCancelButton.addEventListener("click", cancelDelete);
}

let orderIdToDelete;

async function insertOrders() {
  try {
    const orders = await Api.getApi("/api/orderlist");

    const summary = {
      ordersCount: 0,
      prepareCount: 0,
      deliveryCount: 0,
      completeCount: 0,
    };

    for (const order of orders) {
      const { _id, totalPrice, createdAt, summaryTitle, status } = order;
      const date = createdAt.split("T")[0];

      summary.ordersCount += 1;

      if (status === "Product being prepared") {
        summary.prepareCount += 1;
      } else if (status === "Item shipping") {
        summary.deliveryCount += 1;
      } else if (status === "Shipped") {
        summary.completeCount += 1;
      }

      let statusText = "";

      if (status === "Product being prepared") {
        statusText = "배송 준비 중입니다";
      } else if (status === "Item shipping") {
        statusText = "배송 중";
      } else if (status === "Shipped") {
        statusText = "배송완료";
      }

      orderlistContainer.insertAdjacentHTML(
        "beforeend",
        `
        <div class="columns orders-item" id="order-${_id}">
          <div class="column is-2">${date}</div>
          <div class="column is-4 order-summary">${summaryTitle}</div>
          <div class="column is-2">${addCommas(totalPrice)}</div>
          <div class="column is-2">
            <div class="select">
              <select id="statusSelectBox-${_id}">
                <option
                  class="has-background-danger-light has-text-danger"
                  ${status === "Product being prepared" ? "selected" : ""}
                  value="product in preparation"
                >
                  Preparing product
                </option>
                <option
                  class="has-background-primary-light has-text-primary"
                  ${status === "Item in transit" ? "selected" : ""}
                  value="product in transit"
                >
                  Product in delivery
                </option>
                <option
                  class="has-background-grey-light"
                  ${status === "Shipped" ? "selected" : ""}
                  value="delivered"
                >
                  Delivery completed
                </option>
              </select>
            </div>
          </div>
          <div class="column is-2">
            <p class="product-status">${statusText}</p>
          </div>
          <div class="column is-2">
            ${
              status === "Product being prepared" || status === "Item shipping"
                ? `
                  <button class="button edit-button">수정하기</button>
                  <button class="button delete-button">삭제하기</button>
                `
                : ""
            }
          </div>
        </div>
      `
      );

      const statusSelectBox = document.querySelector(`#statusSelectBox-${_id}`);
      const deleteButton = document.querySelector(`#deleteButton-${_id}`);

      const index = statusSelectBox.selectedIndex;
      statusSelectBox.className = statusSelectBox[index].className;

      statusSelectBox.addEventListener("change", async () => {
        const newStatus = statusSelectBox.value;
        const data = { status: newStatus };

        const index = statusSelectBox.selectedIndex;
        statusSelectBox.className = statusSelectBox[index].className;

        await Api.putApi(`/api/orders/${_id}`, data);
      });

      if (status === "Product being prepared" || status === "Item shipping") {
        const editButton = document.querySelector(`#editButton-${_id}`);
        const deleteButton = document.querySelector(`#deleteButton-${_id}`);

        editButton.addEventListener("click", async () => {
          const newQuantity = prompt("Enter the new quantity:");
          if (newQuantity !== null && newQuantity !== "") {
            try {
              const data = {
                quantity: parseInt(newQuantity), 
              };
              const response = await Api.putApi(`/api/orders/${_id}`, data);
              if (response.success) {
                const quantityElement = document.querySelector(`#quantity-${_id}`);
                quantityElement.textContent = newQuantity;
              } else {
                console.error("Failed to update quantity:", response.error);
                alert("Failed to update quantity. Please try again.");
              }
            } catch (error) {
              console.error("Error updating quantity:", error);
              alert("An error occurred while updating quantity. Please try again.");
            }
          }
        });
        

        deleteButton.addEventListener("click", () => {
          orderIdToDelete = _id;
          openModal();
        });
      }
    }

    const ordersCount = document.querySelector("#ordersCount");
    const prepareCount = document.querySelector("#prepareCount");
    const deliveryCount = document.querySelector("#deliveryCount");
    const completeCount = document.querySelector("#completeCount");

    ordersCount.innerText = addCommas(summary.ordersCount);
    prepareCount.innerText = addCommas(summary.prepareCount);
    deliveryCount.innerText = addCommas(summary.deliveryCount);
    completeCount.innerText = addCommas(summary.completeCount);
  } catch (error) {
    console.error("Error inserting orders:", error);
  }
}

async function deleteOrderData(e) {
  e.preventDefault();

  try {
    await Api.deleteApi(`/api/orders/${orderIdToDelete}`);

    alert("주문하신 물품이 취소되었습니다.");

    const deletedItem = document.querySelector(`#order-${orderIdToDelete}`);
    deletedItem.remove();

    orderIdToDelete = "";

    closeModal();
  } catch (error) {
    console.error("주문 취소 에러:", error);
    alert(`주문 취소 중 에러가 발생하였습니다.: ${error}`);
  }
}

function cancelDelete() {
  orderIdToDelete = "";
  closeModal();
}

function openModal() {
  modal.classList.add("is-active");
}

function closeModal() {
  modal.classList.remove("is-active");
}

function keyDownCloseModal(e) {
  if (e.keyCode === 27) {
    closeModal();
  }
}

function addCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function init() {
  fetchOrderData();
}

init();
