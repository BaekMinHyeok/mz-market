const joinButton = document.querySelector(".signup-button");

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
  const emailRegExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
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
    password: password
  };

  // 요청
  try {
    const response = await fetch("http://127.0.0.1:5500/webproject/views/join/join.html", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      alert("회원가입이 성공하였습니다!");
    } else {
      alert("회원가입이 실패하였습니다. 다시 시도해 주세요.");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("등록하는 동안 오류가 발생했습니다. 나중에 다시 시도 해 주세요.");
  }
}

joinButton.addEventListener("click", createAccount);
