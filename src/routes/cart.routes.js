import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { cartController } from "../controllers/cart.controller.js";

const router = Router();

router.get("/:cid", authenticate, cartController.getCartById);
router.post("/", authenticate, cartController.createCart);
router.post("/:cid/product/:pid", authenticate, cartController.addProductToCart);
router.delete("/:cid/product/:pid", authenticate, cartController.removeProductFromCart);
router.put("/:cid", authenticate, cartController.updateCart);
router.put("/:cid/product/:pid", authenticate, cartController.updateProductInCart);
router.delete("/:cid", authenticate, cartController.clearCart);

export { router as cartRouter };