// import the components
import Header from "./components/Header";
import VendorCard from "./components/VendorCard";
import MenuItemCard from "./components/MenuItemCard";
import Footer from "./components/Footer";
import "./index.css"; // styles

function App() {
  return (
    // <> ... </> = fragment, groups everything without an extra <div>
    <>
      <Header />

      <main className="container">
        {/* section 1: Today's vendors */}
        <section>
          <h2>Today's vendors</h2>
          <VendorCard />   {/* no props, because it declares the data inside */}
        </section>

        {/* section 2: Popular items, inside a grid div */}
        <section>
          <h2>Popular items</h2>
          <div className="grid">
            <MenuItemCard /> {/* no props, same reason */}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default App;