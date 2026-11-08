// Custom hook that gives us the cart functions from context
import { useCart } from "../hooks/useCart";

// line = one cart row, shaped like { item, qty }
function CartItem({ line }) {
  // Get the functions we need from the cart context (no props needed)
  const { changeQty, removeFromCart } = useCart();

  // Destructure: pull item and qty out of the line object
  const { item, qty } = line;

  // Number() makes sure price is a number; "|| 0" is a fallback if it is missing
  const price = Number(item.price) || 0;

  return (
    // One row of the cart (styled as a 4-column grid by .cart-line in index.css)
    <div className="cart-line">
      {/* Column 1: item name and price for one unit */}
      <div>
        <p className="cart-name">{item.name}</p>
        {/* toFixed(2) shows 2 decimal places, e.g. 6 -> 6.00 */}
        <p className="muted">RM {price.toFixed(2)} each</p>
      </div>

      {/* Column 2: quantity buttons */}
      <div className="qty">
        {/* aria-label tells screen readers what the "−" button does */}
        <button
          type="button"
          aria-label={`Decrease ${item.name}`}
          onClick={() => changeQty(item.id, -1)} // -1 = reduce quantity by 1
        >
          −
        </button>

        {/* Current quantity */}
        <span>{qty}</span>

        <button
          type="button"
          aria-label={`Increase ${item.name}`}
          onClick={() => changeQty(item.id, 1)} // +1 = increase quantity by 1
        >
          +
        </button>
      </div>

      {/* Column 3: price x quantity for this row */}
      <p className="line-total">RM {(price * qty).toFixed(2)}</p>

      {/* Column 4: remove the whole row from the cart */}
      <button
        type="button"
        className="link danger"
        onClick={() => removeFromCart(item.id)}
      >
        Remove
      </button>
    </div>
  );
}

// Lets other files do: import CartItem from "../components/CartItem"
export default CartItem;