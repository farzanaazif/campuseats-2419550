import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";

// Every route is a child of this one. <Outlet /> is where the current page appears.
function Layout() {
  return (
    <>
      <Header />
      <main className="container">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default Layout;