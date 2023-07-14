async function fetchData() {
  // 데이터를 요청할 URL을 설정합니다.
  // const url = "http://localhost:3000/api/order";
  const url = "/api/order";
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    const orderList = document.querySelector(".orderList");

    result.orders.forEach((data, index) => {
      const productNames = data.productInfo.map((item) => item.productName);
      const tr = document.createElement("tr");
      tr.innerHTML = `
          <td>${index + 1}</td>
          <td>${data.name}</td>
          <td>${productNames}</td>
          <td>${data.price}</td>
          <td>
            <select id="shipping" name="category" data-id=${data.orderId}>
              <option value="ready" >배송 준비</option>
              <option value="shipping">배송 진행</option>
              <option value="complete">배송 완료</option>
            </select>
          </td>
          <td>
            <img src="./imges/img2.png" alt="삭제버튼" class="delete-btn" id="deleteBtn" data-orderid="${
              data._id
            }">
          </td>`;
      orderList.appendChild(tr);
      const selectElement = tr.querySelector("#shipping");
      selectElement.value = data.status;
    });
    if (result.success) {
      return result;
    }
  } catch (error) {
    // console.log(error);
    alert("에러가 발생했어요. 관리자에게 문의해주세요.");
  }
}

export default fetchData;
