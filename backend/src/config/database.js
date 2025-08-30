import { Sequelize } from "sequelize";
import { PersonModel } from "../models/person.model.js";
import { UserModel } from "../models/user.model.js";
import { ProfileModel } from "../models/profile.model.js";
import { ApplianceModel } from "../models/appliance.model.js";
import { UserApplianceModel } from "../models/user_appliance.model.js";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  }
);

export const startDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexión exitosa a la Base de datos");
    await sequelize.sync();
    console.log("Sincronización existosa con la Base de datos");
  } catch (err) {
    console.error("No se ha podido conectar con la Base de datos", err);
  }
  await PersonModel.sync(),
    UserModel.sync(),
    ProfileModel.sync(),
    ApplianceModel.sync(),
    UserApplianceModel.sync();
};
