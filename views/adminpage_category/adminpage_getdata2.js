async function fetchData2() {
  // 데이터를 요청할 URL을 설정합니다.
  const url = "http://localhost:3000/api/category";
  const token = localStorage.getItem("token")
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      }
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

export { fetchData2 };