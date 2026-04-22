import React, { createContext, useContext, useEffect, useState } from "react";
import { trpc } from "@/lib/trpc";

// Generate or retrieve session ID
function getSessionId(): string {
  let id = localStorage.getItem("deer-cart-session");
  if (!id) {
    id = `sess-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    localStorage.setItem("deer-cart-session", id);
  }
  return id;
}

interface CartContextType {
  sessionId: string;
  itemCount: number;
  refetchCart: () => void;
}

const CartContext = createContext<CartContextType>({
  sessionId: "",
  itemCount: 0,
  refetchCart: () => {},
});

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [sessionId] = useState(() => getSessionId());
  const { data: cartItems, refetch } = trpc.cart.getCart.useQuery(
    { sessionId },
    { refetchOnWindowFocus: false }
  );

  const itemCount = cartItems?.reduce((sum, item) => sum + item.quantity, 0) ?? 0;

  return (
    <CartContext.Provider value={{ sessionId, itemCount, refetchCart: refetch }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
