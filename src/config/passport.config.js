import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import UserService from "../services/user.service.js";
import dotenv from "dotenv";

dotenv.config();

const userService = new UserService();

export const config = (server) => {
    
    const jwtHeaderOptions = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET,
    };

    const jwtCookieOptions = {
        jwtFromRequest: (req) => req.cookies ? req.cookies["token"] : null,
        secretOrKey: process.env.JWT_SECRET,
    };

    const handleLogin = async (payload, done) => {
        try {
            const userFound = await userService.findOneById(payload.id);
            return done(null, userFound);
        } catch (error) {
            return done(null, false, { message: error.message });
        }
    };

    passport.use("jwt-header", new JwtStrategy(jwtHeaderOptions, handleLogin));
    passport.use("jwt-cookie", new JwtStrategy(jwtCookieOptions, handleLogin));

    server.use(passport.initialize());
};