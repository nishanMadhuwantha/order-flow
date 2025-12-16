import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from '@reduxjs/toolkit';
import axios from 'axios';

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  thumbnail: string;
  rating: number;
  active?: boolean;
}

interface ProductState {
  items: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk<Product[]>(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("https://dummyjson.com/products");
      return res.data.products;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err: any) {
      return rejectWithValue("Failed to fetch products");
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    updateProductStock: (
      state,
      action: PayloadAction<{ id: number; stock: number }>
    ) => {
      const product = state.items.find((p: any) => p.id === action.payload.id);
      if (product) {
        product.stock = action.payload.stock;
      }
    },
    toggleProductStatus: (state, action: PayloadAction<number>) => {
      const product = state.items.find((p: any) => p.id === action.payload);
      if (product) {
        product.active = !product.active;
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { updateProductStock, toggleProductStatus } = productSlice.actions;
export default productSlice.reducer;