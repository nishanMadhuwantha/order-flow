import { createListenerMiddleware } from '@reduxjs/toolkit';
import { enqueueSnackbar } from 'notistack';
import { fetchProducts } from '../features/products/productSlice';
export const notificationListener = createListenerMiddleware();

notificationListener.startListening({
  actionCreator: fetchProducts.rejected,
  effect: (action) => {
    if (action.payload) {
      enqueueSnackbar(action.payload, { variant: 'error' });
    }
  },
});

notificationListener.startListening({
  actionCreator: fetchProducts.fulfilled,
  effect: (action: any) => {
    if (action.payload) {
      // enqueueSnackbar(action.payload, { variant: 'success' });
    }
  },
});
