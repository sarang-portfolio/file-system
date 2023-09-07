import { body } from "express-validator";
import { validate } from "../../utility/validate";

export const authValidations = {
  signup: [
    body("email").isEmail().withMessage("Email is not valid"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
    body("username")
      .isLength({ min: 3 })
      .withMessage("Name must be at least 3 characters"),
    validate,
  ],
  login: [
    body("email").isEmail().withMessage("Email is not valid"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
    validate,
  ],
  forgotPassword: [
    body("email").isEmail().withMessage("Email is not valid"),
    validate,
  ],
  resetPassword: [
    body("newPassword")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
    validate,
  ],
  changePassword: [
    body("oldPassword")
      .isLength({ min: 6 })
      .withMessage("Old password must be at least 6 characters"),
    body("newPassword")
      .isLength({ min: 6 })
      .withMessage("New password must be at least 6 characters"),
    validate,
  ],
};
