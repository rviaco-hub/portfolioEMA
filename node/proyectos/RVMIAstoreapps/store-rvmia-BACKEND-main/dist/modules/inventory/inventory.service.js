"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStock = void 0;
const product_model_1 = require("../products/product.model");
const updateStock = (id, qty) => product_model_1.Product.findByIdAndUpdate(id, { $inc: { stock: qty } });
exports.updateStock = updateStock;
