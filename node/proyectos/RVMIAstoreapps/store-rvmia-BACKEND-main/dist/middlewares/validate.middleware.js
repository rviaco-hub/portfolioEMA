"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailExists = exports.emailNotExists = exports.validateEmail = exports.validateFields = void 0;
const response_1 = require("../utils/response");
const user_model_1 = require("../modules/users/user.model");
/* Validador genérico de campos */
const validateFields = (fields) => {
    return (req, res, next) => {
        for (const field of fields) {
            if (!req.body[field]) {
                return (0, response_1.fail)(res, `El campo '${field}' es obligatorio`, 400);
            }
        }
        next();
    };
};
exports.validateFields = validateFields;
/*  Validar formato email */
const validateEmail = (req, res, next) => {
    const { email } = req.body;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
        return (0, response_1.fail)(res, "Email inválido", 400);
    }
    next();
};
exports.validateEmail = validateEmail;
/*  Verificar si email YA existe (register) */
const emailNotExists = async (req, res, next) => {
    const { email } = req.body;
    const exists = await user_model_1.User.findOne({ email });
    if (exists) {
        return (0, response_1.fail)(res, "Email ya registrado", 400);
    }
    next();
};
exports.emailNotExists = emailNotExists;
/*  Verificar si email EXISTE (login) */
const emailExists = async (req, res, next) => {
    const { email } = req.body;
    const user = await user_model_1.User.findOne({ email });
    if (!user) {
        return (0, response_1.fail)(res, "Credenciales inválidas", 400);
    }
    req.userDB = user; // 👈 lo pasamos al controller
    next();
};
exports.emailExists = emailExists;
