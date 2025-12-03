import { NextFunction, Request, Response } from "express";
import { ZodObject } from "zod";

export const validateRequest =
  (zodSchema: ZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (req.body.data) req.body = JSON.parse(req.body?.data);
      // console.log("Old Body", req.body);
      req.body = await zodSchema.parseAsync(req.body);
      // console.log("New Body", req.body);
      next();
    } catch (error) {
      // console.log("error====>", error);
      next(error);
    }
  };
