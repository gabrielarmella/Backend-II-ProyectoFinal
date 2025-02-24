import mongoose from "mongoose";
import { hashPassword } from "../utils/password.utils.js";

const { Schema, model } = mongoose;

const  userSchema = new Schema({
  first_name: {type: String, required: true},
  last_name: {type: String, required: true},
  email: {
    type: String, 
    required: true,
    unique: true, 
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  age: {type: Number, required: true},
  password: {type: String, required: true},
  cart: { type: Schema.Types.ObjectId, ref: "Cart" },
  role: {
    type: String,
    required: true, 
    enum: ["admin", "user"],
    default: "user"
  },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

userSchema.pre("save", function (next) {
  const user = this;

  const emailRegex = /\S+@\S+\.\S+/;
  const isValidEmail = emailRegex.test(user.email);

  if (!isValidEmail) return next(new Error("Invalid email"));

  next();
});

userSchema.pre("save", async function (next) {
  const user = this;

  if (!user.isModified("password")) return next();

  const hashedPassword = await hashPassword(user.password);
  user.password = hashedPassword;

  next();
});

  export const User = model("User", userSchema);