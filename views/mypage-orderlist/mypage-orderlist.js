import { getApi, putApi, deleteApi } from "/api.js";

const orderList = document.querySelector("#orderlistContainer");
document.addEventListener("DOMContentLoaded", async function () {
  try {
    const result = await getApi("/api/order/user");
    console.log("유저주문", result);
    if (result.success) {
      result.orders.reverse().forEach((data) => {
        // console.log("주문내역 데이터", data);
        // const userName = document.querySelector(".user_name");
        // userName.textContent;
        // console.log(data.name);
        const newOrderlist = document.createElement("div");
        newOrderlist.classList.add("order-container");

        let status;
        if (data.status === "ready") status = "배송 준비 중입니다.";
        if (data.status === "shipping") status = "배송이 시작되었습니다.";
        if (data.status === "complete") status = "배송이 완료되었습니다.";

        // const productId = data.productInfo;
        // productId.forEach((data) => console.log("d얍",data.productId));
        // console.log("productId", productId);
        // console.log(data.orderId);

        // const order = data.find((order) => order.orderId === orderId);
        // console.log("오더", order);

        // if (order) {
        //   const productNames = order.productInfo.map(
        //     (product) => product.productName
        //   );
        //   const productCounts = order.productInfo.map(
        //     (product) => product.productCount
        //   );

        //   console.log("주문 ID:", orderId);
        //   console.log("상품명 배열:", productNames);
        //   console.log("상품 수량 배열:", productCounts);
        // }

        newOrderlist.innerHTML = `
      <div class="order-info my_order_info">
      <div class = "order_info_top">
        <div>
          <h1 class="order-number">주문 번호: 
          <span class="order-id">${data.orderId}</span></h1>
        </div>
        <div>
          <p class="order-status">${status}</p>
        </div>
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

        const productId = [];
        const productCount = [];

        data.productInfo.forEach(async (product) => {
          console.log(data.productInfo);
          newOrderlist.innerHTML += `
        <ul class="orderlist">
        <li class="order-list">
          <div class="order-list-img"><img src="${product.productImage}"/></div>
          <div class="order-list-box">
            <div class="order-list-info">
              <p class="product-name">${product.productName}</p>
              <p class="product-size">${product.productSize}</p>
              <div class = "order_bottom_box">
              <div class="quantity_box">
                <button class="minus-quantity">
                <span class="material-symbols-outlined">
                    remove
                  </span>
                </button>
                <p class="product-count">${product.productCount}</p>
                <button class="plus-quantity">
                  <span class="material-symbols-outlined">
                  add
                </span>
                </button>
              </div>
              <p class="product-status">${product.productPrice}원</p>
            </div>
         </div>
         </li>
        </ul>
        `;

          productId.push(product.productId);
          productCount.push(product.productCount);
        });
        // console.log("PRODUCTNAME", productName);
        // console.log("productCount", productCount);

        orderList.appendChild(newOrderlist);

        //수량 추가,감소 버튼과 수정하기 및 취소하기 버튼
        const minusQuantityButtons =
          newOrderlist.querySelectorAll(".minus-quantity");
        const plusQuantityButtons =
          newOrderlist.querySelectorAll(".plus-quantity");
        const editButton = newOrderlist.querySelector(".edit-button");
        const deleteButton = newOrderlist.querySelector(".delete-button");

        minusQuantityButtons.forEach((button, index) => {
          button.addEventListener("click", () => {
            if (data.status === "ready") {
              decreaseQuantity(button.nextElementSibling);
              productCount[index]--;
              console.log(productCount);
            }
          });
        });

        plusQuantityButtons.forEach((button, index) => {
          button.addEventListener("click", () => {
            if (data.status === "ready") {
              increaseQuantity(button.previousElementSibling);
              productCount[index]++;
              console.log(productCount);
            }
          });
        });

        // editButton.addEventListener("click", async () => {
        //   if (data.status === "ready") {
        //     const orderId = data.orderId;
        //     const quantityElement =
        //       newOrderlist.querySelector(".product-count");
        //     const quantity = parseInt(quantityElement.innerText);
        //     const quantities = productCount.map((count) => parseInt(count));
        //     await sendQuantityUpdateRequest(orderId, quantities);
        //     quantityElement.innerText = quantity.toString();
        //   }
        // });

        editButton.addEventListener("click", async () => {
          if (data.status === "ready") {
            console.log("sddddddddddddddddddddd", productCount);
            const orderId = data.orderId;
            const quantityElement =
              newOrderlist.querySelector(".product-count");
            const quantity = parseInt(quantityElement.innerText);

            const productId = [];

            // 여기서 productCount를 수정한 수량으로 가져와서 배열에 넣는 방법을 모르겠습니다.
            data.productInfo.forEach((product) => {
              productId.push(product.productId);
            });

            await sendQuantityUpdateRequest(orderId, productId, productCount);
            quantityElement.innerText = quantity.toString();
          }
        });

        deleteButton.addEventListener("click", () => {
          console.log("삭제요소", newOrderlist);
          deleteOrder(newOrderlist, data.orderId);
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

const token = localStorage.getItem("token");

// 수량 수정
async function sendQuantityUpdateRequest(orderId, productId, productCount) {
  const editData = {
    productId: productId,
    productCount: productCount,
  };

  console.log(
    "수량 수정을 눌렀을 때 상품 이름과 상품 카운트.........",
    editData
  );

  try {
    const response = await fetch(`/api/order/${orderId}`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editData),
    });

    console.log(response);

    if (response.ok) {
      const data = await response.json();
      console.log(data);
    } else {
      throw new Error("API 호출 에러");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// 주문 삭제
async function deleteOrder(orderElement) {
  const confirmation = confirm("주문을 삭제하시겠습니까?");
  // orderId 가 string 이네요.
  // 기존 코드는 "주문 번호: 23" 이런식으로 안에 있는 텍스트 전부를 가져옵니다.
  // order-id span 태그 추가해서 숫자만 가져오게 수정했습니다.

  const orderId = orderElement.querySelector(".order-id").innerText;
  const orderIdToNumber = parseInt(orderId);

  console.log("ORDERID", orderId, "Typeof", typeof orderId);
  console.log(orderIdToNumber, "변환", typeof orderIdToNumber);

  if (confirmation) {
    try {
      // await deleteApi(`/api/order/${orderIdToNumber}`);
      const response = await fetch(`/api/order/${orderIdToNumber}`, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("data ", data);

        if (data.success) {
          orderElement.remove();
          console.log("삭제 Element", orderElement);
          alert("주문이 삭제되었습니다.");
        } else {
          console.log("주문 삭제 실패");
        }
      } else {
        throw new Error("API 호출 에러");
      }
    } catch (error) {
      console.error("ERROR:", error);
    }
  }
}

// Add event listener to the "Edit my info" button
const myInfoButton = document.getElementById("mypage-myinfo");
myInfoButton.addEventListener("click", () => {
  window.location.href = "/user/info";
});
