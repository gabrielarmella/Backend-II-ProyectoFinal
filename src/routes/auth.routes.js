import { Router } from "express";
import passport from "passport";
import { userModel } from "../models/user.model.js";

export const authRouter = Router();

authRouter.post(
  "/register",
  async (req, res, next) => {
    try {
      const { email } = req.body;
      const existingUser = await userModel.findOne({ email });

      if (existingUser) {
        return res.status(400).json({ message: "El correo electrónico ya está registrado" });
      }

      next();
    } catch (error) {
      next(error);
    }
  },
  passport.authenticate("register", { session: false }),
  (req, res) => {
    res.redirect("/login"); 
  }
);

authRouter.post(
  "/login",
  passport.authenticate("login", { session: false, failureRedirect: "/login?error=true" }),
  (req, res) => {
    const { user, token } = req.user;

    res.cookie("currentUser", token, {
      httpOnly: true,
      signed: true,
      maxAge: 1000 * 60 * 60,
    });

    res.redirect("/products");
  }
);

authRouter.get(
  "/jwt",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const user = await userModel.findById(req.user.id);
      res.json(user);
    } catch (error) {
      res.status(400).json({ status: "error", message: error.message });
    }
  }
);
