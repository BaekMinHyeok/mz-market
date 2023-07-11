//상품 카테고리 조회   
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
      console.log(result);
  
      if (result.success) {
        console.log(result.message);
        return result;
      }
    } catch (error) {
      throw new Error(error);
    }
  }


  document.addEventListener("DOMContentLoaded", async function () {
    try {
      const result = await getProductcategory();
      console.log(result);
  
      result.categorys.forEach(element => {
        const categoryName = element.name;
        console.log(categoryName);
  
        const categoryList = document.querySelector(".categoryList");
        const div = document.createElement("div");
        div.classList.add("add-text3");
        div.innerHTML = `
          <input readonly class="rectangle2" id="categoryInput" size="10" value="${categoryName}">
          <button class="img-btn2" id="modifyBtn">수정</button>
          <button class="img-btn3" id="deleteBtn">삭제</button>
        `;
        categoryList.appendChild(div);
      });
  
      const modifyBtn = document.querySelectorAll("#modifyBtn");
      const categoryInput = document.querySelectorAll("#categoryInput");

        modifyBtn.forEach((btn,index) => {
          const indexCategory = categoryInput[index];
          const basicValue=indexCategory.value;
          btn.addEventListener("click", async function () {
     
          console.log(basicValue);
          if (btn.textContent === "수정") {
            indexCategory.readOnly = false;
            btn.textContent = "저장";
          } else {
            const modifiedValue = indexCategory.value; // 바뀐 인풋값
            const token = localStorage.getItem("token");
            console.log(modifiedValue);
  
            const productData = {
              name: basicValue,
              newName: modifiedValue,
            };
            console.log(productData.name);
            console.log(productData.newName);
  
            try {
              const response = await fetch("http://localhost:3000/api/category", {
                method: "PUT",
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
        });
      });
    } catch (error) {
      console.error(error);
    }
  });

     

// 상품 카테고리 추가
 async function addProductcategory(addInput){
           // 로컬 스토리지에서 JWT 토큰 가져오기
           const token = localStorage.getItem("token");
           // 상품 데이터 객체 생성
           const productData = {
               name: addInput,
           };
           console.log(productData);
           try {
               const response = await fetch("http://localhost:3000/api/category", {
                   method: "POST",
                   headers: {
                       authorization: `Bearer ${token}`,
                       "Content-Type": "application/json",
                   },
                   body: JSON.stringify(productData),
               });
       
               const result = await response.json();
               console.log(result);
         
               if (result.success) {
               console.log(result.message);
               location.reload()
               }
        } 
        catch (error) {
        console.error(error);
    }
 }



const saveBtn = document.querySelector("#saveBtn");
saveBtn.addEventListener("click", async function() {
    const addInput = document.querySelector("#addInput").value;
    try{
        const result = await addProductcategory(addInput);
    }catch(error){
        console.log(error);
    }
});


//상품 수정 하기
// const modifyBtn= document.querySelector("#modifyBtn");
// const categoryInput = document.querySelector("#categoryInput")
// const basicValue = categoryInput.value;

// modifyBtn.addEventListener("click", async function() {
//     const categoryInput = document.querySelector("#categoryInput");
//      // 인풋값 유지// 원하는 값으로 변경
//     console.log(basicValue);
  
//     if (modifyBtn.textContent === "수정") {
//       categoryInput.readOnly = false;
//       modifyBtn.textContent = "저장";
//     } else {
//     const modifiedValue = categoryInput.value; // 바뀐 인풋값
//       const token = localStorage.getItem("token");
//       console.log(modifiedValue);
  
//       const productData = {
//         name: basicValue,
//         newName: modifiedValue,
//       };
//       console.log(productData.name);
//       console.log(productData.newName);
  
//       try {
//         const response = await fetch("http://localhost:3000/api/category", {
//           method: "PUT",
//           headers: {
//             authorization: `Bearer ${token}`,
//             "Content-Type": "application/json"
//           },
//           body: JSON.stringify(productData)
//         });
  
//         const result = await response.json();
//         console.log(result);
  
//         if (result.success) {
//           console.log(result.success);
//           categoryInput.readOnly = true;
//           modifyBtn.textContent = "수정";
//         }
//       } catch (error) {
//         console.error("통신 중 오류가 발생했습니다.", error);
//       }
//     }
//   });
