import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import AppRoutes from "./configs/routes/AppRoutes";
import { store } from "./app/store";

import "./styles/index.css";
import "./styles/layout.css";
import { ThemeModeProvider } from './components/providers/ThemeModeProvider.tsx';
import AppSnackbarProvider from './components/providers/AppSnackbarProvider.tsx';

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <AppSnackbarProvider>
        <BrowserRouter>
          <ThemeModeProvider>
            <AppRoutes />
          </ThemeModeProvider>
        </BrowserRouter>
      </AppSnackbarProvider>
    </Provider>
  </React.StrictMode>
);
