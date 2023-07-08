const { Product } = require("../models");
require("dotenv").config();

class ProductService {
  constructor(Product) {
    this.productModel = Product;
  }

  //상품 등록
  async registerProduct(productInfo) {
    const { name, description, price, category, gender } = productInfo;
    let productId;
    // 가장 최신 값 가져오기
    const vl = this.productModel.findOne().sort({ _id: -1 }); // 1은 가장 오래된 값, -1은 가장 최근의 값
    const data = await vl.exec();
    productId = data.productId;
    productId = productId === undefined ? 1 : data.productId + 1;

    try {
      await this.productModel.create({
        productId,
        name,
        description,
        price,
        category,
        gender,
      });
    } catch (error) {
      return error;
    }
  }

  //multer 이미지 업로드
  async uploadImg(productInfo) {
    const { image } = productInfo;
    return await this.productModel.findOne({
      image,
    });
  }

  // 상품 정보 수정
  async updateProduct(productId, updatedInfo) {
    const updatedProduct = await this.productModel.findByIdAndUpdate(
      productId,
      updatedInfo,
      {
        new: true,
      }
    );
    return updatedProduct;
  }

  // 상품 정보 조회
  async getAllProduct() {
    return await this.productModel.find();
  }

  // 특정 상품의 상세 정보 가져오기
  async getProductByName(productInfo) {
    const { name } = productInfo;
    return await this.productModel.findOne({
      name: name,
    });
  }

  // 상품 삭제
  async deleteProduct(productId) {
    return await this.productModel.deleteOne({ productId: productId });
  }
}

exports.product = new ProductService(Product);
