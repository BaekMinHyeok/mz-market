const deleteData = async (orderId) => {
  console.log(orderId);
  const url = `http://kdt-sw-5-team11.elicecoding.com/api/order/${orderId}`;
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    console.log(result);
    if (result.success) {
      console.log(result.message);
    } else {
      console.log("오류");
    }
  } catch (error) {
    console.error(error);
  }
};

export default deleteData;
