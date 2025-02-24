import { userService } from "../services/index.service.js";
import { createToken } from "../utils/jwt.utils.js";

class AuthController {
  async register(req, res) {
    try {
      const { first_name, last_name, email, password, age, role } = req.body;

      const user = await userService.registerUser({ 
        first_name, 
        last_name, 
        email, 
        password, 
        age, 
        role 
      });
      res.json({ status: "success", payload: user });
    } catch (error) {
      if (error.code === "El email ya está en uso") {
        return res.status(400).json({ status: "error", message: "El email ya está en uso" });
      }
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (typeof email !== 'string') {
        return res.status(400).json({ message: 'El email tiene que ser un string' });
      }

      if (typeof password !== 'string') {
        return res.status(400).json({ message: 'La contraseña tiene que ser un string' });
      }

      if (!email || !password) {
        return res.status(400).json({ message: "Email y contraseña son requeridos" });
      }

      const user = await userService.authenticateUser(email, password);
      if (!user) {
        return res.status(401).json({ message: "Credenciales inválidas" });
      }

      const token = createToken({ id: user.id, email: user.email, role: user.role });
      res.json({ status: "success", token, user: { id: user.id, email: user.email, role: user.role } });
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res) {
    res.clearCookie("currentUser");
    res.json({ message: "Logout successful" });
  }

  async getCurrentUser(req, res, next) {
    try {
      if (!req.user) {
        return res.status(401).json({ status: "error", message: "No autorizado" });
      }
      const user = await userService.getUserById(req.user.id);
      if (!user) {
        return res.status(404).json({ status: "error", message: "Usuario no encontrado" });
      }
      res.json({ status: "success", payload: user });
    } catch (error) {
      next(error);
    }
  }
}

export const authController = new AuthController();