import { body } from "express-validator";
import { UserModel } from "../../../models/user.model.js";

export const createProfileValidations = [
  body("picture")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("The picture cannot be empty")
    .isString()
    .withMessage("The picture must be a string")
    .isLength({ min: 5, max: 15 })
    .withMessage(
      "The picture must contain at least 5 characters and a maximum of 15"
    ),
  body("bio")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("The bio cannot be empty")
    .isString()
    .withMessage("The bio must be a string")
    .isLength({ min: 10, max: 20 })
    .withMessage(
      "The bio must containt at least 10 characters and a maximum of 20"
    ),
  body("user_id")
    .trim()
    .notEmpty()
    .withMessage("The user_id cannot be empty")
    .isIn({ gt: 0 }),
  withMessage("The user_id must be a number greater than 0").custom(
    async (user_id) => {
      try {
        const existingUser = await UserModel.findOne({
          where: { id: user_id },
        });

        if (!existingUser) {
          return Promise.reject("There is no user in the DB with that id");
        }
      } catch (err) {
        console.error(
          "Error checking the existency of that user by user_id",
          err
        );
        return Promise.reject(
          "Error checking the existency of that user by user_id"
        );
      }
    }
  ),
];
