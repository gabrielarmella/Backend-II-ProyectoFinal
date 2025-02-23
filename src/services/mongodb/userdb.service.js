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

  async create({ first_name, last_name, email, password, age, role }) {
    const hash = await bcrypt.hash(password, 4);
    const user = await this.userRepository.create({ first_name, last_name, email, password:hash, age, role });
    return user;
  }
  async getUserByEmail(email) {
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