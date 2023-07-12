<<<<<<< HEAD
fetch("/header/header.html")
    .then((res) => res.text())
    .then((html) => {
        document.body.insertAdjacentHTML("afterbegin",html);
        const logoBtn = document.querySelector("#logoBtn");
        logoBtn.addEventListener("click", function() {
          window.location.href = "/";
        });
        // JavaScript 파일 로드
    })
    .catch((error) => {
        console.error('Error fetching header content:', error);
});






=======
document.querySelector("#logoBtn").addEventListener("click", function () {
  window.location.href = "http://localhost:3000/";
});

document.querySelector("#menBtn").addEventListener("click", function () {
  window.location.href = "http://localhost:3000/user/sign_in";
});
>>>>>>> origin/dev
