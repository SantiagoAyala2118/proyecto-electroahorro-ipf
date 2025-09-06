import { Router } from "express";
import { login, logout, register } from "../controllers/auth.controller.js";
import {
  getOneProfile,
  updateProfile,
} from "../controllers/profile.controller.js";
//-------------------------------------------------------------MIDDLEWARES
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { createPersonValidations } from "../middlewares/validations/personValidations/createPerson.validations.js";
import applyValidations from "../middlewares/validator.js";
import { updateProfileValidations } from "../middlewares/validations/profileValidations/updateProfile.validations.js";
const authRouter = Router();

authRouter.post(
  "/api/auth/registro",
  createPersonValidations,
  applyValidations,
  register
);

authRouter.post("/api/auth/login", login);

authRouter.get("/api/auth/profile", authMiddleware, getOneProfile);

authRouter.put(
  "/api/auth/profile",
  authMiddleware,
  updateProfileValidations,
  applyValidations,
  updateProfile
);

authRouter.post("/api/auth/logout", authMiddleware, logout);

export default authRouter;
