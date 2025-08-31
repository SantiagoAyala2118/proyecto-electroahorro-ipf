import express from "express";
import { startDB } from "./src/config/db.js";
import personRouter from "./src/routes/person.routes.js";
import userRouter from "./src/routes/user.routes.js";

startDB();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use("/", personRouter, userRouter);

app.listen(PORT, () => {
  console.log(`Escuchando en el puerto: http://localhost:${PORT}`);
});
