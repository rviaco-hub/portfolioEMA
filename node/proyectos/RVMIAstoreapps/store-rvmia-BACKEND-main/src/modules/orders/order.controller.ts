import { Request, Response } from "express";
import { Cart } from "../cart/cart.model";
import { Order } from "./order.model";
import { ok, fail } from "../../utils/response";

export const createOrder = async (req: any, res: Response) => {
  const cart = await Cart.findOne({ user: req.user.id });

  if (!cart || cart.items.length === 0)
    return fail(res, "Carrito vacío");

  const total = cart.items.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  );

  const order = await Order.create({
    user: req.user.id,
    items: cart.items,
    total
  });

  // carrito se limpia después del pago exitoso

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