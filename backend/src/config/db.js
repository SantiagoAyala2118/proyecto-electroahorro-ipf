import { sequelize } from "./database.js";
import { PersonModel } from "../models/person.model.js";
import { UserModel } from "../models/user.model.js";
import { ProfileModel } from "../models/profile.model.js";
import { ApplianceModel } from "../models/appliance.model.js";
import { UserApplianceModel } from "../models/user_appliance.model.js";

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
