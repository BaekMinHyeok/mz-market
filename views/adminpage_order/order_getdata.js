async function fetchData() {
    // 데이터를 요청할 URL을 설정합니다.
    const url = "http://localhost:3000/api/order";
    const token = localStorage.getItem("token")
    try{
      const response = await fetch(url,{
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
        }
      });
      const result = await response.json();
     
      if(result.success){
        return result;
      }
  
    }catch(error){
      console.log(error)
    }
  }
  
  export default fetchData;