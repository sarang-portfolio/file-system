import { createToken, verifyToken } from "../../utility/authorize";
import { sendEmail } from "../../utility/email";
import { comparePassword, createHash } from "../../utility/password";
import userService from "../user/user.service";
import { IUser } from "../user/user.types";
import { AuthConstants } from "./auth.constants";
import { ICredentials } from "./auth.types";

const signup = async (user: IUser) => {
  try {
    const hashedPassword = await createHash(user.password);
    user.password = hashedPassword;
    await userService.createUser(user);
    return AuthConstants.SIGNUP_SUCCESS;
  } catch (error) {
    throw error;
  }
};

const login = async (credentials: ICredentials) => {
  try {
    const user: any = await userService.findUserByEmail(credentials.email);
    if (!user) {
      throw AuthConstants.USER_NOT_FOUND;
    }
    const isPasswordCorrect = await comparePassword(
      credentials.password,
      user.password
    );
    if (!isPasswordCorrect) {
      throw AuthConstants.INVALID_PASSWORD;
    }
    const token = createToken({ userId: user.userId });
    return { token: token, role: user.roleId };
  } catch (error) {
    throw error;
  }
};

const forgotPassword = async (email: string) => {
  try {
    const user: any = await userService.findUserByEmail(email);
    if (!user) {
      throw AuthConstants.USER_NOT_FOUND;
    }
    const token = createToken({ userId: user.userId });
    const { URL } = process.env;
    const link = `${URL}/${token}`;
    const message = `Please click on the link below to reset your password:
        ${link}`;
    await sendEmail(user.email, "FORGOT PASSWORD", message);
    return AuthConstants.EMAIL_SENT;
  } catch (error) {
    throw error;
  }
};

const resetPassword = async (token: string, password: string) => {
  try {
    const payload: any = await verifyToken(token);
    const hashedPassword = await createHash(password);
    await userService.updateUser(payload.userId, { password: hashedPassword });
    return AuthConstants.PASSWORD_RESET;
  } catch (error) {
    throw error;
  }
};

const changePassword = async (
  userId: number,
  oldPassword: string,
  newPassword: string
) => {
  try {
    const user: any = await userService.getUser(userId);
    const isPasswordCorrect = await comparePassword(oldPassword, user.password);
    if (!isPasswordCorrect) {
      throw AuthConstants.INVALID_PASSWORD;
    }
    const hashedPassword = await createHash(newPassword);
    await userService.updateUser(userId, { password: hashedPassword });
    return AuthConstants.PASSWORD_CHANGED;
  } catch (error) {
    throw error;
  }
};

export default {
  signup,
  login,
  forgotPassword,
  resetPassword,
  changePassword,
};
