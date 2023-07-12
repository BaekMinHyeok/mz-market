async function getProductcategory() {

    const url = "http://localhost:3000/api/category";
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
  
      const result = await response.json();
  
      if (result.success) {
        console.log(result.message);
        
        return result;
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  export default getProductcategory;