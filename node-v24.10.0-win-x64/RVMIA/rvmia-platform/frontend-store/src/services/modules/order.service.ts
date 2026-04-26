import { api } from "../api/api";
import type { Order } from "../../types/order.types";

export const createOrder = async (items: any[]): Promise<Order> => {
  const res = await api.post("/orders", { items });
  return res.data.data;
};

export const getMyOrders = async (): Promise<Order[]> => {
  const res = await api.get("/orders/me");
  return res.data.data;
};