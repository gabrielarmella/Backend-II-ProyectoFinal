import { CartDAO } from '../dao/cart.dao.js';
import { CartDTO } from '../dto/cart.dto.js';

export class CartRepository {
  constructor() {
    this.cartDAO = new CartDAO();
  }

  async findById(id) {
    const cart = await this.cartDAO.findById(id);
    return new CartDTO(cart);
  }

  async findAll() {
    const carts = await this.cartDAO.findAll();
    return carts.map(cart => new CartDTO(cart));
  }

  async create() {
    const newCart = await this.cartDAO.create();
    return new CartDTO(newCart);
  }

  async addProduct(cartId, productId) {
    const updatedCart = await this.cartDAO.addProduct(cartId, productId);
    return new CartDTO(updatedCart);
  }

  async removeProduct(cartId, productId) {
    const updatedCart = await this.cartDAO.removeProduct(cartId, productId);
    return new CartDTO(updatedCart);
  }

  async updateProductQuantity(cartId, productId, quantity) {
    const updatedCart = await this.cartDAO.updateProductQuantity(cartId, productId, quantity);
    return new CartDTO(updatedCart);
  }

  async clear(cartId) {
    const updatedCart = await this.cartDAO.clear(cartId);
    return new CartDTO(updatedCart);
  }
}