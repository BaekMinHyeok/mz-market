const checkboxContainer = document.querySelector(".checkbox-container");
document.addEventListener("DOMContentLoaded", async function () {
  try {
    const result = await getProductcategory();
    console.log(result.categorys[0].name);
    result.categorys.forEach((ary) => {
      const name = ary.name;
      const newLabel = document.createElement("label");
      newLabel.innerHTML = `
          <input type="radio"  name="category" onclick="updateCategoryValue(this)"> ${name}
      `;
      checkboxContainer.appendChild(newLabel);
    });
  } catch (err) {
    console.log(err);
  }
});

//카테고리 데이터 가져오기
async function getProductcategory() {
  const url = "http://kdt-sw-5-team11.elicecoding.com/api/category";
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
