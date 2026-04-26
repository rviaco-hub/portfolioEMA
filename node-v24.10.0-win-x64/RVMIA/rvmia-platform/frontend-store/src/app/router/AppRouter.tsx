import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../../pages/HomePage";
import CartPage from "../../pages/CartPage";
import CheckoutPage from "../../pages/CheckoutPage";
import OrderConfirmationPage from "../../pages/OrderConfirmationPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/orden-confirmada" element={<OrderConfirmationPage />} />
      </Routes>
    </BrowserRouter>
  );
}