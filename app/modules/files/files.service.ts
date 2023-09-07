import userService from "../user/user.service";
import filesRepo from "./files.repo";

const uploadFile = async (userId: number, file: any, body: any) => {
  try {
    const parentFolder: any = await filesRepo.getOneFolderByParentId(
      userId,
      body.parentId
    );
    const path = parentFolder.filePath
      ? `${parentFolder.filePath}/${file.originalname}`
      : `${parentFolder.name}/${file.originalname}`;
    const fileDetails = {
      name: file.originalname,
      filePath: path,
      fileSize: file.size,
      parentId: Number(body.parentId),
    };
    await filesRepo.uploadFile(userId, fileDetails);
    const fileCount = await filesRepo.fileCount(userId);
    console.log(fileCount);
    const fileSize = await filesRepo.fileSize(userId);
    await userService.updateUser(userId, { fileCount: fileCount, fileSize });
    return "FILE UPLOADED";
  } catch (err) {
    throw err;
  }
};

const getFile = async (fileId: number) => {
  try {
    const file = await filesRepo.getFile(fileId);
    return file;
  } catch (err) {
    throw err;
  }
};

const updateFile = async (fileId: number, file: any) => {
  try {
    const updatedFile = await filesRepo.updateFile(fileId, file);
    return updatedFile;
  } catch (err) {
    throw err;
  }
};

const deleteFile = async (fileId: number) => {
  try {
    const file: any = await filesRepo.getFile(fileId);
    const fileCount = await filesRepo.fileCount(file.userId);
    const fileSize = await filesRepo.fileSize(file.userId);
    await filesRepo.deleteFile(fileId);
    await userService.updateUser(file.userId, { fileCount, fileSize });
    return "FILE DELETED";
  } catch (err) {
    throw err;
  }
};

const uploadFolder = async (userId: number, data: any) => {
  try {
    if (data.parentId) {
      const parentFolder: any = await filesRepo.getOneFolderByParentId(
        userId,
        data.parentId
      );
      const path = parentFolder.filePath
        ? parentFolder.filePath + "/" + data.name
        : parentFolder.name + "/" + data.name;
      return await filesRepo.uploadFolder(userId, { ...data, filePath: path });
    } else {
      return await filesRepo.uploadFolder(userId, data);
    }
  } catch (err) {
    throw err;
  }
};

const filesPerUserOverTime = async (
  userId: number,
  startDate: Date,
  endDate: Date
) => {
  try {
    const files = await filesRepo.filesPerUserOverTime(
      userId,
      startDate,
      endDate
    );
    return files;
  } catch (err) {
    throw err;
  }
};

const fileSpaceConsumptionPerUserOverTime = async (
  userId: number,
  startDate: Date,
  endDate: Date
) => {
  try {
    const files = await filesRepo.fileSpaceConsumptionPerUser(
      userId,
      startDate,
      endDate
    );
    return files;
  } catch (err) {
    throw err;
  }
};

const downloadFile = async (fileId: number) => {
  try {
    const file = await filesRepo.downloadFile(fileId);
    return file;
  } catch (err) {
    throw err;
  }
};

export default {
  uploadFile,
  getFile,
  updateFile,
  deleteFile,
  uploadFolder,
  filesPerUserOverTime,
  fileSpaceConsumptionPerUserOverTime,
  downloadFile,
};
