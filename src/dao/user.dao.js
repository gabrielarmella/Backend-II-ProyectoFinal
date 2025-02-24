import {User} from "../models/User.js";

export class UserDAO {
  get = (params) => {
    return User.find(params);
  }

  getById = (params) => {
    return User.findById(params);
  }
  findByEmail = (email) => {
    return User.findOne({ email });
  }
  create = (doc) => {
    return User.create(doc);
  }
  save = (doc) => {
    return User.create(doc);
  }

  update = (id, doc) => {
    return User.findByIdAndUpdate(id, { $set: doc }, { new: true });
  }

  delete = (id) => {
    return User.findByIdAndDelete(id);
  }
}