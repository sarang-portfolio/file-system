import { compare, genSalt, hash } from "bcryptjs";
import { generate } from "generate-password";

export const createPassword = async () => {
  const password = generate({
    length: 6,
    numbers: true,
    symbols: true,
    lowercase: true,
    uppercase: true,
  });

  const hashedPassword = await createHash(password);

  return { password, hashedPassword };
};

export const createHash = async (password: string) => {
  const salt = await genSalt();

  const hashedPassword = await hash(password, salt);

  return hashedPassword;
};

export const comparePassword = async (
  password: string,
  hashedPassword: string
) => {
  return await compare(password, hashedPassword);
};
