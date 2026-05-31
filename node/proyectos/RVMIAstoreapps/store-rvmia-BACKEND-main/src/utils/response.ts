import { Response } from "express";

interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  meta?: any;
}

export const ok = <T>(
  res: Response,
  data?: T,
  message: string = "OK",
  status: number = 200,
  meta?: any
) => {
  const response: ApiResponse<T> = {
    success: true,
    message,
    data,
    ...(meta && { meta })
  };

  return res.status(status).json(response);
};

export const fail = (
  res: Response,
  message: string = "Error",
  status: number = 400,
  error?: any
) => {
  return res.status(status).json({
    success: false,
    message,
    ...(error && { error })
  });
};