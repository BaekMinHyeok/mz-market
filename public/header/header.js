  fetch("/header/header.html")
    .then((res) => res.text())
    .then((html) => {
      document.body.insertAdjacentHTML('afterbegin', html);
      const logoBtn = document.querySelector("#logoBtn");
      const menBtn = document.querySelector("#menBtn");
      const womenBtn = document.querySelector("#womenBtn");
      const loginBtn = document.querySelector("#loginBtn");
      const cartBtn = document.querySelector("#cartBtn");

      //css 파일 가져오기
      const cssUrl = "/header/header.css";
      const cssLink = document.createElement("link");
      cssLink.rel = "stylesheet";
      cssLink.href = cssUrl;
      cssLink.type = "text/css";
      document.head.appendChild(cssLink);

      logoBtn.addEventListener("click", function () {
        window.location.href = "/";
      });
      menBtn.addEventListener("click", function () {
        window.location.href = `/category/men`;
      });
      womenBtn.addEventListener("click", function () {
        window.location.href = "/category/women";
      });
      loginBtn.addEventListener("click", function () {
        window.location.href = "/user/sign_in";
      });
      cartBtn.addEventListener("click", function () {
        window.location.href = "/cart";
      });

    })
    .catch((error) => {
      console.error("Error fetching header content:", error);
    });






