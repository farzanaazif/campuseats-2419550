import MenuItemCard from "./MenuItemCard";
import { useCart } from "../hooks/useCart";

// items = the list to show. The cart function comes from context, not props.
function MenuList({ items }) {
  const { addToCart } = useCart();

  return (
    <div className="grid">
      {items.map((item) => (
        // MenuItemCard keeps its Week 2/3 props: item and onAdd
        <MenuItemCard key={item.id} item={item} onAdd={addToCart} />
      ))}
    </div>
  );
}

export default MenuList;