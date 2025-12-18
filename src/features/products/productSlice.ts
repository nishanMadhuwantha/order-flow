import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getProducts,
  getProductById,
  updateProduct,
  deleteProducts,
} from '../../api/productService';
import type { Product } from './productTypes';

interface ProductState {
  items: Product[];
  selectedProduct: Product | null;
  loading: boolean;
  total: number;
  error: string | null;
}

const initialState: ProductState = {
  items: [],
  selectedProduct: null,
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
  { limit: number; skip: number; sortBy: string; order: string },
  { rejectValue: string }
>('products/fetchProducts', async (params, { rejectWithValue }) => {
  try {
    return await getProducts(params);
  } catch (error: any) {
    return rejectWithValue(error?.message + ' - Failed to fetch products');
  }
});

export const fetchProductById = createAsyncThunk<
  Product,
  string,
  { rejectValue: string }
>('products/fetchProductById', async (id, { rejectWithValue }) => {
  try {
    return await getProductById(id);
  } catch {
    return rejectWithValue('Failed to fetch product details');
  }
});

export const patchProduct = createAsyncThunk<
  Product,
  { id: string; payload: Partial<Product> },
  { rejectValue: string }
>('products/patchProduct', async ({ id, payload }, { rejectWithValue }) => {
  try {
    return await updateProduct(id, payload);
  } catch {
    return rejectWithValue('Failed to update product');
  }
});

export const deleteProduct = createAsyncThunk<
  Product,
  number,
  { rejectValue: string }
>('products/deleteProduct', async (id, { rejectWithValue }) => {
  try {
    return await deleteProducts(id);
  } catch {
    return rejectWithValue('Failed to update product');
  }
});

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.products;
        state.total = action.payload.total;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Something went wrong';
      })
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Failed to load product';
      })
      .addCase(patchProduct.fulfilled, (state, action) => {
        state.selectedProduct = action.payload;
        const index = state.items.findIndex(
          (p: any) => p.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (p: any) => p.id !== action.payload.id
        );
      });
  },
});

export default productSlice.reducer;
