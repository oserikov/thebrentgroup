import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import MessagesToFuturePage from "./pages/MessagesToFuturePage";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MessagesToFuturePage />
  </StrictMode>,
);
