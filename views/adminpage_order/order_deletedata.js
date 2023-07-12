const deleteData = async (orderId) => {
    const url = `http://localhost:3000/api/product/${orderId}`;
    const token = localStorage.getItem("token")
    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`,
        }
      });
      
      if (response.success) {
        console.log(response.message);
      } 
    } catch (error) {
      console.error(error);
    }
  };
  
  export default deleteData;