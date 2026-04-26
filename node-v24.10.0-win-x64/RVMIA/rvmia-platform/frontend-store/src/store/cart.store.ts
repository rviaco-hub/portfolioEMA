import { create } from "zustand";
import type { CartItem, CartStore } from "../types/cart.types";

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  total: 0,

  addItem: (item) => {
    const { items } = get();
    const existing = items.find((i) => i.productId === item.productId);

    let newItems;
    if (existing) {
      newItems = items.map((i) =>
        i.productId === item.productId
          ? { ...i, quantity: i.quantity + item.quantity }
          : i
      );
    } else {
      newItems = [...items, item];
    }

    const total = newItems.reduce((sum, i) => sum + i.price * i.quantity, 0);

    set({ items: newItems, total });
    localStorage.setItem("cart", JSON.stringify({ items: newItems, total }));
  },

  removeItem: (productId) => {
    const newItems = get().items.filter((i) => i.productId !== productId);
    const total = newItems.reduce((sum, i) => sum + i.price * i.quantity, 0);

    set({ items: newItems, total });
    localStorage.setItem("cart", JSON.stringify({ items: newItems, total }));
  },

  updateQuantity: (productId, quantity) => {
    const newItems = get().items.map((i) =>
      i.productId === productId ? { ...i, quantity } : i
    );
    const total = newItems.reduce((sum, i) => sum + i.price * i.quantity, 0);

    set({ items: newItems, total });
    localStorage.setItem("cart", JSON.stringify({ items: newItems, total }));
  },

  clearCart: () => {
    set({ items: [], total: 0 });
    localStorage.removeItem("cart");
  },

  hydrate: () => {
    const cart = localStorage.getItem("cart");
    if (cart) {
      const { items, total } = JSON.parse(cart);
      set({ items, total });
    }
  },
}));