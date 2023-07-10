// import categoryGetData from "./adminpage_getdata";

const saveBtn = document.querySelector("#saveBtn");
saveBtn.addEventListener("click", async function() {
    const addInput = document.querySelector("#addInput").value;
    console.log(addInput);
     
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
        }
    } 
    catch (error) {
        console.error(error);
    }
});

// 카테고리 조회 
// document.addEventListener("DOMContentLoaded", async function () {
//     try {
//         const result = await categoryGetData();
//         console.log("result", result);
//     } catch (error) {
//         console.error(error);
//     }
// });
