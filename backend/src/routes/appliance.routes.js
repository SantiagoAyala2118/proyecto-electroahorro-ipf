import Router from 'express'

//--------------------------CONTROLADORES
import { createAppliance } from '../controllers/appliance.controller.js';

//--------------------------MIDDLEWARES
import { createApplianceValidations } from '../middlewares/validations/applianceValidations/createAppliance.validations.js';
import { applyValidations } from '../middlewares/validator.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const applianceRouter = Router();

//CREAR ELECTRODOMESTICO
applianceRouter.post('/api/appliance',
    authMiddleware,
    //  createApplianceValidations,
    //   applyValidations,
       createAppliance)

export default applianceRouter;