const deleteData = async (productId) => {
  console.log(productId);
  const url = `http://localhost:3000/api/product/${productId}`;
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    if (response.success) {
      console.log("삭제성공", response.message);
    } else {
      console.log("삭제실패");
    }
  } catch (error) {
    console.error(error);
  }
};

export default deleteData;
