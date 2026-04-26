import { useCartStore } from "../store/cart.store";

export const useCart = () => {
  const { items, total, addItem, removeItem, updateQuantity, clearCart } = useCartStore();

  return {
    items,
    total,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    itemCount: items.reduce((acc, i) => acc + i.quantity, 0),
  };
};