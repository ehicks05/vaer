import "./index.css";
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ModalProvider } from "react-modal-hook";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import App from "./MyApp";

const queryClient = new QueryClient();

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <BrowserRouter>
    <ModalProvider>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </ModalProvider>
  </BrowserRouter>
);
