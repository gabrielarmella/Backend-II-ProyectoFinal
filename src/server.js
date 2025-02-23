import express from "express";
import { connect } from "mongoose";
import { engine } from 'express-handlebars';
import { Server } from 'socket.io';
import { CONFIG } from "./config/config.js";
import morgan from 'morgan';
import __dirname from './utils/constantsUtil.js';
import websocket from './websocket.js'; 
import cookieParser from 'cookie-parser';
import passport from 'passport';
import { initializePassport } from './config/passport.config.js';
import router from './routes/index.routes.js';
import { errorHandler } from "./middlewares/errorHandler.middleware.js";
import { SERVICES } from "./common/enums/services.js";

const app = express();


app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(CONFIG.COOKIE_SECRET));
initializePassport();
app.use(passport.initialize());
app.use(express.static(__dirname + '/../../public'));



if (CONFIG.PERSISTENCE === SERVICES.MONGODB) {
  connect(CONFIG.MONGODB_URL)
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => {
      console.error('Error connecting to MongoDB:', error.message);
      process.exit(1); 
    });
}

app.engine('hbs', engine({extname: 'hbs',   
  runtimeOptions: {
  allowProtoPropertiesByDefault: true,
  allowProtoMethodsByDefault: true,
}}));

app.set('views', __dirname + '/../views');
app.set('view engine', 'hbs');

app.use('/', router);

app.use(errorHandler);

const httpServer = app.listen(CONFIG.PORT, () => {
  console.log(`Server running on port http://localhost:${CONFIG.PORT}`);
});

const io = new Server(httpServer);

websocket(io);