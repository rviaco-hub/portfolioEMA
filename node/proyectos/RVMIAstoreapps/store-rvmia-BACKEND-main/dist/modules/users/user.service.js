"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = void 0;
const user_model_1 = require("./user.model");
const getUsers = () => user_model_1.User.find();
exports.getUsers = getUsers;
