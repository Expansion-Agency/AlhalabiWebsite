import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { TranslationProvider } from "./i18n/TranslationProvider";
import { BrowserRouter, RouterProvider } from "react-router-dom";
import { motion } from "motion/react";

createRoot(document.getElementById("root")).render(
   <StrictMode>
    <BrowserRouter>
       <TranslationProvider>
         <App />
       </TranslationProvider>
    </BrowserRouter>
  </StrictMode>
);
