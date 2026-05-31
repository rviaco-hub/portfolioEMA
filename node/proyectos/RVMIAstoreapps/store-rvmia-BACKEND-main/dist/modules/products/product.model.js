"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
const ProductSchema = new mongoose_1.Schema({
    name: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    sku: { type: String, required: true },
    barcode: { type: String },
    price: { type: Number, required: true },
    cost: { type: Number, default: 0 },
    stock: { type: Number, default: 0 },
    minStock: { type: Number, default: 0 },
    category: { type: String, index: true },
    subcategory: { type: String },
    brand: { type: String },
    provider: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },
    images: [{ type: String }],
    attributes: { type: Object },
    isActive: { type: Boolean, default: true }
}, { timestamps: true });
/* SKU único por proveedor */
ProductSchema.index({ sku: 1, provider: 1 }, { unique: true });
exports.Product = (0, mongoose_1.model)("Product", ProductSchema);
