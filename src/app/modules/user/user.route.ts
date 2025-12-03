import { validateRequest } from "./../../middlewares/validateRequest";
import { Router } from "express";
import { UserController } from "./user.controller";
import { createUserZodSchema } from "./user.validation";

const router = Router();

router.post("/register", validateRequest(createUserZodSchema), UserController.createUser);

export const UserRoutes = router;
