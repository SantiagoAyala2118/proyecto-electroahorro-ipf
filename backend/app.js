<<<<<<< HEAD
import express from "express";
import { startDB } from "./src/config/db.js";
import authRouter from "./src/routes/auth.routes.js";
=======
import express from 'express';
import cookieParser from "cookie-parser";
import cors from 'cors'
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });
//-----------------------------------------RUTAS
import authRouter from './src/routes/auth.routes.js';
import profileRouter from './src/routes/profile.routes.js';
import applianceRouter from './src/routes/appliance.routes.js';
>>>>>>> 68260263134e6a4f24e48b72324d3b82e5dac569

import { startDB } from "./src/config/db.js";
startDB();

const app = express();
const PORT = process.env.PORT;

//-----------------MIDDLEWARES
app.use(express.json());
<<<<<<< HEAD
app.use("/", authRouter);
=======
app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(cookieParser());
>>>>>>> 68260263134e6a4f24e48b72324d3b82e5dac569

//-------------------RUTAS
app.use("/", authRouter, profileRouter, applianceRouter);

//---------------LEVANTAMIENTO DE SERVIDOR
app.listen(PORT, () => {
  console.log(`Escuchando en el puerto: http://localhost:${PORT}`);
});
