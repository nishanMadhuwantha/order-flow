import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProducts } from "../../services/productService";
import type { Product } from './productTypes.ts';

interface ProductState {
  items: Product[];
  loading: boolean;
  total: number;
  error: string | null;
}
const initialState: ProductState = {
  items: [],
  loading: false,
  total: 0,
  error: null,
};
interface FetchProductsResponse {
  products: Product[];
  total: number;
}

export const fetchProducts = createAsyncThunk<
  FetchProductsResponse,
  { limit: number; skip: number },
  { rejectValue: string }
>("products/fetchProducts", async (_params, { rejectWithValue }) => {
  try {
    return await getProducts(_params);
  } catch (error: any) {
    return rejectWithValue(error?.message + " - Failed to fetch products");
  }
});

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action: any) => {
        state.loading = false;
        state.items = action.payload.products;
        state.total = action.payload.total;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Something went wrong";
      });
  },
});

export default productSlice.reducer;
