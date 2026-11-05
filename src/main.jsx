import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css"; // styles now load here (remove the import from App if you kept it)

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);