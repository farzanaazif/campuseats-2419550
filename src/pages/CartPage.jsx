import { useNavigate } from "react-router";
import { useCart } from "../hooks/useCart";
import CartItem from "../components/CartItem";
import CheckoutForm from "../components/CheckoutForm";

function CartPage() {
  const { cart, total, placeOrder } = useCart();
  const navigate = useNavigate(); // lets code change the page

  // CheckoutForm calls this only when the form is valid.
  function handleSubmitOrder(details) {
    placeOrder(details);   // save order + empty cart
    navigate("/orders");   // then go to My Orders
  }

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
        <div className="card">
          {cart.map((line) => (
            <CartItem key={line.item.id} line={line} />
          ))}
          <div className="cart-total">Total: RM {total.toFixed(2)}</div>
        </div>
        <CheckoutForm onSubmitOrder={handleSubmitOrder} />
      </div>
    </div>
  );
}

export default CartPage;