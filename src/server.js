import express from "express";
import passport from "passport";
import cookieParser from "cookie-parser";
import  { engine } from 'express-handlebars';
import { Server } from 'socket.io';
import {CONFIG} from "./config/config.js";
import {mongoDBProvider} from "./providers/mongodb.provider.js";
import productRouter from './routes/product.routes.js';
import cartRouter from './routes/cart.routes.js';
import morgan from 'morgan';
import viewsRouter from './routes/views.routes.js';
import { authRouter } from "./routes/auth.routes.js";
import { userRouter } from "./routes/user.routes.js";
import { sessionsRoutes } from "./routes/sessions.routes.js";
import { initializePassport } from "./config/passport.config.js";
import __dirname from './utils/constantsUtil.js';
import websocket from './websocket.js'; 

const app = express();


app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
initializePassport();
app.use(passport.initialize());
app.use(express.static(__dirname + '/../public'));
app.use(express.static(__dirname + '/../public/imagenes'));


mongoDBProvider
.connect(CONFIG.MONGODB_URI,{
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("Connected to MongoDB");
})
.catch((error) => {
  console.log("Error connecting to MongoDB", error);
});

app.engine('hbs', engine({extname: 'hbs',   
  runtimeOptions: {
  allowProtoPropertiesByDefault: true,
  allowProtoMethodsByDefault: true,
}}));

app.set('views', __dirname + '/../views');
app.set('view engine', 'hbs');

app.use('/products', productRouter);
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/", viewsRouter);
app.use('/api/auth', authRouter);
app.use("/api/users", passport.authenticate("jwt", { session: false }), userRouter); 
app.use("/api/sessions", sessionsRoutes);


const httpServer = app.listen(CONFIG.PORT, () => {
  console.log(`Server running on port http://localhost:${CONFIG.PORT}`);
});

const io = new Server(httpServer);

websocket(io);