import { IExcludedPaths } from "../../utility/authorize";
import { Routes, Route } from "./routes.types";
import { AuthRouter } from "../auth/auth.routes";
import { FilesRouter } from "../files/files.routes";
import { UserRouter } from "../user/user.routes";

export const routes: Routes = [
  new Route("/auth", AuthRouter),
  new Route("/file", FilesRouter),
  new Route("/user", UserRouter),
];

export const excludedPaths: IExcludedPaths[] = [
  { path: "/auth/login", method: "POST" },
  { path: "/auth/reset-password/", method: "PUT" },
  { path: "/auth/signup", method: "POST" },
  { path: "/auth/forgot-password", method: "POST" },
];
