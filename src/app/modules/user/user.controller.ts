import { NextFunction, Request, Response } from "express";
import { UserService } from "./user.service";
import httpStatus from "http-status-codes";
import AppError from "../../errorHelpers/AppError";
import { IUser } from "./user.interface";
import { JwtPayload } from "jsonwebtoken";
const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = req.body;
    const user = await UserService.createUser(payload);
    res.status(httpStatus.CREATED).json({
      success: true,
      message: "User Created Successfully",
      user,
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
    res.status(httpStatus.CREATED).json({
      success: true,
      message: "Login successfull",
      user,
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
    const payload:Partial<IUser> = {...req.body,profilePicture:req.file?.path};
    console.log(payload)
    const result = await UserService.updateUser(userId, payload, verifiedToken);
    res.status(httpStatus.CREATED).json({
      success: true,
      message: "token verified",
      result,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const UserController = { createUser, credentialLogin, updateUser };
