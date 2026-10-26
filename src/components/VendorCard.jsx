function VendorCard({ vendor, isSelected, onSelect }) {
  return (
    <button 
      type="button" 
      // If isSelected is true, add the word "selected" to the class name
      className={`vendor-card ${isSelected ? 'selected' : ''}`}
      onClick={() => onSelect(vendor.id)}
    >
      <h3>{vendor.name}</h3>
      <p>{vendor.location}</p>
      <p>{vendor.openHours}</p>
      <span className={vendor.isOpen ? 'open' : 'closed'}>
        {vendor.isOpen ? 'Open now' : 'Closed'}
      </span>
    </button>
  );
}
export default VendorCard;