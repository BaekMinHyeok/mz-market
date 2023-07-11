const modalContainer = document.querySelector("#adminModalContainer");
const productTable = document.getElementById("product-table");
import fetchData from "./adminpage_getdata.js";
import deleteData from "./adminpage_deletdata.js";
import getProductcategory from "./getcategory.js";

// 모달창 함수 
const modal = async (dataObj, dataId) => {
  const filteredProducts = dataObj.products.filter((data) => data.productId === Number(dataId));
  // 카테고리 출력 값 담을 배열
  
  console.log(filteredProducts);
  // HTML 파일 가져오기
  try {
    const response = await fetch("modal/adminpage_modal.html");
    const html = await response.text();
    modalContainer.innerHTML = html;
    
    const checkboxContainer = document.querySelector(".checkbox-container")
    const imgInput = document.querySelector("#imgInput");
    const productName = document.querySelector("#productName");
    const productDescription = document.querySelector('#productDescription');
    const productPrice = document.querySelector("#productPrice");
    const selectedMen = document.querySelector(".radio-group input[value='men']")
    const selectedWomen = document.querySelector(".radio-group input[value='women']")
    const categoryValue = document.querySelector('#checkvalue');
    imgInput.value = filteredProducts[0].images;
    productName.value = filteredProducts[0].name;
    productDescription.value = filteredProducts[0].description;
    productPrice.value = filteredProducts[0].price;
    categoryValue.value = filteredProducts[0].category;

    if (filteredProducts[0].gender === "men") {
      selectedMen.checked = true;
    } else {
      selectedWomen.checked = true;
    }

    const dataIdElement = document.createElement('p');
    dataIdElement.textContent = dataId;
    dataIdElement.id = "productId"; // id 속성 설정
    dataIdElement.style.display = "none";
    modalContainer.appendChild(dataIdElement);


    const categoryList= await getProductcategory();
    console.log(categoryList.categorys);

    categoryList.categorys.forEach((ary) => {
      const category = ary.name;
      const newLabel = document.createElement("label");
      newLabel.innerHTML = `
          <input type="radio"  name="category" onclick="updateCategoryValue(this)"> ${category}
      `;
      checkboxContainer.appendChild(newLabel);
    });

    // JavaScript 파일 가져오기
    const jsUrl = "modal/adminpage_modal.js";
    const scriptElement = document.createElement("script");
    scriptElement.src = jsUrl;
    document.body.appendChild(scriptElement);

    const jsUrl2 = "modal/adminpage_img.js";
    const scriptElement2 = document.createElement("script");
    scriptElement2.src = jsUrl2;
    document.body.appendChild(scriptElement2);

    // const jsUrl3 = "modal/getCategoryData.js";
    // const scriptElement3 = document.createElement("script");
    // scriptElement3.src = jsUrl3;
    // document.body.appendChild(scriptElement2);

    // CSS 가져오기
    const cssUrl = "modal/adminpage_modal.css";
    const cssLink = document.createElement("link");
    cssLink.rel = "stylesheet";
    cssLink.href = cssUrl;
    cssLink.type = "text/css";
    document.head.appendChild(cssLink);

    addEventSaveBtn();

  } catch (error) {
    console.log(error);
  }
};
// 리스트 출력하기
document.addEventListener("DOMContentLoaded", async function () {
  try {
    const result = await fetchData();
    console.log("받아오는 데이터: ",result);
    result.products.forEach((data) => {
      const newRow = document.createElement("tr");
      newRow.innerHTML = `
        <td><img src="${data.images}" alt="이미지"></td>
        <td>${data.name}</td>
        <td>${data.category}</td>
        <td>${data.price}</td>
        <td>
          <img src="./imges/img1.png" alt="수정버튼" class="modifyBtn" id="modifyBtn" data-product1="${data.productId}">
          <img src="./imges/img2.png" alt="삭제버튼" class="delete-btn" id="deleteBtn" data-product2="${data.productId}" data-product3="${data.name}">
      `;
      productTable.appendChild(newRow);
    });

    const modifyBtns = document.querySelectorAll("#modifyBtn");
    modifyBtns.forEach((btn) => {
      btn.addEventListener("click", async function(event) {
        const dataId = event.target.dataset.product1;
        const result = await fetchData();
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
