import { ProductDAO } from '../dao/product.dao.js';
import { ProductDto } from '../dto/product.dto.js';

export class ProductRepository {
  constructor() {
    this.productDAO = new ProductDAO();
  }

  async findById(id) {
    const product = await this.productDAO.findById(id);
    return product;
  }

  async findAll(query) {
    const products = await this.productDAO.findAll(query);
    return products;
  }

  async create(product) {
    const { error } = ProductDto.validate(product);
    if (error) {
      throw new Error(`Validation error: ${error.details[0].message}`);
    }

    const newProduct = await this.productDAO.create(product);
    return newProduct;
  }

  async update(id, productUpdate) {
    const { error } = ProductDto.validate(productUpdate);
    if (error) {
      throw new Error(`Validation error: ${error.details[0].message}`);
    }

    const updatedProduct = await this.productDAO.update(id, productUpdate);
    return updatedProduct;
  }

  async delete(id) {
    await this.productDAO.delete(id);
    return { message: 'Product deleted successfully' };
  }
}