// 카테고리 선택 함수
function updateCategoryValue(checkbox) {
  const checkvalue = document.getElementById("checkvalue");
  const checkboxContainer = document.querySelector(".checkbox-container");
  const saveBtn = document.getElementById("save-btn");

  if (checkbox.checked) {
    checkvalue.value = checkbox.parentNode.textContent.trim();
    checkboxContainer.style.display = "none";
  }
  document.getElementById("checkvalue").addEventListener("click", function () {
    checkboxContainer.style.display = "flex";
    saveBtn.style.display = "none";
  });
  if (checkvalue.value) {
    saveBtn.style.display = "block";
  } else {
    saveBtn.style.display = "none";
  }
}

/// 모달창 제거
function closeModal() {
  const modal = document.querySelector("#adminModalContainer");
  const fragement = document.createDocumentFragment();
  modal.replaceChildren(fragement);
}

// 저장 버튼 클릭
function addEventSaveBtn() {
  const saveBtn = document.getElementById("save-btn");
  saveBtn.addEventListener("click", async function () {
    // 확인 대화 상자 표시
    if (confirm("정말로 이 제품을 저장하시겠습니까?")) {
      const productName = document.getElementById("productName").value;
      const productDescription =
        document.getElementById("productDescription").value;
      const productPrice = document.getElementById("productPrice").value;
      const selectedValue =
        document.querySelector(".radio-group input:checked")?.value || null;
      const categoryValue = document.getElementById("checkvalue").value;
      const selectedFile = document.getElementById("selectedFile").value;
      //가독성 높이기
      if (
        !productName ||
        !productDescription ||
        !productPrice ||
        !selectedValue ||
        !categoryValue
      ) {
        // 비어 있는 필드를 콘솔에 출력
        if (!productName) {
          alert(" 상품명 필드가 비어 있습니다.");
          return;
        }
        if (!productDescription) {
          alert(" 상세설명 필드가 비어 있습니다.");
          return;
        }
        if (!productPrice) {
          alert(" 상품가격 필드가 비어 있습니다.");
          return;
        }
        if (!selectedValue) {
          alert(" 성별 카테고리 필드가 비어 있습니다.");
          return;
        }
        if (!categoryValue) {
          alert(" 상품 카테고리 필드가 비어 있습니다.");
          return;
        }
      }

      try {
        // 로컬 스토리지에서 JWT 토큰 가져오기
        const token = localStorage.getItem("token");
        const productId = document.querySelector("#productId").textContent;

        console.log("productId", productId);

        // 상품 데이터 객체 생성
        const productData = {
          name: productName,
          description: productDescription,
          price: Number(productPrice),
          category: categoryValue,
          gender: selectedValue,
        };

        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("data", JSON.stringify(productData));

        // 백엔드로 상품 데이터 전송
        const response = await fetch(
          `http://kdt-sw-5-team11.elicecoding.com/api/product/${parseInt(productId)}`,
          {
            method: "PUT",
            headers: {
              authorization: `Bearer ${token}`,
            },
            body: formData,
          }
        );

        const data = await response.json();
        console.log(data);
        closeModal();
        location.reload();
      } catch (error) {
        console.error("데이터 전송 오류:", error);
      }
    }
  });
}
