import { Router } from "express";
import passport from "passport";

const sessionsRouter = Router();

sessionsRouter.get(
  "/current",
  passport.authenticate("current", { session: false }),
  (req, res) => {
    res.json(req.user);
  }
);

export default sessionsRouter;