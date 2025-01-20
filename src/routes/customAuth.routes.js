import express from "express";
import { userModel } from "../dao/models/user.model.js";
import { createToken } from "../utils/jwt.utils.js";
import { hashPassword, comparePassword } from "../utils/password.utils.js";

const customAuthRouter = express.Router();


customAuthRouter.post("/register", async (req, res) => {
  const { first_name, last_name, email, password, age, role } = req.body;

  // Verificación de campos obligatorios
  if (!first_name || !last_name || !email || !password || !age || !role) {
    return res.status(400).json({ message: "Please fill all fields" });
  }

  try {
    // Verificar si el usuario ya existe
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Crear el nuevo usuario
    const hashedPassword = await hashPassword(password);
    const newUser = await userModel.create({
      first_name,
      last_name,
      email,
      password: hashedPassword,
      age,
      role,
    });

    // Crear un token de acceso para el nuevo usuario
    const token = createToken({
      email: newUser.email,
      role: newUser.role,
      id: newUser._id,
    });

    res.status(201).json({ message: "User registered successfully", token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

customAuthRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Verificación de campos obligatorios
  if (!email || !password) {
    return res.status(400).json({ message: "Please fill all fields" });
  }

  try {
    // Verificar si el usuario existe
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Verificar la contraseña
    const isValidPassword = await comparePassword(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Crear un token de acceso para el usuario
    const token = createToken({
      email: user.email,
      role: user.role,
      id: user._id,
    });

    res.status(200).json({ message: "User logged in successfully", token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
export { customAuthRouter };