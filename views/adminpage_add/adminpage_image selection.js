function openFile() {
  let fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = 'image/*';
  fileInput.style.display = 'none';

  fileInput.addEventListener('change', function(event) {
    let selectedFile = event.target.files[0];
    if (selectedFile) {
      document.querySelector('#imgInput').value=selectedFile.name
    }
  });

  document.body.appendChild(fileInput);
  fileInput.click();
  document.body.removeChild(fileInput);
}