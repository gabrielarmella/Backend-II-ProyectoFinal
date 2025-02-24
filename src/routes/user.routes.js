import { Router } from "express";
import { userController } from "../controllers/user.controllers.js";
import { isAuthenticated, hasRole } from "../middlewares/auth.middlewares.js";
import { validateUserRegistration, validatePhoneNumber } from "../middlewares/validation.middlewares.js";

const router = Router();

router.get("/", isAuthenticated, userController.getAllUsers);
router.get("/:id", isAuthenticated, userController.getUserById);
router.post("/", validateUserRegistration, userController.registerUser);
router.put("/:id", isAuthenticated, hasRole(["admin", "manager"]), userController.updateUser);
router.delete("/:id", isAuthenticated, hasRole(["admin"]), userController.deleteUser);
router.post("/phone", validatePhoneNumber, userController.addPhoneNumber);

export { router as userRouter };