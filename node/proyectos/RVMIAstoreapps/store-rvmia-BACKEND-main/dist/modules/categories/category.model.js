"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CategorySchema = new mongoose_1.Schema({
    name: String,
    type: { type: String, enum: ['equipo', 'repuesto', 'accesorio', 'consumible'] }
});
exports.default = (0, mongoose_1.model)('Category', CategorySchema);
