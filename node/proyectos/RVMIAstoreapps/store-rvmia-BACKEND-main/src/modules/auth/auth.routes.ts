import { Router } from "express";
import { register, login, logout } from "./auth.controller";

import {
  validateFields,
  validateEmail,
  emailNotExists,
  emailExists
} from "../../middlewares/validate.middleware";

export const authRoutes = Router();

/* REGISTER */
authRoutes.post(
  "/register",
  validateFields(["name", "email", "password"]),
  validateEmail,
  emailNotExists,
  register
);

/* LOGIN */
authRoutes.post(
  "/login",
  validateFields(["email", "password"]),
  validateEmail,
  emailExists,
  login
);

/* LOGOUT */
authRoutes.post("/logout", logout);