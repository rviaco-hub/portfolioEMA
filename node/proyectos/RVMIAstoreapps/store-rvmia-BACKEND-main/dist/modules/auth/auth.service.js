"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_model_1 = require("./auth.model");
const env_1 = require("../../config/env");
const registerUser = async (data) => {
    const exists = await auth_model_1.User.findOne({ email: data.email });
    if (exists)
        throw new Error("Email ya registrado");
    const hashed = await bcryptjs_1.default.hash(data.password, 10);
    const user = await auth_model_1.User.create({
        ...data,
        password: hashed
    });
    return user;
};
exports.registerUser = registerUser;
const loginUser = async (email, password) => {
    const user = await auth_model_1.User.findOne({ email });
    if (!user)
        throw new Error("Usuario no existe");
    const valid = await bcryptjs_1.default.compare(password, user.password);
    if (!valid)
        throw new Error("Credenciales inválidas");
    const token = jsonwebtoken_1.default.sign({ id: user._id, role: user.role }, env_1.env.jwtSecret, { expiresIn: "7d" });
    return { user, token };
};
exports.loginUser = loginUser;
