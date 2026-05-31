import { Product } from "../products/product.model";

export const updateStock = (id: string, qty: number) =>
  Product.findByIdAndUpdate(id, { $inc: { stock: qty } });
