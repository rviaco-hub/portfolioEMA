import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { roleMiddleware } from "../../middlewares/role.middleware";
import {
  uploadProductImage,
  listProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  createManyProducts,
  deleteManyProducts,
  deleteAllProducts,
  updateManyProducts,
  updateAllProducts,
  importCSV,
  importJSON,
  listMyProducts
} from "./product.controller";

import { upload } from "../../middlewares/upload.middleware";

export const productRoutes = Router();

/* CRUD */
productRoutes.get("/", listProducts);
productRoutes.get(
  "/me",
  authMiddleware,
  roleMiddleware(["provider", "admin"]),
  listMyProducts
);
productRoutes.get("/:id", authMiddleware, getProduct);
/* SOLO PROVIDER CREA */
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
productRoutes.put(
  "/:id",
  authMiddleware,
  roleMiddleware(["provider", "admin"]),
  updateProduct
);

/* MASIVOS */
productRoutes.post("/bulk", createManyProducts);
productRoutes.delete("/bulk", deleteManyProducts);
productRoutes.delete("/", deleteAllProducts);
productRoutes.put("/bulk", updateManyProducts);
productRoutes.put("/", updateAllProducts);

/* IMPORT CSV */
productRoutes.post("/import/csv", importCSV);

/* IMPORT JSON*/
productRoutes.post(
  "/import/json",
  authMiddleware,
  roleMiddleware(["provider", "admin"]),
  importJSON
);

/* IMAGES CLOUDINARY */
productRoutes.post(
  "/upload",
  (req, res, next) => {
    upload.single("image")(req, res, (err: any) => {
      if (err) {
        console.error("🔥 MULTER ERROR:", err);
        return res.status(500).json({
          success: false,
          error: err.message
        });
      }
      next();
    });
  },
  uploadProductImage
);