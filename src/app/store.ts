import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/products/productSlice";
import { notificationListener } from "./notificationListener";

export const store = configureStore({
  reducer: {
    products: productReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(notificationListener.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
