import { Response } from "express";

export const ok = <T>(
  res: Response,
  data?: T,
  message: string = "OK",
  status: number = 200
) => {
  return res.status(status).json({
    success: true,
    message,
    data,
  });
};

export const fail = (
  res: Response,
  message: string = "Error",
  status: number = 400
) => {
  return res.status(status).json({
    success: false,
    message,
  });
};