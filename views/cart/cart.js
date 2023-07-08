// 장바구니 리스트 렌더

// 사용자의 이름 가져옴

// 주문하기
// - 1. 로컬스토리지로 담은 장바구니 물건 품목을 서버에 post
// - 2. 주문 완료 페이지로 이동

// const orderButton = document.querySelector(".nav_order_button");
// orderButton.addEventListener("click", orderProducts);

// function orderProducts() {
//   // 로컬스토리지에서 데이터 가져오기
//   let data = localStorage.getItem("cart");
//   console.log(data);

//   // 로컬스토리지에 담은 데이터를 API 통신으로 서버에 보냄
//   //   const dataToSend = { key: data };
//   //   const requestOptions = {
//   //     method: "POST",
//   //     headers: { "Content-Type": "application/json" },
//   //     body: JSON.stringify(dataToSend),
//   //   };

//   //   // 서버에 데이터 전송
//   //   fetch("url", requestOptions)
//   //     .then(function (response) {
//   //       // 서버 응답 처리
//   //        // 주문완료로 이동
//   //        window.location.href = `/cart/order/complete/:orderId`;

//   //     })
//   //     .catch(function (error) {
//   //       console.log(error);
//   //     });
// }

// 로컬스토리지에서 장바구니 데이터 가져오기
function getCartItems() {
  let cartItems = localStorage.getItem("cart");
  // console.log(cartItems);
  return cartItems ? JSON.parse(cartItems) : [];
}

// 로컬스토리지에 장바구니 데이터 저장하기
function saveCartItems(items) {
  localStorage.setItem("cartItems", JSON.stringify(items));
}

// 장바구니에서 상품 제거
function removeFromCart(productId) {
  let cartItems = getCartItems();

  // 해당 상품을 장바구니에서 제거
  cartItems = cartItems.filter(function (item) {
    return item.id !== productId;
  });

  saveCartItems(cartItems);
  renderCartItems();
}

// 장바구니 비우기
function clearCart() {
  localStorage.removeItem("cartItems");
  renderCartItems();
}

// 수량 증가
function increaseQuantity(productId) {
  let cartItems = getCartItems();

  let item = cartItems.find(function (item) {
    return item.id === productId;
  });

  if (item) {
    console.log("수량증가", item);
    parseInt(item.quantity) + 1;
    console.log("타입검사" + typeof item.quantity);
    console.log(parseInt(item.quantity) + 1);
    saveCartItems(cartItems);
    renderCartItems();
  }
}

// 수량 감소
function decreaseQuantity(productId) {
  let cartItems = getCartItems();

  let item = cartItems.find(function (item) {
    return item.id === productId;
  });

  if (item) {
    if (item.quantity > 1) {
      parseInt(item.quantity) - 1;
      console.log("타입검사" + typeof item.quantity);
      console.log(item.quantity);
      saveCartItems(cartItems);
      renderCartItems();
    }
  }
}

// 장바구니 아이템 렌더링
function renderCartItems() {
  let cartItems = getCartItems();
  let cartElement = document.getElementById("orderInfo");

  // 상품 리스트를 초기화
  cartElement.innerHTML = "";

  if (cartItems.length === 0) {
    // 장바구니가 비어있는 경우
    cartElement.innerHTML =
      '<p class="empty_cart">장바구니가 비어있습니다.</p>';
  } else {
    cartItems.forEach(function (item) {
      let listItem = document.createElement("li");
      listItem.classList.add("order_product_list");

      let productImage = document.createElement("div");
      productImage.classList.add("order_product_img");
      listItem.appendChild(productImage);

      let infoBox = document.createElement("div");
      infoBox.classList.add("order_info_box");

      let infoTop = document.createElement("div");
      infoTop.classList.add("order_info_top");

      let productInfo = document.createElement("div");
      productInfo.classList.add("order_product_info");

      let productNameElement = document.createElement("p");
      productNameElement.classList.add("product_name");
      productNameElement.textContent = item.name;
      productInfo.appendChild(productNameElement);

      let productSizeElement = document.createElement("p");
      productSizeElement.classList.add("product_size");
      productSizeElement.textContent = "Size: " + item.size; // 상품 크기
      productInfo.appendChild(productSizeElement);

      let productPriceElement = document.createElement("p");
      productPriceElement.classList.add("product_price");
      productPriceElement.textContent = item.price; // 상품 가격
      productInfo.appendChild(productPriceElement);

      let editCountBox = document.createElement("div");
      editCountBox.classList.add("order_product_edit_count");

      let removeButton = document.createElement("button");
      removeButton.classList.add("product_remove");
      removeButton.addEventListener("click", function () {
        removeFromCart(item.id);
      });
      let removeIcon = document.createElement("span");
      removeIcon.classList.add("material-symbols-outlined");
      removeIcon.textContent = " remove ";
      removeButton.appendChild(removeIcon);
      editCountBox.appendChild(removeButton);

      let quantityElement = document.createElement("p");
      quantityElement.classList.add("product_num");
      quantityElement.textContent = item.quantity;
      editCountBox.appendChild(quantityElement);

      let addButton = document.createElement("button");
      addButton.classList.add("product_remove");
      addButton.addEventListener("click", function () {
        increaseQuantity(item.id);
      });
      let addIcon = document.createElement("span");
      addIcon.classList.add("material-symbols-outlined");
      addIcon.textContent = " add ";
      addButton.appendChild(addIcon);
      editCountBox.appendChild(addButton);

      infoTop.appendChild(productInfo);
      infoTop.appendChild(editCountBox);
      infoBox.appendChild(infoTop);

      listItem.appendChild(infoBox);
      cartElement.appendChild(listItem);
    });
  }
}

function init() {
  renderCartItems();
}

init();
