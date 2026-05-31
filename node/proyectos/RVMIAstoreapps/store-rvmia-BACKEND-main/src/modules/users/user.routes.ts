import { Router } from "express";
import { getMe, listUsers } from "./user.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

export const userRoutes = Router();

userRoutes.get("/me", authMiddleware, getMe);

/* 👇 PARA CHROME */
userRoutes.get("/", listUsers);