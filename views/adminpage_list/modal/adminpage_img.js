function openFile() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.style.display = 'none';
    
    // 파일 선택 했을때 실행
    fileInput.addEventListener('change', function(event) {
    const selectedFile = event.target.files[0];
      
    if (selectedFile) {
        document.querySelector('#imgInput').value = selectedFile.name;
        document.querySelector('#selectedFile').value = selectedFile;
      }
    });

    document.body.appendChild(fileInput);
    fileInput.click();
    document.body.removeChild(fileInput);
    
}