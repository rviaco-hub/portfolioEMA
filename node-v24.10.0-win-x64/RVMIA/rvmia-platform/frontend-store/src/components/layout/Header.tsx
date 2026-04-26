import { Link } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import { useAuthStore } from "../../store/auth.store";
import { useState } from "react";
import CartDrawer from "./CartDrawer";
import LoginModal from "../auth/LoginModal";

export default function Header() {
  const { itemCount } = useCart();
  const { user, logout } = useAuthStore();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <>
      <header className="bg-gray-900 text-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-indigo-500">RVMIA Store</Link>

          <div className="flex items-center gap-6">
            <button onClick={() => setIsCartOpen(true)} className="relative">
              🛒
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>

            {user ? (
              <div className="flex items-center gap-4">
                <span>{user.name}</span>
                <button onClick={logout} className="bg-red-600 px-3 py-1 rounded">Salir</button>
              </div>
            ) : (
              <button onClick={() => setIsLoginOpen(true)} className="bg-indigo-600 px-4 py-2 rounded">
                Iniciar sesión
              </button>
            )}
          </div>
        </div>
      </header>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
}