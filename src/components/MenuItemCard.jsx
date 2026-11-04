function MenuItemCard() {
  const item = {
    name: "Nasi Ayam Gepuk",
    description: "Whiterice, fried chicken, sambal, cucumbers and cabbages",
    price: 6.0,        // must be a number, not "7.50" in quotes
    available: true,   // false = sold out
  };

  return (
    <div className="menu-card">
      {/* first letter of the item name */}
      <div className="thumb">{item.name[0]}</div>

      <h3>{item.name}</h3>
      <p className="desc">{item.description}</p>

      {/* toFixed(2) turns 6.0 into 6.00 */}
      <p className="price">RM {item.price.toFixed(2)}</p>

      {/* disabled when NOT available; ternary changes the text */}
      <button className="btn" disabled={!item.available}>
        {item.available ? "Add to cart" : "Sold out"}
      </button>
    </div>
  );
}

export default MenuItemCard;