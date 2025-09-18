import express from "express";
import { startDB } from "./src/config/db.js";
import authRouter from "./src/routes/auth.routes.js";

startDB();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use("/", authRouter);

app.listen(PORT, () => {
  console.log(`Escuchando en el puerto: http://localhost:${PORT}`);
});
