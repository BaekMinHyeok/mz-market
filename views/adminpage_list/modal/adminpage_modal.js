// 카테고리 선택 함수
function updateCategoryValue(checkbox) {
    let checkvalue = document.getElementById("checkvalue");
    let checkboxContainer = document.querySelector(".checkbox-container");
    let saveBtn = document.getElementById("save-btn");

    if (checkbox.checked) {
        checkvalue.value = checkbox.parentNode.textContent.trim();
      checkboxContainer.style.display = "none"; 
    }
    document.getElementById("checkvalue").addEventListener("click", function() {
    let checkboxContainer = document.querySelector(".checkbox-container");
        checkboxContainer.style.display = "flex";
        saveBtn.style.display = "none"; 
    });
    if (checkvalue.value) {
        saveBtn.style.display = "block";
    } else {
        saveBtn.style.display = "none";
    }
}
/// 모달창 제거 
function closeModal() {
    let modal = document.querySelector('.modal');
    modal.remove();
}
// 저장 버튼 클릭

const savebtn = document.querySelector("#save-btn");

savebtn.addEventListener("click", function() {
  const productName = document.querySelector("#productName").value;
  const productDescription = document.querySelector('#productDescription').value;
  const productPrice = document.querySelector("#productPrice").value;
  const selectedValue = document.querySelector('.radio-group input:checked').value;
  const categoryValue = document.querySelector('#checkvalue').value;
  const selectedFile = document.querySelector('#selectedFile').value; 

  console.log("productName:", productName);
  console.log("productDescription:", productDescription);
  console.log("productPrice:", productPrice);
  console.log("selectedValue:", selectedValue);
  console.log("categoryValue:", categoryValue);
  console.log("selectedFile:", selectedFile);

  // 로컬 스토리지에서 JWT 토큰 가져오기
  const token = localStorage.getItem('token');

  // 상품 데이터 객체 생성
  const productData = new FormData();
  productData.append('productName', productName);
  productData.append('productDescription', productDescription);
  productData.append('productPrice', productPrice);
  productData.append('selectedValue', selectedValue);
  productData.append('categoryValue', categoryValue);
  productData.append('selectedFile', selectedFile);

  // 상품 데이터를 백엔드로 전송
  fetch('/api/products/add', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}` // JWT 토큰을 헤더에 추가
    },
    body: productData
  })
  .then(response => response.json())
  .then(data => {
    // 서버 응답 처리
    console.log(data);
    // 원하는 추가 작업 수행
  })
  .catch(error => {
    // 오류 처리
    console.error('데이터 전송 오류:', error);
  });
});



