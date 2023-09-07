import { NextFunction, Request, Response, Router } from "express";
import { ResponseHandler } from "../../utility/response-handler";
import userService from "./user.service";
import { IUser } from "./user.types";
import { userValidations } from "./user.validations";

export const UserRouter = Router();

UserRouter.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await userService.getAllUsers();
    res.send(new ResponseHandler(result));
  } catch (err) {
    next(err);
  }
});

UserRouter.get("/:id", async (req, res, next) => {
  try {
    const user = await userService.getUser(Number(req.params.id));
    res.send(new ResponseHandler(user));
  } catch (error) {
    next(error);
  }
});

UserRouter.put(
  "/update",
  userValidations.updateUser,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = res.locals.user.userId;
      const user = req.body as IUser;
      const updatedUser = await userService.updateUser(Number(userId), user);
      res.send(new ResponseHandler(updatedUser));
    } catch (error) {
      next(error);
    }
  }
);

UserRouter.delete("/delete/:id", async (req, res, next) => {
  try {
    const deletedUser = await userService.deleteUser(Number(req.params.id));
    res.send(new ResponseHandler(deletedUser));
  } catch (error) {
    next(error);
  }
});
