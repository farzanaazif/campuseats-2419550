// Link is React Router's version of <a>. It changes the URL without reloading the page.
import { Link } from "react-router";

// Week 4: the only prop now is "vendor" (one object).
// isSelected and onSelect are gone: there is no "selected vendor" state in App any more,
// because the URL (/vendor/:id) decides which vendor is shown.
function VendorCard({ vendor }) {
  return (
    // CHANGED: <button> became <Link>.
    // The template string builds a URL such as /vendor/2416464-kopi-dahlia
    <Link to={`/vendor/${vendor.id}`} className="vendor-card">
      {/* first letter of the name, inside the thumb box */}
      <div className="thumb">{vendor.name[0]}</div>

      <div className="vendor-info">
        <h3>{vendor.name}</h3>
        <p>{vendor.location}</p>
        <p>Open: {vendor.openHours}</p>

        {/* ternary picks the class: "status open" or "status closed" */}
        <span className={vendor.isOpen ? "status open" : "status closed"}>
          {/* ternary picks the text: "Open now" or "Closed" */}
          {vendor.isOpen ? "Open now" : "Closed"}
        </span>
      </div>
    </Link>
  );
}

export default VendorCard;