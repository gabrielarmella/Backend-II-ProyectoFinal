import { Router } from "express";
import passport from "passport";

export const sessionsRoutes = Router();

sessionsRoutes.post(
  "/login",
  passport.authenticate("login", {
    failureRedirect: "/api/sessions/fail-login",
  }),
  async (req, res) => {
    if (!req.user)
      return res
        .status(401)
        .json({ message: "Unauthorized", details: req.authInfo });

    req.session.user = {
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      email: req.user.email,
      age: req.user.age,
    };

    res.status(200).json({ message: "User logged in", user: req.session.user });
  }
);

sessionsRoutes.get("/fail-login", (req, res) => {
  return res.status(500).json({
    message: "Internal server error",
  });
});

sessionsRoutes.post(
  "/register",
  passport.authenticate("register", {
    failureRedirect: "/api/sessions/fail-register",
  }),
  (req, res) => {
    if (!req.user)
      return res
        .status(500)
        .json({ message: "Internal server error", details: req.authInfo });

    return res.status(201).json({ message: "User created", user: req.user });
  }
);

sessionsRoutes.get("/fail-register", (req, res) => {
  return res.status(500).json({ message: "Internal server error" });
});

sessionsRoutes.get("/logout", (req, res) => {
  req.session.destroy();
  return res.status(200).json({ message: "User logged out" });
});


sessionsRoutes.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json(req.user);
  }
);


export default sessionsRoutes;