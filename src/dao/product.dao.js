import { Product} from "../models/Product.js";

export class ProductDAO {
  async findById(id) {
    return await Product.findById(id);
  }

  async findAll(query) {
    return await Product.find(query);
  }

  async create(product) {
    return await Product.create(product);
  }

  async update(id, productUpdate) {
    return await Product.findByIdAndUpdate(id, productUpdate, { new: true });
  }

  async delete(id) {
    return await Product.findByIdAndDelete(id);
  }
}