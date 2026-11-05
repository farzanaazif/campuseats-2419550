import { useParams, useSearchParams, Link } from "react-router";
import { useVendors } from "../hooks/useVendors";
import { Loading, ErrorMessage } from "../components/Status";
import SearchBar from "../components/SearchBar";
import MenuList from "../components/MenuList";

function VendorPage() {
  // /vendor/:id  ->  useParams() gives { id: "2416464-kopi-dahlia" }
  const { id } = useParams();
  const { vendors, loading, error, reload } = useVendors();

  // ---------- B4 (digit 0): search text lives in the URL, as ?q=... ----------
  // searchParams reads the query string. setSearchParams changes the URL.
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get("q") ?? ""; // no ?q= in the URL -> empty string

  function handleSearchChange(text) {
    // If the box has text, URL becomes ?q=text. If empty, remove ?q completely.
    // { replace: true } rewrites the current history entry instead of adding one
    // per keystroke, so the Back button leaves the page rather than going
    // back letter by letter.
    setSearchParams(text ? { q: text } : {}, { replace: true });
  }

  // ---------- page states ----------
  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} onRetry={reload} />;

  const vendor = vendors.find((v) => v.id === id);

  // Unknown id, e.g. /vendor/zzz
  if (!vendor) {
    return (
      <div className="card">
        <h2>Vendor not found</h2>
        <p className="muted">There is no vendor with id "{id}".</p>
        <Link to="/">Back to vendors</Link>
      </div>
    );
  }

  // Derived list from the URL value (case-insensitive).
  const query = q.trim().toLowerCase();
  const visibleItems = vendor.menu.filter((item) =>
    item.name.toLowerCase().includes(query)
  );

  return (
    <section>
      <h2>Menu: {vendor.name}</h2>
      <p className="muted">
        {vendor.location} · {vendor.openHours} · {vendor.isOpen ? "Open" : "Closed"}
      </p>

      {/* Same controlled SearchBar as before; value now comes from the URL */}
      <SearchBar value={q} onChange={handleSearchChange} />

      <MenuList items={visibleItems} />

      {visibleItems.length === 0 && (
        <p className="muted">No menu items match "{q}".</p>
      )}
    </section>
  );
}

export default VendorPage;