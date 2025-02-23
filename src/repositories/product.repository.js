import { ProductDAO } from '../dao/product.dao.js';
import { ProductDTO } from '../dto/product.dto.js';

export class ProductRepository {
  constructor() {
    this.productDAO = new ProductDAO();
  }

  async findById(id) {
    const product = await this.productDAO.findById(id);
    return new ProductDTO(product);
  }

  async findAll(query) {
    const products = await this.productDAO.findAll(query);
    return products.map(product => new ProductDTO(product));
  }

  async create(product) {
    const newProduct = await this.productDAO.create(product);
    return new ProductDTO(newProduct);
  }

  async update(id, productUpdate) {
    const updatedProduct = await this.productDAO.update(id, productUpdate);
    return new ProductDTO(updatedProduct);
  }

  async delete(id) {
    await this.productDAO.delete(id);
    return { message: 'Product deleted successfully' };
  }
}