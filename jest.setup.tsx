// Mock react-dom/test-utils first
const React = require('react');
jest.mock('react-dom/test-utils', () => ({
  ...jest.requireActual('react-dom/test-utils'),
  act: React.act
}));

import '@testing-library/jest-dom';
import { render as rtlRender, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import type { AnyAction } from '@reduxjs/toolkit';

export const mockDispatch = jest.fn();
export const mockUseSelector = jest.fn();

// Mock react-redux hooks but keep the original Provider
jest.mock('react-redux', () => {
  const originalModule = jest.requireActual('react-redux');
  return {
    __esModule: true,
    ...originalModule,
    useDispatch: () => mockDispatch,
    useSelector: (selector: any) => mockUseSelector(selector)
  };
});

interface ProductsState {
  items: any[];
  status: string;
  error: any;
}

const initialState: ProductsState = {
  items: [],
  status: 'idle',
  error: null
};

const productsReducer = (state = initialState, action: AnyAction): ProductsState => {
  return state;
};

const rootReducer = combineReducers({
  products: productsReducer
});

export type RootState = ReturnType<typeof rootReducer>;

// Custom render function that wraps with Provider
export const renderWithProviders = (
  ui: React.ReactElement,
  {
    preloadedState = {} as Partial<RootState>,
    store = configureStore({
      reducer: rootReducer,
      preloadedState
    }),
    ...renderOptions
  } = {}
) => {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return <Provider store={store}>{children}</Provider>;
  }

  return {
    store,
    ...rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
  };
};

// Re-export testing library utilities
export { screen, fireEvent };

// Export act from React
export const { act } = React;
