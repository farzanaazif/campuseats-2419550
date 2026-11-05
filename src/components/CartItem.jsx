import { useCart } from "../hooks/useCart";

// line = { item, qty }. Buttons call context functions directly (no prop drilling).
function CartItem({ line }) {
  const { changeQty, removeFromCart } = useCart();
  const { item, qty } = line;

  return (
    <div className="cart-row">
      <div>
        <div className="cart-name">{item.name}</div>
        <div className="muted small">RM {item.price.toFixed(2)} each</div>
      </div>

      <div className="cart-controls">
        <button type="button" className="qty-btn" aria-label={`Decrease ${item.name}`}
          onClick={() => changeQty(item.id, -1)}>−</button>
        <span className="qty">{qty}</span>
        <button type="button" className="qty-btn" aria-label={`Increase ${item.name}`}
          onClick={() => changeQty(item.id, 1)}>+</button>
        <strong className="line-total">RM {(item.price * qty).toFixed(2)}</strong>
        <button type="button" className="remove-btn" onClick={() => removeFromCart(item.id)}>
          Remove
        </button>
      </div>
    </div>
  );
}

export default CartItem;