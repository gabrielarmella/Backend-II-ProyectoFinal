import bcrypt from "bcrypt";

export const createHash = (password) => {
  password = String(password);
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

export const isValidPassword = (password, hash) => {
  password = String(password);
  return bcrypt.compareSync(password, hash);
};