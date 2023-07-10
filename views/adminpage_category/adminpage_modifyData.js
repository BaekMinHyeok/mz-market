async function modifyCategory() {
    const categoryInput = document.querySelector("#categoryInput");
    const basicValue = categoryInput.value;
  
    if (modifyBtn.textContent === "수정") {
      categoryInput.readOnly = false;
      modifyBtn.textContent = "저장";
    } else {
      const modifiedValue = categoryInput.value;
      const token = localStorage.getItem("token");
  
      const productData = {
        name: basicValue,
        newName: modifiedValue
      };
  
      try {
        const response = await fetch("http://localhost:3000/api/category", {
          method: "POST",
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(productData)
        });
  
        const result = await response.json();
        console.log(result);
  
        if (result.success) {
          console.log(result.success);
          categoryInput.readOnly = true;
          modifyBtn.textContent = "수정";
        }
      } catch (error) {
        console.error("통신 중 오류가 발생했습니다.", error);
      }
    }
  }
  
  export {modifyCategory};