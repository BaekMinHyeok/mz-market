// 카테고리 링크 클릭
function handleCategoryClick(event, category) {
  event.preventDefault();

  const productTitle = document.querySelector(".product_title");
  const productSubtitle = document.querySelector(".product_subtitle");
  const productList = document.querySelector(".products_list_wrapper");

  if (category === "men") {
    productTitle.textContent = "남성 상품";
    productSubtitle.textContent = "남성 상품 설명 텍스트";
    fetchProducts("/api/product/gender/men", productList);

    history.pushState(null, "", "/category/men");
  } else if (category === "women") {
    productTitle.textContent = "여성 상품";
    productSubtitle.textContent = "여성 상품 설명 텍스트";
    fetchProducts("/api/product/gender/women", productList);

    history.pushState(null, "", "/category/women");
  }
}

// 카테고리 링크 클릭 이벤트 리스너
const menLink = document.querySelector('a[href="/category/men"]');
menLink.addEventListener("click", (event) => handleCategoryClick(event, "men"));

const womenLink = document.querySelector('a[href="/category/women"]');
womenLink.addEventListener("click", (event) =>
  handleCategoryClick(event, "women")
);

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

  return listItem;
}
