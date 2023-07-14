async function fetchData() {
  // 데이터를 요청할 URL을 설정합니다.
  const url = "http://kdt-sw-5-team11.elicecoding.com/api/product";
  try {
    const response = await fetch(url, {
      method: "GET",
    });
    const result = await response.json();
    if (result.success) {
      return result;
    } else {
      throw new Error("데이터 요청에 실패했습니다.");
    }
  } catch (error) {
    throw new Error(error);
  }
}

export default fetchData;
