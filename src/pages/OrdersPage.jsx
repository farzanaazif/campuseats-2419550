import { Link } from "react-router";
import { useCart } from "../hooks/useCart";

function OrdersPage() {
  const { orders } = useCart();

  if (orders.length === 0) {
    return (
      <div>
        <h2 className="page-title">My orders</h2>
        <p className="muted">No orders yet. <Link to="/">Browse vendors</Link></p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="page-title">My orders</h2>
      {orders.map((order) => (
        <div key={order.id} className="card">
          <p>
            <strong>{order.name}</strong> · {order.mahallah} · pickup{" "}
            <strong>{order.pickupTime}</strong>
          </p>
          <p className="muted small">
            Placed {new Date(order.placedAt).toLocaleString()}
          </p>
          <ul>
            {order.items.map((line) => (
              <li key={line.item.id}>
                {line.qty} × {line.item.name} — RM{" "}
                {(line.item.price * line.qty).toFixed(2)}
              </li>
            ))}
          </ul>
          <p><strong>Total: RM {order.total.toFixed(2)}</strong></p>
        </div>
      ))}
    </div>
  );
}

export default OrdersPage;