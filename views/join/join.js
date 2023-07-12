const joinButton = document.querySelector(".signup-button");
const authButton = document.querySelector(".auth-button");
const completeButton = document.querySelector(".auth-complete-button");
const header = document.getElementById("header-container");
const auth = document.getElementById("auth");

joinButton.disabled = true;
completeButton.disabled = true;

// fetch("http://localhost:3000/header/header.html")
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
    const response = await fetch("http://localhost:3000/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();

    console.log(data);
    console.log(result);
    if (result.success) {
      alert("회원가입이 성공하였습니다!");
      location.href = "http://localhost:3000/user/sign_in";
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

let authCode;
authButton.addEventListener("click", async () => {
  authButton.disabled = true;
  alert("메일을 발송했습니다.");
  const email = document.querySelector("#email").value;
  const data = {
    email: email,
  };

  try {
    const response = await fetch("http://localhost:3000/api/mail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    authCode = await response.json();
    console.log(authCode);
    completeButton.disabled = false;
  } catch (error) {}
});

completeButton.addEventListener("click", async () => {
  if (auth.value == authCode) {
    alert("인증에 성공했습니다!");
    joinButton.disabled = false;
  }
});
