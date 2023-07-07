import { dummyData } from "./dummy.js";

// swiper slider
new Swiper(".swiper", {
  autoplay: {
    delay: 3500,
  },
  loop: true,
  speed: 600,
  slidesPerView: 1,
  spaceBetween: 10,
  centeredSlides: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    prevEl: ".swiper-button-prev",
    nextEl: ".swiper-button-next",
  },
});

console.log(dummyData);

// 성별에 따라 상품 리스트를 렌더링 하는 함수
function renderProductList(gender) {
  const productList = document.createElement("ul");
  productList.classList.add("products_list_wrapper");
  console.log(productList);

  const filteredProducts = dummyData.filter(
    (product) => product.gender === gender
  );
  const productsToRender = filteredProducts.slice(0, 4);

  productsToRender.forEach((product) => {
    const productElement = document.createElement("li");
    productElement.classList.add("product");
    productElement.innerHTML = `
                <div class="product_img">
                  <img src="${product.image}" alt="${product.name}"/>
                </div>
                  <div class="product_text_box">
                    <h3 class="product_name">${product.name}</h3>
                    <p class="product_text">
                      ${product.description}
                    </p>
    
                    <div class="product_text_box_bottom">
                      <p class="product_price">${product.price}원</p>
                      <p class="product_review">50개의 리뷰</p>
                    </div>
                  </div>
          `;
    productElement.addEventListener("click", () => {
      showProductDetail(product.id);
    });

    productList.appendChild(productElement);
  });

  return productList;
}

const femaleProductList = renderProductList("여성");
const maleProductList = renderProductList("남성");

const femaleProductSection = document.querySelector(".female_product_list");
const maleProductSection = document.querySelector(".male_product_list");

femaleProductSection.appendChild(femaleProductList);
maleProductSection.appendChild(maleProductList);

// 상세 페이지로 이동
function showProductDetail(productId) {
  console.log("Test");

  // window.location.href = `/category/products/:productId`;
  window.location.href = `./../productsDetail/productsDetail.html?id=${productId}`;
}

// // API 호출 (임의 작성)
// async function fetchProductList() {
//   try {
//       const response = await fetch('endpoint');
//       const data = await response.json();
//       return data;
//   } catch (error) {
//       console.error('상품 리스트 가져오기 실패.', error);
//   }
// }

// // 렌더
//    async function init() {
//     const products = await fetchProductList();
//     renderProductList(products);
// }

// init();
