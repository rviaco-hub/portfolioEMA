import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { useAuthStore } from "../store/auth.store";
import { createOrder } from "../services/modules/order.service";
import Header from "../components/layout/Header";
import LoginModal from "../components/auth/LoginModal";
import Button from "../components/ui/Button";

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const { isAuthenticated } = useAuthStore();
  const [showLogin, setShowLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return (
      <>
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h2 className="text-2xl mb-4">Debes iniciar sesión para continuar</h2>
          <Button onClick={() => setShowLogin(true)}>Iniciar sesión</Button>
          <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
        </div>
      </>
    );
  }

  const handleCheckout = async () => {
    setLoading(true);
    try {
      await createOrder(items);
      clearCart();
      navigate("/orden-confirmada");
    } catch (error) {
      alert("Error al procesar la orden");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">Confirmar compra</h1>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            {items.map((item) => (
              <div key={item.productId} className="flex justify-between py-4 border-b">
                <span>{item.name} x{item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 p-6 rounded-lg h-fit">
            <h3 className="text-xl font-bold mb-4">Total</h3>
            <div className="flex justify-between mb-4">
              <span>Total:</span>
              <span className="text-2xl font-bold">${total.toFixed(2)}</span>
            </div>
            <Button onClick={handleCheckout} disabled={loading} className="w-full">
              {loading ? "Procesando..." : "Confirmar pago"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}