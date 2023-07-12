import { dummyData } from "../main/dummy.js";

console.log(dummyData);

const categorySelect = document.getElementById("category");
const productList = document.querySelector(".products_list_wrapper");

const productTitle = document.querySelector(".product_title");
const productSubtitle = document.querySelector(".product_subtitle");
const productListWrapper = document.querySelector(".products_list_wrapper");

// categorySelect.addEventListener("change", filterProductsByCategory);

// 카테고리별 상품 목록 필터링 및 표시
// function filterProductsByCategory(gender) {
//   const products = dummyData.filter((product) => product.gender === gender);

//   if (gender === "여성") {
//     productTitle.textContent = "여성 의류";
//     productSubtitle.textContent =
//       "여성 의류 설명 텍스트가 들어가는 자리입니다.";
//   } else if (gender === "남성") {
//     productTitle.textContent = "남성 의류";
//     productSubtitle.textContent =
//       "남성 의류 설명 텍스트가 들어가는 자리입니다.";
//   }

//   const selectedCategory = categorySelect.value;

//   // 선택된 카테고리 값에 따라 상품 목록 필터링 => 서버
//   const filteredProducts = products.filter((product) =>
//     product.category.includes(selectedCategory)
//   );

//   console.log(products);
//   console.log(filteredProducts);

//   // 상품 목록 HTML 초기화
//   productList.innerHTML = "";

//   // 필터링된 상품 목록 표시
//   filteredProducts.forEach((product) => {
//     const productItem = document.createElement("li");
//     productItem.className = "product";

//     productItem.innerHTML = `
//       <div class="product_img">
//         <img src="${product.image}" alt="${product.name}" />
//       </div>
//       <div class="product_text_box">
//         <h3 class="product_name">${product.name}</h3>
//         <p class="product_text">${product.description}</p>
//         <div class="product_text_box_bottom">
//           <p class="product_price">${product.price}원</p>
//           <p class="product_review">리뷰 개수</p>
//         </div>
//       </div>
//     `;

//     productList.appendChild(productItem);
//   });
// }

// 상품 표시 함수
function showProducts(gender) {
  const products = dummyData.filter((product) => product.gender === gender);

  if (gender === "여성") {
    productTitle.textContent = "여성 의류";
    productSubtitle.textContent =
      "여성 의류 설명 텍스트가 들어가는 자리입니다.";
  } else if (gender === "남성") {
    productTitle.textContent = "남성 의류";
    productSubtitle.textContent =
      "남성 의류 설명 텍스트가 들어가는 자리입니다.";
  }

  productListWrapper.innerHTML = "";

  console.log(gender);

  products.forEach((product) => {
    const productElement = document.createElement("li");
    productElement.classList.add("product");

    productElement.innerHTML = `
      <div class="product_img">
        <img src="${product.image}" alt="${product.name}" />
      </div>

      <div class="product_text_box">
        <h3 class="product_name">${product.name}</h3>
        <p class="product_text">${product.description}</p>

        <div class="product_text_box_bottom">
          <p class="product_price">${product.price}원</p>
          <p class="product_review">50개의 리뷰</p>
        </div>
      </div>
    `;

    productElement.addEventListener("click", () => {
      showProductDetail(product.id);
    });

    productListWrapper.appendChild(productElement);
  });
}

// function createCategoryOptions() {
//   const categorySelect = document.getElementById("category");
//   const categories = ["아우터", "상의", "하의"];

//   categories.forEach((category) => {
//     const option = document.createElement("option");
//     option.value = category;
//     option.textContent = category;
//     categorySelect.appendChild(option);
//   });
// }

// 초기화
function init() {
  // createCategoryOptions();
  const categoryProductsList = document.getElementById(
    "category_products_list"
  );
  const urlParams = new URLSearchParams(window.location.search);
  const gender = urlParams.get("gender");

  // filterProductsByCategory(gender);

  categoryProductsList.style.display = "block";
  showProducts(gender);
}

// 상세 페이지로 이동
function showProductDetail(productId) {
  console.log("Test");

  // window.location.href = `/category/products/:productId`;
  window.location.href = `./../productsDetail/productsDetail.html?id=${productId}`;
}

init();
