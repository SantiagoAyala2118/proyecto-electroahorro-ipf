import { body } from "express-validator";
import { PersonModel } from "../../../models/person.model";

export const createPersonValidations = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name cannot be empty")
    .isString()
    .withMessage("Name must be a string")
    .isLength({ min: 5, max: 10 })
    .withMessage("Name must contain at least 5 characters and a maximun of 10"),
  body("lastname")
    .trim()
    .notEmpty()
    .withMessage("Lastname cannot be empty")
    .isString()
    .withMessage("Lastname must be a string")
    .isLength({ min: 5, max: 10 })
    .withMessage("Name must contain at least 5 characters and a maximun of 10"),
  body("dni")
    .trim()
    .notEmpty()
    .withMessage("Lastname cannot be empty")
    .isInt({ gt: 30000000 })
    .withMessage(
      "DNI must be a number greater than 30,000,000 (thirty-millions) with no points"
    )
    .isLength({ min: 5, max: 10 })
    .withMessage("DNI must contain 8 digits")
    .custom(async (dni) => {
      try {
        const dniExisting = await PersonModel.findOne({ where: dni });
        if (dniExisting) {
          return Promise.reject("DNI already exists in the DB");
        }
      } catch (err) {
        console.error("Server error while checking the DNI viability", err);
        return Promise.reject("Server error while checking the DNI viability");
      }
    }),
];
