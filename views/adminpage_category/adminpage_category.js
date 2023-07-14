//상품 카테고리 조회
async function getProductcategory() {
  const url = "http://kdt-sw-5-team11.elicecoding.com/api/category";
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

document.addEventListener("DOMContentLoaded", async function () {
  try {
    //조회후 데이터  출력하기
    const result = await getProductcategory();
    console.log(result);

    result.categorys.forEach((element) => {
      const categoryName = element.name;
      console.log(categoryName);

      const categoryList = document.querySelector(".categoryList");
      const div = document.createElement("div");
      div.classList.add("add-text3");
      div.innerHTML = `
          <input readonly class="rectangle2" id="categoryInput" size="10" value="${categoryName}">
          <button class="img-btn2" id="modifyBtn">수정</button>
          <button class="img-btn3" id="deleteBtn" data-name="${categoryName}">삭제</button>
        `;
      categoryList.appendChild(div);
    });
    //카테고리 수정버튼 클릭
    const modifyBtn = document.querySelectorAll("#modifyBtn");
    const categoryInput = document.querySelectorAll("#categoryInput");
    modifyBtn.forEach((btn, index) => {
      const indexCategory = categoryInput[index];
      const indexmodifyBtn = modifyBtn[index];
      const basicValue = indexCategory.value;

      btn.addEventListener("click", async function () {
        console.log(basicValue);
        console.log(btn.textContent);

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
            await fetch("http://kdt-sw-5-team11.elicecoding.com/api/category", {
              method: "PUT",
              headers: {
                authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify(productData),
            });

            if (result.success) {
              console.log(result.message);
              indexCategory.readOnly = true;
              indexmodifyBtn.textContent = "수정";
              alert(`${basicValue}에서 
${modifiedValue}으로 수정되었습니다.`);
            }
          } catch (error) {
            console.error("통신 중 오류가 발생했습니다.", error);
          }
        }
      });
    });
    //삭제 버튼 클릭시
    const deleteBtn = document.querySelectorAll("#deleteBtn");
    deleteBtn.forEach((btn) => {
      btn.addEventListener("click", handleDeleteButtonClick);
    });
  } catch (error) {
    console.error(error);
  }
});

async function handleDeleteButtonClick(event) {
  const name = event.target.dataset.name;
  const confirmDelete = confirm(`${name} 카테고리를 삭제하시겠습니까??`);

  if (confirmDelete) {
    event.target.parentElement.classList.remove("add-text3");
    event.target.parentElement.remove();

    const url = `http://kdt-sw-5-team11.elicecoding.com/api/category/${name}`;
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      if (response.success) {
        location.reload();
        console.log(response.message);
      }
    } catch (error) {
      console.error(error);
    }
  }
}

// 상품 카테고리 추가
async function addProductcategory(addInput) {
  // 로컬 스토리지에서 JWT 토큰 가져오기
  const token = localStorage.getItem("token");
  // 상품 데이터 객체 생성
  const productData = {
    name: addInput,
  };
  console.log(productData);
  try {
    const response = await fetch(
      "http://kdt-sw-5-team11.elicecoding.com/api/category",
      {
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      }
    );

    const result = await response.json();
    console.log(result);

    if (result.success) {
      console.log(result.message);
      location.reload();
    }
  } catch (error) {
    console.error(error);
  }
}

const addBtn = document.querySelector("#saveBtn");
addBtn.addEventListener("click", async function () {
  const addInput = document.querySelector("#addInput").value;
  const confirmAdd = confirm(`${addInput} 카테고리를 추가하시겠습니까??`);
  if (confirmAdd) {
    try {
      await addProductcategory(addInput);
      location.reload();
    } catch (error) {
      console.log(error);
    }
  }
});
