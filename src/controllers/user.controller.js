import { userService } from "../services/index.service.js";

class UserController {
  async getCurrentUser(req, res) {
    try {
      const userDTO = await userService.getById(req.user.id);
      res.json({ status: "success", payload: userDTO });
    } catch (error) {
      res.status(400).json({ status: "error", message: error.message });
    }
  }

  async createUser(req, res) {
    try {
      const user = await userService.create(req.body);
      res.status(201).json({ status: "success", payload: user });
    } catch (error) {
      res.status(400).json({ status: "error", message: error.message });
    }
  }

  async getAllUsers(req, res) {
    try {
      const users = await userService.getAll();
      res.json({ status: "success", payload: users });
    } catch (error) {
      res.status(500).json({ status: "error", message: "Error al obtener los usuarios" });
    }
  }

  async getUserById(req, res) {
    try {
      const user = await userService.getById(req.params.id);
      res.json({ status: "success", payload: user });
    } catch (error) {
      res.status(400).json({ status: "error", message: error.message });
    }
  }
}

export const userController = new UserController();