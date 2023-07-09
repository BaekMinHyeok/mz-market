const { Category } = require("../models");
require("dotenv").config();

class CategoryService {
  constructor(Category) {
    this.categoryModel = Category;
  }

  //카테고리 등록
  async register(info) {
    const { name } = info;
    try {
      await this.categoryModel.create({
        name,
      });
    } catch (error) {
      return error;
    }
  }

  //카테고리 수정
  async update(info) {
    const { name, newName } = info;
    const update = await this.categoryModel.findOne({ name: name });
    update.name = newName;
    await update.save();
  }

  //카테고리 조회
  async getAll() {
    await this.categoryModel.find();
  }

  //카테고리 삭제
  async delete(info) {
    const { name } = info;
    return await this.categoryModel.deletOne({ name: name });
  }

}

exports.category = new CategoryService(Category);
