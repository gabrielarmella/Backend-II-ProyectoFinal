import { cartService } from "../services/index.service.js";

class CartController {
  async getCartById(req, res, next) {
    try {
      const cart = await cartService.getProductsFromCartByID(req.params.cid);
      res.json({ status: "success", payload: cart });
    } catch (error) {
      next(error);
    }
  }

  async createCart(req, res, next) {
    try {
      const cart = await cartService.createCart();
      res.status(201).json({ status: "success", payload: cart });
    } catch (error) {
      next(error);
    }
  }

  async addProductToCart(req, res, next) {
    try {
      const cart = await cartService.addProductByID(req.params.cid, req.params.pid);
      res.json({ status: "success", payload: cart });
    } catch (error) {
      next(error);
    }
  }

  async removeProductFromCart(req, res, next) {
    try {
      const cart = await cartService.deleteProductByID(req.params.cid, req.params.pid);
      res.json({ status: "success", payload: cart });
    } catch (error) {
      next(error);
    }
  }

  async updateCart(req, res, next) {
    try {
      const cart = await cartService.updateAllProducts(req.params.cid, req.body.products);
      res.json({ status: "success", payload: cart });
    } catch (error) {
      next(error);
    }
  }

  async updateProductInCart(req, res, next) {
    try {
      const cart = await cartService.updateProductByID(req.params.cid, req.params.pid, req.body.quantity);
      res.json({ status: "success", payload: cart });
    } catch (error) {
      next(error);
    }
  }

  async clearCart(req, res, next) {
    try {
      const cart = await cartService.deleteAllProducts(req.params.cid);
      res.json({ status: "success", payload: cart });
    } catch (error) {
      next(error);
    }
  }
}

export const cartController = new CartController();