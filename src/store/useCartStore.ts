import { create } from "zustand";
import { CartItem } from "../types/cart";
import { Product } from "../types/product";

interface CartState {
  cartItems: CartItem[];
  selectedCategory: string;
  customerName: string;
  setCustomerName: (name: string) => void;
  setSelectedCategory: (categoryId: string) => void;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  increaseQty: (productId: string) => void;
  decreaseQty: (productId: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  cartItems: [],
  selectedCategory: "",
  customerName: "",
  setCustomerName: (name) => set({ customerName: name }),
  setSelectedCategory: (categoryId) => set({ selectedCategory: categoryId }),
  addItem: (product) =>
    set((state) => {
      const existingItem = state.cartItems.find(
        (item) => item.productId === product.id,
      );
      if (existingItem) {
        return {
          cartItems: state.cartItems.map((item) =>
            item.productId === product.id
              ? { ...item, qty: item.qty + 1 }
              : item,
          ),
        };
      }
      return {
        cartItems: [
          ...state.cartItems,
          {
            productId: product.id,
            name: product.name,
            price: product.price,
            qty: 1,
            image: product.image,
          },
        ],
      };
    }),
  removeItem: (productId) =>
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.productId !== productId),
    })),
  increaseQty: (productId) =>
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item.productId === productId ? { ...item, qty: item.qty + 1 } : item,
      ),
    })),
  decreaseQty: (productId) =>
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item.productId === productId && item.qty > 1
          ? { ...item, qty: item.qty - 1 }
          : item,
      ),
    })),
  clearCart: () => set({ cartItems: [], customerName: "" }),
}));
