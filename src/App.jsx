import { BrowserRouter, Routes, Route } from "react-router";
import { CartProvider } from "./context/CartProvider";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import VendorPage from "./pages/VendorPage";
import CartPage from "./pages/CartPage";
import OrdersPage from "./pages/OrdersPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    // BrowserRouter: turns on URL-based routing for everything inside.
    <BrowserRouter>
      {/* CartProvider is inside the router so any page can use the cart */}
      <CartProvider>
        <Routes>
          {/* A route without a path that has children = a layout route */}
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />                  {/* / */}
            <Route path="vendor/:id" element={<VendorPage />} />    {/* /vendor/abc */}
            <Route path="cart" element={<CartPage />} />            {/* /cart */}
            <Route path="orders" element={<OrdersPage />} />        {/* /orders */}
            <Route path="*" element={<NotFoundPage />} />           {/* anything else */}
          </Route>
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;