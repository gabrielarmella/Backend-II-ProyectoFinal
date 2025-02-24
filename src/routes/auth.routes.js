import { Router } from "express";
import passport from "passport";
import { authController } from "../controllers/auth.controllers.js";
import { validate } from "../middlewares/validation.middlewares.js";
import { loginDto } from "../dto/auth.dto.js";

const router = Router();

router.post(
    "/register", 
    passport.authenticate("register", { session: false }), 
    authController.register
);

router.post(
    "/login",
    validate(loginDto),
    passport.authenticate("login", { session: false }),
    (req, res) => {
      const token = req.token;
  
      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
      });
  
      res.json({ token });
    }
  );
router.post("/logout", authController.logout);
router.get("/jwt", passport.authenticate("jwt", { session: false }), authController.getCurrentUser);

export { router as authRouter };