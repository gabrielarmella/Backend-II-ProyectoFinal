import { Router } from "express";
import { userModel } from "../dao/models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { SECRET } from "../utils/jwt.utils.js";

const router = Router();

// Middleware para verificar si el usuario está autenticado
function isAuthenticated(req, res, next) {
  if (req.signedCookies.currentUser) {
    return next();
  }
  res.status(401).json({ status: "error", message: "Unauthorized" });
  /* res.redirect("/login"); */
}

// Middleware para verificar si el usuario no está autenticado
function isNotAuthenticated(req, res, next) {
  if (!req.signedCookies.currentUser) {
    return next();
  }
  res.redirect("/products");
}

// Ruta para obtener todos los usuarios
router.get("/", async(req, res) => {
  try {
      const users = await userModel.find();
      res.json({ status: "success", payload: users})
  } catch (error) {
    console.log("Cannot get users with mongoose: " + error);
    res.status(500).json({ status: "error", message: "Error al obtener los usuarios" });
  }
});

// Ruta para crear un nuevo usuario
router.post("/", async (req, res) => {
  try {
    const { first_name, last_name, email, age, password, cart, role } = req.body;
    const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const newUser = await userModel.create({
      first_name,
      last_name,
      email,
      age,
      password: hashedPassword,
      cart,
      role,
    });
    res.json({ status: "success", payload: newUser });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
});

// Ruta para obtener un usuario por ID
router.get("/:id", async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    res.json({ status: "success", payload: user });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
});

// Ruta para el login
router.get("/:id", isAuthenticated, async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ status: "error", message: "Usuario no encontrado" });
    }
    res.json({ status: "success", payload: user });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
});


// Ruta para obtener los datos del usuario actual
router.get("/current", isAuthenticated, async (req, res) => {
  try {
    const token = req.signedCookies.currentUser;
    const decoded = jwt.verify(token, SECRET);
    const user = await userModel.findById(decoded.id);
    res.render("current", { user });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
});

/* // Ruta para el formulario de login
router.get("/login", isNotAuthenticated, (req, res) => {
  res.render("login");
}); */

export { router as userRouter };