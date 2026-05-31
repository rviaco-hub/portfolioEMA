"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRoutes = void 0;
const express_1 = require("express");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const role_middleware_1 = require("../../middlewares/role.middleware");
const product_controller_1 = require("./product.controller");
const upload_middleware_1 = require("../../middlewares/upload.middleware");
exports.productRoutes = (0, express_1.Router)();
/* CRUD */
exports.productRoutes.get("/", product_controller_1.listProducts);
exports.productRoutes.get("/me", auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)(["provider", "admin"]), product_controller_1.listMyProducts);
exports.productRoutes.get("/:id", auth_middleware_1.authMiddleware, product_controller_1.getProduct);
/* SOLO PROVIDER CREA */
exports.productRoutes.post("/", auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)(["provider", "admin"]), product_controller_1.createProduct);
exports.productRoutes.put("/:id", auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)(["provider", "admin"]), product_controller_1.updateProduct);
exports.productRoutes.put("/:id", auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)(["provider", "admin"]), product_controller_1.updateProduct);
/* MASIVOS */
exports.productRoutes.post("/bulk", product_controller_1.createManyProducts);
exports.productRoutes.delete("/bulk", product_controller_1.deleteManyProducts);
exports.productRoutes.delete("/", product_controller_1.deleteAllProducts);
exports.productRoutes.put("/bulk", product_controller_1.updateManyProducts);
exports.productRoutes.put("/", product_controller_1.updateAllProducts);
/* IMPORT CSV */
exports.productRoutes.post("/import/csv", product_controller_1.importCSV);
/* IMPORT JSON*/
exports.productRoutes.post("/import/json", auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)(["provider", "admin"]), product_controller_1.importJSON);
/* IMAGES CLOUDINARY */
exports.productRoutes.post("/upload", (req, res, next) => {
    upload_middleware_1.upload.single("image")(req, res, (err) => {
        if (err) {
            console.error("🔥 MULTER ERROR:", err);
            return res.status(500).json({
                success: false,
                error: err.message
            });
        }
        next();
    });
}, product_controller_1.uploadProductImage);
