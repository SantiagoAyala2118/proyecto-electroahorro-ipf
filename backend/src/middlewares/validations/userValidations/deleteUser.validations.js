import { param } from "express-validator";
import { UserModel } from "../../../models/user.model.js";

export const deleteUserValidations = [
  param("id")
    .isInt({ gt: 0 })
    .withMessage("The id must be a number greater than 0")
    .custom(async (id, { req }) => {
      try {
        const existingId = await UserModel.findOne({
          where: { id: req.params.id },
        });

        if (!existingId) {
          return Promise.reject("There are no user with that id in the DB");
        }
      } catch (err) {
        console.error(
          "Error while checking the existency of the user by id",
          err
        );
        return Promise.reject(
          "Error while checking the existency of the user by id"
        );
      }
    }),
];
