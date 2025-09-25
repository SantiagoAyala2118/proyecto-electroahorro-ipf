import Router from "express";

//--------------------------CONTROLADORES
import {
  createAppliance,
  deleteAppliance,
  getAllApliances,
  getAppliance,
  updateAppliance,
} from "../controllers/appliance.controller.js";

//--------------------------MIDDLEWARES
import { createApplianceValidations } from "../middlewares/validations/applianceValidations/createAppliance.validations.js";
import { applyValidations } from "../middlewares/validator.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const applianceRouter = Router();

//CREAR ELECTRODOMESTICO
applianceRouter.post(
  "/appliance",
  authMiddleware,
  createApplianceValidations,
  applyValidations,
  createAppliance
);

applianceRouter.get("/appliance", authMiddleware, getAllApliances);

applianceRouter.get("/appliance/:id", authMiddleware, getAppliance);

applianceRouter.put("/appliance/:id", authMiddleware, updateAppliance);

applianceRouter.delete("/appliance/:id", authMiddleware, deleteAppliance);

export default applianceRouter;
