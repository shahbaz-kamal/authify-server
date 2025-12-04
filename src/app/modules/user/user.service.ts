import AppError from "../../errorHelpers/AppError";
import { IAuthProvider, IUser } from "./user.interface";
import { User } from "./user.model";
import httpStatus from "http-status-codes";
import bcryptjs from "bcryptjs";
import { envVars } from "../../config/env";
import { JwtPayload } from "jsonwebtoken";
import { generateToken } from "../../utils/jwt";
import { setAuthCookie } from "../../utils/setAuthCookie";
import { Response } from "express";

const createUser = async (payload: Partial<IUser>) => {
  const isUserExist = await User.findOne({ email: payload.email });

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

const credentialsLogin = async (payload: Partial<IUser>) => {
  const isUserExist = await User.findOne({ email: payload.email });

  if (!isUserExist) throw new AppError(httpStatus.BAD_REQUEST, "User does not exist");

  const { password, ...rest } = payload;
  const isPasswordMatched = await bcryptjs.compare(password as string, isUserExist.password as string);
  if (!isPasswordMatched) throw new AppError(httpStatus.UNAUTHORIZED, "Password dosent match");

  return isUserExist;
};
const updateUser = async (userId: string, payload: Partial<IUser>, decodedToken: JwtPayload) => {
  const isUserExist = await User.findById(userId);

  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, "User Not Found");
  }
  if (userId !== decodedToken.userId) throw new AppError(httpStatus.UNAUTHORIZED, "You are not permitted");
  const newUpdatedUser = await User.findByIdAndUpdate(userId, payload, {
    new: true,
    runValidators: true,
  });
  return newUpdatedUser;
};

const getMe = async (myId: string) => {
  const user = await User.findById(myId).select("-password");

  return user;
};

const loginWithPhoneNumber = async (payload: Partial<IUser>,res:Response) => {
  const phone = "+" + payload.phone;
  const isUserExist = await User.findOne({ phone });
  const authProvider: IAuthProvider = { provider: "phone", providerId: phone };
  let user;
  if (!isUserExist) {
    const newUser = {
      phone,
      auths: [authProvider],
    };
    user = await User.create(newUser);
  } else {
    user = isUserExist;
  }
  const jwtPayload: JwtPayload = {
    userId: user._id,
    phone: user.phone,
    role: user.role,
  };
  const accessToken = generateToken(jwtPayload, envVars.JWT_ACCESS_TOKEN_SECRET, envVars.JWT_ACCESS_TOKEN_EXPIRES_IN);
  const refreshToken = generateToken(jwtPayload, envVars.JWT_REFRESH_TOKEN_EXPIRES_IN, envVars.JWT_REFRESH_TOKEN_EXPIRES_IN);
  setAuthCookie(res, { accessToken, refreshToken });

  return user
};

export const UserService = { createUser, credentialsLogin, updateUser, getMe, loginWithPhoneNumber };
