import express from "express";
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import productRouter from './routes/product.routes.js';
import cartRouter from './routes/cart.routes.js';
import viewsRouter from './routes/views.routes.js';
import { customAuthRouter } from './routes/customAuth.routes.js'; 
import __dirname from './utils/constantsUtil.js';
/* import websocket from './websocket.js'; */

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser("mysecret"));

app.use(express.static(__dirname + '/../public'));

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((error) => {
    console.log("Error connecting to the database", error);
  });

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/../views');
app.set('view engine', 'handlebars');

app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/", viewsRouter);
app.use('/api/auth', customAuthRouter);
/* app.use("/api/users", passport.authenticate("jwt", { session: false }), userRouter); */
/* app.use("/api/sessions", sessionsRoutes); */


const PORT = process.env.PORT || 8080;
const httpServer = app.listen(PORT, () => {
  console.log(`Start server in PORT http://localhost:${PORT}`);
});

const io = new Server(httpServer);