import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface Order {
  id: number;
  user: string;
  total: number;
  status: "Pending" | "Shipped" | "Delivered" | "Cancelled";
  date: string;
}

interface OrderState {
  items: Order[];
  loading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchOrders = createAsyncThunk<Order[]>(
  "orders/fetchOrders",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("https://dummyjson.com/carts");
      return res.data.carts.map((cart: any) => ({
        id: cart.id,
        user: `User ${cart.userId}`,
        total: cart.total,
        status: ["Pending", "Shipped", "Delivered"][cart.id % 3],
        date: new Date().toISOString(),
      }));
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err: any) {
      return rejectWithValue("Failed to fetch orders");
    }
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchOrders.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default orderSlice.reducer;