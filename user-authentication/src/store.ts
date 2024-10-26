import { configureStore } from '@reduxjs/toolkit';

import authReducer from './authSlice';



export const store = configureStore({

  reducer: {

    auth: authReducer,

  },

});



export type RootState = {
  auth: {
    user: { email: string; token: string } | null;
    error: string | null;
    isLoading: boolean;
  };
};

export type AppDispatch = typeof store.dispatch;



