import { useState, useEffect } from 'react';
import Header from './components/Header';
import VendorCard from './components/VendorCard';
import MenuList from './components/MenuList';
import CartPage from './components/CartPage';
import Footer from './components/Footer';
import { Loading, ErrorMessage } from './components/Status';

function App() {
  // B2: Fetching State
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  // B3 & B4: App State
  const [view, setView] = useState('menu'); // 'menu' | 'cart' | 'done'
  const [selectedVendorId, setSelectedVendorId] = useState(null);
  const [cart, setCart] = useState([]);
  const [lastOrder, setLastOrder] = useState(null);

  // B6 - Digit 0 Feature: Search State
  const [searchTerm, setSearchTerm] = useState('');

  // B2: Fetch Data from API
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    fetch('/vendors.json', { signal: controller.signal })
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch data');
        return res.json();
      })
      .then(data => {
        setVendors(data);
        setSelectedVendorId(data[0].id); // Select first vendor
        setLoading(false);
      })
      .catch(err => {
        if (err.name !== 'AbortError') {
          setError(err.message);
          setLoading(false);
        }
      });

    return () => controller.abort(); // Cleanup
  }, [reloadKey]);

  // B3: Cart Logic
  const handleAddToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(line => line.item.id === item.id);
      if (existing) {
        // Increase qty if already in cart
        return prev.map(line => line.item.id === item.id ? { ...line, qty: line.qty + 1 } : line);
      }
      // Add new line
      return [...prev, { item, qty: 1 }];
    });
  };

  const handleChangeQty = (itemId, delta) => {
    setCart(prev => prev.map(line => {
      if (line.item.id === itemId) {
        const newQty = line.qty + delta;
        return { ...line, qty: newQty };
      }
      return line;
    }).filter(line => line.qty > 0)); // Remove if qty hits 0
  };

  const handleRemove = (itemId) => {
    setCart(prev => prev.filter(line => line.item.id !== itemId));
  };

  const cartCount = cart.reduce((sum, line) => sum + line.qty, 0);

  // B5: Handle Order Placement
  const handlePlaceOrder = (details) => {
    const total = cart.reduce((sum, line) => sum + line.item.price * line.qty, 0);
    setLastOrder({ ...details, total });
    setCart([]); // Clear cart
    setView('done'); // Show success screen
  };

  // Find active vendor and apply B6 (Digit 0) Search Filter
  const selectedVendor = vendors.find(v => v.id === selectedVendorId);
  const displayedMenu = selectedVendor 
    ? selectedVendor.menu.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : [];

  // Determine what to show in the main area
  let content;
  if (loading) {
    content = <Loading />;
  } else if (error) {
    content = <ErrorMessage message={error} onRetry={() => setReloadKey(k => k + 1)} />;
  } else if (view === 'cart') {
    content = <CartPage cart={cart} onChangeQty={handleChangeQty} onRemove={handleRemove} onPlaceOrder={handlePlaceOrder} />;
  } else if (view === 'done') {
    content = (
      <div className="card">
        <h2>Order placed!</h2>
        <p>Thank you, {lastOrder.name}. Your food will be ready at {lastOrder.pickupTime}.</p>
        <p><strong>Total paid: RM {lastOrder.total.toFixed(2)}</strong></p>
        <button className="btn" onClick={() => setView('menu')}>Back to menu</button>
      </div>
    );
  } else {
    // Normal Menu View
    content = (
      <>
        {selectedVendor && (
          <section>
             {/* B6: The Search Bar */}
             <input 
               type="text" 
               placeholder="Search menu by name..." 
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               style={{ marginBottom: '15px', padding: '8px', width: '100%', maxWidth: '300px' }}
             />

            <h2 className="section-title">Menu: {selectedVendor.name}</h2>
            <MenuList items={displayedMenu} onAdd={handleAddToCart} />
          </section>
        )}
      </>
    );
  }

  return (
    <>
      <Header 
        cartCount={cartCount} 
        onShowMenu={() => setView('menu')} 
        onShowCart={() => setView('cart')} 
      />
      <main className="container">
        {/* Vendor selection only shows in menu view */}
        {view === 'menu' && !loading && !error && (
          <section>
            <h2 className="section-title">Choose a vendor</h2>
            <div className="grid">
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
        )}
        
        {/* Show the cart, loading, error, or menu content */}
        {content}
      </main>
      <Footer />
    </>
  );
}
export default App;