const {
  product
} = require("../services/user");
// const upload = multer({ dest: 'uploads/' });
const upload = require("../middlewares/multerconfig");

//상품등록
const registerProduct = async (req, res) => {
  try {
    const image = uploadImg(req, res);
    const newProduct = await product.registerProduct({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      gender: req.body.gender,
      images: image.map((img) => img.filename),
    });
    res.send(newProduct);
  } catch (error) {
    //res.status(500).send("상품 등록에 실패했습니다.");
  }
};

// 상품 업데이트
const updateProduct = async (req, res) => {
  try {
    const image = uploadImg(req, res);
    const productId = req.params.productId;
    const updatedInfo = req.body;
    updatedInfo.images = image.map((img) => img.filename);
    const updatedProduct = await product.updateProduct(productId, updatedInfo);

    res.json({
      success: true,
      message: "상품 업데이트에 성공했습니다."
    })
  } catch (error) {
    res.json({
      success: false,
      message: error,
    })
  }
};

//multer 이미지 업로드
const uploadImg = async (req, res) => {
  try {
    //<input type="file" name="images" multiple> 속성이 필요
    upload.array("images")(req, res, async (error) => {
      if (error) {
        // return res.status(500).json({ error: "이미지 업로드에 실패했습니다." });
      }

      return req.files;
    });
  } catch (error) {
    res.json({
      success: false,
      message: error,
    })
  }
};

// 모든 상품 목록
const getAllProduct = async (req, res) => {
  try {
    const allProduct = await product.getAllProduct();
    res.json({
      success: true,
      message: "상품을 조회했습니다.",
    })
  } catch (error) {
    res.json({
      success: false,
      message: error,
    })
  }
};

// 상품 이름 검색
const getProductByName = async (req, res) => {
  try {
    const productByName = await product.getProductByName({
      name: req.body.name,
    });

    res.json(productByName);
  } catch (err) {

  }
};

// 상품 삭제

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.productId;
    const deletedProduct = await product.deleteProduct(productId);

    res.send(deletedProduct);
  } catch (err) {
    // res.status(500).json({
    //   error : "제품 삭제를 실패했습니다. "
    // })
  }
};

module.exports = {
  registerProduct,
  uploadImg,
  getAllProduct,
  getProductByName,
  updateProduct,
  deleteProduct,
};

module.exports = {
  registerProduct,
  uploadImg,
  getAllProduct,
  getProductByName,
  updateProduct,
  deleteProduct
}