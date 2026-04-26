import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../users/user.model";
import { env } from "../../config/env";
import { ok, fail } from "../../utils/response";

export const register = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;

  const exists = await User.findOne({ email });
  if (exists) return fail(res, "Email ya registrado", 400);

  const hash = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hash,
    role: role || "buyer",
  });

  return ok(res, { user: { id: user._id, name, email, role: user.role } }, "Usuario creado");
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return fail(res, "Credenciales inválidas", 401);

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return fail(res, "Credenciales inválidas", 401);

  const token = jwt.sign({ id: user._id, role: user.role }, env.JWT_SECRET, {
    expiresIn: "7d",
  });

  return ok(res, {
    token,
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
  });
};

export const logout = async (req: Request, res: Response) => {
  return ok(res, null, "Logout exitoso");
};