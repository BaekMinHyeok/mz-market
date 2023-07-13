// 로컬 스토리지에서 장바구니 데이터 불러오기
let cartData = localStorage.getItem("cart");
let cartItems = [];
cartItems = JSON.parse(cartData);

console.log(cartData);
const noList = document.querySelector(".empty_cart_message");
console.log(noList);

// 장바구니 데이터가 있는 경우 목록 생성
if (cartData) {
  noList.style.display = "none";
  console.log("cartItems", cartItems);

  cartItems.forEach((item) => {
    // 상품 목록 생성
    const listItem = document.createElement("li");
    listItem.classList.add("order_product_list");
    listItem.innerHTML = `
      <div class="order_product_img">
        <img src="${item.productImage}"/>
      </div>
      <div class="order_info_box">
        <div class="order_product_info">
          <div class="order_product_top">
            <p class="product_name">${item.name}</p>
            <div class ="selected_size"><span>Size :  &nbsp;</span><p class="product_size">${item.size}</p></div>
            <p class="product_price">${item.price}</p>
          </div>
          <div class="order_product_edit_count">
              <span class="material-symbols-outlined product_remove"> remove </span>
            <p class="product_num">${item.quantity}</p>
              <span class="material-symbols-outlined product_add"> add </span>
          </div>
        </div>
        <div class="order_info_bottom">
          <button class="order_remove_button">삭제하기</button>
        </div>
      </div>
    `;
    const orderInfo = document.getElementById("orderInfo");
    orderInfo.appendChild(listItem);

    // 수량 수정 기능
    const productNumElement = listItem.querySelector(".product_num");
    let quantity = parseInt(productNumElement.textContent);

    listItem.addEventListener("click", function (event) {
      // 수량 감소
      if (event.target.classList.contains("product_remove")) {
        console.log("TEST");
        quantity--;
        if (quantity < 1) {
          quantity = 1;
        }
        // 변경된 수량 업데이트
        productNumElement.textContent = quantity.toString();

        // 장바구니 데이터 업데이트
        cartItems.forEach((cartItem) => {
          if (cartItem.name === item.name && cartItem.size === item.size) {
            cartItem.quantity = quantity;
          }
        });

        // 업데이트된 장바구니 데이터를 로컬 스토리지에 저장
        localStorage.setItem("cart", JSON.stringify(cartItems));

        console.log("11111" + cartData);
        updateTotalQuantityAndPrice();
        // 수량 증가
      } else if (event.target.classList.contains("product_add")) {
        quantity++;
        // 변경된 수량 업데이트
        productNumElement.textContent = quantity.toString();

        // 장바구니 데이터 업데이트
        cartItems.forEach((cartItem) => {
          if (cartItem.name === item.name && cartItem.size === item.size) {
            cartItem.quantity = quantity;
          }
        });

        // 업데이트된 장바구니 데이터를 로컬 스토리지에 저장
        localStorage.setItem("cart", JSON.stringify(cartItems));
        updateTotalQuantityAndPrice();
        console.log("22222" + cartData);
      }
    });
  });
}

// 상품 삭제
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("order_remove_button")) {
    const listItem = event.target.closest(".order_product_list");
    listItem.remove();

    console.log("삭제 리스트 아이템", listItem);

    // 장바구니 데이터 업데이트
    const productName = listItem.querySelector(".product_name").textContent;
    console.log("삭제하는 상품 이름", productName);
    const productSize = listItem.querySelector(".product_size").textContent;
    console.log("삭제하는 상품 사이즈", productSize);
    console.log(productSize);

    cartItems = cartItems.filter(
      (item) => !(item.name === productName && item.size === productSize)
    );

    // 업데이트된 장바구니 데이터를 로컬 스토리지에 저장
    localStorage.setItem("cart", JSON.stringify(cartItems));
    console.log("상품 삭제하고 나서 카트 아이템 목록", cartItems);

    updateTotalQuantityAndPrice();
  }
});

