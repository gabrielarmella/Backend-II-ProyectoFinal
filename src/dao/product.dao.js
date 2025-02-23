import { productModel } from '../models/mongodb/product.model.js';

export class ProductDAO {
  async findById(id) {
    return await productModel.findById(id);
  }

  async findAll(query) {
    return await productModel.find(query);
  }

  async create(product) {
    return await productModel.create(product);
  }

  async update(id, productUpdate) {
    return await productModel.findByIdAndUpdate(id, productUpdate, { new: true });
  }

  async delete(id) {
    return await productModel.findByIdAndDelete(id);
  }
}