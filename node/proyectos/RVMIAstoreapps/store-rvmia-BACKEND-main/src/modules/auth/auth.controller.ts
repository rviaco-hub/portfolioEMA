import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../users/user.model";
import { env } from "../../config/env";
import { ok, fail } from "../../utils/response";

export const register = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;

  const hash = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hash,
    role
  });

  return ok(res, user, "Usuario creado");
};

export const login = async (req: any, res: Response) => {
  const { password } = req.body;
  const user = req.userDB; // 👈 viene del middleware

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return fail(res, "Credenciales inválidas");

  const token = jwt.sign(
    { id: user._id, role: user.role },
    env.jwtSecret,
    { expiresIn: "1d" }
  );

  return ok(res, { token, user }, "Login exitoso");
};

export const logout = async (_: Request, res: Response) => {
  return ok(res, null, "Logout exitoso");
};