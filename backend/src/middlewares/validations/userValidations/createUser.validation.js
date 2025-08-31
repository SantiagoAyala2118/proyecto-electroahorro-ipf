import { body } from "express-validator";
import { UserModel } from "../../../models/user.model.js";

export const createUserValidations = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username cannot be empty")
    .isString()
    .withMessage("Username must be a string")
    .isLength({ min: 3, max: 10 })
    .withMessage(
      "Username must contain at least 3 characters and a maximum of 10"
    )
    .custom(async (username) => {
      try {
        const existingUsername = await UserModel.findOne({ where: username });
        if (existingUsername) {
          return Promise.reject("There is already an user with that username");
        }
      } catch (err) {
        console.error(
          "Error while checking the viability of the username",
          err
        );
        return Promise.reject(
          "Error while checking the viability of the username"
        );
      }
    }),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email cannot be empty")
    .isEmail()
    .withMessage("The email must have a valid format")
    .custom(async (email) => {
      try {
        const existingEmail = await UserModel.findOne({ where: email });
        if (existingEmail) {
          return Promise.reject("There is already an user with that email");
        }
      } catch (err) {
        console.error("Error while checking the viability of the email", err);
        return Promise.reject(
          "Error while checking the viability of the email"
        );
      }
    }),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("The password cannot be empty")
    .isString()
    .withMessage("The password must be a string")
    .isLength({ min: 8, max: 16 })
    .withMessage(
      "The password must contain at least 8 characters and a maximum of 16"
    ),
];
