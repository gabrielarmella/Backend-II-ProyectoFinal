import { config } from "dotenv";

config();

export const CONFIG = {
    PORT: process.env.PORT,
    MONGODB_URI: process.env.MONGODB_URI,
    JWT: {
        SECRET: process.env.JWT_SECRET,
        EXPIRES_IN: process.env.JWT_EXPIRES_IN || "1d",
    },
    CLIENT_ORIGIN: process.env.CLIENT_ORIGIN,
};