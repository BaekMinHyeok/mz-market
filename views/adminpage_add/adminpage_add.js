const checkboxContainer = document.querySelector(".checkbox-container")
document.addEventListener("DOMContentLoaded", async function (){
    try{
       const result =  await getProductcategory();
       console.log(result.categorys[0].name);
       result.categorys.forEach((ary) => {
        const name =ary.name;
       const newLabel = document.createElement("label");
       newLabel.innerHTML = `
          <input type="radio"  name="category" onclick="updateCategoryValue(this)"> ${name}
      `;
      checkboxContainer.appendChild(newLabel);
    });
    }catch(err){
        console.log(err);
    }
});


async function getProductcategory() {
    const url = "http://localhost:3000/api/category";
    const token = localStorage.getItem("token");
    
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
  
      const result = await response.json();
  
      if (result.success) {
        console.log(result.message);
        
        return result;
      }
    } catch (error) {
      throw new Error(error);
    }
  }















function updateCategoryValue(checkbox) {
  let checkvalue = document.getElementById("checkvalue");
  let checkboxContainer = document.querySelector(".checkbox-container");
  let saveBtn = document.getElementById("save-btn");

  if (checkbox.checked) {
    checkvalue.value = checkbox.parentNode.textContent.trim();
    checkboxContainer.style.display = "none";
  }
  document.getElementById("checkvalue").addEventListener("click", function () {
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

<<<<<<< HEAD























//헤더 파일 추가


=======
const headerContainer = document.getElementById("header-container");
fetch("http://localhost:3000/header/header.html")
  .then((res) => res.text())
  .then((html) => {
    headerContainer.innerHTML = html;
    const cssLink = document.createElement("link");
    cssLink.rel = "stylesheet";
    cssLink.href = "http://localhost:3000/header/header.css";
    document.head.appendChild(cssLink);
    // CSS 파일 로드
    const jsScript = document.createElement("script");
    jsScript.src = "http://localhost:3000/header/header.js";
    document.body.appendChild(jsScript);
    // JavaScript 파일 로드
  })
  .catch((error) => {
    console.error("Error fetching header content:", error);
  });
>>>>>>> origin/dev
