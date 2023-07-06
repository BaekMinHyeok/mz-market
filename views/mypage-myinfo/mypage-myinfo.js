const jwt = require('jsonwebtoken');

const nameEditButton = document.querySelector('.name-edit');
const emailEditButton = document.querySelector('.email-edit');
const passwordEditButton = document.querySelector('.password-edit');
const secretKey = 'YOUR_SECRET_KEY';

// 수정 버튼 클릭 이벤트 리스너
nameEditButton.addEventListener('click', editName);
emailEditButton.addEventListener('click', editEmail);
passwordEditButton.addEventListener('click', editPassword);

// name 수정
async function editName() {
  const nameInput = document.querySelector('#name');
  const nameValue = nameInput.value;

  // 백엔드 API에 데이터 전송
  const data = {
    field: 'name',
    value: nameValue
  };

  try {
    const token = generateToken();
    const response = await fetch('/api/edit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (result.success) {
      console.log('이름을 변경하였습니다.');
    } else {
      console.error('Name edit failed:', result.error);
      alert('이름 변경에 실패하였습니다.');
    }
  } catch (error) {
    console.error('Name edit request error:', error);
    alert('이름 변경에 실패하였습니다.');
  }
}

// email 수정
async function editEmail() {
  const emailInput = document.querySelector('#email');
  const emailValue = emailInput.value;

  // 백엔드 API에 데이터 전송
  const data = {
    field: 'email',
    value: emailValue
  };

  try {
    const token = generateToken();
    const response = await fetch('/api/edit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (result.success) {
      console.log('이메일 변경에 성공하였습니다.');
    } else {
      console.error('Email edit failed:', result.error);
      alert('이메일 변경에 실패하였습니다.');
    }
  } catch (error) {
    console.error('Email edit request error:', error);
    alert('이메일 변경에 실패하였습니다.');
  }
}

// Password 수정
async function editPassword() {
  const passwordInput = document.querySelector('#password');
  const passwordCheckInput = document.querySelector('#password-check');
  const passwordValue = passwordInput.value;
  const passwordCheckValue = passwordCheckInput.value;

  // 비밀번호가 일치하는지 확인(일치하지 않으면 조기 종료)
  if (passwordValue !== passwordCheckValue) {
    alert('비밀번호가 일치하지 않습니다.');
    return;
  }

  // 비밀번호가 일치하면 아래 코드 작동
  const data = {
    field: 'password',
    value: passwordValue
  };

  try {
    const token = generateToken();
    const response = await fetch('/api/edit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (result.success) {
      console.log('비밀번호를 변경하였습니다.');
    } else {
      console.error('Password edit failed:', result.error);
      alert('비밀번호 변경에 실패하였습니다.');
    }
  } catch (error) {
    console.error('Password edit request error:', error);
    alert('비밀번호 변경에 실패하였습니다.');
  }
}

// 회원탈퇴
async function deleteAccount() {
  const confirmation = confirm("회원탈퇴를 하시겠습니까?");
  if (confirmation) {
    try {
      const token = generateToken();
      const response = await fetch("/deleteAccount", {
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${token}` 
        }
      });

      if (response.ok) {
        alert("회원탈퇴 하였습니다.");
        window.location.href = "/";
      } else {
        const errorData = await response.json();
        console.log("Delete account request failed:", errorData);
        alert("회원탈퇴에 실패하였습니다. 다시 시도해 주세요.");
      }
    } catch (error) {
      console.log("An error occurred while deleting the account:", error);
      alert("회원탈퇴에 실패하였습니다. 다시 시도해 주세요.");
    }
  }
}

// 회원탈퇴 이벤트 리스너
const deleteAccountButton = document.querySelector(".delete-account");
deleteAccountButton.addEventListener("click", deleteAccount);

// placeholder에 사용자 데이터 Fetch
async function fetchUserData() {
  try {
    const token = generateToken();
    const response = await fetch('/api/user', {
      headers: {
        'Authorization': `Bearer ${token}` 
      }
    });
    const userData = await response.json();

    document.querySelector('.name').placeholder = userData.name;
    document.querySelector('.email').placeholder = userData.email;
    document.querySelector('.password').placeholder = userData.password;
  } catch (error) {
    console.error('Failed to fetch user data:', error);
  }
}

fetchUserData();

// 토큰 생성 함수
function generateToken() {
  // 생성한 토큰 유지시간
  const token = jwt.sign({}, secretKey, { expiresIn: '1h' });
  return token;
}
