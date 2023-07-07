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




