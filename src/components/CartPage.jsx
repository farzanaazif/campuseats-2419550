import CartItem from './CartItem';
import CheckoutForm from './CheckoutForm'; // We will make this next

function CartPage({ cart, onChangeQty, onRemove, onPlaceOrder }) {
  if (cart.length === 0) {
    return <p className="muted">Your cart is empty. Pick something from a menu first.</p>;
  }

  // B4: Derive total using reduce, don't store it in state
  const total = cart.reduce((sum, line) => sum + line.item.price * line.qty, 0);

  return (
    <div className="cart-layout">
      <div className="card">
        <ul className="cart-list">
          {cart.map((line) => (
            <CartItem key={line.item.id} line={line} onChangeQty={onChangeQty} onRemove={onRemove} />
          ))}
        </ul>
        <p className="cart-total">Total: RM {total.toFixed(2)}</p>
      </div>
      
      <CheckoutForm onPlaceOrder={onPlaceOrder} />
    </div>
  );
}
export default CartPage;