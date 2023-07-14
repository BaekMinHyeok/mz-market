const cssUrl = "/header/header.css";
const cssLink = document.createElement("link");
cssLink.rel = "stylesheet";
cssLink.href = cssUrl;
cssLink.type = "text/css";
document.head.appendChild(cssLink);

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await fetch("/header/header.html");
    const html = await res.text();
    const token = localStorage.getItem("token");
    if (!token) {
      document.body.insertAdjacentHTML("afterbegin", html);

      const mypageBtn = document.querySelector("#mypageBtn");
      mypageBtn.addEventListener("click", function () {
        const confirmLogin = confirm(
          "로그인 필요. 확인 선택하여 로그인 페이지로 이동하시겠습니까?"
        );
        if (confirmLogin) {
          return (window.location.href = "/user/sign_in");
        }
      });
    } else {
      const response = await fetch("http://localhost:3000/api/admin", {
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();
      console.log(result);
      if (result.success) {
        const res = await fetch("/header/header3.html");
        const html = await res.text();
        document.body.insertAdjacentHTML("afterbegin", html);
        const logoutBtn = document.querySelector("#logoutBtn");
        logoutBtn.addEventListener("click", function () {
          const confirmLogin = confirm("로그아웃을 하시겠습니까??.");
          if (confirmLogin) {
            localStorage.removeItem("token");
            alert("로그아웃 되었습니다.");
            return (window.location.href = "/");
          }
        });
        console.log("관리자");
      } else {
        const res2 = await fetch("/header/header2.html");
        const html2 = await res2.text();
        document.body.insertAdjacentHTML("afterbegin", html2);
        const logoutBtn = document.querySelector("#logoutBtn");
        logoutBtn.addEventListener("click", function () {
          const confirmLogin = confirm("로그아웃을 하시겠습니까??.");
          if (confirmLogin) {
            localStorage.removeItem("token");
            alert("로그아웃 되었습니다.");
            return (window.location.href = "/");
          }
          console.log("관리자아닙니다.");
        });
      }
    }
  } catch (error) {
    console.error("헤더 콘텐츠를 가져오는 중 오류 발생:", error);
  }
});
