const modalContainer = document.querySelector("#adminModalContainer");
const productTable = document.getElementById("product-table");
import fetchData from "./adminpage_getdata.js";
import deleteData from "./adminpage_deletdata.js";
const modal = (dataObj,dataId) => {
  // CSS 파일 가져오기
  console.log("dataId = ",dataId.products.productId);

  const cssUrl = "modal/adminpage_modal.css";
  const cssLink = document.createElement("link");
  cssLink.rel = "stylesheet";
  cssLink.href = cssUrl;
  document.head.appendChild(cssLink);
  const filteredProducts = dataObj.products.filter((data) => data.productId === dataId);
  console.log("filteredProducts =", filteredProducts);
  // HTML 파일 가져오기
  fetch("modal/adminpage_modal.html")
    .then((response) => response.text())
    .then((html) => {
      modalContainer.innerHTML = html;

      const productName = document.querySelector("#productName");
      const productDescription = document.querySelector('#productDescription');
      const productPrice = document.querySelector("#productPrice");
      const selectedValue = document.querySelector(".radio-group input:checked")
      const categoryValue = document.querySelector('#checkvalue');
      // productName.value = filteredProducts[0].name;
      // productDescription.value = filteredProducts[0].description;
      // productPrice.value = filteredProducts[0].price;
      // categoryValue.value = filteredProducts[0].category;
      




      const dataIdElement = document.createElement('p'); // 새로운 p 요소 생성
      dataIdElement.textContent = dataId;
      dataIdElement.id = "aa"; // id 속성 설정
      modalContainer.appendChild(dataIdElement);
        })
    .then(() => {
      // JavaScript 파일 가져오기
      const jsUrl = "modal/adminpage_modal.js";
      const scriptElement = document.createElement("script");
      scriptElement.src = jsUrl;
      document.body.appendChild(scriptElement);

      const jsUrl2 = "modal/adminpage_img.js";
      const scriptElement2 = document.createElement("script");
      scriptElement2.src = jsUrl2;
      document.body.appendChild(scriptElement2);
    });
};

document.addEventListener("DOMContentLoaded", async function () {
  try {
    const result = await fetchData();
    console.log("result", typeof result);
    result.products.forEach((data) => {
      console.log("상품이름",data.name ,"타입",typeof data.name);
      const newRow = document.createElement("tr");
      newRow.innerHTML = `
        <td>이미지</td>
        <td>${data.name}</td>
        <td>${data.category}</td>
        <td>${data.price}</td>
        <td>
          <img src="./imges/img1.png" alt="수정버튼" class="modifyBtn" id="modifyBtn" data-product1="${data}">
          <img src="./imges/img2.png" alt="삭제버튼" class="delete-btn" id="deleteBtn" data-product2="${data.productId}" data-product3="${data.name}">
      `;
      productTable.appendChild(newRow);
    });

    const modifyBtns = document.querySelectorAll("#modifyBtn");
    modifyBtns.forEach((btn) => {
      btn.addEventListener("click", async function(event) {
        const dataId = event.target.dataset.product1;

        console.log("타입",typeof event.target.dataset.product1);
        const result = await fetchData();
        console.log("result 타입",  result);
        modal(result,dataId);
      });
    });

    const deleteBtns = document.querySelectorAll("#deleteBtn");
    deleteBtns.forEach((btn) => {
      btn.addEventListener("click", function(event) {
        const trElement = this.parentNode.parentNode;
        const dataId = event.target.dataset.product2;
        const dataName = event.target.dataset.product3;

        const confirmDelete = confirm(`${dataName} 상품을 정말로 상품을 삭제하시겠습니까?` );
        if (confirmDelete) {
          trElement.remove();
          console.log("상품 삭제 확인:", dataId);
          deleteData(dataId); // 상품 삭제 로직 호출
        } else {
          console.log("상품 삭제 취소");
        }
      });
    });

  } catch (error) {
    console.error(error);
  }
});
