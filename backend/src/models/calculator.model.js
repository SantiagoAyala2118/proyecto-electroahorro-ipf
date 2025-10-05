import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";
import { UserModel } from "./user.model.js";

export const CalculationModel = sequelize.define(
  "Calculation",
  {
    power: {
      type: DataTypes.FLOAT,
      allowNull: false, // watts
    },
    hoursPerDay: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    days: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    totalConsumption: {
      type: DataTypes.FLOAT,
      allowNull: false, // en kWh
    },
    cost: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

CalculationModel.belongsTo(UserModel, { foreignKey: "user_id" });

UserModel.hasMany(CalculationModel, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

export default Calculation;
