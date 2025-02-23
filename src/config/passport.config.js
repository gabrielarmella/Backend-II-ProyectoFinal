import passport from "passport";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GitHubStrategy } from "passport-github2";
import { createToken, SECRET } from "../utils/jwt.utils.js";
import {userService} from '../services/index.service.js';
import {userModel} from '../models/mongodb/user.model.js';
import { comparePassword, hashPassword } from "../utils/password.utils.js";
import {CONFIG} from '../config/config.js';

export function initializePassport() {
  passport.use(
    "register",
    new LocalStrategy(
      {
        passReqToCallback: true,
        usernameField: "email",
      },
      async (req, email, password, done) => {
        try {
          const { first_name, last_name, age, role } = req.body;

          if (!first_name || !last_name || !age) {
            return done(null, false, { message: "Campos incompletos" });
          }
          const hashedPassword = await hashPassword(password);

          const user = await userModel.create({
            first_name,
            last_name,
            email,
            age,
            password: hashedPassword,
            role,
          });

          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
  passport.use(
    "login",
    new LocalStrategy(
      {
        usernameField: "email",
      },
      async (email, password, done) => {
        try {
          const user = await userService.getUserByEmail(email);
          if (!user) return done(null, false, { message: "Usuario no encontrado" });
          if (!user.password) return done(null, false, { message: "Contraseña no encontrada" });
          const isValidPassword = await comparePassword(password, user.password);
          if (!isValidPassword) return done(null, false, { message: "Contraseña incorrecta" });
          const token = createToken({
            id: user.id,
            email: user.email,
            role: user.role,
          });
          return done(null, { user, token });
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    new GitHubStrategy(
      {
        clientID: CONFIG.GITHUB_CLIENT_ID,
        clientSecret: CONFIG.GITHUB_CLIENT_SECRET,
        callbackURL: `${CONFIG.CLIENT_ORIGIN}/api/auth/github/callback`,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const email = profile.emails && profile.emails[0] ? profile.emails[0].value : null;
          if (!email) {
            return done(null, false, { message: "Correo electrónico requerido" });
          }
          let user = await userService.getUserByEmail(email);
          if (!user) {
            user = await userService.create({
              first_name: profile.displayName || profile.username,
              last_name: "",
              email: profile.emails[0].value,
              password: "",
              role: "user",
            });
          }
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: SECRET,
  };

  passport.use(new JWTStrategy(opts, async (jwt_payload, done) => {
    try {
      const user = await userService.getUserById(jwt_payload.id);
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(error, false);
    }
  }));

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await userService.getUserById(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });



  function cookieExtractor(req) {
    return req && req.signedCookies ? req.signedCookies.currentUser : null;
  }
}