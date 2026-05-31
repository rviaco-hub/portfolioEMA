"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedProduct = void 0;
const product_model_1 = require("./product.model");
const user_model_1 = require("../users/user.model");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const seedProduct = async () => {
    try {
        const count = await product_model_1.Product.countDocuments();
        if (count === 0) {
            // Buscar un proveedor existente
            let provider = await user_model_1.User.findOne({ role: "provider" });
            // Si no existe, crear uno de prueba
            if (!provider) {
                const hash = await bcryptjs_1.default.hash("123456", 10);
                provider = await user_model_1.User.create({
                    name: "Proveedor Demo",
                    email: "demo@provider.com",
                    password: hash,
                    role: "provider",
                    isActive: true,
                });
                console.log("✅ Proveedor demo creado:", provider.email);
            }
            // Crear producto con el ObjectId del proveedor
            await product_model_1.Product.create({
                name: "Filtro de aire HVAC universal",
                description: "Filtro de alto rendimiento para sistemas HVAC",
                sku: "HVAC-001",
                price: 25.99,
                stock: 50,
                category: "HVAC",
                subcategory: "Repuestos",
                brand: "Generic",
                provider: provider._id, // ✅ AHORA ES ObjectId
                images: [
                    "https://res.cloudinary.com/di7luyeyf/image/upload/v1774313098/3-removebg-preview_bpicx3.png",
                ],
                attributes: {
                    size: "20x20",
                    material: "Fibra",
                },
            });
            console.log("✅ Producto inicial creado para:", provider.email);
        }
    }
    catch (error) {
        console.error("❌ Error en seed:", error);
    }
};
exports.seedProduct = seedProduct;
