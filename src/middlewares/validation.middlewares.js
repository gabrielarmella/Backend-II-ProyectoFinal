import { validationResult, body } from "express-validator";


export function validate(schema) {
    return async (req, res, next) => {
      const { error } = schema.validate(req.body);
      if (error){
        return res
        .status(400)
        .json({ error: error.details.map((error) => error.message) });
      }
      next();
    };
  }

export const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export const validateUserRegistration = [
    body("first_name").notEmpty().withMessage("First name is required"),
    body("last_name").notEmpty().withMessage("Last name is required"),
    body("email").isEmail().withMessage("Email is invalid"),
    body("password").isLength({ min: 4 }).withMessage("Password must be at least 6 characters long"),
    body("age").isInt().withMessage("Age must be an integer"),
    body("role").isIn(["user", "admin"]).withMessage("Role must be either user or admin"),
    validateRequest,
]

export const validatePhoneNumber = [
    body("phone").matches(/^\d{10}$/).withMessage("Phone number must be 10 digits"),
    validateRequest,
  ];