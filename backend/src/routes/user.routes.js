import { Router } from "express";

//-------------------------CONTROLADORES
import { updateUser, deletUser } from "../controllers/user.controller.js";

//-------------------------MIDDLEWARE
import { authMiddleware } from "../middlewares/authMiddleware.js";

const userRouter = Router();

userRouter.put("/users", authMiddleware, updateUser);

userRouter.delete("/user", authMiddleware, deletUser);

export default userRouter;
