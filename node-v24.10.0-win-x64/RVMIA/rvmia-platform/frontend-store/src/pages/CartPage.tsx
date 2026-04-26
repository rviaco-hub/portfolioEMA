import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import CartItem from "../components/cart/CartItem";
import Header from "../components/layout/Header";

export default function CartPage() {
  const { items, total, removeItem, updateQuantity, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <>
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h2 className="text-2xl mb-4">Carrito vacío</h2>
          <Link to="/" className="text-indigo-600">Ir a comprar</Link>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">Mi carrito</h1>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            {items.map((item) => (
              <CartItem key={item.productId} item={item} onRemove={() => removeItem(item.productId)} onUpdateQuantity={(q) => updateQuantity(item.productId, q)} />
            ))}
            <button onClick={clearCart} className="text-red-500 mt-4">Vaciar carrito</button>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg h-fit">
            <h3 className="text-xl font-bold mb-4">Resumen</h3>
            <div className="flex justify-between mb-4">
              <span>Subtotal:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <Link to="/checkout" className="w-full block bg-indigo-600 text-white text-center py-3 rounded-lg">
              Continuar compra
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}