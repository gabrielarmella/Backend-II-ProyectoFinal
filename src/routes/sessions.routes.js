import { Router } from "express";
import passport from "passport";
import { sessionsController } from "../controllers/sessions.controllers.js";

const router = Router();

router.post("/login", passport.authenticate("login", { failureRedirect: "/api/sessions/fail-login" }), sessionsController.login);
router.get("/fail-login", (req, res) => res.status(500).json({ message: "Internal server error" }));
router.post("/register", passport.authenticate("register", { failureRedirect: "/api/sessions/fail-register" }), sessionsController.register);
router.get("/fail-register", (req, res) => res.status(500).json({ message: "Internal server error" }));
router.get("/logout", sessionsController.logout);
router.get("/current", passport.authenticate("jwt", { session: false }), sessionsController.getCurrentUser);

export { router as sessionsRouter };