import { ProductRepository } from "../../repositories/product.repository.js";

const productRepository = new ProductRepository();

export class ProductService {
  constructor() {
    this.productRepository = new ProductRepository();
  }

  async getAllProducts() {
    return this.productRepository.findAll();
  }

  async getProductById(id) {
    return this.productRepository.findById(id);
  }

  async createProduct(productData) {
    return this.productRepository.create(productData);
  }

  async updateProduct(id, productUpdate) {
    return this.productRepository.update(id, productUpdate);
  }

  async deleteProduct(id) {
    return this.productRepository.delete(id);
  }
}

export const productService = new ProductService();