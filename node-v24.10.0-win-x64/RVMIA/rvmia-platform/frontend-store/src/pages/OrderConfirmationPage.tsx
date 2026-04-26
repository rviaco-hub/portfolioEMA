import { Link } from "react-router-dom";
import Header from "../components/layout/Header";

export default function OrderConfirmationPage() {
  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="text-green-500 text-6xl mb-4">✓</div>
        <h1 className="text-3xl font-bold mb-4">¡Orden confirmada!</h1>
        <p className="mb-8">Gracias por tu compra. Te enviaremos un email con los detalles.</p>
        <Link to="/" className="text-indigo-600">Seguir comprando</Link>
      </div>
    </>
  );
}