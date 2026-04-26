import { Response } from "express";
import { User } from "./user.model";
import { AuthRequest } from "../../middlewares/auth.middleware";
import { ok } from "../../utils/response";

export const getMe = async (req: AuthRequest, res: Response) => {
  const user = await User.findById(req.user?.id).select("-password");
  return ok(res, user);
};

export const listUsers = async (req: AuthRequest, res: Response) => {
  const users = await User.find().select("-password");
  return ok(res, users);
};