import { CartRepository } from '../../repositories/cart.repository.js';

const cartRepository = new CartRepository();

export class CartService {
  async getAllCarts() {
    return cartRepository.getAllCarts();
  }

  async getCartById(id) {
    return cartRepository.getCartById(id);
  }

  async createCart() {
    return cartRepository.createCart();
  }

  async addProductToCart(cartId, productId) {
    return cartRepository.addProductToCart(cartId, productId);
  }

  async removeProductFromCart(cartId, productId) {
    return cartRepository.removeProductFromCart(cartId, productId);
  }

  async updateProductQuantity(cartId, productId, quantity) {
    return cartRepository.updateProductQuantity(cartId, productId, quantity);
  }

  async clearCart(cartId) {
    return cartRepository.clearCart(cartId);
  }
}