import { param } from "express-validator";
import { PersonModel } from "../../../models/person.model.js";

export const deletePersonValidation = [
  param("id")
    .isInt({ gt: 0 })
    .withMessage("The id must be a number greater than 0")
    .custom(async (id, { req }) => {
      try {
        const existingPerson = await PersonModel.findOne({
          where: { id: req.params.id },
        });

        if (!existingPerson) {
          return Promise.reject("There is no person in the DB with that id");
        }
      } catch (err) {
        console.error(
          "Error while checking the existency of the person by id",
          err
        );
        return Promise.reject(
          "Error while checking the existency of the person by id"
        );
      }
    }),
];
