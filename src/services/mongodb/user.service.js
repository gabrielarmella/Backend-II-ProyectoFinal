import { UserRepository } from "../../repositories/user.repository.js";
import bcrypt from "bcrypt";

const userRepository = new UserRepository();

export class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async getAllUsers() {
    return this.userRepository.getAll();
  }

  async getUserById(id) {
    return this.userRepository.get(id);
  }

  async getUserByEmail(email) {
    return this.userRepository.findByEmail(email);
  }

  async registerUser({ first_name, last_name, email, password, age, role }) {
    return this.userRepository.create({
      first_name,
      last_name,
      email,
      password,
      age,
      role,
    });
  }

  async updateUser(id, userUpdate) {
    if (userUpdate.password) {
      userUpdate.password = await bcrypt.hash(userUpdate.password, 10);
    }
    return this.userRepository.update(id, userUpdate);
  }

  async deleteUser(id) {
    return this.userRepository.delete(id);
  }

  async authenticateUser(email, password) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      return null;
    }
  }
  async addProductsToUser(userId, products) {
    return this.userRepository.addProductsToUser(userId, products);
  }
}

export const userService = new UserService();