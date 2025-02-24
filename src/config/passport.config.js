import passport from "passport";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GitHubStrategy } from "passport-github2";
import { createToken, SECRET } from "../utils/jwt.utils.js";
import { comparePassword, hashPassword } from "../utils/password.utils.js";
import {userService} from '../services/index.service.js';
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
          const { firstName, lastName, age, role } = req.body;

          if (!firstName || !lastName || !age) {
            return done(null, false, { message: "Missing fields" });
          }

          const user = await userServices.registerUser({
            first_name: firstName,
            last_name: lastName,
            email,
            age,
            password,
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
        passReqToCallback: true,
      },
      async (req, email, password, done) => {
        try {
          const user = await userService.getUserByEmail({ email });

          if (!user) return done(null, false, { message: "User not found" });

          const isValidPassword = await comparePassword(password, user.password);

          if (!isValidPassword)
            return done(null, false, { message: "Invalid password" });

          const token = createToken({
            id: user.id,
            email: user.email,
            role: user.role,
          });

          req.token = token;

          return done(null, user);
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
            user = await userService.registerUser({
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
  passport.use(
    "jwt",
    new JWTStrategy(
      {
        secretOrKey: SECRET,
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
      },
      async (payload, done) => {
        try {
          const user = await userService.getUserById(payload.id);

          if (!user) return done(null, false);

          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await userService.getUserById(id);

    if (!user) return done(null, false);

    return done(null, user);
  });
}

function cookieExtractor(req) {
  return req && req.cookies ? req.cookies.token : null;
}