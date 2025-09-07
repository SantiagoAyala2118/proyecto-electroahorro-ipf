import { Router } from "express";

import {
  getOneProfile,
  updateProfile,
} from "../controllers/profile.controller.js";
import { updateUser, deletUser } from "../controllers/user.controller.js";

//---------------------------------MIDDLEWARES
import { updateProfileValidations } from "../middlewares/validations/profileValidations/updateProfile.validations.js";
import { updateUserValidations } from "../middlewares/validations/userValidations/updateUser.validations.js";
import { deleteUserValidations } from "../middlewares/validations/userValidations/deleteUser.validations.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { applyValidations } from "../middlewares/validator.js";

const profileRouter = Router();

//Ver el perfil propio
profileRouter.get("/api/profile", authMiddleware, getOneProfile);

//Actualizar el perfil
profileRouter.put(
  "/api/profile",
  authMiddleware,
  updateProfileValidations,
  applyValidations,
  updateProfile
);

//Actualizar el usuario
profileRouter.put(
  "/api/profile/user",
  authMiddleware,
  updateUserValidations,
  applyValidations,
  updateUser
);

//Eliminar el usuario
profileRouter.delete(
  "/api/profile/user",
  authMiddleware,
  deleteUserValidations,
  applyValidations,
  deletUser
);
