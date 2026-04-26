import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { roleMiddleware } from "../../middlewares/role.middleware";
import { upload } from "../../middlewares/upload.middleware";
import {
  uploadProductImage,
  listProducts,
  listMyProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  deleteManyProducts,
  importJSON,
} from "./product.controller";

export const productRoutes = Router();

// ============================
// PÚBLICO (pero protegido por auth)
// ============================
productRoutes.get("/", authMiddleware, listProducts);
productRoutes.get("/me", authMiddleware, roleMiddleware(["provider", "admin"]), listMyProducts);
productRoutes.get("/:id", authMiddleware, getProduct);

// ============================
// PROVIDER / ADMIN
// ============================
productRoutes.post(
  "/",
  authMiddleware,
  roleMiddleware(["provider", "admin"]),
  createProduct
);

productRoutes.put(
  "/:id",
  authMiddleware,
  roleMiddleware(["provider", "admin"]),
  updateProduct
);

productRoutes.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(["provider", "admin"]),
  deleteProduct
);

productRoutes.delete(
  "/bulk",
  authMiddleware,
  roleMiddleware(["provider", "admin"]),
  deleteManyProducts
);

// ============================
// IMPORTACIÓN
// ============================
productRoutes.post(
  "/import/json",
  authMiddleware,
  roleMiddleware(["provider", "admin"]),
  importJSON
);

// ============================
// IMÁGENES
// ============================
productRoutes.post(
  "/upload",
  authMiddleware,
  roleMiddleware(["provider", "admin"]),
  upload.single("image"),
  uploadProductImage
);