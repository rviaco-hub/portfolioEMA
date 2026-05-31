"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRoutes = void 0;
const express_1 = require("express");
const order_controller_1 = require("./order.controller");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const role_middleware_1 = require("../../middlewares/role.middleware");
exports.orderRoutes = (0, express_1.Router)();
exports.orderRoutes.post("/", auth_middleware_1.authMiddleware, order_controller_1.createOrder);
exports.orderRoutes.get("/me", auth_middleware_1.authMiddleware, order_controller_1.getMyOrders);
/* ADMIN */
exports.orderRoutes.get("/", auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)(["admin"]), order_controller_1.getAllOrders);
