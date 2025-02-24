import { CartRepository } from "../../repositories/cart.repository.js";

const cartRepository = new CartRepository();

export class CartService {
  constructor() {
    this.cartRepository = new CartRepository();
  }

  async getCartById(id) {
    return this.cartRepository.findById(id);
  }

  async createCart(cartData) {
    return this.cartRepository.create(cartData);
  }

  async updateCart(id, cartUpdate) {
    return this.cartRepository.update(id, cartUpdate);
  }

  async deleteCart(id) {
    return this.cartRepository.delete(id);
  }

  async addProductToCart(cartId, productId, quantity) {
    return this.cartRepository.addProduct(cartId, productId, quantity);
  }

  async removeProductFromCart(cartId, productId) {
    return this.cartRepository.removeProduct(cartId, productId);
  }
}

export const cartService = new CartService();