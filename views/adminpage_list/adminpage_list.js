const modalContainer = document.querySelector("#adminModalContainer");
const productTable = document.getElementById("product-table");
import fetchData from "./adminpage_getdata.js";

// 클릭시 모달창 띄우기
const modal = () => {
  // CSS 파일 가져오기
  const cssUrl = "modal/adminpage_modal.css";
  const cssLink = document.createElement("link");
  cssLink.rel = "stylesheet";
  cssLink.href = cssUrl;
  document.head.appendChild(cssLink);

  // HTML 파일 가져오기
  fetch("modal/adminpage_modal.html")
    .then((response) => response.text())
    .then((html) => {
      modalContainer.innerHTML = html;
    })
    .then(() => {
      // JavaScript 파일 가져오기
      const jsUrl = "modal/adminpage_modal.js";
      const scriptElement = document.createElement("script");
      scriptElement.src = jsUrl;
      document.body.appendChild(scriptElement);
    });
};

document.addEventListener("DOMContentLoaded", async function () {
  try {
    const result = await fetchData();
    result.products.forEach((data) => {
      console.log(data.name);
      const newRow = document.createElement("tr");
      newRow.innerHTML = `
      <td>이미지</td>
      <td>${data.name}</td>
      <td>${data.category}</td>
      <td>${data.price}</td>
      <td>
        <img src="./imges/img1.png" alt="수정버튼" class="modifyBtn" id="modifyBtn">
        <img src="./imges/img2.png" alt="삭제버튼" class="delete-btn" id="deleteBtn">
      </td>
      `;
      productTable.appendChild(newRow);
    });

    // id~ 여러개를 한번에 불러와서 반복문 돌면서 이벤트 동적으로 하나씩 추가
    const modifyBtns = document.querySelectorAll("#modifyBtn");
    modifyBtns.forEach((btn) => {
      btn.addEventListener("click", modal);
    });
  } catch (error) {
    console.error(error);
  }
});
