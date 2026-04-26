import { api } from "../api/api";
import type { Product } from "../../types/product.types";

export const getProducts = async (): Promise<Product[]> => {
  const res = await api.get("/products");
  return res.data.data;
};