import CartItem from "./CartItem";
import CheckoutForm from "./CheckoutForm";

function CartPage({ cart = [], onChangeQty, onRemove, onPlaceOrder }) {
  // reduce walks the array and adds price x qty into "sum". 0 is the start value.
  const total = cart.reduce((sum, line) => sum + line.item.price * line.qty, 0);

  // Early return: an empty cart shows a message instead of the form.
  if (cart.length === 0) {
    return (
      <div>
        <h2 className="page-title">Your cart</h2>
        <p className="muted">Your cart is empty. Pick something from Vendors.</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="page-title">Your cart</h2>
      <div className="cart-layout">
        {/* Left card: all lines + total */}
        <div className="card">
          {cart.map((line) => (
            <CartItem
              key={line.item.id}   // unique because ids start with a matric number
              line={line}
              onChangeQty={onChangeQty}
              onRemove={onRemove}
            />
          ))}
          <div className="cart-total">Total: RM {total.toFixed(2)}</div>
        </div>

        {/* Right card: checkout form. It calls onPlaceOrder when valid. */}
        <CheckoutForm onSubmitOrder={onPlaceOrder} />
      </div>
    </div>
  );
}

export default CartPage;