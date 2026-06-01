import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../users/user.model";
import { env } from "../../config/env";
import { ok, fail } from "../../utils/response";

export const register = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      name,
      email,
      password,
      role
    } = req.body;

    const normalizedEmail =
      email.trim().toLowerCase();

    const exists =
      await User.findOne({
        email: normalizedEmail
      });

    if (exists) {
      return fail(
        res,
        "Email ya registrado",
        400
      );
    }

    if (password.length < 8) {
      return fail(
        res,
        "La contraseña debe tener mínimo 8 caracteres",
        400
      );
    }

    const hash =
      await bcrypt.hash(
        password,
        10
      );

    const user =
      await User.create({
        name: name.trim(),
        email:
          normalizedEmail,
        password: hash,
        role
      });

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role
      },
      env.jwtSecret,
      {
        expiresIn: "1d"
      }
    );

    return ok(
      res,
      {
        token,
        user
      },
      "Usuario creado"
    );
  } catch (error) {
    return fail(
      res,
      "Error al registrar usuario",
      500,
      error
    );
  }
};

export const login = async (req: any, res: Response) => {
  try {
    const { password } = req.body;
    const user = req.userDB;

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return fail(res, "Credenciales inválidas");
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      env.jwtSecret,
      { expiresIn: "1d" }
    );

    return ok(
      res,
      {
        token,
        user
      },
      "Login exitoso"
    );
  } catch (error) {
    return fail(res, "Error al iniciar sesión", 500, error);
  }
};

export const logout = async (_: Request, res: Response) => {
  return ok(res, null, "Logout exitoso");
};