import { Router } from "express";
import { login, logout, register } from "../controllers/auth.controller.js";
import {
  getOneProfile,
  updateProfile,
} from "../controllers/profile.controller.js";
import { updateUser, deletUser } from "../controllers/user.controller.js";
//-------------------------------------------------------------MIDDLEWARES
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { applyValidations } from "../middlewares/validator.js";
import { createPersonValidations } from "../middlewares/validations/personValidations/createPerson.validations.js";
import { updateProfileValidations } from "../middlewares/validations/profileValidations/updateProfile.validations.js";
import { updateUserValidations } from "../middlewares/validations/userValidations/updateUser.validations.js";
import { deleteUserValidations } from "../middlewares/validations/userValidations/deleteUser.validations.js";

const authRouter = Router();

//Rregistrarse
authRouter.post(
  "/api/auth/registro",
  createPersonValidations,
  applyValidations,
  register
);

//Loguearse
authRouter.post("/api/auth/login", login);

//Ver el perfil propio
authRouter.get("/api/auth/profile", authMiddleware, getOneProfile);

//Actualizar el perfil
authRouter.put(
  "/api/auth/profile",
  authMiddleware,
  updateProfileValidations,
  applyValidations,
  updateProfile
);

//Actualizar el usuario
authRouter.put(
  "/api/user/profile",
  authMiddleware,
  updateUserValidations,
  applyValidations,
  updateUser
);

//Eliminar el usuario
authRouter.delete(
  "/api/user/profile",
  authMiddleware,
  deleteUserValidations,
  applyValidations,
  deletUser
);

//Desloguearse (cerrar sesión)
authRouter.post("/api/auth/logout", authMiddleware, logout);

export default authRouter;
