import { Op } from "sequelize";
import { sequelize } from "../../utility/sequelize";
import { fileModel } from "./files.schema";

const uploadFile = (userId: number, file: any) =>
  fileModel.create({ ...file, userId, isFolder: false });

const getFile = (fileId: number) => fileModel.findOne({ where: { fileId } });

const updateFile = (fileId: number, file: any) =>
  fileModel.update(file, { where: { fileId } });

const deleteFile = (fileId: number) => fileModel.destroy({ where: { fileId } });

const fileCount = (userId: number) => fileModel.count({ where: { userId } });

const fileSize = (userId: number) =>
  fileModel.sum("fileSize", { where: { userId } });

const moveFilePath = (fileId: number, filePath: string) =>
  fileModel.update({ filePath }, { where: { fileId } });

const uploadFolder = (userId: number, data: any) =>
  fileModel.create({ ...data, userId, isFolder: true });

const getOneFolderByParentId = (userId: number, fileId: number) =>
  fileModel.findOne({ where: { userId, fileId, isFolder: true } });

const filesPerUserOverTime = (userId: number, startDate: Date, endDate: Date) =>
  fileModel.findAll({
    where: {
      userId,
      uploadDate: {
        [Op.between]: [startDate, endDate],
      },
    },
    attributes: [
      "userId",
      [sequelize.fn("DATE", sequelize.col("uploadDate")), "uploadDate"],
      [sequelize.fn("count", sequelize.col("fileId")), "fileCount"],
    ],
    group: ["uploadDate", "userId"],
  });

const fileSpaceConsumptionPerUser = (
  userId: number,
  startDate: Date,
  endDate: Date
) =>
  fileModel.findAll({
    where: {
      userId,
      uploadDate: {
        [Op.between]: [startDate, endDate],
      },
    },
    attributes: [
      "userId",
      [sequelize.fn("SUM", sequelize.col("fileSize")), "fileSize"],
      [sequelize.fn("DATE", sequelize.col("uploadDate")), "uploadDate"],
    ],
    group: ["uploadDate", "userId"],
  });

const downloadFile = (fileId: number) =>
  fileModel.findOne({ where: { fileId } });

export default {
  uploadFile,
  getFile,
  updateFile,
  deleteFile,
  fileCount,
  fileSize,
  uploadFolder,
  moveFilePath,
  getOneFolderByParentId,
  filesPerUserOverTime,
  fileSpaceConsumptionPerUser,
  downloadFile,
};
