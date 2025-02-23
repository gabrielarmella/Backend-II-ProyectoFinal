import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validation.middleware.js";
import { body } from "express-validator";
import { userController } from "../controllers/user.controller.js";

const router = Router();

// Ruta para obtener todos los usuarios
router.get("/", userController.getAllUsers);

// Ruta para crear un nuevo usuario
router.post(
  "/",
  [
    body("first_name").notEmpty().withMessage("First name is required"),
    body("last_name").notEmpty().withMessage("Last name is required"),
    body("email").isEmail().withMessage("Email is invalid"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
    validate,
  ],
  userController.createUser
);

// Ruta para obtener un usuario por ID
router.get("/:id", userController.getUserById);

// Ruta para obtener los datos del usuario actual
router.get("/current", authenticate, userController.getCurrentUser);

export { router as userRouter };