import { Request, Response } from "express";
import { User } from "./user.model";
import { ok } from "../../utils/response";

export const getMe = async (req: any, res: Response) => {
  const user = await User.findById(req.user.id).select("-password");
  return ok(res, user);
};

export const listUsers = async (_: Request, res: Response) => {
  const users = await User.find().select("-password");
  return ok(res, users);
};