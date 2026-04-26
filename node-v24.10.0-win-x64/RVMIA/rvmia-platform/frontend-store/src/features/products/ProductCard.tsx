import type { Product } from "../../types/product.types";
import { useCart } from "../../hooks/useCart";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({
      productId: product._id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.images?.[0],
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
      <img src={product.images?.[0] || "https://via.placeholder.com/300"} alt={product.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-1">{product.name}</h3>
        <p className="text-gray-500 text-sm mb-2 line-clamp-2">{product.description}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-2xl font-bold text-indigo-600">${product.price}</span>
          <button onClick={handleAddToCart} className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
            Agregar 🛒
          </button>
        </div>
      </div>
    </div>
  );
}