import { sequelize } from "../../utility/sequelize";
import { fileModel } from "../files/files.schema";
import { userModel } from "./user.schema";
import { IUser } from "./user.types";

const createUser = (user: IUser) => userModel.create({ ...user });

const getUser = (userId: number) => userModel.findOne({ where: { userId } });

const updateUser = (userId: number, user: any) =>
  userModel.update(user, { where: { userId } });

const deleteUser = (userId: number) => userModel.destroy({ where: { userId } });

const findUserByEmail = (email: string) =>
  userModel.findOne({ where: { email: email } });

const fileCountPerUser = (userId: number) =>
  fileModel.findAll({
    where: {
      userId,
      isFolder: false,
    },
    attributes: [[sequelize.fn("COUNT", sequelize.col("fileId")), "fileCount"]],
  });

const fileSizePerUser = (userId: number) =>
  fileModel.sum("fileSize", { where: { userId, isFolder: false } });

const getAllUsers = () => userModel.findAll();

export default {
  createUser,
  getUser,
  updateUser,
  deleteUser,
  findUserByEmail,
  fileCountPerUser,
  fileSizePerUser,
  getAllUsers,
};
