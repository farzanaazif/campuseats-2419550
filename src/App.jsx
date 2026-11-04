// NEW: useState hook and the data array
import { useState } from "react";
import vendors from "./data/vendors";

// import the components
import Header from "./components/Header";
import VendorCard from "./components/VendorCard";
import MenuList from "./components/MenuList";       // NEW (replaces MenuItemCard here)
import SearchBar from "./components/SearchBar";     // NEW (B5, digit 0)
import Footer from "./components/Footer";
import "./index.css"; // styles

function App() {
  // NEW: state
  const [selectedVendorId, setSelectedVendorId] = useState(vendors[0].id);
  const [cart, setCart] = useState([]);
  const [searchText, setSearchText] = useState(""); // stored only, no filtering yet

  // NEW: derived value, not extra state
  const selectedVendor = vendors.find((v) => v.id === selectedVendorId);

  // NEW: event handlers
  function handleSelectVendor(id) {
    setSelectedVendorId(id);
  }
  function handleAddToCart(item) {
    setCart((prev) => [...prev, item]); // new array, never push
  }

  return (
    // <> ... </> = fragment, groups everything without an extra <div>
    <>
      {/* CHANGED: pass the cart count */}
      <Header cartCount={cart.length} />

      <main className="container">
        {/* section 1: Choose a vendor */}
        <section>
          <h2>Choose a vendor</h2>
          <div className="grid">
            {/* CHANGED: .map() one card per vendor */}
            {vendors.map((vendor) => (
              <VendorCard
                key={vendor.id}
                vendor={vendor}
                isSelected={vendor.id === selectedVendorId}
                onSelect={handleSelectVendor}
              />
            ))}
          </div>
        </section>

        {/* section 2: Menu of the selected vendor */}
        <section>
          <h2>Menu: {selectedVendor.name}</h2>
          <SearchBar value={searchText} onChange={setSearchText} />
          <MenuList items={selectedVendor.menu} onAdd={handleAddToCart} />
        </section>
      </main>

      <Footer />
    </>
  );
}

export default App;