import { useEffect } from "react";
import AppRouter from "./app/router/AppRouter";
import { useAuthStore } from "./store/auth.store";
import { useCartStore } from "./store/cart.store";

export default function App() {
  const hydrateAuth = useAuthStore((s) => s.hydrate);
  const hydrateCart = useCartStore((s) => s.hydrate);

  useEffect(() => {
    hydrateAuth();
    hydrateCart();
  }, []);

  return <AppRouter />;
}