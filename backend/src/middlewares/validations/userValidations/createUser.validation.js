import { body } from "express-validator";
import { UserModel } from "../../../models/user.model.js";
import { PersonModel } from "../../../models/person.model.js";

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
    .custom(async (username, { req }) => {
      try {
        const existingUsername = await UserModel.findOne({
          where: { username: req.body.username },
        });
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
    .custom(async (email, { req }) => {
      try {
        const existingEmail = await UserModel.findOne({
          where: { email: req.body.email },
        });
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
  param("person_id")
    .trim()
    .notEmpty()
    .withMessage("The person_id cannot be empty")
    .isInt({ gt: 0 })
    .withMessage("The person_id must be a number greater than 0")
    .custom(async (person_id, { req }) => {
      try {
        const existingPerson = await PersonModel.findOne({
          where: { person_id: req.params.person_id },
        });
        if (!existingPerson) {
          return Promise.reject("There is no person with that id in the DB");
        }
      } catch (err) {
        console.error(
          "Error while checking the existency of that person in the DB",
          err
        );
        return Promise.reject(
          "Error while checking the existency of that person in the DB"
        );
      }
    }),
];
