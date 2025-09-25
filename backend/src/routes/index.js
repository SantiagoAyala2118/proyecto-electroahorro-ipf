import { Router } from "express";

//RUTAS
import userRouter from "./user.routes.js";
import profileRouter from "./profile.routes.js";
import applianceRouter from "./appliance.routes.js";
import authRouter from "./auth.routes.js";

const routes = Router();

//AUTH
routes.use(authRouter);

//USER
routes.use(userRouter);

//PROFILE
routes.use(profileRouter);

//APPLIANCE
routes.use(applianceRouter);

export default routes;
