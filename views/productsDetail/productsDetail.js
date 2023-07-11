import { dummyData } from "../main/dummy.js";

// URL에서 상품 ID 가져옵니다..
function getProductIdFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("productId");
  console.log(productId);
  return productId;
}

// 상품 정보를 상세 페이지에 표시
async function showProductDetail() {
  const productId = getProductIdFromURL();

  try {
    // const response = await fetch(`endpoint`);

    // if(!response.ok){
    //   throw new Error("상품 가져오기 실패")
    // }

    // const product = await response.json();

    // 페이지를 이동할 때마다 api를 호출해야 하는 건가요..?
    // 24번 줄 코드는 더미데이터 활용한 임시 코드입니다. API연결 후 삭제
    const product = dummyData.find((item) => item.id === productId);

    const productImage = document.querySelector(".product_info_image");
    const imageElement = document.createElement("img");
    imageElement.src = product.image;
    productImage.appendChild(imageElement);

    const productName = document.querySelector(".product_info_name");
    const productPrice = document.querySelector(".product_info_price");
    const productDescription = document.querySelector(
      ".product_info_detail_text_contents"
    );

    productName.textContent = product.name;
    productPrice.textContent = `${product.price}원`;
    productDescription.textContent = product.description;

    const sizeButtons = document.querySelectorAll(
      ".product_info_size_button_container button"
    );
    const addButton = document.querySelector(".product_info_count_add_btn");
    const removeButton = document.querySelector(
      ".product_info_count_remove_btn"
    );
    const countNum = document.querySelector(".product_info_count_num");
    const saveButton = document.querySelector(".product_info_save_btn");
    const sizeInfo = document.querySelector(".product_info_size");
    console.log(sizeInfo);
    let selectedSize = "S";
    let quantity = 1;

    // 사이즈 버튼 클릭 시 이벤트 처리
    sizeButtons.forEach((button) => {
      sizeInfo.textContent = selectedSize;
      button.addEventListener("click", () => {
        // 선택된 사이즈 표시
        sizeButtons.forEach((btn) => btn.classList.remove("on"));
        button.classList.add("on");
        selectedSize = button.textContent;
        sizeInfo.textContent = selectedSize;

        console.log(sizeInfo);
      });
    });

    // 수량 추가
    addButton.addEventListener("click", () => {
      quantity++;
      updateQuantityDisplay();
    });

    // 수량 감소
    removeButton.addEventListener("click", () => {
      if (quantity > 1) {
        quantity--;
        updateQuantityDisplay();
      }
    });

    // 장바구니에 상품 추가
    saveButton.addEventListener("click", () => {
      addToCart(product, selectedSize, quantity);
      quantity = 1;
    });

    // 수량 표시
    function updateQuantityDisplay() {
      countNum.textContent = quantity;
    }
  } catch (error) {
    console.log(error);
  }
}

// 장바구니 상품 추가
function addToCart(product, selectedSize, quantity) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  // 장바구니에서 동일한 상품 찾기
  const existingProductIndex = cart.findIndex(
    (item) => item.id === product.id && item.size === selectedSize
  );

  // 배열에서 해당 상품을 찾았는지 ==> 이 조건은 동일한 상품인 경우
  if (existingProductIndex !== -1) {
    // 장바구니에 이미 있는 상품이면 수량 증가
    cart[existingProductIndex].quantity += quantity;
  } else {
    // 장바구니에 새로운 상품 추가
    const newProduct = {
      id: product.id,
      name: product.name,
      price: product.price,
      size: selectedSize,
      quantity: quantity,
    };
    cart.push(newProduct);
  }

  // 장바구니 정보를 로컬 스토리지에 저장
  localStorage.setItem("cart", JSON.stringify(cart));

  // 수량과 사이즈 초기화
  const quantityElement = document.querySelector(".product_info_count_num");
  const sizeButtons = document.querySelectorAll(
    ".product_info_size_button_container button"
  );

  quantityElement.textContent = "1";

  sizeButtons.forEach((button) => {
    button.classList.remove("on");
  });

  const selectedSizeButton = document.querySelector(
    `.product_info_size_${selectedSize.toLowerCase()}`
  );
  selectedSizeButton.classList.add("on");

  alert("상품을 장바구니에 담았어요.");
}

function init() {
  showProductDetail();
}

init();

// 페이지 로드 시 상세 페이지 정보를 표시
window.addEventListener("DOMContentLoaded", showProductDetail);
