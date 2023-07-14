const joinButton = document.querySelector(".signup-button");
const authButton = document.querySelector(".auth-button");
const completeButton = document.querySelector(".auth-complete-button");
const header = document.getElementById("header-container");
const auth = document.getElementById("auth");
const login = document.querySelector(".login-p");

joinButton.disabled = true;
completeButton.disabled = true;

// fetch("http://kdt-sw-5-team11.elicecoding.com/header/header.html")
//   .then((res) => res.text())
//   .then((html) => {
//     header.innerHTML = html;
//   });

async function createAccount() {
  const name = document.querySelector("#name").value;
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  const passwordCheck = document.querySelector("#password-check").value;

  // 공란 체크
  if (name === "" || email === "" || password === "" || passwordCheck === "") {
    alert("모든 내용을 기입해주세요.");
    return;
  }

  // 이메일 유효성 검사
  const emailRegExp =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  if (!email.match(emailRegExp)) {
    alert("이메일이 유효하지 않습니다.");
    return;
  }

  // 패스워드 일치확인
  if (password !== passwordCheck) {
    alert("패스워드가 일치하지 않습니다.");
    return;
  }

  // 요청 보낼 데이터
  const data = {
    name: name,
    email: email,
    pw: password,
  };

  // 요청
  try {
    const response = await fetch(
      "http://kdt-sw-5-team11.elicecoding.com/api/user",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const result = await response.json();

    console.log(data);
    console.log(result);
    if (result.success) {
      alert("회원가입이 성공하였습니다!");
      location.href = "http://kdt-sw-5-team11.elicecoding.com/user/sign_in";
    } else {
      const errorMessage = await result.message;
      alert(errorMessage);
    }
  } catch (error) {
    console.error(error);
    alert("등록하는 동안 오류가 발생했습니다. 나중에 다시 시도 해 주세요.");
  }
}

joinButton.addEventListener("click", createAccount);

authButton.addEventListener("click", async () => {
  authButton.disabled = true;
  startTimer();
  const email = document.querySelector("#email").value;
  const data = {
    email: email,
  };

  try {
    await fetch("http://kdt-sw-5-team11.elicecoding.com/api/mail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    completeButton.disabled = false;
  } catch (error) {
    console.log("실패");
  }
});

completeButton.addEventListener("click", async () => {
  const response = await fetch(
    "http://kdt-sw-5-team11.elicecoding.com/api/mail/auth",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ key: auth.value }),
    }
  );
  const result = await response.json();

  if (result.success) {
    alert("인증에 성공했습니다!");
    joinButton.disabled = false;
  } else {
    alert("인증에 실패했습니다!");
  }
});

login.addEventListener("click", () => {
  location.href = "http://kdt-sw-5-team11.elicecoding.com/user/sign_in";
});

function startTimer() {
  let button = authButton;
  let time = 180; // 초 단위로 초기화 (3분 = 3 * 60 = 180초)

  // 타이머 갱신 함수
  function updateTimer() {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;

    // 버튼의 텍스트를 갱신하여 남은 시간을 표시
    button.textContent = `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;

    // 1초마다 시간 감소
    time--;

    // 타이머 종료 시
    if (time < 0) {
      clearInterval(timerInterval); // 타이머 중지
      authButton.disabled = false;
      authButton.textContent = "메일 발송";
    }
  }
  // 1초마다 updateTimer 함수 호출
  let timerInterval = setInterval(updateTimer, 1000);
}
