import { useVendors } from "../hooks/useVendors";
import { Loading, ErrorMessage } from "../components/Status";
import VendorCard from "../components/VendorCard";

function HomePage() {
  const { vendors, loading, error, reload } = useVendors();

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} onRetry={reload} />;

  return (
    <section>
      <h2>Choose a vendor</h2>
      <div className="grid">
        {vendors.map((vendor) => (
          <VendorCard key={vendor.id} vendor={vendor} />
        ))}
      </div>
    </section>
  );
}

export default HomePage;