import { useState } from 'react';

function MenuItemCard({ item, onAdd }) {
  const [isFavourite, setIsFavourite] = useState(false);

  return (
    <div className="menu-card">
      {/* This takes the first letter of 'Rice', 'Noodles', or 'Drinks' */}
      <div className="menu-icon">{item.category.charAt(0).toUpperCase()}</div>
      
      <div className="menu-info">
        <span className="category-label">{item.category}</span>
        <h4>{item.name}</h4>
        <p>{item.description}</p>
        <p><strong>RM {item.price.toFixed(2)}</strong></p>
      </div>

      <div className="menu-actions">
        <button className="btn-add" onClick={() => onAdd(item)}>Add to cart</button>
        
        {/* The B5 Feature: Heart Button */}
        <button className="btn-heart" onClick={() => setIsFavourite(!isFavourite)}>
          {isFavourite ? '♥' : '♡'}
        </button>
      </div>
    </div>
  );
}
export default MenuItemCard;