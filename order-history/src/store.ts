import { configureStore } from '@reduxjs/toolkit';

import orderReducer from './orderSlice';
import type { OrderState } from './orderSlice';



export const store = configureStore({

  reducer: {

    orders: orderReducer,

  },

});



export interface RootState {
  orders: OrderState;
}

export type AppDispatch = typeof store.dispatch;



