import { body } from "express-validator";
import { ApplianceModel } from "../../../models/appliance.model.js";

export const createApplianceValidations = [
  body("nombre")
    .trim()
    .notEmpty()
    .withMessage("El nombre no puede estar vacío")
    .isString()
    .withMessage("El nombre debe ser un string")
    .matches(
      /^(?=.*[A-ZÁÉÍÓÚÑ])(?=.*[a-záéíóúñ])[A-Za-zÁÉÍÓÚáéíóúÑñ0-9]+(?: [A-Za-zÁÉÍÓÚáéíóúÑñ0-9]+)*$/
    )
    .withMessage(
      "El nombre debe contener al menos una minúscula, una mayúscula, y estar separado por espacios"
    )
    .custom(async (nombre, { req }) => {
      try {
        const nameExisting = await ApplianceModel.findOne({
          where: { nombre: req.body.nombre },
        });

        if (nameExisting) {
          return Promise.reject("El nombre ingresado ya existe, use otro");
        }
      } catch (err) {
        console.error("Error verificando la disponibilidad del nombre", err);
        return Promise.reject("Error verificando la disponibilidad del nombre");
      }
    }),
];
