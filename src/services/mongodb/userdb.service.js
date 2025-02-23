import { UserRepository } from "../../repositories/user.repository.js";
import bcrypt from "bcrypt";

export class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async getAll() {
    const users = await this.userRepository.findAll();
    return users;
  }

  async getById(id) {
    const user = await this.userRepository.findById(id);
    return user;
  }

  async create({ name, email, password }) {
    const hash = await bcrypt.hash(password, 10);
    const user = await this.userRepository.create({ name, email, password: hash });
    return user;
  }

  async getByEmail(email) {
    const user = await this.userRepository.findByEmail(email);
    return user;
  }

  async addProductsToUser({ id, products }) {
    const user = await this.userRepository.addProductsToUser(id, products);
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