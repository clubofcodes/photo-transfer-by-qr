import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import RouteApp from "./RouteApp";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouteApp />
  </StrictMode>
);
