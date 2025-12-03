import { Request, Response } from "express";
import { UserService } from "./user.service";
import httpStatus from "http-status-codes";
import AppError from "../../errorHelpers/AppError";
const createUser = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const user = await UserService.createUser(payload);
    res.status(httpStatus.CREATED).json({
      message: "User Created Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    throw new AppError(httpStatus.BAD_REQUEST, "Failed to create user");
  }
};

export const UserController = { createUser };
