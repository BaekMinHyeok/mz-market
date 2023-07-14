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
    category: categoryValue,
    gender: selectedValue,
  };

  const formData = new FormData();
  formData.append("file", selectedFile);
  formData.append("data", JSON.stringify(productData));
  // console.log(productData);
  try {
    const response = await fetch("http://localhost:3000/api/product", {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        // "Content-Type": "application/json",
      },
      body: formData,
    });
    const result = await response.json();
    console.log(result);

    if (result.success) {
      alert("저장되었습니다.");
      location.reload();
      console.log(result.message);
    } else {
      alert("값을 다 입력해 주세요!");
    }
  } catch (error) {
    console.log("Error:", error);
    // 오류 처리 로직 추가
  }
});
