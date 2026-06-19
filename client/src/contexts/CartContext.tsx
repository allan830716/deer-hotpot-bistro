import React, { createContext, useContext, useState } from "react";

interface CartContextType {
  itemCount: number;
  refetchCart: () => void;
}

const CartContext = createContext<CartContextType>({ itemCount: 0, refetchCart: () => {} });

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [itemCount] = useState(0);
  const refetchCart = () => {};
  return (
    <CartContext.Provider value={{ itemCount, refetchCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
