const { Product } = require("../models");
require("dotenv").config();

class ProductService {
  constructor(Product) {
    this.productModel = Product;
  }

  //상품 등록
  async registerProduct(productInfo) {
    const { name, description, price, category, gender, images } = productInfo;
    let productId;
    // 가장 최신 값 가져오기
    try {
      const vl = this.productModel.findOne().sort({ _id: -1 }); // 1은 가장 오래된 값, -1은 가장 최근의 값
      const data = await vl.exec();
      productId = data.productId + 1;
    } catch (error) {
      productId = 1;
    }

    try {
      await this.productModel.create({
        productId,
        name,
        description,
        price,
        category,
        gender,
        images,
      });
    } catch (error) {
      return error;
    }
  }

  // 상품 정보 수정
  async updateProduct(productId, updatedInfo) {
    const product = await this.productModel.findOne({ productId: productId });

    if (!product) {
      throw "해당 제품을 찾을 수 없습니다.";
    }

    Object.assign(product, updatedInfo);
    await product.save();
    
  }

  // 상품 정보 조회
  async getAllProduct() {
    return await this.productModel.find();
  }

  // product Id로 특정 상품의 상세 정보 가져오기
  async getProductById(productId) {
    return await this.productModel.findOne({
      productId: productId,
    });
  }

  // 특정 상품의 상세 정보 가져오기
  async getProductByName(searchQuery) {
    const regexQuery = new RegExp(searchQuery, "i"); //한글 검색 처리에 필요
    const products = await this.productModel.find({
      name: regexQuery,
    });
    return products;
  }

  // 상품 삭제
  async deleteProduct(productId) {
    return await this.productModel.deleteOne({ productId: productId });
  }
}

exports.product = new ProductService(Product);
