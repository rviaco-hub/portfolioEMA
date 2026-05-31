"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllOrders = exports.getMyOrders = exports.createOrder = void 0;
const cart_model_1 = require("../cart/cart.model");
const order_model_1 = require("./order.model");
const response_1 = require("../../utils/response");
const createOrder = async (req, res) => {
    const cart = await cart_model_1.Cart.findOne({ user: req.user.id });
    if (!cart || cart.items.length === 0)
        return (0, response_1.fail)(res, "Carrito vacío");
    const total = cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const order = await order_model_1.Order.create({
        user: req.user.id,
        items: cart.items,
        total
    });
    // carrito se limpia después del pago exitoso
    return (0, response_1.ok)(res, order);
};
exports.createOrder = createOrder;
const getMyOrders = async (req, res) => {
    const orders = await order_model_1.Order.find({ user: req.user.id });
    return (0, response_1.ok)(res, orders);
};
exports.getMyOrders = getMyOrders;
const getAllOrders = async (_, res) => {
    const orders = await order_model_1.Order.find();
    return (0, response_1.ok)(res, orders);
};
exports.getAllOrders = getAllOrders;
