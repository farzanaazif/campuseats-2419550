import { NavLink } from "react-router";
import { useCart } from "../hooks/useCart";

function Header() {
  const { count } = useCart(); // total quantity, straight from context

  return (
    <header className="header">
      <h1 className="logo">CampusEats</h1>
      <nav className="nav">
        {/* NavLink adds the class "active" to the link of the current page.
            "end" on "/" stops it from being active on every page (all URLs start with /). */}
        <NavLink to="/" end className="link">Vendors</NavLink>
        <NavLink to="/orders" className="link">My Orders</NavLink>
        <NavLink to="/cart" className="link">
          Cart <span className="badge">{count}</span>
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;