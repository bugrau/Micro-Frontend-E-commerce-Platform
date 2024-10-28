import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authReducer, { AuthState } from './authSlice';

// Initial state matching the AuthState interface
const initialState: { auth: AuthState } = {
  auth: {
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,  // Changed from isLoading to loading
    error: null
  }
};

// Create test store
const store = configureStore({
  reducer: {
    auth: authReducer
  },
  preloadedState: initialState
});

const AllTheProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
};

const customRender = (ui: React.ReactElement, options = {}) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
