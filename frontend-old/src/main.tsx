import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { UserProvider } from "./context/UserProvider.tsx";
import { BrowserRouter } from 'react-router';

import App from "./App.tsx";

// NOTE! StrictMode renders components twice in dev mode
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <App />
      </UserProvider>
    </BrowserRouter>
  </StrictMode>
);
