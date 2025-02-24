import { Cart } from '../models/Cart.js';

export class CartDAO {
  async findById(id) {
  return await Cart.findById(id).populate('products.product');
  }

  async findAll() {
    try {
      return await Cart.find().populate('products.product');
    } catch (error) {
      console.error('Error al buscar todos los carritos:', error);
      throw error;
    }
  }

  async create() {
    try {
      return await Cart.create({ products: [] });
    } catch (error) {
      console.error('Error al crear un nuevo carrito:', error);
      throw error;
    }
  }

  async addProduct(cartId, productId) {
    try {
      const cart = await Cart.findById(cartId);
      if (!cart) throw new Error(`El carrito ${cartId} no existe`);

      const productIndex = cart.products.findIndex(p => p.product.toString() === productId);
      if (productIndex !== -1) {
        cart.products[productIndex].quantity += 1;
      } else {
        cart.products.push({ product: productId, quantity: 1 });
      }

      await cart.save();
      return cart;
    } catch (error) {
      console.error(`Error al añadir el producto ${productId} al carrito ${cartId}:`, error);
      throw error;
    }
  }

  async removeProduct(cartId, productId) {
    try {
      const cart = await cartModel.findById(cartId);
      if (!cart) throw new Error(`El carrito ${cartId} no existe`);

      cart.products = cart.products.filter(p => p.product.toString() !== productId);
      await cart.save();
      return cart;
    } catch (error) {
      console.error(`Error al eliminar el producto ${productId} del carrito ${cartId}:`, error);
      throw error;
    }
  }

  async updateProductQuantity(cartId, productId, quantity) {
    try {
      const cart = await Cart.findById(cartId);
      if (!cart) throw new Error(`El carrito ${cartId} no existe`);

      const productIndex = cart.products.findIndex(p => p.product.toString() === productId);
      if (productIndex === -1) throw new Error(`El producto ${productId} no existe en el carrito ${cartId}`);

      cart.products[productIndex].quantity = quantity;
      await cart.save();
      return cart;
    } catch (error) {
      console.error(`Error al actualizar la cantidad del producto ${productId} en el carrito ${cartId}:`, error);
      throw error;
    }
  }

  async clear(cartId) {
    try {
      const cart = await Cart.findById(cartId);
      if (!cart) throw new Error(`El carrito ${cartId} no existe`);

      cart.products = [];
      await cart.save();
      return cart;
    } catch (error) {
      console.error(`Error al vaciar el carrito ${cartId}:`, error);
      throw error;
    }
  }
}