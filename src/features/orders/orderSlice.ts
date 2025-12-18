import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getOrderById, getOrders } from '../../api/orderService.ts';
import type { FetchOrdersResponse, Order } from './orderTypes.ts';

interface OrderState {
  carts: Order[];
  selectedOrder: Order | null;
  loading: boolean;
  error: string | null;
  total: number;
}

const initialState: OrderState = {
  carts: [],
  loading: false,
  selectedOrder: null,
  error: null,
  total: 0,
};

export const fetchOrders = createAsyncThunk<
  FetchOrdersResponse,
  { limit: number; skip: number },
  { rejectValue: string }
>('orders/fetchOrders', async (params, { rejectWithValue }) => {
  try {
    return await getOrders(params);
  } catch (error: any) {
    return rejectWithValue(error?.message + ' - Failed to fetch orders');
  }
});

export const fetchOrderById = createAsyncThunk<
  Order,
  string,
  { rejectValue: string }
>('orders/fetchOrderById', async (id, { rejectWithValue }) => {
  try {
    return await getOrderById(id);
  } catch {
    return rejectWithValue('Failed to fetch order details');
  }
});

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
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
      })
      .addCase(fetchOrderById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedOrder = action.payload;
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Failed to load Order';
      });
  },
});

export default orderSlice.reducer;
