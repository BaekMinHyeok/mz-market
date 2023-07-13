const deleteData = async (productId) => {
  const url = `http://kdt-sw-5-team11.elicecoding.com/api/product/${productId}`;
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    if (response.success) {
      console.log(response.message);
    }
  } catch (error) {
    console.error(error);
  }
};

export default deleteData;
