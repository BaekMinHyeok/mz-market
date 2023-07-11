// swiper slider
// new Swiper(".swiper", {
//   autoplay: {
//     delay: 3500,
//   },
//   loop: true,
//   speed: 600,
//   slidesPerView: 1,
//   spaceBetween: 10,
//   centeredSlides: true,
//   pagination: {
//     el: ".swiper-pagination",
//     clickable: true,
//   },
//   navigation: {
//     prevEl: ".swiper-button-prev",
//     nextEl: ".swiper-button-next",
//   },
// });

// 성별에 따라 상품 리스트를 렌더링하는 함수
function renderProductList(product, gender) {
  const productList = document.createElement("ul");
  productList.classList.add("products_list_wrapper");
  // console.log(productList);
  // console.log(product);

  const filteredProducts = product.filter(
    (product) => product.gender === gender
  );

  console.log(filteredProducts);
  const productsToRender = filteredProducts.slice(0, 4);

  productsToRender.forEach((product) => {
    const productElement = document.createElement("li");
    productElement.classList.add("product");
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
          <p class="product_price">${product.price}원</p>
          <p class="product_review">50개의 리뷰</p>
        </div>
      </div>
    `;
    productElement.addEventListener("click", () => {
      showProductDetail(product.productId);
    });

    productList.appendChild(productElement);
  });

  return productList;
}

const token = localStorage.getItem("token");

// API 호출 (상품 번호)
async function fetchProduct(productId) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/product/${productId}`,
      {
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      return data;
    } else {
      throw new Error("상품번호 정보 조회 API 호출 에러");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// 상세 페이지로 이동
async function showProductDetail(productId) {
  try {
    const product = await fetchProduct(productId);
    console.log("상세페이지 이동 함수 테스트!");
    console.log(product);

    // 상세 페이지로 이동할 URL
    const productDetailURL = `/category/products/${productId}`;
    window.location.href = productDetailURL;
  } catch (error) {
    console.error(error);
  }
}

// API 호출 (상품 전체)
async function fetchProductList() {
  try {
    const response = await fetch("http://localhost:3000/api/product", {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
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
    // console.log(products.products);

    const femaleProductList = renderProductList(products.products, "women");
    const maleProductList = renderProductList(products.products, "men");

    const femaleProductSection = document.querySelector(".female_product_list");
    const maleProductSection = document.querySelector(".male_product_list");

    femaleProductSection.appendChild(femaleProductList);
    maleProductSection.appendChild(maleProductList);
  } catch (error) {
    console.error(error);
  }
}

init();
