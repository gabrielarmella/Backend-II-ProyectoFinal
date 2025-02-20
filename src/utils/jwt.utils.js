import jwt from "jsonwebtoken";
import {CONFIG} from "../config/config.js";


export const SECRET = CONFIG.JWT.SECRET;

export function createToken(payload) {
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
