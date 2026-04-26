import { useState } from "react";
import { useAuthStore } from "../../store/auth.store";
import { loginRequest } from "../../services/modules/auth.service";
import Modal from "../ui/Modal";
import Input from "../ui/Input";
import Button from "../ui/Button";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const setAuth = useAuthStore((s) => s.setAuth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await loginRequest({ email, password });
      setAuth(res.data.token, res.data.user);
      onClose();
      window.location.reload();
    } catch (error) {
      alert("Credenciales incorrectas");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isRegister ? "Crear cuenta" : "Iniciar sesión"}>
      <form onSubmit={handleSubmit} className="space-y-4">
        {isRegister && (
          <Input placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} required />
        )}
        <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <Input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Cargando..." : isRegister ? "Registrarse" : "Ingresar"}
        </Button>

        <p className="text-center text-sm">
          {isRegister ? "¿Ya tienes cuenta?" : "¿No tienes cuenta?"}{" "}
          <button type="button" onClick={() => setIsRegister(!isRegister)} className="text-indigo-600">
            {isRegister ? "Iniciar sesión" : "Registrarse"}
          </button>
        </p>
      </form>
    </Modal>
  );
}