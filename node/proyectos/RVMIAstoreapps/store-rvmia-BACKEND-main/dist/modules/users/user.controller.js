"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listUsers = exports.getMe = void 0;
const user_model_1 = require("./user.model");
const response_1 = require("../../utils/response");
const getMe = async (req, res) => {
    const user = await user_model_1.User.findById(req.user.id).select("-password");
    return (0, response_1.ok)(res, user);
};
exports.getMe = getMe;
const listUsers = async (_, res) => {
    const users = await user_model_1.User.find().select("-password");
    return (0, response_1.ok)(res, users);
};
exports.listUsers = listUsers;
