import passport from "passport";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import { Strategy as LocalStrategy } from "passport-local";
import { createToken, SECRET } from "../utils/jwt.utils.js";
import { userModel } from "../dao/models/user.model.js";
import { comparePassword, hashPassword } from "../utils/password.utils.js";

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

          const hashedPassword = hashPassword(password);

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
          const user = await userModel.findOne({ email });

          if (!user) return done(null, false, { message: "Usuario no encontrado" });

          const isValidPassword = await comparePassword(password, user.password);

          if (!isValidPassword)
            return done(null, false, { message: "Contraseña incorrecta" });

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

  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: SECRET,
  };

  passport.use(new JWTStrategy(opts, async (jwt_payload, done) => {
    try {
      const user = await userModel.findById(jwt_payload.id);
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err, false);
    }
  }));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await userModel.findById(id);

    if (!user) return done(null, false);

    return done(null, user);
  });
}

function cookieExtractor(req) {
  return req && req.signedCookies ? req.signedCookies.currentUser : null;
}