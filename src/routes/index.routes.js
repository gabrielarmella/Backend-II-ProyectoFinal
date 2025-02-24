import { Router } from "express";
import { userRouter } from "./user.routes.js";
import { authRouter } from "./auth.routes.js";
import { cartRouter } from "./cart.routes.js";
import { productRouter } from "./product.routes.js";
import { sessionsRouter } from "./sessions.routes.js";
import { viewsRouter } from "./views.routes.js";

const router = Router();

router.use("/api/users", userRouter);
router.use("/api/auth", authRouter);
router.use("/api/carts", cartRouter);
router.use("/api/products", productRouter);
router.use("/api/sessions", sessionsRouter);
router.use("/", viewsRouter);

export default router;