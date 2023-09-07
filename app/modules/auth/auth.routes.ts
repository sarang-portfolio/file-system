import { NextFunction, Request, Response, Router } from "express";
import { permit } from "../../utility/authorize";
import { ResponseHandler } from "../../utility/response-handler";
import { ROLES } from "../roles/roles.constants";
import { IUser } from "../user/user.types";
import authService from "./auth.service";
import { ICredentials } from "./auth.types";
import { authValidations } from "./auth.validations";

export const AuthRouter = Router();

AuthRouter.post(
  "/signup",
  permit([ROLES.ADMIN, ROLES.USER]),
  authValidations.signup,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await authService.signup(req.body as IUser);
      res.send(new ResponseHandler(user));
    } catch (err) {
      next(err);
    }
  }
);

AuthRouter.post(
  "/login",
  permit([ROLES.ADMIN, ROLES.USER]),
  authValidations.login,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await authService.login(req.body as ICredentials);
      res.send(new ResponseHandler(user));
    } catch (err) {
      next(err);
    }
  }
);

AuthRouter.post(
  "/forgot-password",
  authValidations.forgotPassword,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await authService.forgotPassword(req.body.userEmail);
      res.send(new ResponseHandler(result));
    } catch (err) {
      next(err);
    }
  }
);

AuthRouter.put(
  "/reset-password/:id",
  authValidations.resetPassword,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await authService.resetPassword(
        req.params.id,
        req.body.newPassword
      );
      res.send(new ResponseHandler(user));
    } catch (err) {
      next(err);
    }
  }
);

AuthRouter.put(
  "/change-password",
  permit([ROLES.ADMIN, ROLES.USER]),
  authValidations.changePassword,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = res.locals.user.userId;
      const result = await authService.changePassword(
        Number(userId as string),
        req.body.oldPassword,
        req.body.newPassword
      );
      res.send(new ResponseHandler(result));
    } catch (err) {
      next(err);
    }
  }
);
