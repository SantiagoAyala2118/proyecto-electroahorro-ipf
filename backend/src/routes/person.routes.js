import { Router } from "express";
import { applyValidations } from "../middlewares/validator.js";
import { createPersonValidations } from "../middlewares/validations/personValidations/createPerson.validations.js";
import { getAPersonValidations } from "../middlewares/validations/personValidations/getAPerson.validations.js";
import { updateAPersonValidations } from "../middlewares/validations/personValidations/updateAPerson.validations.js";
import { deletePersonValidation } from "../middlewares/validations/personValidations/deletePerson.validations.js";
import {
  createPerson,
  getAllPeople,
  getAPerson,
  updatePerson,
  deletePerson,
} from "../controllers/person.controller.js";

const personRouter = Router();

//Rutas

//Crear una persona
personRouter.post(
  "/api/person",
  createPersonValidations,
  applyValidations,
  createPerson
);

//Traer todas las personas
personRouter.get("/api/people", getAllPeople);

//Traer una persona
personRouter.get(
  "/api/person/:id",
  getAPersonValidations,
  applyValidations,
  getAPerson
);

//Actualizar una persona
personRouter.put(
  "/api/person/:id",
  updateAPersonValidations,
  applyValidations,
  updatePerson
);

//Eliminar una persona
personRouter.delete(
  "/api/person/:id",
  deletePersonValidation,
  applyValidations,
  deletePerson
);

export default personRouter;
