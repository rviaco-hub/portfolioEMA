"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.confirmWompiPayment = exports.createWompiPayment = void 0;
const axios_1 = __importDefault(require("axios"));
const order_model_1 = require("../orders/order.model");
const payment_model_1 = __importDefault(require("./payment.model"));
const WOMPI_PUBLIC_KEY = process.env.WOMPI_PUBLIC_KEY || "";
const WOMPI_PRIVATE_KEY = process.env.WOMPI_PRIVATE_KEY || "";
const WOMPI_INTEGRITY_SECRET = process.env.WOMPI_INTEGRITY_SECRET || "";
const FRONT_URL = process.env.FRONT_URL || "http://localhost:5173";
const createWompiPayment = async (req, res) => {
    try {
        const { orderId } = req.body;
        const order = await order_model_1.Order.findById(orderId);
        if (!order) {
            return res.status(404).json({
                ok: false,
                message: "Orden no encontrada"
            });
        }
        const reference = `RVMIA-${order._id}-${Date.now()}`;
        const payment = await payment_model_1.default.create({
            order: order._id,
            provider: "wompi",
            status: "pending",
            reference
        });
        return res.json({
            ok: true,
            data: {
                publicKey: WOMPI_PUBLIC_KEY,
                integritySecret: WOMPI_INTEGRITY_SECRET,
                reference,
                amountInCents: Math.round(Number(order.total) * 100),
                currency: "COP",
                redirectUrl: `${FRONT_URL}/orders`,
                paymentId: payment._id
            }
        });
    }
    catch (error) {
        return res.status(500).json({
            ok: false,
            message: error.message
        });
    }
};
exports.createWompiPayment = createWompiPayment;
const confirmWompiPayment = async (req, res) => {
    try {
        const { transactionId, reference } = req.body;
        const { data } = await axios_1.default.get(`https://production.wompi.co/v1/transactions/${transactionId}`, {
            headers: {
                Authorization: `Bearer ${WOMPI_PRIVATE_KEY}`
            }
        });
        const transaction = data.data;
        if (transaction.status === "APPROVED" &&
            transaction.reference === reference) {
            const payment = await payment_model_1.default.findOne({ reference });
            if (!payment) {
                return res.status(404).json({
                    ok: false,
                    message: "Pago no encontrado"
                });
            }
            payment.status = "approved";
            await payment.save();
            await order_model_1.Order.findByIdAndUpdate(payment.order, {
                status: "paid",
                paymentId: transaction.id
            });
            return res.json({
                ok: true
            });
        }
        return res.status(400).json({
            ok: false,
            message: "Pago no aprobado"
        });
    }
    catch (error) {
        return res.status(500).json({
            ok: false,
            message: error.message
        });
    }
};
exports.confirmWompiPayment = confirmWompiPayment;
