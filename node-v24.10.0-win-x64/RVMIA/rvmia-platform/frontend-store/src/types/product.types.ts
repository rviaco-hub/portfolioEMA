export interface Product {
  _id: string;
  name: string;
  price: number;
  description?: string;
  images: string[];
  stock: number;
  category?: string;
  provider: string;
}