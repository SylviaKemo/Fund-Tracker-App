import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { CampaignsContextProvider } from "./context/CampaignContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CampaignsContextProvider>
      <App />
    </CampaignsContextProvider>
  </React.StrictMode>
);
