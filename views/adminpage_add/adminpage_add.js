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
























//헤더 파일 추가


