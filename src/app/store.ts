import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/products/productSlice";
import orderReducer from "../features/orders/orderSlice";

export const store = configureStore({
  reducer: {
    products: productReducer,
    orders: orderReducer,
  },
  devTools: import.meta.env.DEV,
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;