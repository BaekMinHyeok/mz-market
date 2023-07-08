import dataID from "./adminpage_getdata";


deleteBtn.addEventListener("click", async function() {
    const trElement = this.parentNode.parentNode;
    trElement.remove();
    
    // 삭제 요청을 보낼 데이터의 ID나 기타 식별자를 가져옵니다.
    const dataId = dataID;
    const token = localStorage.getItem('token');
    
    const url = `http://localhost:3000/api/deleteProduct/${dataId}`;
  
    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        console.log("데이터 삭제 요청이 성공적으로 처리되었습니다.");
      } else {
        console.error("데이터 삭제 요청이 실패했습니다.");
      }
    } catch (error) {
      console.error(error);
    }
  });
  