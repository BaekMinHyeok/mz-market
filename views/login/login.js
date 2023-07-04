const loginButton = document.querySelector(".login-button");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");

// 로그인 버튼에 클릭 이벤트 리스너 추가
loginButton.addEventListener('click', loginBtnHandle);

// 로그인 버튼 클릭 이벤트 핸들러
async function loginBtnHandle() {
  const emailValue = emailInput.value;
  const passwordValue = passwordInput.value;

  if (emailValue === "") {
    alert('이메일에 값을 입력해주세요.');
    return;
  }

  if (passwordValue === "") {
    alert('비밀번호에 값을 입력해주세요.');
    return;
  }

  // 이메일 유효성 검사
  if (!validateEmail(emailValue)) {
    alert('이메일 형식에 맞지 않습니다!');
    return;
  }

  // 백엔드 API 엔드포인트로 데이터 전송
  const data = {
    email: emailValue,
    password: passwordValue
  };

  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (result.success) {
      // 로그인 성공 시 JWT 토큰 처리
      const token = result.token;
      // 토큰을 저장하거나 필요한 작업을 수행하세요.
      // 예시: 로컬 스토리지에 토큰 저장
      localStorage.setItem('token', token);

      alert('로그인에 성공하였습니다.');
      // 원하는 작업 수행 (예: 페이지 리다이렉션)
    } else {
      alert(result.message); // 로그인 실패 시 에러 메시지 표시
    }
  } catch (error) {
    console.error('로그인 에러:', error);
    alert('로그인 중 오류가 발생하였습니다.');
  }
}

// 이메일 유효성 검사 함수
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
