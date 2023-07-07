const savebtn = document.querySelector("#save-btn");

savebtn.addEventListener("click", function() {
  const productName = document.querySelector("#productName").value;
  const productDescription = document.querySelector('#productDescription').value;
  const productPrice = document.querySelector("#productPrice").value;
  const selectedValue = document.querySelector('.radio-group input:checked').value;
  const categoryValue = document.querySelector('#checkvalue').value;
  const selectedFile = document.querySelector('#selectedFile').value; // 파일 객체 가져오기

  console.log("productName:", productName);
  console.log("productDescription:", productDescription);
  console.log("productPrice:", productPrice);
  console.log("selectedValue:", selectedValue);
  console.log("categoryValue:", categoryValue);
  console.log("selectedFile:", selectedFile);

  // 로컬 스토리지에서 JWT 토큰 가져오기
  const token = localStorage.getItem('token');
  
  // 상품 데이터 객체 생성
  const productData = {
    productName: productName,
    productDescription: productDescription,
    productPrice: productPrice,
    selectedValue: selectedValue,
    categoryValue: categoryValue
  };

  console.log(productData);

  // FormData 객체 생성
  const formData = new FormData();
  formData.append('selectedFile', selectedFile);

  // 상품 데이터를 FormData에 추가 json 형식으로 보내기 수정 
  formData.append('productData', JSON.stringify(productData));



  // 상품 데이터를 백엔드로 전송
  fetch('/api/products/add', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}` // JWT 토큰을 헤더에 추가
    },
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    if (data.success) {
      console.log(data.message);
    } else {
      console.error(data.message);
    }
  })
  .catch(error => {
    console.error('데이터 전송 오류:', error);
  });
});
