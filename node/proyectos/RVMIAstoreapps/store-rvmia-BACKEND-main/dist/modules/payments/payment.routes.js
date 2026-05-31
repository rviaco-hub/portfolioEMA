"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentRoutes = void 0;
const express_1 = require("express");
const payment_controller_1 = require("./payment.controller");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
exports.paymentRoutes = (0, express_1.Router)();
exports.paymentRoutes.post("/wompi", auth_middleware_1.authMiddleware, payment_controller_1.createWompiPayment);
exports.paymentRoutes.post("/wompi/confirm", auth_middleware_1.authMiddleware, payment_controller_1.confirmWompiPayment);
