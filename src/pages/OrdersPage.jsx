// Link is React Router's version of <a>: changes the URL without reloading the page
import { Link } from "react-router";
// Custom hook that gives us the orders and the functions from the cart context
import { useCart } from "../hooks/useCart";

function OrdersPage() {
  // orders = list of saved orders, removeOrder = function we added in CartProvider
  const { orders, removeOrder } = useCart();

  // Early return: if there are no orders, show a message instead of the list
  if (orders.length === 0) {
    return (
      <div>
        <h2 className="page-title">My orders</h2>
        <p className="muted">
          No orders yet. <Link to="/">Browse vendors</Link>
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="page-title">My orders</h2>

      {/* Loop through the orders and create one card per order.
          key={order.id} helps React track each card (each id is unique). */}
      {orders.map((order) => (
        <div key={order.id} className="card">
          {/* Customer details from the checkout form */}
          <p>
            <strong>{order.name}</strong> · {order.mahallah} · pickup{" "}
            <strong>{order.pickupTime}</strong>
          </p>

          {/* Turn the saved ISO date text into a readable local date and time */}
          <p className="muted small">
            Placed {new Date(order.placedAt).toLocaleString()}
          </p>

          {/* List every item in this order: quantity x name, and the line price */}
          <ul>
            {order.items.map((line) => (
              <li key={line.item.id}>
                {line.qty} × {line.item.name} — RM{" "}
                {(line.item.price * line.qty).toFixed(2)}
              </li>
            ))}
          </ul>

          {/* Total price saved with the order */}
          <p>
            <strong>Total: RM {order.total.toFixed(2)}</strong>
          </p>

          {/* Delete button: window.confirm shows an "OK / Cancel" popup,
              and removeOrder runs only if the user clicks OK */}
          <button
            type="button"
            className="link danger"
            onClick={() => {
              if (window.confirm("Delete this order?")) {
                removeOrder(order.id);
              }
            }}
          >
            Delete order
          </button>
        </div>
      ))}
    </div>
  );
}

// Lets other files do: import OrdersPage from "./pages/OrdersPage"
export default OrdersPage;