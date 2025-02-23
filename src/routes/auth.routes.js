import { Router } from "express";
import passport from "passport";
import { userModel } from "../models/mongodb/user.model.js";

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
  (req, res, next) => {
    passport.authenticate("login", { session: false }, (err, user, info) => {
      if (err) return next(err);
      if (!user) return res.status(401).json({ message: info.message });

      const token = user.token;
      res.cookie("currentUser", token, {
        httpOnly: true,
        signed: true,
        maxAge: 1000 * 60 * 60,
      });
      res.json({ token, user: user.user });
    })(req, res, next);
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

authRouter.get("/github", passport.authenticate("github", { scope: ["user:email"] }));

authRouter.get(
  "/github/callback",
  (req, res, next) => {
    passport.authenticate("github", { failureRedirect: "/login" }, (err, user, info) => {
      if (err) return next(err);
      if (!user) return res.redirect("/login");

      req.logIn(user, (err) => {
        if (err) return next(err);
        res.redirect("/products");
      });
    })(req, res, next);
  }
);