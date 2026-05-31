"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("../users/user.model");
const env_1 = require("../../config/env");
const response_1 = require("../../utils/response");
const register = async (req, res) => {
    const { name, email, password, role } = req.body;
    const hash = await bcryptjs_1.default.hash(password, 10);
    const user = await user_model_1.User.create({
        name,
        email,
        password: hash,
        role
    });
    return (0, response_1.ok)(res, user, "Usuario creado");
};
exports.register = register;
const login = async (req, res) => {
    const { password } = req.body;
    const user = req.userDB; // 👈 viene del middleware
    const valid = await bcryptjs_1.default.compare(password, user.password);
    if (!valid)
        return (0, response_1.fail)(res, "Credenciales inválidas");
    const token = jsonwebtoken_1.default.sign({ id: user._id, role: user.role }, env_1.env.jwtSecret, { expiresIn: "1d" });
    return (0, response_1.ok)(res, { token, user }, "Login exitoso");
};
exports.login = login;
const logout = async (_, res) => {
    return (0, response_1.ok)(res, null, "Logout exitoso");
};
exports.logout = logout;
