import { configureStore } from '@reduxjs/toolkit';
import productReducer from './productSlice';
import { cartReducer } from 'shopping-cart/cartSlice';

// Create store without async initialization
export const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
