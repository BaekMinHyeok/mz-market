const { category } = require("../services/category");

//카테고리 등록
const registerCategory = async (req, res) => {
  try {
    await category.register({
      name: req.body.name,
    });
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

//카테고리 업데이트
const updateCategory = async (req, res) => {
  try {
    await category.update({
      name: req.body.name,
      newName: req.body.newName,
    });
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
    await category.delete({
      name: req.body.name,
    });
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