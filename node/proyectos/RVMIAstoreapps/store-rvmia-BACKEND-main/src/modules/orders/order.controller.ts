import { Request, Response } from "express";
import { Order } from "./order.model";
import { ok, fail } from "../../utils/response";

export const createOrder = async (req: any, res: Response) => {
  const { items } = req.body;

  if (!items || !Array.isArray(items) || items.length === 0) {
    return fail(res, "Carrito vacío");
  }

  const total = items.reduce(
    (sum: number, item: any) =>
      sum + Number(item.price || 0) * Number(item.quantity || 0),
    0
  );

  const order = await Order.create({
    user: req.user.id,
    items,
    total,
    status: "pending"
  });

  return ok(res, order);
};

export const getMyOrders = async (req: any, res: Response) => {
  const orders = await Order.find({ user: req.user.id });
  return ok(res, orders);
};

export const getAllOrders = async (_: Request, res: Response) => {
  const orders = await Order.find();
  return ok(res, orders);
};