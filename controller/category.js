const { category } = require("../services/category");

//카테고리 등록
const registerCategory = async (req, res) => {
  try {
    const { name } = req.body;
    await category.register({ name });
    res.json({
      success: true,
      message: "카테고리 생성을 성공했습니다.",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error,
    });
  }
};

//카테고리 수정
const updateCategory = async (req, res) => {
  try {
    const { name, newName } = req.body;
    await category.update({ name, newName });
    res.json({
      success: true,
      message: "카테고리를 수정했습니다.",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error,
    });
  }
};

//카테고리 삭제
const deleteCategory = async (req, res) => {
  try {
    const name = req.params.name;
    const regexQuery = new RegExp(name, "i"); //한글 검색 처리에 필요
    await category.delete(regexQuery);
    res.json({
      success: true,
      message: "카테고리를 삭제했습니다.",
    });
  } catch (error) {
    res.json({
      success: false,
      menubar: error,
    });
  }
};

//카테고리 조회
const getAllCategory = async (req, res) => {
  try {
    const allCategory = await category.getAll();
    res.json({
      success: true,
      message: "카테고리를 조회했습니다.",
      categorys: allCategory,
    });
  } catch (error) {
    res.json({
      success: false,
      menubar: error,
      categorys: undefined,
    });
  }
};


module.exports = {
  registerCategory,
  updateCategory,
  deleteCategory,
  getAllCategory
};