import { Router } from "express";
import { login, logout, register } from "../controllers/auth.controller.js";

//-------------------------------------------------------------MIDDLEWARES
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { applyValidations } from "../middlewares/validator.js";
import { createPersonValidations } from "../middlewares/validations/personValidations/createPerson.validations.js";

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

//Desloguearse (cerrar sesión)
authRouter.post("/api/auth/logout", authMiddleware, logout);

export default authRouter;
