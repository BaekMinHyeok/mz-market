const { product } = require("../services/product");
// const upload = multer({ dest: 'uploads/' });
const upload = require("../middlewares/multerconfig");

//상품등록
const registerProduct = async (req, res) => {
  try {
    // const image = uploadImg(req, res);
    await product.registerProduct({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      gender: req.body.gender,
      // images: image.map((img) => img.filename),
    });

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
    // const image = uploadImg(req, res);
    const productId = req.params.productId;
    const updatedInfo = req.body;
    // updatedInfo.images = image.map((img) => img.filename);
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

//multer 이미지 업로드
const uploadImg = async (req, res) => {
  try {
    //<input type="file" name="images" multiple> 속성이 필요
    upload.array("images")(req, res);
    return req.files;
  } catch (error) {
    return error;
  }
};

// 모든 상품 목록
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

// 상품 이름 검색
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
    const productId = req.params.productId; //:productId
    // console.log(productId);
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

module.exports = {
  registerProduct,
  uploadImg,
  getAllProduct,
  getProductByName,
  updateProduct,
  deleteProduct,
  getProductById,
};
