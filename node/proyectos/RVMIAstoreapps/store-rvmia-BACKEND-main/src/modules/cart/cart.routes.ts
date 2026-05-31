import { Router } from "express";
import {
  getCart,
  addToCart,
  removeFromCart,
  clearCart
} from "./cart.controller";

import { authMiddleware } from "../../middlewares/auth.middleware";

export const cartRoutes = Router();

cartRoutes.get("/", authMiddleware, getCart);
cartRoutes.post("/", authMiddleware, addToCart);
cartRoutes.delete("/:productId", authMiddleware, removeFromCart);
cartRoutes.delete("/", authMiddleware, clearCart);