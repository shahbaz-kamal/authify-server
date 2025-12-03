import AppError from "../../errorHelpers/AppError";
import { IAuthProvider, IUser } from "./user.interface";
import { User } from "./user.model";
import httpStatus from "http-status-codes";
import bcryptjs from "bcryptjs";
import { envVars } from "../../config/env";
const createUser = async (payload: Partial<IUser>) => {
  let isUserExist;
  if (payload.email) {
    isUserExist = await User.findOne({ email: payload.email });
  } else {
    isUserExist = await User.findOne({ phone: payload.phone });
  }

  if (isUserExist) throw new AppError(httpStatus.BAD_REQUEST, "User Already exist");

  let authProvider: IAuthProvider;
  if (payload.email) authProvider = { provider: "credentials", providerId: payload.email };
  else authProvider = { provider: "phone", providerId: payload.phone as string };

  const { password, ...rest } = payload;
  const hashedPassword = bcryptjs.hashSync(password as string, Number(envVars.BCRYPT_SALT_ROUND));

  const newUser = {
    password: hashedPassword,
    auths: [authProvider],
    ...rest,
  };
  const user = await User.create(newUser);
  return user;
};

export const UserService = { createUser };
