import mongoose from "mongoose";
import { CONFIG } from "./config.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(CONFIG.MONGODB_URL, );
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};