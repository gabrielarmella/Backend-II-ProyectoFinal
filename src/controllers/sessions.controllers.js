import { userService } from "../services/index.service.js";
import { createToken } from "../utils/jwt.utils.js";

class SessionsController {
  
  async register(req, res, next) {
      try {
        const { first_name, last_name, email, password, age, role } = req.body;
        if(!first_name || !last_name || !email || !password || !age || !role) return res.status(400).json({ status: "error", message: "Campos incompletos" });
        const exist = await userService.getUserByEmail(email);
        if (exist) return res.status(400).json({ status: "error", message: "El email ya está en uso" });
        const hashedPassword = await userService.hashPassword(password);
        const user = {
          first_name,
          last_name,
          email,
          password: hashedPassword,
          age,
          role
        };
        let newUser = await userService.createUser(user);
        res.status(201).json({ status: "success", payload: newUser });
        }catch (error) {
        next(error);
      }
  }
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ status: "error", message: "Email y contraseña son requeridos" });
      }
      const user = await userService.getUserByEmail(email);
      if (!user) {
        return res.status(401).json({ status: "error", message: "Usuario no encontrado" });
      }
      const isValidPassword = await userService.comparePassword(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ status: "error", message: "Contraseña inválida" });
      }

      const userDTO = {
        id: user._id,
        email: user.email,
        role: user.role
      };

      const token = jwt.sign(userDTO, CONFIG.JWT.SECRET, { expiresIn: CONFIG.JWT.EXPIRES_IN });
      res.cookie("coderCookie", token, { maxAge: 1000 * 60 * 60 * 24 * 30 }).json({ status: "success", token, user: userDTO });
    } catch (error) {
      next(error);
    }
  }
  async logout(req, res) {
    req.session.destroy();
    res.json({ message: "Logout successful" });
  }

  async getCurrentUser(req, res, next) {
    const cookie = req.cookies["coderCookie"];
    const user = jwt.verify(cookie, "tokenSecretJWT");
    if(user)
      return res.json({ status: "success", payload: user });
}
}
export const sessionsController = new SessionsController();