fetch("/header/header.html")
  .then((res) => res.text())
  .then((html) => {
    document.body.insertAdjacentHTML("afterbegin", html);

    const token = localStorage.getItem("token");
    if (token) {
      // document.body.insertAdjacentHTML("afterbegin", html);
    } else {
      // document.body.insertAdjacentHTML("afterbegin", customHtml);
    }

    //css 파일 가져오기
    const cssUrl = "/header/header.css";
    const cssLink = document.createElement("link");
    cssLink.rel = "stylesheet";
    cssLink.href = cssUrl;
    cssLink.type = "text/css";
    document.head.appendChild(cssLink);
  })
  .catch((error) => {
    console.error("Error fetching header content:", error);
  });
