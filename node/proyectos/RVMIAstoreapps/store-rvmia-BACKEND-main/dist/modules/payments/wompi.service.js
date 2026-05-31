"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTransaction = exports.createCheckoutLink = exports.generateIntegritySignature = void 0;
const axios_1 = __importDefault(require("axios"));
const crypto_1 = __importDefault(require("crypto"));
const WOMPI_URL = "https://sandbox.wompi.co/v1";
const generateIntegritySignature = (reference, amountInCents, currency) => {
    return crypto_1.default
        .createHash("sha256")
        .update(`${reference}${amountInCents}${currency}${process.env.WOMPI_INTEGRITY_KEY}`)
        .digest("hex");
};
exports.generateIntegritySignature = generateIntegritySignature;
const createCheckoutLink = async (orderId, amountInCents) => {
    const reference = `RVMIA-${orderId}`;
    const signature = (0, exports.generateIntegritySignature)(reference, amountInCents, "COP");
    return {
        url: "https://checkout.wompi.co/p/",
        publicKey: process.env.WOMPI_PUBLIC_KEY,
        reference,
        signature,
        amountInCents,
        currency: "COP",
        redirectUrl: `${process.env.FRONTEND_URL}/checkout/success`
    };
};
exports.createCheckoutLink = createCheckoutLink;
const getTransaction = async (id) => {
    const { data } = await axios_1.default.get(`${WOMPI_URL}/transactions/${id}`);
    return data.data;
};
exports.getTransaction = getTransaction;
