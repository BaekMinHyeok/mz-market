function updateCategoryValue(checkbox) {
    let checkvalue = document.getElementById("checkvalue");
    let checkboxContainer = document.querySelector(".checkbox-container");
    let saveBtn = document.getElementById("save-btn");

    if (checkbox.checked) {
        checkvalue.value = checkbox.parentNode.textContent.trim();
      checkboxContainer.style.display = "none"; 
    }
    document.getElementById("checkvalue").addEventListener("click", function() {
        let checkboxContainer = document.querySelector(".checkbox-container");
        checkboxContainer.style.display = "flex";
        saveBtn.style.display = "none"; 
    });
    if (checkvalue.value) {
        saveBtn.style.display = "block";
    } else {
        saveBtn.style.display = "none";
    }
}

const headerContainer = document.getElementById('header-container');
fetch("http://localhost:3000/header/header.html")
    .then((res) => res.text())
    .then((html) => {
        headerContainer.innerHTML = html;
        const cssLink = document.createElement("link");
        cssLink.rel = "stylesheet";
        cssLink.href = "http://localhost:3000/header/header.css";
        document.head.appendChild(cssLink);
         // CSS 파일 로드
  

        // JavaScript 파일 로드


        
    })
    .catch((error) => {
        console.error('Error fetching header content:', error);
    });

