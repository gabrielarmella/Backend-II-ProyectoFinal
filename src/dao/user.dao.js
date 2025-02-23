import { userModel } from "../models/mongodb/user.model.js";

export class UserDAO {
  async findById(id) {
    return await userModel.findById(id);
  }

  async findByEmail(email) {
    return await userModel.findOne({ email });
  }

  async create(user) {
    return await userModel.create(user);
  }
}