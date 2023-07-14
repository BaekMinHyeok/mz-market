const { product } = require("../services/product");
const serverPath = "http://kdt-sw-5-team11.elicecoding.com";

// 상품 등록
const registerProduct = async (req, res) => {
  try {
    const imgPath = serverPath + req.file.path.substring(6);
    const data = JSON.parse(req.body.data);
    const productInfo = {
      name: data.name,
      description: data.description,
      price: data.price,
      category: data.category,
      gender: data.gender,
      images: imgPath,
    };
    // console.log(productInfo);
    await product.registerProduct(productInfo);

    res.json({
      success: true,
      message: "상품 등록에 성공했습니다.",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error,
    });
    console.log(error);
  }
};

// 상품 업데이트
const updateProduct = async (req, res) => {
  try {
    const { file } = req;
    const path = file && file.path;

    // const imgPath = serverPath + req.file.path.substring(6);
    const productId = req.params.productId;
    const updatedInfo = JSON.parse(req.body.data);

    //충래님 짱이에요
    if (path) updatedInfo.images = serverPath + path.substring(6);

    await product.updateProduct(productId, updatedInfo);
    res.json({
      success: true,
      message: "상품 업데이트에 성공했습니다.",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error,
    });
  }
};

// 모든 상품 목록 조회
const getAllProduct = async (req, res) => {
  try {
    const allProduct = await product.getAllProduct();
    res.json({
      success: true,
      message: "상품을 조회했습니다.",
      products: allProduct,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error,
      products: undefined,
    });
  }
};

// productId로 상품 정보 조회
const getProductById = async (req, res) => {
  try {
    const productId = req.params.productId;
    const productInfo = await product.getProductById(productId);
    res.json({
      success: true,
      message: "상품을 조회했습니다.",
      product: productInfo,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "실패",
      product: undefined,
    });
  }
};

// 상품 이름으로 검색
const getProductByName = async (req, res) => {
  try {
    const searchQuery = req.params.search;
    const productByName = await product.getProductByName(searchQuery);
    res.json({
      success: true,
      message: "상품을 조회했습니다.",
      productNames: productByName,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error,
      productNames: undefined,
    });
  }
};

// 상품 삭제
const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.productId;
    await product.deleteProduct(productId);

    res.json({
      success: true,
      message: "상품 삭제에 성공했습니다.",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error,
    });
  }
};

const getProductByGender = async (req, res) => {
  try {
    const gender = req.params.gender;
    const productInfo = await product.getProductByGender(gender);
    res.json({
      success: true,
      message: "상품을 조회했습니다.",
      product: productInfo,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error,
    });
  }
};

module.exports = {
  registerProduct,
  getAllProduct,
  getProductByName,
  updateProduct,
  deleteProduct,
  getProductById,
  getProductByGender,
};
