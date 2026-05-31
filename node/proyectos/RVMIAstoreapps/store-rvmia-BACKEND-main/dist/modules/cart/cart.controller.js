"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearCart = exports.removeFromCart = exports.addToCart = exports.getCart = void 0;
const cart_model_1 = require("./cart.model");
const response_1 = require("../../utils/response");
const getCart = async (req, res) => {
    let cart = await cart_model_1.Cart.findOne({ user: req.user.id });
    if (!cart) {
        cart = await cart_model_1.Cart.create({ user: req.user.id, items: [] });
    }
    return (0, response_1.ok)(res, cart);
};
exports.getCart = getCart;
const addToCart = async (req, res) => {
    const { product, name, price, quantity } = req.body;
    let cart = await cart_model_1.Cart.findOne({ user: req.user.id });
    if (!cart) {
        cart = await cart_model_1.Cart.create({ user: req.user.id, items: [] });
    }
    const existing = cart.items.find(i => i.product && i.product.toString() === product);
    if (existing) {
        existing.quantity += quantity;
    }
    else {
        cart.items.push({ product, name, price, quantity });
    }
    await cart.save();
    return (0, response_1.ok)(res, cart);
};
exports.addToCart = addToCart;
const removeFromCart = async (req, res) => {
    const { productId } = req.params;
    const cart = await cart_model_1.Cart.findOne({ user: req.user.id });
    if (!cart)
        return (0, response_1.ok)(res, null);
    const filtered = cart.items.filter(i => i.product && i.product.toString() !== productId);
    cart.set("items", filtered);
    await cart.save();
    return (0, response_1.ok)(res, cart);
};
exports.removeFromCart = removeFromCart;
const clearCart = async (req, res) => {
    const cart = await cart_model_1.Cart.findOne({ user: req.user.id });
    if (!cart)
        return (0, response_1.ok)(res, null);
    cart.set("items", []);
    await cart.save();
    return (0, response_1.ok)(res, cart);
};
exports.clearCart = clearCart;
