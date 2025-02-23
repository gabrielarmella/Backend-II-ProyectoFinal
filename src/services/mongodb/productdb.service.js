import { ProductRepository } from "../../repositories/product.repository.js";

const productRepository = new ProductRepository();

export class ProductService {
  async getAllProducts(query) {
    return productRepository.getAllProducts(query);
  }

  async getProductById(id) {
    return productRepository.getProductById(id);
  }

  async createProduct(data) {
    return productRepository.createProduct(data);
  }

  async updateProduct(id, data) {
    return productRepository.updateProduct(id, data);
  }

  async deleteProduct(id) {
    return productRepository.deleteProduct(id);
  }
}