import { api } from "../api/api";
import type { LoginRequest, LoginResponse, RegisterRequest } from "../../types/auth.types";

export const loginRequest = async (data: LoginRequest): Promise<LoginResponse> => {
  const res = await api.post("/auth/login", data);
  return res.data;
};

export const registerRequest = async (data: RegisterRequest) => {
  const res = await api.post("/auth/register", data);
  return res.data;
};

export const logoutRequest = async () => {
  const res = await api.post("/auth/logout");
  return res.data;
};