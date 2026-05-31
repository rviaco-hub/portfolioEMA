import { Product } from "./product.model";
import { User } from "../users/user.model";
import bcrypt from "bcryptjs";

export const seedProduct = async () => {
  try {
    const count = await Product.countDocuments();

    if (count === 0) {
      // Buscar un proveedor existente
      let provider = await User.findOne({ role: "provider" });

      // Si no existe, crear uno de prueba
      if (!provider) {
        const hash = await bcrypt.hash("123456", 10);
        
        provider = await User.create({
          name: "Proveedor Demo",
          email: "demo@provider.com",
          password: hash,
          role: "provider",
          isActive: true,
        });
        
        console.log("✅ Proveedor demo creado:", provider.email);
      }

      // Crear producto con el ObjectId del proveedor
      await Product.create({
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
  } catch (error) {
    console.error("❌ Error en seed:", error);
  }
};