import type { CartItem as CartItemType } from "../../types/cart.types";

interface CartItemProps {
  item: CartItemType;
  onRemove: () => void;
  onUpdateQuantity: (quantity: number) => void;
}

export default function CartItem({ item, onRemove, onUpdateQuantity }: CartItemProps) {
  return (
    <div className="flex gap-4 py-4 border-b">
      {item.image && <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />}
      <div className="flex-1">
        <h3 className="font-semibold">{item.name}</h3>
        <p className="text-gray-600">${item.price}</p>
        <div className="flex items-center gap-2 mt-2">
          <button onClick={() => onUpdateQuantity(item.quantity - 1)} className="px-2 border rounded">-</button>
          <span>{item.quantity}</span>
          <button onClick={() => onUpdateQuantity(item.quantity + 1)} className="px-2 border rounded">+</button>
          <button onClick={onRemove} className="ml-4 text-red-500">Eliminar</button>
        </div>
      </div>
    </div>
  );
}