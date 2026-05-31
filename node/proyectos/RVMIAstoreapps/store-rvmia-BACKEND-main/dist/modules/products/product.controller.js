"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.importJSON = exports.importCSV = exports.updateAllProducts = exports.updateManyProducts = exports.deleteAllProducts = exports.deleteManyProducts = exports.createManyProducts = exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getProduct = exports.listMyProducts = exports.listProducts = exports.uploadProductImage = void 0;
const product_model_1 = require("./product.model");
const response_1 = require("../../utils/response");
/* =========================
   IMÁGENES
========================= */
const uploadProductImage = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({
            success: false,
            message: "No file uploaded"
        });
    }
    return res.json({
        success: true,
        url: req.file.path
    });
};
exports.uploadProductImage = uploadProductImage;
/* =========================
   CONSULTAS
========================= */
const listProducts = async (req, res) => {
    try {
        const products = await product_model_1.Product.find();
        console.log("PRODUCTS:", products);
        return (0, response_1.ok)(res, products);
    }
    catch (error) {
        return (0, response_1.fail)(res, error.message);
    }
};
exports.listProducts = listProducts;
const listMyProducts = async (req, res) => {
    const products = await product_model_1.Product.find({
        provider: req.user.id
    });
    return (0, response_1.ok)(res, products);
};
exports.listMyProducts = listMyProducts;
const getProduct = async (req, res) => {
    const product = await product_model_1.Product.findOne({
        _id: req.params.id,
        provider: req.user.id
    });
    if (!product) {
        return (0, response_1.fail)(res, "Producto no encontrado");
    }
    return (0, response_1.ok)(res, product);
};
exports.getProduct = getProduct;
/* =========================
   CRUD
========================= */
const createProduct = async (req, res) => {
    const product = await product_model_1.Product.create({
        ...req.body,
        provider: req.user.id
    });
    return (0, response_1.ok)(res, product);
};
exports.createProduct = createProduct;
const updateProduct = async (req, res) => {
    const product = await product_model_1.Product.findOneAndUpdate({
        _id: req.params.id,
        provider: req.user.id
    }, req.body, { new: true });
    if (!product) {
        return (0, response_1.fail)(res, "Producto no encontrado");
    }
    return (0, response_1.ok)(res, product);
};
exports.updateProduct = updateProduct;
const deleteProduct = async (req, res) => {
    const product = await product_model_1.Product.findOneAndDelete({
        _id: req.params.id,
        provider: req.user.id
    });
    if (!product) {
        return (0, response_1.fail)(res, "Producto no encontrado");
    }
    return (0, response_1.ok)(res, "Producto eliminado");
};
exports.deleteProduct = deleteProduct;
/* =========================
   OPERACIONES MASIVAS
========================= */
const createManyProducts = async (req, res) => {
    const products = req.body.map((p, i) => ({
        ...p,
        sku: p.sku || `SKU-${Date.now()}-${i}`,
        provider: req.user.id
    }));
    const result = await product_model_1.Product.insertMany(products);
    return (0, response_1.ok)(res, result);
};
exports.createManyProducts = createManyProducts;
const deleteManyProducts = async (req, res) => {
    const { ids } = req.body;
    await product_model_1.Product.deleteMany({
        _id: { $in: ids },
        provider: req.user.id
    });
    return (0, response_1.ok)(res, "Productos eliminados");
};
exports.deleteManyProducts = deleteManyProducts;
const deleteAllProducts = async (req, res) => {
    await product_model_1.Product.deleteMany({
        provider: req.user.id
    });
    return (0, response_1.ok)(res, "Todos los productos eliminados");
};
exports.deleteAllProducts = deleteAllProducts;
const updateManyProducts = async (req, res) => {
    const { ids, data } = req.body;
    await product_model_1.Product.updateMany({
        _id: { $in: ids },
        provider: req.user.id
    }, {
        $set: data
    });
    return (0, response_1.ok)(res, "Productos actualizados");
};
exports.updateManyProducts = updateManyProducts;
const updateAllProducts = async (req, res) => {
    await product_model_1.Product.updateMany({
        provider: req.user.id
    }, {
        $set: req.body
    });
    return (0, response_1.ok)(res, "Todos los productos actualizados");
};
exports.updateAllProducts = updateAllProducts;
/* =========================
   IMPORT CSV
========================= */
const importCSV = async (req, res) => {
    try {
        const { csv } = req.body;
        const user = req.user;
        const rows = csv.split("\n").filter(Boolean);
        const headers = rows[0].split(",");
        const products = rows.slice(1).map((row, i) => {
            const values = row.split(",");
            const obj = {};
            headers.forEach((header, index) => {
                obj[header.trim()] = values[index]?.trim();
            });
            return {
                ...obj,
                sku: obj.sku || `SKU-${Date.now()}-${i}`,
                provider: user.id
            };
        });
        let created = 0;
        let updated = 0;
        for (const p of products) {
            const existing = await product_model_1.Product.findOne({
                sku: p.sku,
                provider: user.id
            });
            if (existing) {
                await product_model_1.Product.updateOne({ _id: existing._id }, { $set: p });
                updated++;
            }
            else {
                await product_model_1.Product.create(p);
                created++;
            }
        }
        return (0, response_1.ok)(res, { created, updated });
    }
    catch {
        return (0, response_1.fail)(res, "Error importando CSV");
    }
};
exports.importCSV = importCSV;
/* =========================
   IMPORT JSON
========================= */
const importJSON = async (req, res) => {
    try {
        const user = req.user;
        if (!Array.isArray(req.body)) {
            return (0, response_1.fail)(res, "El JSON debe ser un array");
        }
        let created = 0;
        let updated = 0;
        for (const [i, p] of req.body.entries()) {
            const sku = p.sku || `SKU-${Date.now()}-${i}`;
            const existing = await product_model_1.Product.findOne({
                sku,
                provider: user.id
            });
            if (existing) {
                await product_model_1.Product.updateOne({ _id: existing._id }, {
                    $set: {
                        ...p,
                        sku,
                        provider: user.id,
                        images: Array.isArray(p.images) ? p.images : []
                    }
                });
                updated++;
            }
            else {
                await product_model_1.Product.create({
                    ...p,
                    sku,
                    provider: user.id,
                    images: Array.isArray(p.images) ? p.images : []
                });
                created++;
            }
        }
        return (0, response_1.ok)(res, {
            created,
            updated,
            total: req.body.length
        });
    }
    catch (error) {
        return (0, response_1.fail)(res, error.message);
    }
};
exports.importJSON = importJSON;
