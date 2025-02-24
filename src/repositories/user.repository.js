import { UserDAO } from '../dao/user.dao.js';
import { UserDto } from '../dto/user.dto.js';

export class UserRepository {
  constructor() {
    this.userDAO =  new UserDAO();
  }

  async get(id) {
    return await this.userDAO.getById(id);
  }

  async getAll() {
    return await this.userDAO.get({});
  }


  async findByEmail(email) {
    if (typeof email !== 'string') {
      throw new Error('El email tiene que ser un string');
    }
    return await this.userDAO.findByEmail(email);
  }

  async create(user) {
    return await this.userDAO.create(user);
  }

  async update(id, userUpdate) {
    return await this.userDAO.findByIdAndUpdate(id, userUpdate);
  }

  async delete(id) {
    return await this.userDAO.delete(id);
  }

  async addProductToUser(userId, products) {
    return await thus.userDAO.update(userId, { $push: { products } });
  }
}