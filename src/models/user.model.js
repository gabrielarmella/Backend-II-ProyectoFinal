import { Schema, model } from "mongoose";
import { hashPassword } from "../utils/password.utils.js";

const userSchema = new Schema({
  first_name: {type: String, required: true},
  last_name: {type: String, required: true},
  email: {
    type: String, 
    required: true, 
    unique: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  age: {type: Number, required: true},
  password: {type: String,required: true},
  cart: { type: Schema.Types.ObjectId, ref: "Cart" },
  role: {
    type: String,
    required: true, 
    enum: ["admin", "user"],
    default: "user"
  },
});

userSchema.pre("save", async function (next) {
  const user = this;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValidEmail = emailRegex.test(user.email);

  if (!isValidEmail) {
    return next(new Error("Correo electrónico inválido"));
  }

  if (user.isModified("password")) { 
    try {
      const hashedPassword = await hashPassword(user.password);
      user.password = hashedPassword;
    } catch (error) {
      return next(error); 
    }
  }
  next();
});
  export const userModel = model("user", userSchema);