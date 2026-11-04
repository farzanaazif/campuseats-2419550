function VendorCard() {
  const vendor = {
    name: "Kafe Mahallah Maryam",
    location: "Mahallah Maryam, Block F",
    openHours: "8:00 am - 10:00 pm",
    isOpen: true, // true = open, false = closed
  };

  return (
    <div className="vendor-card">
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
    </div>
  );
}

export default VendorCard;