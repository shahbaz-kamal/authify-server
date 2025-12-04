import { NextFunction, Request, Response } from "express";
import { UserService } from "./user.service";
import httpStatus from "http-status-codes";
import AppError from "../../errorHelpers/AppError";
import { IUser } from "./user.interface";
import { JwtPayload } from "jsonwebtoken";
import { sendResponse } from "../../utils/sendResponse";
import { setAuthCookie } from "../../utils/setAuthCookie";
import { generateToken } from "../../utils/jwt";
import { envVars } from "../../config/env";
const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = req.body;
    const user = await UserService.createUser(payload);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "User Created Successfully",
      data: user,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
const credentialLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = req.body;
    const user = await UserService.credentialsLogin(payload);
    const jwtPayload: JwtPayload = {
      userId: user._id,
      email: user.email,
      role: user.role,
    };
    const accessToken = generateToken(jwtPayload, envVars.JWT_ACCESS_TOKEN_SECRET, envVars.JWT_ACCESS_TOKEN_EXPIRES_IN);
    const refreshToken = generateToken(jwtPayload, envVars.JWT_REFRESH_TOKEN_EXPIRES_IN, envVars.JWT_REFRESH_TOKEN_EXPIRES_IN);
    setAuthCookie(res, { accessToken, refreshToken });
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Login successfull",
      data: user,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // const payload = req.body;
    const userId = req.params.id;
    const verifiedToken = req.user as JwtPayload;
    const payload: Partial<IUser> = { ...req.body, profilePicture: req.file?.path };
    console.log(payload);
    const result = await UserService.updateUser(userId, payload, verifiedToken);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "User Created Successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
const getMe = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // const payload = req.body;
    const decodedToken = req.user as JwtPayload;

    const result = await UserService.getMe(decodedToken.userId);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Your Data Retrieved Successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // const payload = req.body;
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    console.log("Log out");
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "logged out",
      data: null,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const loginWithPhoneNumber = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = req.body;
    const user =await UserService.loginWithPhoneNumber(payload, res);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Login successfull",
      data: user,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const UserController = { createUser, credentialLogin, updateUser, getMe, logout,loginWithPhoneNumber };
