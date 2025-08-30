import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const ProfileModel = sequelize.define("Profile", {
  picture: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: "Foto en blanco",
  },
  bio: {
    type: DataTypes.STRING(200),
    allowNull: true,
  },
});
