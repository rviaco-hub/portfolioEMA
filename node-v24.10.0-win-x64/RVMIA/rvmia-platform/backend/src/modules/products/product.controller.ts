import { Response } from "express";
import { Product } from "./product.model";
import { AuthRequest } from "../../middlewares/auth.middleware";
import { ok, fail } from "../../utils/response";

// ============================
// UPLOAD IMAGEN
// ============================
export const uploadProductImage = async (req: AuthRequest, res: Response) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "No se subió ningún archivo",
    });
  }

  return res.json({
    success: true,
    url: req.file.path,
  });
};

// ============================
// LISTAR PRODUCTOS (MULTI-TENANT)
// ============================
export const listProducts = async (req: AuthRequest, res: Response) => {
  const user = req.user;

  // Admin ve todo
  if (user?.role === "admin") {
    const products = await Product.find().populate("provider", "name email");
    return ok(res, products);
  }

  // Provider solo sus productos
  if (user?.role === "provider") {
    const products = await Product.find({ provider: user.id });
    return ok(res, products);
  }

  // Buyer o público (no debería llegar aquí porque el endpoint está protegido)
  const products = await Product.find({ isActive: true });
  return ok(res, products);
};

// ============================
// LISTAR MIS PRODUCTOS (PROVIDER)
// ============================
export const listMyProducts = async (req: AuthRequest, res: Response) => {
  const user = req.user;

  if (!user) return fail(res, "No autenticado", 401);

  const products = await Product.find({ provider: user.id });
  return ok(res, products);
};

// ============================
// OBTENER UN PRODUCTO
// ============================
export const getProduct = async (req: AuthRequest, res: Response) => {
  const product = await Product.findById(req.params.id);
  if (!product) return fail(res, "Producto no encontrado", 404);
  return ok(res, product);
};

// ============================
// CREAR PRODUCTO (SEGURO)
// ============================
export const createProduct = async (req: AuthRequest, res: Response) => {
  const user = req.user;

  const product = await Product.create({
    ...req.body,
    provider: user?.id,
  });

  return ok(res, product);
};

// ============================
// ACTUALIZAR PRODUCTO (CON VERIFICACIÓN)
// ============================
export const updateProduct = async (req: AuthRequest, res: Response) => {
  const user = req.user;

  const product = await Product.findOneAndUpdate(
    {
      _id: req.params.id,
      provider: user?.id,
    },
    req.body,
    { new: true }
  );

  if (!product) return fail(res, "Producto no encontrado o sin permisos", 404);

  return ok(res, product);
};

// ============================
// ELIMINAR PRODUCTO (CON VERIFICACIÓN)
// ============================
export const deleteProduct = async (req: AuthRequest, res: Response) => {
  const user = req.user;

  const product = await Product.findOneAndDelete({
    _id: req.params.id,
    provider: user?.id,
  });

  if (!product) return fail(res, "Producto no encontrado o sin permisos", 404);

  return ok(res, null, "Producto eliminado");
};

// ============================
// ELIMINAR MÚLTIPLES (BULK)
// ============================
export const deleteManyProducts = async (req: AuthRequest, res: Response) => {
  const { ids } = req.body;
  const user = req.user;

  await Product.deleteMany({
    _id: { $in: ids },
    provider: user?.id,
  });

  return ok(res, null, "Productos eliminados");
};

// ============================
// IMPORTAR JSON (MASIVO + MULTI-TENANT)
// ============================
export const importJSON = async (req: AuthRequest, res: Response) => {
  try {
    const user = req.user;

    if (!Array.isArray(req.body)) {
      return res.status(400).json({
        success: false,
        message: "El JSON debe ser un array",
      });
    }

    const errors: any[] = [];
    const validProducts: any[] = [];

    req.body.forEach((p: any, index: number) => {
      if (!p.name) {
        errors.push({ index, error: "Nombre requerido" });
        return;
      }

      if (typeof p.price !== "number") {
        errors.push({ index, error: "Precio inválido" });
        return;
      }

      validProducts.push({
        ...p,
        sku: p.sku || `SKU-${Date.now()}-${index}`,
        provider: user?.id,
        images: Array.isArray(p.images) ? p.images : [],
      });
    });

    if (!validProducts.length) {
      return res.status(400).json({
        success: false,
        message: "No hay productos válidos",
        errors,
      });
    }

    const result = await Product.insertMany(validProducts, {
      ordered: false,
    });

    return res.json({
      success: true,
      inserted: result.length,
      total: validProducts.length,
      errors: errors.length ? errors : undefined,
    });
  } catch (error: any) {
    console.error("🔥 IMPORT ERROR:", error);

    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};