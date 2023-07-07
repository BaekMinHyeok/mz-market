const dataID = document.addEventListener("DOMContentLoaded", async function() {
    // 데이터를 요청할 URL을 설정합니다.
    const url = "http://localhost:3000/api/getAllProduct";
    
    // JWT 토큰을 가져와서 변수에 저장합니다.
    const token = localStorage.getItem('token');
  
    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        // 응답 데이터를 JSON 형식으로 파싱합니다.
        const data = await response.json();
        
        console.log("데이터 요청이 성공적으로 처리되었습니다.");
        console.log(data); 
      } else {
        throw new Error("데이터 요청에 실패했습니다.");
      }
    } catch (error) {
      console.error(error);
    }
    return data.id;
});

export default dataID;