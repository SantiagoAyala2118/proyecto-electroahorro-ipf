import { body, param } from "express-validator";
import { PersonModel } from "../../../models/person.model.js";
import { Op } from "sequelize";

export const updateAPersonValidations = [
  param("id")
    .isInt({ gt: 0 })
    .withMessage("The id must be a number greater than 0")
    .custom(async (id, { req }) => {
      try {
        const existingPerson = await PersonModel.findOne({
          where: { id: req.params.id },
        });
        if (!existingPerson) {
          return Promise.reject("There is no person with that id in the DB");
        }
      } catch (err) {
        console.error(
          "Error checking the existency of the person by the id",
          err
        );
        return Promise.reject(
          "Error checking the existency of the person by the id"
        );
      }
    }),
  body("name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Name cannot be empty")
    .isString()
    .withMessage("Name must be a string")
    .isLength({ min: 5, max: 10 })
    .withMessage("Name must contain at least 5 characters and a maximun of 10"),
  body("lastname")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Lastname cannot be empty")
    .isString()
    .withMessage("Lastname must be a string")
    .isLength({ min: 5, max: 10 })
    .withMessage("Name must contain at least 5 characters and a maximun of 10"),
  body("dni")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Lastname cannot be empty")
    .isInt({ gt: 30000000 })
    .withMessage(
      "DNI must be a number greater than 30,000,000 (thirty-millions) with no points"
    )
    .isLength({ eq: 8 })
    .withMessage("DNI must contain 8 digits")
    .custom(async (dni, { req }) => {
      try {
        const dniExisting = await PersonModel.findOne({
          where: { dni, id: { [Op.ne]: req.params.id } },
        });
        if (dniExisting) {
          return Promise.reject("DNI already exists in the DB");
        }
      } catch (err) {
        console.error("Server error while checking the DNI viability", err);
        return Promise.reject("Server error while checking the DNI viability");
      }
    }),
];
