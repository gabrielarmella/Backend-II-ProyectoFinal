import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import {engine} from 'express-handlebars';
import { CONFIG } from "./config.js";
import { initializePassport } from "./passport.config.js";
import router from "../routes/index.routes.js";
import { loggingMiddleware } from "../middlewares/logging.middlewares.js";
import __dirname from "../utils/constants.js";

const app = express();

app.use(loggingMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(CONFIG.COOKIE_SECRET));

app.use(
  session({
    secret: CONFIG.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname + '/../../public'));

app.engine('hbs', engine({extname: 'hbs',   
  runtimeOptions: {
  allowProtoPropertiesByDefault: true,
  allowProtoMethodsByDefault: true,
}}));

app.set('views', __dirname + '/../views');
app.set('view engine', 'hbs');

app.use("/", router);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    status: "error",
    message: err.message || "Error interno del servidor",
  });
});

export default app;