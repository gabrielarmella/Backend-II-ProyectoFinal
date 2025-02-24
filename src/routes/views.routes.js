import { Router } from "express";
import passport from "passport";
import { viewsController } from "../controllers/views.controllers.js";

const router = Router();

router.get("/", viewsController.renderHome);
router.get("/login", viewsController.renderLogin);
router.get("/register", viewsController.renderRegister);
router.get("/profile", passport.authenticate("jwt", { session: false }), viewsController.renderProfile);
router.get("/products", viewsController.renderProducts);
router.get("/realtimeproducts", viewsController.renderRealTimeProducts);
router.get("/cart/:cid", viewsController.renderCart);

export { router as viewsRouter };