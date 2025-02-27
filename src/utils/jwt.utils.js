import jwt from "jsonwebtoken";
import {CONFIG} from "../config/config.js";


export const SECRET = CONFIG.JWT.SECRET;


export function generateToken(user) {
  if (!user || !user._id) {
    throw new Error('Invalid user object: missing _id');
  }
  const payload = {
    id: user._id.toString(),
    email: user.email,
    role: user.role
  };

  return jwt.sign(payload, SECRET, {
    EXPIRES_IN: CONFIG.JWT.EXPIRES_IN,
  });
}

export function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, SECRET);
    return decoded;
  } catch (error) {
    throw new Error(`Invalid token: ${error}`);
  }
}
