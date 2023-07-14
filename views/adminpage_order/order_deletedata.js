const deleteData = async (orderId) => {
  // console.log(orderId);
  // const url = `http://localhost:3000/api/order/${orderId}`;
  const url = `/api/order/${orderId}`;
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    // console.log(result);
    if (result.success) {
      // console.log(result.message);
      location.reload();
    } else {
      // console.log("오류");
      alert("에러가 발생했어요. 관리자에게 문의해주세요.");
    }
  } catch (error) {
    console.error(error);
    alert("에러가 발생했어요. 관리자에게 문의해주세요.");
  }
};

export default deleteData;
