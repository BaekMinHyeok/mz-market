document.addEventListener("DOMContentLoaded", function () {
  const footer = document.createElement("footer");
  footer.innerHTML =
    '<div class="container"><p>Copyright 2023. mz-market.</p> <p>Team without back.</p> <p>All rights reserved.</p></div>';

  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "/footer/footer.css";
  document.head.appendChild(link);
  document.body.appendChild(footer);
});
