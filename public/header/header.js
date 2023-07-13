fetch("/header/header.html")
  .then((res) => res.text())
  .then((html) => {
    const token = localStorage.getItem("token");
    if (!token) {
      document.body.insertAdjacentHTML("afterbegin", html);
      const mypageBtn = document.querySelector("#mypageBtn");
      mypageBtn.addEventListener("click", function () {
        const confirmLogin = confirm(
          `로그인 필요
      확인 선택 로그인 페이지 이동`
        );
        if (confirmLogin) {
          window.location.href = "/user/sign_in";
        }
      });
    } else {
      fetch("/header/header2.html")
        .then((res) => res.text())
        .then((html2) => {
          document.body.insertAdjacentHTML("afterbegin", html2);

          const logoutBtn = document.querySelector("#logoutBtn");
          logoutBtn.addEventListener("click", function () {
            const confirmLogout = confirm("로그아웃 하시겠습니까?");
            if (confirmLogout) {
              localStorage.removeItem("token");
              window.location.href = "/";
            }
          });
        });
    }

    // CSS 파일 가져오기
    const cssUrl = "/header/header.css";
    const cssLink = document.createElement("link");
    cssLink.rel = "stylesheet";
    cssLink.href = cssUrl;
    cssLink.type = "text/css";
    document.head.appendChild(cssLink);
  })
  .catch((error) => {
    console.error("헤더 콘텐츠를 가져오는 중 오류 발생:", error);
  });
