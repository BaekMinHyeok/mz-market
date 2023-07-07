const {
  Product
} = require("../models");
require("dotenv").config();

class ProductService {
  constructor(Product) {
    this.productModel = Product;
  }

  //상품등록
  async registerProduct(productInfo) {
    const {
      name,
      description,
      price,
      category,
      gender,
    } = productInfo
    return await this.productModel.create({
      name,
      description,
      price,
      category,
      gender,
    })
  }

  //multer 이미지 업로드 
  async uploadImg(productInfo) {
    const {
      image
    } = productInfo
    return await this.productModel.findOne({
      image
    });
  }

  // 상품 업데이트
  async updateProduct(productId, updatedInfo) {
    const updatedProduct = await this.productModel.findByIdAndUpdate(productId, updatedInfo, {
      new: true
    });
    return updatedProduct;
  }

  // 모든 상품 목록 가져오기
  async getAllProduct(productInfo) {
    const {
      name,
      description,
      price,
      category
    } = productInfo
    return await this.productModel.find({
      name,
      description,
      price,
      category
    })
  }

  // 특정 상품의 상세 정보 가져오기
  async getProductByName(productInfo) {
    const {
      name
    } = productInfo
    return await this.productModel.findOne({
      name
    });
  }

  // 상품 삭제
  async deleteProduct(productId) {
    return await this.productModel.deleteOne(productId);
  }


}

exports.product = new ProductService(Product);