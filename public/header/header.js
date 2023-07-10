document.addEventListener('DOMContentLoaded', function() {
    const logoBtn = document.querySelector("#logoBtn");

    logoBtn.addEventListener("click", function() {
      window.location.href = "http://localhost:3000/";
    });
  });