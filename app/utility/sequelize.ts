import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  "postgres://postgres:admin@localhost:5432/fileSystem"
);
