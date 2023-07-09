// 카테고리 선택 함수
function updateCategoryValue(checkbox) {
  let checkvalue = document.getElementById("checkvalue");
  let checkboxContainer = document.querySelector(".checkbox-container");
  const saveBtn = document.getElementById("save-btn");

  if (checkbox.checked) {
    checkvalue.value = checkbox.parentNode.textContent.trim();
    checkboxContainer.style.display = "none";
  }
  document.getElementById("checkvalue").addEventListener("click", function() {
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
const saveBtn = document.getElementById("save-btn");
saveBtn.addEventListener("click", function() {

  // 확인 대화 상자 표시
  if (confirm("정말로 이 제품을 저장하시겠습니까?")) {
    const productName = document.getElementById("productName").value;
    const productDescription = document.getElementById("productDescription").value;
    const productPrice = document.getElementById("productPrice").value;
    const selectedValue = document.querySelector('.radio-group input:checked')?.value || null;
    const categoryValue = document.getElementById("checkvalue").value;
    // const selectedFile = document.getElementById("selectedFile").textContent;

if (!productName || !productDescription || !productPrice || !selectedValue || !categoryValue || !selectedFile) {
  // 비어 있는 필드를 콘솔에 출력
  if (!productName) {
    console.log("productName 필드가 비어 있습니다.");
  }
  if (!productDescription) {
    console.log("productDescription 필드가 비어 있습니다.");
  }
  if (!productPrice) {
    console.log("productPrice 필드가 비어 있습니다.");
  }
  if (!selectedValue) {
    console.log("selectedValue 필드가 비어 있습니다.");
  }
  if (!categoryValue) {
    console.log("categoryValue 필드가 비어 있습니다.");
  }
  if (!selectedFile) {
    console.log("selectedFile 필드가 비어 있습니다.");
  }

  alert("모든 필드에 값을 입력해주세요.");
  return;
}
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

    // 백엔드로 상품 데이터 전송
    fetch('/api/products/add', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: productData
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      closeModal()
    })
    .catch(error => {
      console.error('데이터 전송 오류:', error);
    });
  }
});
