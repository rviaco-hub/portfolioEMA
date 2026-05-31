"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategories = exports.createCategory = void 0;
const category_model_1 = __importDefault(require("./category.model"));
const createCategory = async (req, res) => {
    const category = await category_model_1.default.create(req.body);
    res.json(category);
};
exports.createCategory = createCategory;
const getCategories = async (_, res) => {
    const categories = await category_model_1.default.find();
    res.json(categories);
};
exports.getCategories = getCategories;
