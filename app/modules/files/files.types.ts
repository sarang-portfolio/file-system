export interface IFile {
  fileId?: number;
  fileName: string;
  filePath: string;
  fileSize: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
