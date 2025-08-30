import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { PersonModel } from "./person.model.js";

export const UserModel = sequelize.define("User", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

//Relaciones
UserModel.belongsTo(PersonModel, {
  foreignKey: "person_id",
  as: "person",
  targetKey: "id",
});

PersonModel.hasOne(UserModel, {
  foreignKey: "person_id",
  sourceKey: "id",
});
