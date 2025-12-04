import { validateRequest } from "./../../middlewares/validateRequest";
import { NextFunction, Request, Response, Router } from "express";
import { UserController } from "./user.controller";
import { createUserZodSchema, updateUserZodSchema } from "./user.validation";
import { verifyToken } from "../../utils/jwt";
import { envVars } from "../../config/env";
import AppError from "../../errorHelpers/AppError";
import { JwtPayload } from "jsonwebtoken";
import { User } from "./user.model";
import httpStatus from "http-status-codes";
import { checkAuth } from "../../utils/checkAuth";
import { multerUpload } from "../../config/multer.config";

const router = Router();

router.post("/register", validateRequest(createUserZodSchema), UserController.createUser);
router.post("/login", UserController.credentialLogin);
router.patch("/:id", checkAuth(), multerUpload.single("file"), validateRequest(updateUserZodSchema), UserController.updateUser);
router.post("/logout", UserController.logout);

router.get("/me", checkAuth(), UserController.getMe);
router.post("/login-with-phone-number",  UserController.loginWithPhoneNumber);

export const UserRoutes = router;
