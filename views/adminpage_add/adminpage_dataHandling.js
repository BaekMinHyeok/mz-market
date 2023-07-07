const savebtn = document.querySelector("#save-btn");

savebtn.addEventListener("click", async function () {
  const productName = document.querySelector("#productName").value;
  const productDescription = document.querySelector(
    "#productDescription"
  ).value;
  const productPrice = document.querySelector("#productPrice").value;
  const selectedValue = document.querySelector(
    ".radio-group input:checked"
  ).value;
  const categoryValue = document.querySelector("#checkvalue").value;
  const selectedFile = document.querySelector("#selectedFile").value; // 파일 객체 가져오기

  // 로컬 스토리지에서 JWT 토큰 가져오기
  const token = localStorage.getItem("token");

  // 상품 데이터 객체 생성
  const productData = {
    name: productName,
    description: productDescription,
    price: Number(productPrice),
    category: [categoryValue],
    gender: selectedValue,
  };
  console.log(productData);
  try {
    const response = await fetch("http://localhost:3000/api/registerProduct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: token, // JWT 토큰을 헤더에 추가
      },
      body: JSON.stringify(productData),
    });
    const result = await response.json();
    console.log(result);
  } catch (error) {}
  // // 상품 데이터를 백엔드로 전송
  // fetch("http://localhost:3000/api/registerProduct", {
  //   method: "POST",
  //   headers: {
  //     Authorization: `Bearer ${token}`, // JWT 토큰을 헤더에 추가
  //   },
  //   body: JSON.stringify(productData),
  // })
});
