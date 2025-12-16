import type { RootState } from '../../app/store.ts';

export const selectProducts = (state: RootState) =>
  state.products.items;

export const selectProductLoading = (state: RootState) =>
  state.products.loading;

export const selectProductError = (state: RootState) =>
  state.products.error;

export const selectCategories = (state: RootState) =>
  [...new Set(state.products.items.map(p => p.category))];

export const selectTotalProductCount = (state: RootState) =>
  state.products.total;
