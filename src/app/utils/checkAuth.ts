import { NextFunction, Request, Response } from "express";
import AppError from "../errorHelpers/AppError";

import httpStatus from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../config/env";
import { User } from "../modules/user/user.model";
import { verifyToken } from "../utils/jwt";

export const checkAuth = () => async (req: Request, res: Response, next: NextFunction) => {
  try {
    const accessToken = req.headers.authorization;
    if (!accessToken) throw new AppError(401, "No Token Received");
    const verifiedToken = verifyToken(accessToken as string, envVars.JWT_ACCESS_TOKEN_SECRET);
    if (!verifiedToken) throw new AppError(401, "Token is not verified");
    const userId = (verifiedToken as JwtPayload).userId;
    const isUSerExist = await User.findById(userId);
    if (!isUSerExist) throw new AppError(401, "User dosent exist");

    const frontendUserId = req.params.id;
    if (frontendUserId !== (verifiedToken as JwtPayload).userId)
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not permitted to do this action");
    const isCredentialAuthenticated = isUSerExist.auths[0].provider === "credentials";
    if (isCredentialAuthenticated) {
      if ((verifiedToken as JwtPayload).email !== isUSerExist.email) {
        throw new AppError(httpStatus.UNAUTHORIZED, "You are not permitted to do this action");
      }
    } else {
      if ((verifiedToken as JwtPayload).phone !== isUSerExist.phone) {
        throw new AppError(httpStatus.UNAUTHORIZED, "You are not permitted to do this route");
      }
    }
    req.user = verifiedToken as JwtPayload;
    next();
  } catch (error) {
    next(error);
  }
};
