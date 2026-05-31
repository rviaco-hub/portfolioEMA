import { Request, Response, NextFunction } from "express";
import { fail } from "../utils/response";
import { User } from "../modules/users/user.model";

/* Validador genérico de campos */
export const validateFields = (fields: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    for (const field of fields) {
      if (!req.body[field]) {
        return fail(res, `El campo '${field}' es obligatorio`, 400);
      }
    }
    next();
  };
};

/*  Validar formato email */
export const validateEmail = (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;

  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!regex.test(email)) {
    return fail(res, "Email inválido", 400);
  }

  next();
};

/*  Verificar si email YA existe (register) */
export const emailNotExists = async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;

  const exists = await User.findOne({ email });

  if (exists) {
    return fail(res, "Email ya registrado", 400);
  }

  next();
};

/*  Verificar si email EXISTE (login) */
export const emailExists = async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return fail(res, "Credenciales inválidas", 400);
  }

  (req as any).userDB = user; // 👈 lo pasamos al controller

  next();
};