document.addEventListener('DOMContentLoaded', function() {
  const footer = document.createElement('footer');
  footer.innerHTML = '<div class="container"><p>&copy; mz-market. All rights reserved.</p></div>';
  footer.classList.add('footer-style');
  document.body.appendChild(footer);
});
