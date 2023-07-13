fetch("/header/header.html")
  .then((res) => res.text())
  .then((html) => {
    document.body.insertAdjacentHTML("afterbegin", html);

    // 카테고리 링크 클릭 이벤트 리스너
    const menLink = document.querySelector('a[href="/category/men/"]');
    menLink.addEventListener("click", (event) => {
      handleCategoryClick(event, "men");

      // 경로 이동이 안 돼서 설정
      history.pushState(null, "", "/category/men/");
    });

    const womenLink = document.querySelector('a[href="/category/women/"]');
    womenLink.addEventListener("click", (event) => {
      handleCategoryClick(event, "women");

      // 경로 이동이 안 돼서 설정
      history.pushState(null, "", "/category/women/");
    });

    //css 파일 가져오기
    const cssUrl = "/header/header.css";
    const cssLink = document.createElement("link");
    cssLink.rel = "stylesheet";
    cssLink.href = cssUrl;
    cssLink.type = "text/css";
    document.head.appendChild(cssLink);
  })
  .catch((error) => {
    console.error("Error:", error);
  });

// 카테고리 링크 클릭
function handleCategoryClick(event, category) {
  event.preventDefault();

  const productTitle = document.querySelector(".product_title");
  const productSubtitle = document.querySelector(".product_subtitle");
  const productList = document.querySelector(".products_list_wrapper");

  if (category === "men") {
    productTitle.textContent = "남성 상품";
    productSubtitle.textContent = "남성 상품 목록입니다.";

    fetchProducts("/api/product/gender/men", productList);
    // history.pushState(null, "", "/category/men/");
  } else if (category === "women") {
    productTitle.textContent = "여성 상품";
    productSubtitle.textContent = "여성 상품 목록입니다.";

    fetchProducts("/api/product/gender/women", productList);
    // history.pushState(null, "", "/category/women/");
  }
}

// 상품 리스트 가져오기
function fetchProducts(url, productList) {
  // 기존 상품 리스트 초기화
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log("DATA", data);
      const fragment = document.createDocumentFragment();

      data.product.forEach((product) => {
        const listItem = createProductItem(product);
        console.log("listItem", listItem);
        fragment.appendChild(listItem);
      });

      productList.innerHTML = "";
      productList.appendChild(fragment);

      // 상품 리스트 아이템 클릭 이벤트 리스너 등록
      const productItems = productList.querySelectorAll(".product");
      productItems.forEach((item) => {
        const productId = item.dataset.productId;
        console.log(productId);
        item.addEventListener("click", () => showProductDetail(productId));
      });
    })
    .catch((error) => {
      console.log("Error:", error);
    });
}

// 상품 아이템 생성
function createProductItem(product) {
  const listItem = document.createElement("li");
  listItem.classList.add("product");

  const productImg = document.createElement("div");
  productImg.classList.add("product_img");

  const img = document.createElement("img");
  img.src = product.images;
  productImg.appendChild(img);

  listItem.appendChild(productImg);

  const productTextBox = document.createElement("div");
  productTextBox.classList.add("product_text_box");
  listItem.appendChild(productTextBox);

  const productName = document.createElement("h3");
  productName.classList.add("product_name");
  productName.textContent = product.name;
  productTextBox.appendChild(productName);

  const productText = document.createElement("p");
  productText.classList.add("product_text");
  productText.textContent = product.description;
  productTextBox.appendChild(productText);

  const productTextBoxBottom = document.createElement("div");
  productTextBoxBottom.classList.add("product_text_box_bottom");
  productTextBox.appendChild(productTextBoxBottom);

  const productPrice = document.createElement("p");
  productPrice.classList.add("product_price");
  productPrice.textContent = product.price.toLocaleString() + "원";
  productTextBoxBottom.appendChild(productPrice);

  const productReview = document.createElement("p");
  productReview.classList.add("product_review");
  productReview.textContent = "50개의 리뷰";
  productTextBoxBottom.appendChild(productReview);

  listItem.setAttribute("data-product-id", product.productId);

  return listItem;
}

function showProductDetail(productId) {
  console.log("상세페이지 이동 함수 테스트");
  console.log(productId);

  // 상세 페이지로 이동할 URL
  const productDetailURL = `/category/products/${productId}`;
  console.log(productDetailURL);
  window.location.href = productDetailURL;
}

// // 초기 페이지 로드 시 상품 리스트 가져오기
// document.addEventListener("DOMContentLoaded", () => {
//   const productList = document.querySelector(".products_list_wrapper");
//   fetchProducts("/api/product/gender/men", productList);
// });
