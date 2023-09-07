import { DataTypes } from "sequelize";
import { sequelize } from "../../utility/sequelize";

export const roleModel = sequelize.define(
  "Role",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  { timestamps: true, paranoid: true, freezeTableName: true }
);
