import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import TechnologyPage from "./pages/TechnologyPage";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TechnologyPage />
  </StrictMode>,
);
