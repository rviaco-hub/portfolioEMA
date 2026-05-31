"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const PaymentSchema = new mongoose_1.Schema({
    order: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Order' },
    provider: String,
    status: String,
    reference: String
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Payment', PaymentSchema);
