"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const validate_middleware_1 = require("../../middlewares/validate.middleware");
exports.authRoutes = (0, express_1.Router)();
/* REGISTER */
exports.authRoutes.post("/register", (0, validate_middleware_1.validateFields)(["name", "email", "password"]), validate_middleware_1.validateEmail, validate_middleware_1.emailNotExists, auth_controller_1.register);
/* LOGIN */
exports.authRoutes.post("/login", (0, validate_middleware_1.validateFields)(["email", "password"]), validate_middleware_1.validateEmail, validate_middleware_1.emailExists, auth_controller_1.login);
/* LOGOUT */
exports.authRoutes.post("/logout", auth_controller_1.logout);
