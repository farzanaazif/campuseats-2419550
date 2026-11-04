// Props arrive from App: vendor (one object), isSelected (true/false), onSelect (function)
function VendorCard({ vendor, isSelected, onSelect }) {
  return (
    <button
      type="button"
      // adds "selected" only when this vendor is the chosen one
      className={isSelected ? "vendor-card selected" : "vendor-card"}
      // arrow function so onSelect runs on click, not while rendering
      onClick={() => onSelect(vendor.id)}
    >
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
    </button>
  );
}

export default VendorCard;