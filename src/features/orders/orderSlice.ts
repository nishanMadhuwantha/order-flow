import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getOrders } from '../../services/orderService.ts';
import type { Order } from './orderTypes.ts';

interface OrderState {
  carts: Order[];
  loading: boolean;
  error: string | null;
  total: number;
}

const initialState: OrderState = {
  carts: [],
  loading: false,
  error: null,
  total: 0,
};

interface FetchOrdersResponse {
  carts: Order[];
  total: number;
}

export const fetchOrders = createAsyncThunk<
  FetchOrdersResponse,
  { limit: number; skip: number },
  { rejectValue: string }
>("orders/fetchOrders", async (params, { rejectWithValue }) => {
  try {
    return await getOrders(params);
  } catch (error: any) {
    return rejectWithValue(error?.message + " - Failed to fetch products");
  }
});

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
        state.carts = action.payload.carts;
        state.total = action.payload.total;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default orderSlice.reducer;