// 장바구니 전체 삭제 기능 추가
const removeAllButton = document.querySelector(".remove_all_button");
removeAllButton.addEventListener("click", function () {
  const orderInfo = document.getElementById("orderInfo");
  orderInfo.innerHTML = `
  <p class="empty_cart_message"> 장바구니에 담은 물건이 없어요</p>
  `;
  // 장바구니 데이터 초기화
  cartItems = [];
  localStorage.removeItem("cart");
});

// 총 상품 수량 계산
function calculateTotalQuantity() {
  const productNumElements = document.querySelectorAll(".product_num");
  let totalQuantity = 0;

  productNumElements.forEach((element) => {
    const quantity = parseInt(element.textContent);
    totalQuantity += quantity;
  });

  return totalQuantity;
}

// 총 상품 합계 계산
function calculateTotalPrice() {
  const productPriceElements = document.querySelectorAll(".product_price");
  const productNumElements = document.querySelectorAll(".product_num");
  let totalPrice = 0;

  productPriceElements.forEach((element, index) => {
    const priceText = element.textContent;
    const price = parseInt(priceText);
    console.log("PRICE", price);
    const quantity = parseInt(productNumElements[index].textContent);
    const itemTotalPrice = price * quantity;
    totalPrice += itemTotalPrice;
  });

  console.log("총 가격: " + totalPrice);

  return totalPrice;
}

// 총 상품 수량 및 합계 업데이트
function updateTotalQuantityAndPrice() {
  const countElement = document.querySelector(".count");
  const priceElement = document.querySelector(".price");
  const deliverElement = document.querySelector(".deliver");
  const totalPriceElement = document.querySelector(".nav_total_price");
  const totalPriceSubtitleElement = document.querySelector(".subtitle_price");

  const totalQuantity = calculateTotalQuantity();
  const totalPrice = calculateTotalPrice();
  const deliveryFee = 3000; // 배송비 설정

  const finalPrice = totalPrice + deliveryFee;

  countElement.textContent = totalQuantity.toString() + "개";
  priceElement.textContent = totalPrice.toLocaleString() + "원";
  deliverElement.textContent = deliveryFee.toString() + "원";
  totalPriceElement.textContent = finalPrice.toLocaleString() + "원";
  totalPriceSubtitleElement.textContent =
    "총 " + totalPrice.toLocaleString() + "원을 담았어요.";
}

// 주문하기 버튼 클릭
const orderButton = document.querySelector(".nav_order_button");
orderButton.addEventListener("click", placeOrder);

function placeOrder() {
  const productDetailURL = "/cart/order";
  console.log(productDetailURL);
  window.location.href = productDetailURL;

  // const orderItems = [];
  // // const orderItems = [...cartItems];

  // const productElements = document.querySelectorAll(".order_product_list");
  // productElements.forEach((productElement) => {
  //   const productName =
  //     productElement.querySelector(".product_name").textContent;
  //   const productSize =
  //     productElement.querySelector(".product_size").textContent;
  //   const productPrice = parseInt(
  //     productElement.querySelector(".product_price").textContent
  //   );
  //   const productQuantity = parseInt(
  //     productElement.querySelector(".product_num").textContent
  //   );

  //   const orderItem = {
  //     name: productName,
  //     size: productSize,
  //     price: productPrice,
  //     quantity: productQuantity,
  //   };

  //   orderItems.push(orderItem);
  // });

  // const orderData = {
  //   items: orderItems,
  // };

  // // 백엔드 api 임시 작성
  // fetch("api 입력", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(orderData),
  // })
  //   .then((response) => {
  //     if (response.ok) {
  //       // 주문 성공
  //       console.log("주문 및 결제 페이지로 이동");
  //       const productDetailURL = "http://localhost:3000/cart/order";
  //       console.log(productDetailURL);
  //       window.location.href = productDetailURL;
  //     } else {
  //       // 주문 실패
  //       alert("주문을 처리하는 도중에 문제가 발생했습니다.");
  //       console.log("주문을 처리하는 도중에 문제가 발생했습니다.");
  //     }
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });
}

function init() {
  updateTotalQuantityAndPrice();
}

init();
