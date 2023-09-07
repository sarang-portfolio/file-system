import rolesRepo from "./roles.repo";

const getRole = async (id: number) => {
  try {
    return await rolesRepo.getRole(id);
  } catch (error) {
    throw error;
  }
};

export default {
  getRole,
};
