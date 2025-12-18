import type { RootState } from '../../app/store.ts';

export const selectOrders = (state: RootState) => state.orders.carts;

export const selectOrderLoading = (state: RootState) => state.orders.loading;

export const selectOrderError = (state: RootState) => state.orders.error;

export const selectTotalOrderCount = (state: RootState) => state.orders.total;
