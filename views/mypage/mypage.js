const tabLinks = document.querySelectorAll(".tab-link");
const tabContents = document.querySelectorAll(".tab-content");

tabLinks.forEach(function (tabLink) {
  tabLink.addEventListener('click', function () {
    const tabId = this.getAttribute('data-tab');

    // Remove 'current' class from all tab links and tab contents
    tabLinks.forEach(function (link) {
      link.classList.remove('current');
    });
    tabContents.forEach(function (content) {
      content.classList.remove('current');
    });

    // Add 'current' class to the selected tab link and tab content
    this.classList.add('current');
    document.getElementById(tabId).classList.add('current');
  });
});
