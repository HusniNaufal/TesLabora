import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import LamboraApp from "./LamboraApp.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LamboraApp />
  </StrictMode>
);
