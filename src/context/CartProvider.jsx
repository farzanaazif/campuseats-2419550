import { CartContext } from "./cart-context";
import { useLocalStorage } from "../hooks/useLocalStorage";

export function CartProvider({ children }) {
  // Both persist across refresh. Cart lines are { item, qty }.
  const [cart, setCart] = useLocalStorage("campuseats-cart", []);
  const [orders, setOrders] = useLocalStorage("campuseats-orders", []);

  // Derived values: calculated, not stored.
  const count = cart.reduce((sum, line) => sum + line.qty, 0);
  const total = cart.reduce((sum, line) => sum + line.item.price * line.qty, 0);

  // If the item is already in the cart, qty + 1, otherwise add a new line.
  function addToCart(item) {
    setCart((prev) => {
      const existing = prev.find((line) => line.item.id === item.id);
      if (existing) {
        return prev.map((line) =>
          line.item.id === item.id ? { ...line, qty: line.qty + 1 } : line
        );
      }
      return [...prev, { item, qty: 1 }];
    });
  }

  // delta is +1 or -1. A line that reaches 0 disappears.
  function changeQty(itemId, delta) {
    setCart((prev) =>
      prev
        .map((line) =>
          line.item.id === itemId ? { ...line, qty: line.qty + delta } : line
        )
        .filter((line) => line.qty > 0)
    );
  }

  function removeFromCart(itemId) {
    setCart((prev) => prev.filter((line) => line.item.id !== itemId));
  }

  // details = { name, mahallah, pickupTime } from CheckoutForm.
  // Saves a snapshot of the cart as a new order (newest first), then empties the cart.
  function placeOrder(details) {
    const order = {
      id: Date.now(),                       // simple unique id
      placedAt: new Date().toISOString(),
      ...details,
      items: cart,
      total,
    };
    setOrders((prev) => [order, ...prev]);
    setCart([]);
  }

  // Everything the rest of the app is allowed to use.
  const value = {
    cart, orders, count, total,
    addToCart, changeQty, removeFromCart, placeOrder,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}