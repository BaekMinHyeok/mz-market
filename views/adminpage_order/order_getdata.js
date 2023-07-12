async function fetchData() {
    // 데이터를 요청할 URL을 설정합니다.
    const url = "http://localhost:3000/api/order";
    const token = localStorage.getItem("token")
    const orderList = document.querySelector(".orderList");
    try{
      const response = await fetch(url,{
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
        }
      });
      const result = await response.json();
      result.orders.forEach(ary=>{
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>1</td>
          <td>2번째 칸</td>
          <td>3번째 칸</td>
          <td>4번째 칸</td>
          <td>
            <select id="category" name="category">
              <option value="">배송 준비</option>
              <option value="">배송 진행</option>
              <option value="">배송 완료</option>
            </select>
          </td>
          <td>
            <img src="./imges/img2.png" alt="삭제버튼" class="delete-btn" id="deleteBtn">
          </td>`;
        orderList.appendChild(tr);
      })
      if(result.success){
        return result;
      }
  
    }catch(error){
      console.log(error)
    }
  }
  
  export default fetchData;