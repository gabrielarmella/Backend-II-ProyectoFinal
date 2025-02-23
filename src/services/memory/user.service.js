import { UserRepository } from "../../repositories/user.repository.js";

export class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async getAll() {
    const users = await this.userRepository.findAll();
    return users;
  }

  async getUserById(id) {
    const user = await this.userRepository.findById(id);
    return user;
  }

  async createUser({ name, email, password }) {
    const user = await this.userRepository.create({ name, email, password });
    return user;
  }

  async getUserByEmail(email) {
    const user = await this.userRepository.findByEmail(email);
    return user;
  }

  async addProductsToUser(userId, products) {
    const user = await this.userRepository.addProductsToUser(userId, products);
    return user;
  }

  async updateUser(id, userUpdate) {
    const user = await this.userRepository.update(id, userUpdate);
    return user;
  }

  async deleteUser(id) {
    const result = await this.userRepository.delete(id);
    return result;
  }
}