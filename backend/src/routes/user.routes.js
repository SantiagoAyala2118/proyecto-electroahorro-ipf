import { Router } from "express";
import { applyValidations } from "../middlewares/validator.js";
import { createUserValidations } from "../middlewares/validations/userValidations/createUser.validation.js";
import { getOneUserValidations } from "../middlewares/validations/userValidations/deleteUser.validations.js";
import { updateUserValidations } from "../middlewares/validations/userValidations/updateUser.validations.js";
import { deleteUserValidations } from "../middlewares/validations/userValidations/deleteUser.validations.js";

import {
  createUser,
  getAllUsers,
  getOneUser,
  updateUser,
  deletUser,
} from "../controllers/user.controller.js";

const userRouter = Router();

//Rutas

//Crear un usuario
userRouter.post(
  "/api/user",
  createUserValidations,
  applyValidations,
  createUser
);

//Traer todos los usuarios
userRouter.get("/api/users", getAllUsers);

//Traer un usuario
personRouter.get(
  "/api/user/:id",
  getOneUserValidations,
  applyValidations,
  getOneUser
);

//Actualizar un usuario
userRouter.put(
  "/api/user/:id",
  updateUserValidations,
  applyValidations,
  updateUser
);

//Eliminar un usuario
userRouter.delete(
  "/api/user/:id",
  deleteUserValidations,
  applyValidations,
  deletUser
);

export default userRouter;
