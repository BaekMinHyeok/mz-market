import { putApi, deleteApi, getApi } from "/api.js";

const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const passwordCheckInput = document.querySelector("#password-check");
const editAccountButton = document.querySelector(".edit-account");
const deleteAccountButton = document.querySelector(".delete-account");

editAccountButton.addEventListener("click", editAccount);
deleteAccountButton.addEventListener("click", deleteAccount);

async function getUserData() {
  try {
    // const data = await getApi("http://localhost:3000/api/user");
    const data = await getApi("/api/user");
    nameInput.value = data.user.name;
    emailInput.value = data.user.email;
  } catch (error) {
    // console.error("Failed to fetch user data:", error);
    alert("에러가 발생했어요. 관리자에게 문의해주세요.");
  }
}

getUserData();

async function editAccount() {
  const newName = nameInput.value;
  const newEmail = emailInput.value;
  const newPassword = passwordInput.value;
  const newPasswordCheck = passwordCheckInput.value;

  if (
    newName.trim() === "" ||
    newEmail.trim() === "" ||
    newPassword.trim() === ""
  ) {
    alert("모든 정보를 기입해주세요.");
    return;
  }

  if (newPassword !== newPasswordCheck) {
    alert("비밀번호가 일치하지 않습니다.");
    return;
  }

  try {
    // const response = await putApi("http://localhost:3000/api/user", {
    const response = await putApi("/api/user", {
      email: newEmail,
      pw: newPassword,
      newPw: newPasswordCheck,
      newName: newName,
    });

    if (response) {
      alert("회원정보가 수정되었습니다.");
    } else {
      alert("회원정보를 수정하는데 실패하였습니다.");
    }
  } catch (error) {
    // alert("Failed to update account information:", error);
    alert("에러가 발생했어요. 관리자에게 문의해주세요.");
  }
}

async function deleteAccount() {
  try {
    const response = await deleteApi(
      // "http://localhost:3000/api/user/delete-account"
      "/api/user",
      {
        success: true, //성공시 true, 실패시 false 반환
        message: "회원탈퇴에 성공했습니다.",
      }
    );

    if (response) {
      alert("회원을 탈퇴하였습니다.");
      window.location.href = "/";
    } else {
      alert("회원 탈퇴에 실패하였습니다.");
    }
  } catch (error) {
    // alert("Failed to delete the account:", error);
    alert("에러가 발생했어요. 관리자에게 문의해주세요.");
  }
}

// Add event listener to the "Order History" button
const orderListButton = document.getElementById("mypage-orderlist");
orderListButton.addEventListener("click", () => {
  // window.location.href = "http://localhost:3000/user/order_history";
  window.location.href = "/user/order_history";
});
