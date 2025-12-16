import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import AppRoutes from "./configs/routes/AppRoutes";
import { store } from "./app/store";

import "./styles/index.css";
import { ThemeModeProvider } from './components/providers/ThemeModeProvider.tsx';

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeModeProvider>
          <AppRoutes />
        </ThemeModeProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
