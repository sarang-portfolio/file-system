import { MessageHandler } from "../../utility/response-handler";

export const AuthConstants = {
  INVALID_PASSWORD: new MessageHandler(400, "Invalid password"),
  INVALID_TOKEN: new MessageHandler(400, "Invalid token"),
  EMAIL_NOT_FOUND: new MessageHandler(404, "Email not found"),
  EMAIL_SENT: new MessageHandler(200, "Email sent"),
  PASSWORD_RESET: new MessageHandler(200, "Password reset"),
  USER_CREATED: new MessageHandler(200, "User created"),
  USER_LOGGED_IN: new MessageHandler(200, "User logged in"),
  USER_LOGGED_OUT: new MessageHandler(200, "User logged out"),
  USER_UPDATED: new MessageHandler(200, "User updated"),
  USER_DELETED: new MessageHandler(200, "User deleted"),
  USER_NOT_FOUND: new MessageHandler(404, "User not found"),
  SIGNUP_SUCCESS: new MessageHandler(200, "Sign up successful"),
  PASSWORD_CHANGED: new MessageHandler(200, "Password changed"),
};
