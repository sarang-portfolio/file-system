import { roleModel } from "./roles.schema";

const getRole = (id: number) => roleModel.findByPk(id);

export default {
  getRole,
};
