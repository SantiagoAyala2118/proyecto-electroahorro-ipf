import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const UserApplianceModel = sequelize.define("UserApplianceModel", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    unique: true,
  },
});
