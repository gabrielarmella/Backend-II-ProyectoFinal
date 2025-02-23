import { Router } from "express";
import { uploader } from "../utils/multer.utils.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { authorizeRole } from "../middlewares/autor.middleware.js";
import { productController } from "../controllers/product.controller.js";

const router = Router();

router.get("/", productController.getAllProducts);

router.post("/", authenticate, authorizeRole("admin"), uploader.array("thumbnails", 5), productController.createProduct);

export { router as productRouter };