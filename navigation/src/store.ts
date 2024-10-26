import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';







import productReducer from 'product-listings/productSlice';







import cartReducer from 'shopping-cart/cartSlice';







import authReducer from 'user-authentication/authSlice';







import orderReducer from 'order-history/orderSlice';















const appSlice = createSlice({







  name: 'app',







  initialState: { globalError: null as string | null },







  reducers: {







    setGlobalError: (state, action: PayloadAction<string | null>) => {







      state.globalError = action.payload;







    },







  },







});















export const { setGlobalError } = appSlice.actions;















export const store = configureStore({







  reducer: {







    app: appSlice.reducer,







    products: productReducer,







    cart: cartReducer,







    auth: authReducer,







    orders: orderReducer,







  },







});















export type RootState = ReturnType<typeof store.getState>;







export type AppDispatch = typeof store.dispatch;














