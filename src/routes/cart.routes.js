import { Router } from "express";
import { cartController } from "../controllers/cart.controllers.js";

const router = Router();

router.get("/:cid", cartController.getCartById);
router.post("/", cartController.createCart);
router.post("/:cid/product/:pid", cartController.addProductToCart);
router.delete("/:cid/product/:pid", cartController.removeProductFromCart);
router.put("/:cid", cartController.updateCart);
router.put("/:cid/product/:pid", cartController.updateProductInCart);
router.delete("/:cid", cartController.clearCart);

export { router as cartRouter };