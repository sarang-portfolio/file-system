import { NextFunction, Request, Response, Router } from "express";
import { permit } from "../../utility/authorize";
import { upload } from "../../utility/file-upload";
import { ResponseHandler } from "../../utility/response-handler";
import { ROLES } from "../roles/roles.constants";
import filesService from "./files.service";

export const FilesRouter = Router();

FilesRouter.post(
  "/",
  upload,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const file = req.file;
      const userId = res.locals.user.userId;
      const body = req.body;
      const result = await filesService.uploadFile(userId, file, body);
      res.send(new ResponseHandler(result));
    } catch (err) {
      next(err);
    }
  }
);

FilesRouter.post(
  "/add-folder",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = res.locals.user.userId;
      const body = req.body;
      const result = await filesService.uploadFolder(userId, body);
      res.send(new ResponseHandler(result));
    } catch (err) {
      next(err);
    }
  }
);

FilesRouter.get(
  "/file-report/:id",
  permit([ROLES.ADMIN]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = Number(req.params.id as string);
      const startDate = new Date(req.query.startDate as string);
      const endDate = new Date(req.query.endDate as string);
      const result = await filesService.filesPerUserOverTime(
        userId,
        startDate,
        endDate
      );
      res.send(new ResponseHandler(result));
    } catch (err) {
      next(err);
    }
  }
);

FilesRouter.get(
  "/space-report/:id",
  permit([ROLES.ADMIN]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = Number(req.params.id as string);
      const startDate = new Date(req.query.startDate as string);
      const endDate = new Date(req.query.endDate as string);
      const result = await filesService.fileSpaceConsumptionPerUserOverTime(
        userId,
        startDate,
        endDate
      );
      res.send(new ResponseHandler(result));
    } catch (err) {
      next(err);
    }
  }
);

FilesRouter.get(
  "/download/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const fileId = Number(req.params.id as string);
      const result: any = await filesService.downloadFile(fileId);
      res.download(`uploads/${result.filePath}`);
    } catch (err) {
      next(err);
    }
  }
);
