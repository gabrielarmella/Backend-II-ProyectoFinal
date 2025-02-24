import Joi from "joi";

export const ProductDto = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    description: Joi.string().min(10).max(500).required(),
    code: Joi.string().min(3).max(20).required(),
    price: Joi.number().positive().required(),
    stock: Joi.number().integer().min(0).required(),
    category: Joi.string().min(3).max(50).required(),
    thumbnails: Joi.array().items(Joi.string().uri()).required()
  });