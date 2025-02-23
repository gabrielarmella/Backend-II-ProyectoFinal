import { cartModel } from '../models/mongodb/cart.model.js';

export class CartDAO {
  async findById(id) {
    return await cartModel.findById(id).populate('products.product');
  }

  async findAll() {
    return await cartModel.find().populate('products.product');
  }

  async create() {
    return await cartModel.create({ products: [] });
  }

  async addProduct(cartId, productId) {
    const cart = await cartModel.findById(cartId);
    if (!cart) throw new Error(`El carrito ${cartId} no existe!`);

    const productIndex = cart.products.findIndex(p => p.product.toString() === productId);
    if (productIndex !== -1) {
      cart.products[productIndex].quantity += 1;
    } else {
      cart.products.push({ product: productId, quantity: 1 });
    }

    await cart.save();
    return cart;
  }

  async removeProduct(cartId, productId) {
    const cart = await cartModel.findById(cartId);
    if (!cart) throw new Error(`El carrito ${cartId} no existe!`);

    cart.products = cart.products.filter(p => p.product.toString() !== productId);
    await cart.save();
    return cart;
  }

  async updateProductQuantity(cartId, productId, quantity) {
    const cart = await cartModel.findById(cartId);
    if (!cart) throw new Error(`El carrito ${cartId} no existe!`);

    const productIndex = cart.products.findIndex(p => p.product.toString() === productId);
    if (productIndex === -1) throw new Error(`El producto ${productId} no existe en el carrito ${cartId}!`);

    cart.products[productIndex].quantity = quantity;
    await cart.save();
    return cart;
  }

  async clear(cartId) {
    const cart = await cartModel.findById(cartId);
    if (!cart) throw new Error(`El carrito ${cartId} no existe!`);

    cart.products = [];
    await cart.save();
    return cart;
  }
}