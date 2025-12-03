import { Request, Response } from "express";
import { UserService } from "./user.service";
import httpStatus from "http-status-codes";
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
    res.status(httpStatus.BAD_REQUEST).json({
      message: `Something went wrong!! ${error}`,
    });
  }
};

export const UserController = { createUser };
