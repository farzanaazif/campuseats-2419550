// line = { item, qty }. The two functions come from App through CartPage.
function CartItem({ line, onChangeQty, onRemove }) {
  const { item, qty } = line; // destructure so the JSX is shorter

  return (
    <div className="cart-row">
      {/* Left: name and price of one */}
      <div>
        <div className="cart-name">{item.name}</div>
        <div className="muted small">RM {item.price.toFixed(2)} each</div>
      </div>

      {/* Right: minus, qty, plus, line total, remove */}
      <div className="cart-controls">
        <button
          type="button"
          className="qty-btn"
          aria-label={`Decrease ${item.name}`}
          onClick={() => onChangeQty(item.id, -1)}
        >
          −
        </button>

        <span className="qty">{qty}</span>

        <button
          type="button"
          className="qty-btn"
          aria-label={`Increase ${item.name}`}
          onClick={() => onChangeQty(item.id, 1)}
        >
          +
        </button>

        <strong className="line-total">RM {(item.price * qty).toFixed(2)}</strong>

        <button type="button" className="remove-btn" onClick={() => onRemove(item.id)}>
          Remove
        </button>
      </div>
    </div>
  );
}

export default CartItem;