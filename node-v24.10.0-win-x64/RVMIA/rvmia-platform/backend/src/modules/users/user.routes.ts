import { Router } from "express";
import { getMe, listUsers } from "./user.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { roleMiddleware } from "../../middlewares/role.middleware";

export const userRoutes = Router();

userRoutes.get("/me", authMiddleware, getMe);
userRoutes.get("/", authMiddleware, roleMiddleware(["admin"]), listUsers);