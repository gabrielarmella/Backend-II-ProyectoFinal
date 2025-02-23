import passport from "passport";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import { Strategy as LocalStrategy } from "passport-local";
import { createToken, SECRET } from "../utils/jwt.utils.js";
import {userService} from '../services/index.service.js';
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
          const userDTO = await userService.getUserByEmail(email);
          if (!userDTO) return done(null, false, { message: "Usuario no encontrado" });
          const isValidPassword = await comparePassword(password, userDTO.password);
          if (!isValidPassword)
            return done(null, false, { message: "Contraseña incorrecta" });
          const token = createToken({
            id: userDTO.id,
            email: userDTO.email,
            role: userDTO.role,
          });
          return done(null, { user: userDTO, token });
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
      const userDTO = await userService.getUserById(jwt_payload.id);
      if (userDTO) {
        return done(null, userDTO);
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(error, false);
    }
  }));

  passport.deserializeUser(async (id, done) => {
    try {
      const userDTO = await userService.getUserById(id);
      done(null, userDTO);
    } catch (error) {
      done(error);
    }
  });
  
  passport.deserializeUser(async (id, done) => {
    try {
      const userDTO = await userService.getUserById(id);
      done(null, userDTO);
    } catch (error) {
      done(error);
    }
  });


  function cookieExtractor(req) {
    return req && req.signedCookies ? req.signedCookies.currentUser : null;
  }
}