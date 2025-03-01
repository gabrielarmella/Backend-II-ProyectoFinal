import express from "express";
import cookieParser from "cookie-parser";
import paths from "./utils/paths.js";
import { config as configDotenv } from "./config/dotenv.config.js";
import { connectDB } from "./config/mongoose.config.js";
import { config as configHandlebars } from "./config/handlebars.config.js";
import { config as configPassport } from "./config/passport.config.js";
import { config as configCORS } from "./config/cors.config.js";

import SessionRouter from "./routes/api/session.router.js";
import CartRouter from "./routes/api/cart.router.js";
import ProductRouter from "./routes/api/product.router.js";
import UserRouter from "./routes/api/user.router.js";
import HomeViewRouter from "./routes/home.view.router.js";

const app = express();

configHandlebars(app);

app.use(express.static(paths.public));

configDotenv();
connectDB();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieParser(process.env.SECRET_KEY));

app.use("/public", express.static(paths.public));


configHandlebars(app);


configPassport(app);


configCORS(app);

app.use("/api/carts", new CartRouter().getRouter());
app.use("/api/products", new ProductRouter().getRouter());
app.use("/api/session", new SessionRouter().getRouter());
app.use("/api/users", new UserRouter().getRouter());
app.use("/", new HomeViewRouter().getRouter());


app.use("*", (req, res) => {
    res.status(404).send("<h1>Error 404</h1><h3>La URL indicada no existe en este servidor</h3>");
});


app.use((error, req, res) => {
    console.log("Error:", error.message);
    res.status(500).send("<h1>Error 500</h1><h3>Se ha generado un error en el servidor</h3>");
});


app.listen(process.env.PORT, () => {
    console.log(`Ejecutándose en http://localhost:${process.env.PORT}`);
});