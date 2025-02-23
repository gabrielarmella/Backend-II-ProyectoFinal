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

  async updateUser(id, userUpdate) {
    return await userModel.findByIdAndUpdate(id, userUpdate, { new: true });
  }

  async deleteUser(id) {
    return await userModel.findByIdAndDelete(id);
  }

  async addProductsToUser(userId, products) {
    const user = await userModel.findById(userId);
    if (!user) throw new Error('User not found');
    user.products.push(...products);
    await user.save();
    return user;
  }
}