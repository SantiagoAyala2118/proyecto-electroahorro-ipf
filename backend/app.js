import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });
//-----------------------------------------RUTAS
import authRouter from "./src/routes/auth.routes.js";
import profileRouter from "./src/routes/profile.routes.js";
import applianceRouter from "./src/routes/appliance.routes.js";
import morgan from "morgan";
import { startDB } from "./src/config/db.js";
startDB();

const app = express();
const PORT = process.env.PORT;

//-----------------MIDDLEWARES
app.use(express.json());
app.use(morgan("dev"));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(cookieParser());

//-------------------RUTAS
app.use("/api", authRouter, profileRouter, applianceRouter);

//---------------LEVANTAMIENTO DE SERVIDOR
app.listen(PORT, () => {
  console.log(`Escuchando en el puerto: http://localhost:${PORT}`);
});
