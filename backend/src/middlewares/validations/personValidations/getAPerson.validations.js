import { param } from "express-validator";
import { PersonModel } from "../../../models/person.model.js";

export const getAPersonValidations = [
  param("id")
    .isInt({ gt: 0 })
    .withMessage("The id must be a number greater than 0")
    .custom(async (id, { req }) => {
      try {
        const personExisting = await PersonModel.findOne({
          where: { id: req.params.id },
        });
        if (!personExisting) {
          return Promise.reject("There are no people with that id in the DB");
        }
      } catch (err) {
        console.error(
          "Server error while checking the existency of that id",
          err
        );
        return Promise.reject(
          "Server error while checking the existency of that id"
        );
      }
    }),
];
