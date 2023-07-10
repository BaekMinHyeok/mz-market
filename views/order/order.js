console.log("TEST");
const nameInput = document.querySelector(".name_input");
const nameError = document.getElementById("nameError");

const phonenumInput = document.querySelector(".phonenum_input");
const phonenumError = document.getElementById("phonenumError");

const emailInput = document.querySelector(".email_input");
const emailError = document.getElementById("emailError");

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
    paymentButton.disabled = false;
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
    paymentButton.disabled = false;

    return phonenumValue;
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
  }
}

// 유효성 검사 실행
nameInput.addEventListener("input", validateNameInput);
phonenumInput.addEventListener("input", validatePhonenumInput);
emailInput.addEventListener("input", validateEmailInput);

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
