import dotenv from "dotenv";

dotenv.config();

export const CONFIG = {
    PORT: process.env.PORT,
    MONGODB_URL: process.env.MONGODB_URL,
    JWT: {
        SECRET: process.env.JWT_SECRET,
        EXPIRES_IN: process.env.JWT_EXPIRES_IN,
    },
    MAIL:{
        USER: process.env.MAILER_USER,
        PASSWORD: process.env.MAILER_PASSWORD,
        HOST: process.env.MAILER_HOST,
        PORT: process.env.MAILER_PORT,
    },
    SMS: {
        SID: process.env.TWILIO_SID,
        TOKEN: process.env.TWILIO_AUTH_TOKEN,
        PHONE: process.env.TWILIO_SMS_NUMBER,
    },
    PERSISTENCE: process.env.PERSISTENCE,
    CLIENT_ORIGIN: process.env.CLIENT_ORIGIN,
    COOKIE_SECRET: process.env.COOKIE_SECRET,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
};