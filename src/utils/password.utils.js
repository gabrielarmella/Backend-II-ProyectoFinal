import bcrypt from "bcrypt";

export function hashPassword(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

export async function comparePassword(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}