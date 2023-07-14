function openFile() {
  let fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = "image/*";
  fileInput.style.display = "none";
  fileInput.addEventListener("change", function (event) {
    let selectedFile = event.target.files[0];
    // console.log(selectedFile);
    if (selectedFile) {
      //보여지는 값
      document.querySelector("#imgInput").value = selectedFile.name;
      //백엔드로 넘기는 데이터
      document.querySelector("#selectedFile").value = selectedFile;
    }
  });
  document.body.appendChild(fileInput);
  fileInput.click();
  document.body.removeChild(fileInput);
}
