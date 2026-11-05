import { useCallback, useEffect, useState } from "react";

export function useVendors() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reloadKey, setReloadKey] = useState(0); // changing it re-runs the fetch

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    // IMPORTANT: "/api/vendors.json" starts with "/", so it works from any route
    // (/cart, /vendor/abc...). A path without "/" would break on deep links.
    fetch("/api/vendors.json", { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`Server responded with ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setVendors(data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        setError(err.message);
        setLoading(false);
      });

    return () => controller.abort();
  }, [reloadKey]);

  // useCallback keeps the same function between renders.
  const reload = useCallback(() => setReloadKey((k) => k + 1), []);

  return { vendors, loading, error, reload };
}