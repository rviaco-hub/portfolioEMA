import { Router } from "express";
import {
  createOrder,
  getMyOrders,
  getAllOrders
} from "./order.controller";

import { authMiddleware } from "../../middlewares/auth.middleware";
import { roleMiddleware } from "../../middlewares/role.middleware";

export const orderRoutes = Router();

orderRoutes.post("/", authMiddleware, createOrder);
orderRoutes.get("/me", authMiddleware, getMyOrders);

/* ADMIN */
orderRoutes.get("/", authMiddleware, roleMiddleware(["admin"]), getAllOrders);