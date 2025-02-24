import { userService } from "../services/index.service.js";

class UserController {
  async getAllUsers(req, res) {
    try {
      const users = await userService.getAllUsers();
      res.json({ status: "success", payload: users });
    } catch (error) {
      res.status(400).json({ status: "error", message: error.message });
    }
  }

  async getUserById(req, res) {
    const { id } = req.params;
    try {
      const user = await userService.getUserById(id);
      if (!user) {
        return res.status(404).json({ status: "error", message: "Usuario no encontrado" });
      }
      res.json({ status: "success", payload: user });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  }

  async getCurrentUser(req, res) {
    try {
      const user = await userService.getUserById(req.user.id);
      if (!user) {
        return res.status(404).json({ status: "error", message: "Usuario no encontrado" });
      }
      res.json({ status: "success", payload: user });
    } catch (error) {
      res.status(400).json({ status: "error", message: error.message });
    }
  }

  async registerUser(req, res) {
    try {
      const user = await userService.registerUser(req.body);
      res.status(201).json({ status: "success", payload: user });
    } catch (error) {
      res.status(400).json({ status: "error", message: error.message });
    }
  }

  async updateUser(req, res) {
    const { id } = req.params;
    const user = req.body;
    try {
      const updatedUser = await userService.updateUser(id, user);
      if (!updatedUser) {
        return res.status(404).json({ status: "error", message: "Usuario no encontrado" });
      }
      res.json({ status: "success", payload: updatedUser });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  }

  async deleteUser(req, res) {
    const { id } = req.params;
    try {
      const deletedUser = await userService.deleteUser(id);
      if (!deletedUser) {
        return res.status(404).json({ status: "error", message: "Usuario no encontrado" });
      }
      res.json({ status: "success", payload: deletedUser });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  }
  async addPhoneNumber(req, res) {
    const { id } = req.params;
    const { phone } = req.body;
    try {
      const updatedUser = await userService.addPhoneNumber(id, phone);
      if (!updatedUser) {
        return res.status(404).json({ status: "error", message: "Usuario no encontrado" });
      }
      res.json({ status: "success", payload: updatedUser });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  }
}

export const userController = new UserController();