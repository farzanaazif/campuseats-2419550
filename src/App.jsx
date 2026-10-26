import { useState } from 'react';
import Header from './components/Header';
import VendorCard from './components/VendorCard';
import MenuList from './components/MenuList';
import Footer from './components/Footer';
import vendors from './data/vendors';

function App() {
  // B4: State for selected vendor (default is the first vendor)
  const [selectedVendorId, setSelectedVendorId] = useState(vendors[0].id);
  
  // B4: State for cart (default is an empty array)
  const [cart, setCart] = useState([]);

  // Find the full vendor object based on the ID we selected
  const selectedVendor = vendors.find(v => v.id === selectedVendorId);

  // B4: Add to cart function using the "prev" state trick
  const handleAddToCart = (item) => {
    setCart((prev) => [...prev, item]);
  };

  return (
    <>
      {/* Pass the cart length to the Header */}
      <Header cartCount={cart.length} />
      
      <main className="container">
        <section>
          <h2 className="section-title">Choose a vendor</h2>
          <div className="grid">
            {/* Map through ALL vendors */}
            {vendors.map(vendor => (
              <VendorCard 
                key={vendor.id} 
                vendor={vendor} 
                isSelected={vendor.id === selectedVendorId}
                onSelect={setSelectedVendorId}
              />
            ))}
          </div>
        </section>

        {selectedVendor && (
          <section>
            <h2 className="section-title">Menu: {selectedVendor.name}</h2>
            <MenuList items={selectedVendor.menu} onAdd={handleAddToCart} />
          </section>
        )}
      </main>
      
      <Footer />
    </>
  );
}
export default App;