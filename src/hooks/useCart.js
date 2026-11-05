import { useContext } from "react";
import { CartContext } from "../context/cart-context";

export function useCart() {
  const ctx = useContext(CartContext);
  // The default is null, so null means we are outside <CartProvider>.
  if (!ctx) {
    throw new Error("useCart must be used inside <CartProvider>");
  }
  return ctx;
}