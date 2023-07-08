const { Category } = require("../models");

class CategoryService {
  constructor(Category) {
    this.categoryModel = Category;
  }

  async register(info) {
    const { name } = info;
    try {
      this.categoryModel.create({
        name,
      });
    } catch (error) {
      return error;
    }
  }

  async update(info) {
    const { name, newName } = info;
    const update = await this.categoryModel.findOne({ name: name });
    update.name = newName;
    await update.save();
  }

  async delete(info) {
    const { name } = info;
    await this.categoryModel.deletOne({ name: name });
  }

  async getAll() {
    await this.categoryModel.find();
  }
}
