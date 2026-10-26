import MenuItemCard from './MenuItemCard';

function MenuList({ items, onAdd }) {
  // If there are no items, show a message
  if (items.length === 0) {
    return <p>No items on this menu yet.</p>;
  }

  return (
    <div className="grid">
      {/* Map through the items and create a card for each. We MUST use the item.id as the key! */}
      {items.map((item) => (
        <MenuItemCard key={item.id} item={item} onAdd={onAdd} />
      ))}
    </div>
  );
}
export default MenuList;