import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";

export const PersonModel = sequelize.define(
  "Person",
  {
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    createdAt: false,
    updatedAt: false,
    paranoid: true,
  }
);
