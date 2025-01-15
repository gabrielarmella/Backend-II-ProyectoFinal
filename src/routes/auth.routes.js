import { Router } from "express";
import passport from "passport";

export const authRouter = Router();

authRouter.post(
  "/register",
  passport.authenticate("register", { session: false }),
  (req, res) => {
    res.json(req.user);
  }
);

authRouter.post(
  "/login",
  passport.authenticate("login", { session: false }),
  (req, res) => {
    const { user, token } = req.user;

    res.cookie("currentUser", token, {
      httpOnly: true,
      signed: true,
      maxAge: 1000 * 60 * 60,
    });

    res.json({ token, user });
  }
);

authRouter.get(
  "/jwt",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json(req.user);
  }
);