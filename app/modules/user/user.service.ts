import userRepo from "./user.repo";
import { IUser } from "./user.types";

const createUser = async (user: IUser) => {
  try {
    const createdUser = await userRepo.createUser(user);
    return createdUser;
  } catch (error) {
    throw error;
  }
};

const getUser = async (userId: number) => {
  try {
    const user = await userRepo.getUser(userId);
    return user;
  } catch (error) {
    throw error;
  }
};

const updateUser = async (userId: number, user: any) => {
  try {
    const updatedUser = await userRepo.updateUser(userId, user);
    return updatedUser;
  } catch (error) {
    throw error;
  }
};

const deleteUser = async (userId: number) => {
  try {
    const deletedUser = await userRepo.deleteUser(userId);
    return deletedUser;
  } catch (error) {
    throw error;
  }
};

const findUserByEmail = async (email: string) => {
  try {
    const users = await userRepo.findUserByEmail(email);
    return users;
  } catch (error) {
    throw error;
  }
};

const getAllUsers = async () => {
  try {
    return await userRepo.getAllUsers();
  } catch (err) {
    throw err;
  }
};

export default {
  createUser,
  getUser,
  updateUser,
  deleteUser,
  findUserByEmail,
  getAllUsers,
};
