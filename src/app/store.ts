import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/products/productSlice";
import orderReducer from "../features/orders/orderSlice";
import { notificationListener } from "./notificationListener";

export const store = configureStore({
  reducer: {
    products: productReducer,
    orders: orderReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(notificationListener.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
