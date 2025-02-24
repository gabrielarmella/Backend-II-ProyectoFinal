import { connectDB } from "./config/database.config.js";
import app from "./config/server.config.js";
import { CONFIG } from "./config/config.js";

connectDB();

const server = app.listen(CONFIG.PORT, () => {
  console.log(`Server running on port http://localhost:${CONFIG.PORT}`);
});

import { Server } from "socket.io";
import websocket from "./utils/websocket.utils.js";

const io = new Server(server);
websocket(io);