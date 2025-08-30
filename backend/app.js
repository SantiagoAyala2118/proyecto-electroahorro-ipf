import express from "express";
import { startDB } from "./src/config/database.js";

startDB();

const app = express();
const PORT = process.env.PORT;

app.use("/", (req, res) => {
  //Rutas
});

app.listen(PORT, () => {
  console.log(`Escuchando en el puerto: ${PORT}`);
});
