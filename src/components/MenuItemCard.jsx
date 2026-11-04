// item = one menu item object, onAdd = function from App
function MenuItemCard({ item, onAdd }) {
  return (
    <div className="menu-card">
      {/* first letter of the item name */}
      <div className="thumb">{item.name[0]}</div>

      {/* NEW: category shown as a tag (Rice, Noodles, Drinks...) */}
      <span className="tag">{item.category}</span>

      <h3>{item.name}</h3>
      <p className="desc">{item.description}</p>

      {/* toFixed(2) turns 6.0 into 6.00 */}
      <p className="price">RM {item.price.toFixed(2)}</p>

      {/* disabled when NOT available; ternary changes the text */}
      <button
        type="button"
        className="btn"
        disabled={!item.available}
        onClick={() => onAdd(item)}
      >
        {item.available ? "Add to cart" : "Sold out"}
      </button>
    </div>
  );
}

export default MenuItemCard;