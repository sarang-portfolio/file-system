import { DataTypes } from "sequelize";
import { sequelize } from "../../utility/sequelize";
import { roleModel } from "../roles/roles.schema";

export const userModel = sequelize.define(
  "users",
  {
    userId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    fileCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    fileSize: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  { timestamps: true, paranoid: true, freezeTableName: true }
);

userModel.belongsTo(roleModel, { foreignKey: "roleId" });
