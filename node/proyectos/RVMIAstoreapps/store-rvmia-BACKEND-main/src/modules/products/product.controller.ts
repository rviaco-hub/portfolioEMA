import { Request, Response } from "express";
import { Product } from "./product.model";
import { ok, fail } from "../../utils/response";

/* =========================
   IMÁGENES
========================= */

export const uploadProductImage = async (req: any, res: Response) => {
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

/* =========================
   CONSULTAS
========================= */

export const listProducts = async (
  req: any,
  res: Response
) => {
  try {
    const products = await Product.find();
    console.log("loading PRODUCTS ");
    return ok(res, products);
  } catch (error: any) {
    return fail(res, error.message);
  }
};

export const listMyProducts = async (req: any, res: Response) => {
  const products = await Product.find({
    provider: req.user.id
  });

  return ok(res, products);
};

export const getProduct = async (req: any, res: Response) => {
  const product = await Product.findOne({
    _id: req.params.id,
    provider: req.user.id
  });

  if (!product) {
    return fail(res, "Producto no encontrado");
  }

  return ok(res, product);
};

/* =========================
   CRUD
========================= */

export const createProduct = async (req: any, res: Response) => {
  const product = await Product.create({
    ...req.body,
    provider: req.user.id
  });

  return ok(res, product);
};

export const updateProduct = async (req: any, res: Response) => {
  const product = await Product.findOneAndUpdate(
    {
      _id: req.params.id,
      provider: req.user.id
    },
    req.body,
    { new: true }
  );

  if (!product) {
    return fail(res, "Producto no encontrado");
  }

  return ok(res, product);
};

export const deleteProduct = async (req: any, res: Response) => {
  const product = await Product.findOneAndDelete({
    _id: req.params.id,
    provider: req.user.id
  });

  if (!product) {
    return fail(res, "Producto no encontrado");
  }

  return ok(res, "Producto eliminado");
};

/* =========================
   OPERACIONES MASIVAS
========================= */

export const createManyProducts = async (req: any, res: Response) => {
  const products = req.body.map((p: any, i: number) => ({
    ...p,
    sku: p.sku || `SKU-${Date.now()}-${i}`,
    provider: req.user.id
  }));

  const result = await Product.insertMany(products);

  return ok(res, result);
};

export const deleteManyProducts = async (req: any, res: Response) => {
  const { ids } = req.body;

  await Product.deleteMany({
    _id: { $in: ids },
    provider: req.user.id
  });

  return ok(res, "Productos eliminados");
};

export const deleteAllProducts = async (req: any, res: Response) => {
  await Product.deleteMany({
    provider: req.user.id
  });

  return ok(res, "Todos los productos eliminados");
};

export const updateManyProducts = async (req: any, res: Response) => {
  const { ids, data } = req.body;

  await Product.updateMany(
    {
      _id: { $in: ids },
      provider: req.user.id
    },
    {
      $set: data
    }
  );

  return ok(res, "Productos actualizados");
};

export const updateAllProducts = async (req: any, res: Response) => {
  await Product.updateMany(
    {
      provider: req.user.id
    },
    {
      $set: req.body
    }
  );

  return ok(res, "Todos los productos actualizados");
};

/* =========================
   IMPORT CSV
========================= */

export const importCSV = async (req: any, res: Response) => {
  try {
    const { csv } = req.body;
    const user = req.user;

    const rows = csv.split("\n").filter(Boolean);
    const headers = rows[0].split(",");

    const products = rows.slice(1).map((row: string, i: number) => {
      const values = row.split(",");
      const obj: any = {};

      headers.forEach((header: string, index: number) => {
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
      const existing = await Product.findOne({
        sku: p.sku,
        provider: user.id
      });

      if (existing) {
        await Product.updateOne(
          { _id: existing._id },
          { $set: p }
        );
        updated++;
      } else {
        await Product.create(p);
        created++;
      }
    }

    return ok(res, { created, updated });

  } catch {
    return fail(res, "Error importando CSV");
  }
};

/* =========================
   IMPORT JSON
========================= */

export const importJSON = async (req: any, res: Response) => {
  try {
    const user = req.user;

    if (!Array.isArray(req.body)) {
      return fail(res, "El JSON debe ser un array");
    }

    let created = 0;
    let updated = 0;

    for (const [i, p] of req.body.entries()) {
      const sku = p.sku || `SKU-${Date.now()}-${i}`;

      const existing = await Product.findOne({
        sku,
        provider: user.id
      });

      if (existing) {
        await Product.updateOne(
          { _id: existing._id },
          {
            $set: {
              ...p,
              sku,
              provider: user.id,
              images: Array.isArray(p.images) ? p.images : []
            }
          }
        );

        updated++;
      } else {
        await Product.create({
          ...p,
          sku,
          provider: user.id,
          images: Array.isArray(p.images) ? p.images : []
        });

        created++;
      }
    }

    return ok(res, {
      created,
      updated,
      total: req.body.length
    });

  } catch (error: any) {
    return fail(res, error.message);
  }
};