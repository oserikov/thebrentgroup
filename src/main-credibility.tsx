import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import CredibilityPage from "./pages/CredibilityPage";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CredibilityPage />
  </StrictMode>,
);
