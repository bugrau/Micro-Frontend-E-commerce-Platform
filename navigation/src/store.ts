import { configureStore, combineReducers } from '@reduxjs/toolkit';
import appReducer, { AppState } from './appSlice';

// Define the store state type
export interface StoreState {
  app: AppState;
  cart?: any;
  products?: any;
  auth?: any;
  orders?: any;
}

// Create store with async initialization
export const initializeStore = async () => {
  try {
    // Load all remote reducers
    const [
      { cartReducer },
      { default: productsReducer },
      { default: authReducer },
      { default: ordersReducer }
    ] = await Promise.all([
      import('shopping-cart/cartSlice'),
      import('product-listings/productSlice'),
      import('user-authentication/authSlice'),
      import('order-history/orderSlice')
    ]);

    // Create the root reducer
    const rootReducer = combineReducers({
      app: appReducer,
      cart: cartReducer,
      products: productsReducer,
      auth: authReducer,
      orders: ordersReducer
    });

    // Create and return the store
    return configureStore({
      reducer: rootReducer,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false,
          thunk: true
        })
    });
  } catch (error) {
    console.error('Error loading remote reducers:', error);
    // Return a store with just the app reducer if remote loading fails
    return configureStore({
      reducer: {
        app: appReducer,
        cart: (state = { items: [] }) => state // Provide a default cart reducer
      }
    });
  }
};

// Create the initial store with just the app reducer and a default cart state
export const store = configureStore({
  reducer: {
    app: appReducer,
    cart: (state = { items: [] }) => state // Provide a default cart reducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


