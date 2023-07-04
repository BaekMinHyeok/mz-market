const loginButton = document.querySelector(".login-button");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");

// 로그인 버튼에 클릭 이벤트 리스너 추가
loginButton.addEventListener('click', loginBtnHandle);

// 로그인 버튼 클릭 이벤트 핸들러
function loginBtnHandle() {
  const emailValue = emailInput.value;
  const passwordValue = passwordInput.value;

  if (emailValue.trim() === "") {
    alert('이메일에 값을 입력해주세요.');
    return;
  }

  if (passwordValue.trim() === "") {
    alert('비밀번호에 값을 입력해주세요.');
    return;
  }

  // 이메일 유효성 검사
  if (!validateEmail(emailValue)) {
    alert('이메일 형식에 맞지 않습니다!');
    return;
  }
}

// 이메일 유효성 검사 함수
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
