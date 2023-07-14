// swiper slider
const swiper = new Swiper(".swiper", {
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

// 상품을 렌더링하는 함수
function renderProduct(product) {
  const productElement = document.createElement("li");
  productElement.classList.add("product");
  const replacePrice = product.price.toLocaleString();
  productElement.innerHTML = `
    <div class="product_img">
      <img src="${product.images}" alt="${product.name}"/>
    </div>
    <div class="product_text_box">
      <h3 class="product_name">${product.name}</h3>
      <p class="product_text">
        ${product.description}
      </p>
      <div class="product_text_box_bottom">
        <p class="product_price">${replacePrice}원</p>
      </div>
    </div>
  `;
  productElement.addEventListener("click", () => {
    showProductDetail(product.productId);
  });

  return productElement;
}

// 성별에 따라 상품 리스트 렌더링
function renderProductList(products, gender, containerSelector) {
  const container = document.querySelector(containerSelector);
  container.innerHTML = "";

  const filteredProducts = products.filter(
    (product) => product.gender === gender
  );

  const productsToRender = filteredProducts.slice(0, 4);

  productsToRender.forEach((product) => {
    const productElement = renderProduct(product);
    container.appendChild(productElement);
  });
}

// 새로운 상품 목록을 렌더링
function renderNewProductList(products) {
  const container = document.querySelector(".products_list_wrapper");
  container.innerHTML = "";

  const newProductsToRender = products.slice(-4).reverse();

  // console.log("NEWWWWW", newProductsToRender);

  newProductsToRender.forEach((product) => {
    const productElement = renderProduct(product);
    container.appendChild(productElement);
  });
}

const token = localStorage.getItem("token");

function showProductDetail(productId) {
  // console.log("상세페이지 이동 함수 테스트");
  // console.log(productId);

  // 상세 페이지로 이동할 URL
  const productDetailURL = `/category/products/${productId}`;
  // console.log(productDetailURL);
  window.location.href = productDetailURL;
}

// API 호출 (상품 전체)
async function fetchProductList() {
  try {
    const response = await fetch("/api/product", {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      // console.log(data);
      return data;
    } else {
      throw new Error("API 호출 에러");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// 렌더
async function init() {
  try {
    const products = await fetchProductList();
    // // console.log(products.products);

    // 새로운 상품 목록 렌더링
    renderNewProductList(products.products);

    // 여성 상품 리스트 렌더링
    renderProductList(products.products, "women", ".female_product_list");

    // 남성 상품 리스트 렌더링
    renderProductList(products.products, "men", ".male_product_list");
  } catch (error) {
    console.error(error);
  }
}

init();
