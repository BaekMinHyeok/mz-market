async function fetchData() {
  // 데이터를 요청할 URL을 설정합니다.
  const url = "http://localhost:3000/api/product";
  try {
    const response = await fetch(url, {
      method: "GET",
    });
    const result = await response.json();
    console.log(result);
    if (result.success) {
      console.log("데이터 요청이 성공적으로 처리되었습니다.");
      return result;
    } else {
      throw new Error("데이터 요청에 실패했습니다.");
    }
  } catch (error) {
    throw new Error(error);
  }
}

export default fetchData;
