// useState = values that change over time.
// useEffect = code that runs after rendering (we use it to fetch the data).
import { useState, useEffect } from "react";

// ---------- IMPORT THE COMPONENTS ----------
import Header from "./components/Header";
import VendorCard from "./components/VendorCard";
import MenuList from "./components/MenuList";
import SearchBar from "./components/SearchBar";
import Footer from "./components/Footer";
import CartPage from "./components/CartPage";                // B3: the cart view
import { Loading, ErrorMessage } from "./components/Status"; // B2: named exports use { }
import "./index.css"; // styles

function App() {
  // ================= STATE =================

  // B2: data from the mock API. Starts empty, loading is true, error is null.
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reloadKey, setReloadKey] = useState(0); // changing this number re-runs the fetch

  // null at first, because vendors have not arrived yet.
  const [selectedVendorId, setSelectedVendorId] = useState(null);

  // B3: each cart line is { item, qty }
  const [cart, setCart] = useState([]);

  // B6 (digit 0): the text typed in the search box
  const [searchText, setSearchText] = useState("");

  // B3: which screen to show: "menu" | "cart" | "done"
  const [view, setView] = useState("menu");

  // B5: saved order summary { name, mahallah, pickupTime, total }
  const [lastOrder, setLastOrder] = useState(null);

  // ================= B2: FETCH THE DATA =================
  useEffect(() => {
    const controller = new AbortController(); // lets us cancel the request
    setLoading(true); // show "Loading menus..." (also when retrying)
    setError(null);   // clear the old error

    fetch("/api/vendors.json", { signal: controller.signal })
      .then((res) => {
        // fetch does NOT throw on 404/500, so we check res.ok ourselves
        if (!res.ok) throw new Error(`Server responded with ${res.status}`);
        return res.json(); // JSON text -> JavaScript array
      })
      .then((data) => {
        setVendors(data);
        setSelectedVendorId(data[0]?.id ?? null); // select the first vendor
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === "AbortError") return; // cancelled on purpose, not a real error
        setError(err.message);
        setLoading(false);
      });

    return () => controller.abort(); // cleanup: cancel the request if needed
  }, [reloadKey]); // runs again whenever reloadKey changes ("Try again" button)

  // ================= DERIVED VALUES (calculated, NOT extra state) =================

  // The vendor object that is currently selected (undefined until data arrives).
  const selectedVendor = vendors.find((v) => v.id === selectedVendorId);

  // B3: header badge = TOTAL quantity, not the number of lines.
  const cartCount = cart.reduce((sum, line) => sum + line.qty, 0);

  // B6 (digit 0): filter the menu as you type.
  // trim() removes spaces at the ends, toLowerCase() makes it case-insensitive.
  const query = searchText.trim().toLowerCase();

  // If no vendor is ready yet, use an empty array so nothing crashes.
  // filter() returns a NEW array, so the original menu is never changed.
  // An empty query "" is included in every name, so an empty box shows everything.
  const visibleItems = selectedVendor
    ? selectedVendor.menu.filter((item) =>
        item.name.toLowerCase().includes(query)
      )
    : [];

  // ================= EVENT HANDLERS =================

  function handleSelectVendor(id) {
    setSelectedVendorId(id);
    setSearchText(""); // start with a fresh search for the new vendor
  }

  // B3: if the item is already in the cart, qty + 1, otherwise add a new line
  function handleAddToCart(item) {
    setCart((prev) => {
      const existing = prev.find((line) => line.item.id === item.id);
      if (existing) {
        return prev.map((line) =>
          line.item.id === item.id ? { ...line, qty: line.qty + 1 } : line
        );
      }
      return [...prev, { item, qty: 1 }]; // new array, never push
    });
  }

  // B3: delta is +1 or -1; a line that reaches 0 disappears (filter)
  function handleChangeQty(itemId, delta) {
    setCart((prev) =>
      prev
        .map((line) =>
          line.item.id === itemId ? { ...line, qty: line.qty + delta } : line
        )
        .filter((line) => line.qty > 0)
    );
  }

  // B3: remove the whole line
  function handleRemove(itemId) {
    setCart((prev) => prev.filter((line) => line.item.id !== itemId));
  }

  // B5: called by CheckoutForm with { name, mahallah, pickupTime }
  function handlePlaceOrder(details) {
    // same reduce as CartPage: add up price x qty for every line
    const total = cart.reduce((sum, line) => sum + line.item.price * line.qty, 0);
    setLastOrder({ ...details, total }); // save the details + total
    setCart([]);                         // empty the cart
    setView("done");                     // go to the order-placed screen
  }

  // ================= B3: CHOOSE WHAT TO SHOW =================
  let content;

  if (view === "cart") {
    // Cart screen
    content = (
      <CartPage
        cart={cart}
        onChangeQty={handleChangeQty}
        onRemove={handleRemove}
        onPlaceOrder={handlePlaceOrder}
      />
    );
  } else if (view === "done") {
    // B5: order-placed screen. "?." avoids a crash if lastOrder is null.
    content = (
      <div className="card">
        <h2>Order placed ✅</h2>
        <p>
          Thanks, <strong>{lastOrder?.name}</strong>! Pick up at{" "}
          <strong>{lastOrder?.mahallah}</strong> at{" "}
          <strong>{lastOrder?.pickupTime}</strong>.
        </p>
        <p>
          <strong>Total: RM {lastOrder?.total.toFixed(2)}</strong>
        </p>
        <button type="button" className="btn" onClick={() => setView("menu")}>
          Back to vendors
        </button>
      </div>
    );
  } else if (loading) {
    // B2: still fetching
    content = <Loading />;
  } else if (error) {
    // B2: fetch failed. (k) => k + 1 gives reloadKey a new number, which re-runs the fetch.
    content = (
      <ErrorMessage message={error} onRetry={() => setReloadKey((k) => k + 1)} />
    );
  } else {
    // Your Week 2 screen: vendor cards + menu of the selected vendor
    content = (
      <>
        {/* section 1: Choose a vendor */}
        <section>
          <h2>Choose a vendor</h2>
          <div className="grid">
            {/* .map() makes one card per vendor. key must be unique. */}
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

        {/* section 2: Menu of the selected vendor.
            "selectedVendor && (...)" only renders once the data is ready. */}
        {selectedVendor && (
          <section>
            <h2>Menu: {selectedVendor.name}</h2>

            {/* B6: controlled search box */}
            <SearchBar value={searchText} onChange={setSearchText} />

            {/* B6: pass the FILTERED list, not selectedVendor.menu */}
            <MenuList items={visibleItems} onAdd={handleAddToCart} />

            {/* message when nothing matches the search */}
            {visibleItems.length === 0 && (
              <p className="muted">No menu items match "{searchText}".</p>
            )}
          </section>
        )}
      </>
    );
  }

  // ================= WHAT APP RENDERS =================
  return (
    // <> ... </> = fragment, groups everything without an extra <div>
    <>
      {/* total quantity + two functions to switch view */}
      <Header
        cartCount={cartCount}
        onShowMenu={() => setView("menu")}
        onShowCart={() => setView("cart")}
      />

      {/* content = whichever screen was chosen above */}
      <main className="container">{content}</main>

      <Footer />
    </>
  );
}

// lets main.jsx do: import App from "./App.jsx"
export default App;