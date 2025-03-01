import jwt from "jsonwebtoken";
import passport from "passport";
import UserManager from "../managers/user.manager.js";
import { JWT_TRANSLATIONS } from "../constants/messages.constant.js";

const userManager = new UserManager();

export const generateToken = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const userFound = await userManager.getOneEmailAndPassword(email, password);

        const token = jwt.sign({ id: userFound.id }, process.env.JWT_SECRET, { expiresIn: "24h" });

        req.token = token;

        res.cookie("token", token, { maxAge: 2 * 60 * 60 * 1000, httpOnly: true });

        next();
    } catch (error) {
        next(error);
    }
};

export const checkAuth = (req, res, next) => {
    const jwtStrategy = req.cookies["token"] ? "jwt-cookie" : "jwt-header";

    passport.authenticate(jwtStrategy, { session: false }, (error, user, info) => {
        if (error) return next(error);

        if (!user) {
            return next(new Error(JWT_TRANSLATIONS[info.message] ?? info.message));
            res.redirect("/");
        }
        req.id = user.id;
        req.roles = user.roles;
        req.email = user.email;

        next();
    })(req, res, next);
};