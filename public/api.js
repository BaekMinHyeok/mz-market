const getHeaders = (isFile = false) => {
  return {
    authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": isFile ? "multipart/form-data" : "application/json",
  };
};

export const getApi = async (path) => {
  try {
    const response = await fetch(path, {
      headers: getHeaders(),
    });

    if (response) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Failed to fetch data.");
    }
  } catch (error) {
    console.error("Error in GET request:", error);
    throw error;
  }
};

export const postApi = async (path, data) => {
  try {
    const response = await fetch(path, {
      method: "POST",
      body: JSON.stringify(data),
      headers: getHeaders(true),
    });

    if (response) {
      const result = await response.json();
      return result;
    } else {
      throw new Error("Failed to upload file.");
    }
  } catch (error) {
    console.error("Error in POST request:", error);
    throw error;
  }
};

export const putApi = async (path, data) => {
  try {
    const response = await fetch(path, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: getHeaders(),
    });

    if (response) {
      // console.log("Data updated successfully.");
    } else {
      throw new Error("Failed to update data.");
    }
  } catch (error) {
    console.error("Error in PUT request:", error);
    throw error;
  }
};

export const deleteApi = async (path) => {
  try {
    const response = await fetch(path, {
      method: "DELETE",
      headers: getHeaders(),
    });

    if (response) {
      // console.log("Data deleted successfully.");
    } else {
      throw new Error("Failed to delete data.");
    }
  } catch (error) {
    console.error("Error in DELETE request:", error);
    throw error;
  }
};
