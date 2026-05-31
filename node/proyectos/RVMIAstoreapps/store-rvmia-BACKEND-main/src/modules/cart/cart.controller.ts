import { Request, Response } from "express";
import { Cart } from "./cart.model";
import { ok } from "../../utils/response";

export const getCart = async (req: any, res: Response) => {
  let cart = await Cart.findOne({ user: req.user.id });

  if (!cart) {
    cart = await Cart.create({ user: req.user.id, items: [] });
  }

  return ok(res, cart);
};

export const addToCart = async (req: any, res: Response) => {
  const { product, name, price, quantity } = req.body;

  let cart = await Cart.findOne({ user: req.user.id });

  if (!cart) {
    cart = await Cart.create({ user: req.user.id, items: [] });
  }

  const existing = cart.items.find(
    i => i.product && i.product.toString() === product
  );

  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.items.push({ product, name, price, quantity });
  }

  await cart.save();

  return ok(res, cart);
};

export const removeFromCart = async (req: any, res: Response) => {
  const { productId } = req.params;

  const cart = await Cart.findOne({ user: req.user.id });

  if (!cart) return ok(res, null);

  const filtered = cart.items.filter(
    i => i.product && i.product.toString() !== productId
  );

  cart.set("items", filtered);

  await cart.save();

  return ok(res, cart);
};

export const clearCart = async (req: any, res: Response) => {
  const cart = await Cart.findOne({ user: req.user.id });

  if (!cart) return ok(res, null);

  cart.set("items", []);

  await cart.save();

  return ok(res, cart);
};