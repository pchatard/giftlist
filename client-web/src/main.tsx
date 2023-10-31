import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.tsx";
import { Header } from "./components/giftlist/header/header.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Header loggedIn={true} />
    <App />
  </React.StrictMode>
);
