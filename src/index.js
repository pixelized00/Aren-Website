import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import React from "react";
import ReactDOM from "react-dom/client";
import "./input.css";
import "../src/service/i18n";

//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";

//core
import "primereact/resources/primereact.min.css";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CookieConsentModal from "./components/Cookie/CookieConsentModal";
import LanguageContextProvider from "./context/LangContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <LanguageContextProvider>
    <React.StrictMode>
      <App />
      <CookieConsentModal />
      <ToastContainer />
    </React.StrictMode>{" "}
  </LanguageContextProvider>
);

reportWebVitals();
