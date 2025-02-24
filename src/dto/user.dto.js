import Joi from "joi";

export const UserDto = Joi.object({
  first_name: Joi.string().min(3).max(30).required(),
  last_name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  age: Joi.number().integer().min(18).required(),
  password: Joi.string().min(3).max(100).required(),
  role: Joi.string().valid("admin", "user").default("user"),
});