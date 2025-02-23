import { UserDAO } from '../dao/user.dao.js';
import { UserDTO } from '../dto/user.dto.js';

export class UserRepository {
  constructor() {
    this.userDAO = new UserDAO();
  }

  async findById(id) {
    const user = await this.userDAO.findById(id);
    return new UserDTO(user);
  }

  async findByEmail(email) {
    const user = await this.userDAO.findByEmail(email);
    return new UserDTO(user);
  }

  async create(user) {
    const newUser = await this.userDAO.create(user);
    return new UserDTO(newUser);
  }

  async update(id, userUpdate) {
    const updatedUser = await this.userDAO.updateUser(id, userUpdate);
    return new UserDTO(updatedUser);
  }

  async delete(id) {
    await this.userDAO.deleteUser(id);
    return { message: 'User deleted successfully' };
  }

  async addProductsToUser(userId, products) {
    const user = await this.userDAO.addProductsToUser(userId, products);
    return new UserDTO(user);
  }
}