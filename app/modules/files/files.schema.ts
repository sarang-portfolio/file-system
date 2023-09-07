import { DataTypes } from "sequelize";
import { sequelize } from "../../utility/sequelize";
import { userModel } from "../user/user.schema";

export const fileModel = sequelize.define(
  "files",
  {
    fileId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    filePath: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    isFolder: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    parentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
    },
    fileSize: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    uploadDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: new Date(),
    },
  },
  { timestamps: true, paranoid: true, freezeTableName: true }
);

userModel.hasMany(fileModel, { foreignKey: "userId" });
fileModel.belongsTo(userModel, { foreignKey: "userId" });
