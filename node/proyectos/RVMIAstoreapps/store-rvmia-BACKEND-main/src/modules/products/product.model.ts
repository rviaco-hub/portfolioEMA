import { Schema, model } from "mongoose";

const ProductSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: "" },

    sku: { type: String, required: true },
    barcode: { type: String },

    price: { type: Number, required: true },
    cost: { type: Number, default: 0 },

    stock: { type: Number, default: 0 },
    minStock: { type: Number, default: 0 },

    category: { type: String, index: true },
    subcategory: { type: String },

    brand: { type: String },

    provider: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },

    images: [{ type: String }],

    attributes: { type: Object },

    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

/* SKU único por proveedor */
ProductSchema.index(
  { sku: 1, provider: 1 },
  { unique: true }
);

export const Product = model("Product", ProductSchema);