import { useEffect, useState } from "react";

// Same shape as useState, but the value survives a page refresh.
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    // try/catch: JSON.parse throws if the saved text is broken,
    // and localStorage itself can throw (private mode, storage blocked).
    try {
      const saved = localStorage.getItem(key);
      return saved !== null ? JSON.parse(saved) : initialValue;
    } catch {
      return initialValue; // fall back to the default instead of crashing
    }
  });

  // Runs after every change to key or value: save the new value as JSON text.
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // storage full or blocked: ignore, the app still works without saving
    }
  }, [key, value]);

  return [value, setValue];
}