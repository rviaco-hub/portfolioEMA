import { Link } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import CartItem from "../cart/CartItem";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, total, removeItem, updateQuantity } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl flex flex-col">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold">Mi Carrito</h2>
          <button onClick={onClose} className="text-2xl">×</button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <p className="text-center text-gray-500">Carrito vacío</p>
          ) : (
            items.map((item) => (
              <CartItem
                key={item.productId}
                item={item}
                onRemove={() => removeItem(item.productId)}
                onUpdateQuantity={(q) => updateQuantity(item.productId, q)}
              />
            ))
          )}
        </div>

        <div className="border-t p-4">
          <div className="flex justify-between mb-4">
            <span className="font-bold">Total:</span>
            <span className="text-xl font-bold">${total.toFixed(2)}</span>
          </div>
          <Link
            to="/checkout"
            onClick={onClose}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg text-center block"
          >
            Proceder al pago
          </Link>
        </div>
      </div>
    </div>
  );
}