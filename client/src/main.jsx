import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";
import "./index.css";

import {
  RegisterContextProvider,
  UserContextProvider,
  AuthContextProvider,
} from "./contexts/index.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <RegisterContextProvider>
        <AuthContextProvider>
          <UserContextProvider>
            <App />
          </UserContextProvider>
        </AuthContextProvider>
      </RegisterContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
