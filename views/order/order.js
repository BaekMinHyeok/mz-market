console.log("TEST");
const nameInput = document.querySelector(".name_input");
const nameError = document.getElementById("nameError");

const phonenumInput = document.querySelector(".phonenum_input");
const phonenumError = document.getElementById("phonenumError");

const emailInput = document.querySelector(".email_input");
const emailError = document.getElementById("emailError");

const addressInput = document.querySelector(".address_input");
const addressDetailInput = document.querySelector(".address_detail_input");
const addressError = document.getElementById("addressError");

const etcInput = document.querySelector(".etc_input");
const paymentButton = document.getElementById("paymentButton");

// 이름 검사
function validateNameInput() {
  const nameValue = nameInput.value.trim();
  console.log(nameValue);
  console.log(nameError);
  const regex = /^[a-zA-Z가-힣]+$/;

  if (nameValue === "") {
    nameError.textContent = "이름을 입력해주세요.";
    paymentButton.disabled = true;
  } else if (!regex.test(nameValue)) {
    nameError.textContent = "영문 혹은 한글만 입력해주세요.";
    paymentButton.disabled = true;
  } else {
    nameError.textContent = "";
    enablePaymentButton();
  }
}

// 연락처(전화번호) 검사
function validatePhonenumInput() {
  const phonenumValue = phonenumInput.value.trim();
  const regex = /[0-9]/;

  console.log(phonenumValue);

  if (phonenumValue === "") {
    phonenumError.textContent = "전화번호를 입력해주세요.";
    console.log(phonenumValue);
    paymentButton.disabled = true;

    paymentButton.disabled = true;
  } else if (!regex.test(phonenumValue)) {
    phonenumError.textContent =
      "숫자를 포함한 전화번호를 정확하게 입력해주세요.";
    console.log(phonenumValue);

    paymentButton.disabled = true;
  } else {
    phonenumError.textContent = "";
    let phonenumReplaceValue = phonenumValue
      .replace(/[^0-9]/g, "")
      .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
    // console.log(phonenumReplaceValue);
    phonenumInput.value = phonenumReplaceValue;
    // console.log(phonenumReplaceValue);
    enablePaymentButton();
  }
}

// 이메일 검사
function validateEmailInput() {
  const emailValue = emailInput.value.trim();
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  console.log(emailValue);

  if (emailValue === "") {
    emailError.textContent = "이메일을 입력해주세요.";
    paymentButton.disabled = true;
  } else if (!regex.test(emailValue)) {
    emailError.textContent = "@을 포함하여 이메일 주소를 입력해주세요.";
    paymentButton.disabled = true;
  } else {
    emailError.textContent = "";
    paymentButton.disabled = false;
  }
}

// 주소 검사
function validateAddressInput() {
  const addressValue = addressInput.value.trim();
  const addressDetailValue = addressDetailInput.value.trim();

  if (addressValue === "" || addressDetailValue === "") {
    addressError.textContent = "주소와 상세 주소를 모두 입력해주세요.";
    paymentButton.disabled = true;
  } else {
    addressError.textContent = "";
    enablePaymentButton();
  }
}

// 결제하기 버튼 활성화
function enablePaymentButton() {
  const nameValue = nameInput.value.trim();
  const phonenumValue = phonenumInput.value.trim();
  const emailValue = emailInput.value.trim();
  const addressValue = addressInput.value.trim();
  const addressDetailValue = addressDetailInput.value.trim();

  if (
    nameValue !== "" &&
    phonenumValue !== "" &&
    emailValue !== "" &&
    addressValue !== "" &&
    addressDetailValue !== ""
  ) {
    paymentButton.disabled = false;
  }
}

// 유효성 검사 실행
nameInput.addEventListener("input", validateNameInput);
phonenumInput.addEventListener("input", validatePhonenumInput);
emailInput.addEventListener("input", validateEmailInput);
addressInput.addEventListener("input", validateAddressInput);
addressDetailInput.addEventListener("input", validateAddressInput);

// 주소 찾기 api 연결
const addressButton = document.querySelector(".address_button");
function searchAddress() {
  new daum.Postcode({
    oncomplete: function (data) {
      document.querySelector(".address_input").value = data.address; // 주소 넣기
      document.querySelector(".address_detail_input").focus(); //상세입력 포커싱
    },
  }).open();
}
addressButton.addEventListener("click", searchAddress);

// 로컬스토리지에서 상품 정보 가져오기
function getProductData() {
  const productData = localStorage.getItem("cart");
  console.log(productData);
  return JSON.parse(productData);
}

/// 결제 정보 업데이트
function updatePaymentInfo() {
  const productData = getProductData();

  if (productData && productData.length > 0) {
    let productCount = 0;
    let productPrice = 0;

    // 상품 개수, 총 가격
    for (const product of productData) {
      productCount += product.quantity;
      productPrice += product.price * product.quantity;
    }

    const deliveryFee = 3000;
    const totalPrice = productPrice + deliveryFee;

    document.querySelector(".count").textContent = `${productCount}개`;
    document.querySelector(".price").textContent =
      formatPrice(productPrice) + "원";
    document.querySelector(".deliver").textContent =
      formatPrice(deliveryFee) + "원";
    document.querySelector(".nav_total_price").textContent =
      formatPrice(totalPrice) + "원";
  }
}
// 가격 포맷팅
function formatPrice(price) {
  return price.toLocaleString();
}

window.addEventListener("load", updatePaymentInfo);

// 주문 정보 전송
function submitOrder() {
  const name = nameInput.value.trim();
  const phonenumValue = phonenumInput.value.trim();
  const address = addressInput.value.trim();
  const addressDetail = addressDetailInput.value.trim();
  const etc = etcInput.value.trim();

  if (
    name === "" ||
    phonenumValue === "" ||
    address === "" ||
    addressDetail === ""
  ) {
    alert("이름, 연락처, 주소는 필수 입력 사항입니다.");
    return;
  }

  const orderData = {
    name: name,
    phonenum: phonenumValue,
    address: address + " " + addressDetail,
    etc: etc,
  };

  // 백엔드 API 데이터 전송
  // 하단 fetch는 임의로 작성만 했습니다. api.js 작성 완료되면 이후 수정
  fetch("여기 주소를 넣어주세요...", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderData),
  })
    .then((response) => {
      if (response.ok) {
        alert("주문이 완료 되었습니다.");
        // 성공
      } else {
        alert("오류가 발생했습니다.");
        // 실패
      }
    })
    .catch((error) => {
      console.error("주문 내용 전송 오류:", error);
      alert("오류가 발생했습니다.");
    });
}

// 결제하기 버튼 클릭, 주문 정보 전송
paymentButton.addEventListener("click", function () {
  submitOrder();
});
