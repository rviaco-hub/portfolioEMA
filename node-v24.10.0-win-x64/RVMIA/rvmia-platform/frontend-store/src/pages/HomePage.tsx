import { useEffect, useState } from "react";
import { getProducts } from "../services/modules/product.service";
import type { Product } from "../types/product.types";
import ProductGrid from "../features/products/ProductGrid";
import Header from "../components/layout/Header";
import Spinner from "../components/ui/Spinner";

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Todos los productos</h1>
        {loading ? <Spinner /> : <ProductGrid products={products} />}
      </main>
    </>
  );
}