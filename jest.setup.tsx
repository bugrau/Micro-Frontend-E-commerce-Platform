/// <reference types="jest" />
import React from 'react';
import '@testing-library/jest-dom';
import { render as rtlRender, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore, combineReducers, AnyAction } from '@reduxjs/toolkit';
import { act } from 'react';

// Configure @testing-library/react to use React.act
import { configure } from '@testing-library/react';
configure({ asyncUtilTimeout: 5000 });

// Mock react-redux hooks
export const mockDispatch = jest.fn();
export const mockUseSelector = jest.fn();

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
  useSelector: (selector: any) => mockUseSelector(selector)
}));

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

interface RenderOptions {
  preloadedState?: Partial<RootState>;
  store?: ReturnType<typeof configureStore>;
}

// Custom render function that wraps with Provider
export async function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState,
    store = configureStore({
      reducer: rootReducer,
      preloadedState: preloadedState as Partial<RootState>
    }),
    ...renderOptions
  }: RenderOptions = {}
) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return <Provider store={store}>{children}</Provider>;
  }

  let result: any;
  await act(async () => {
    result = {
      store,
      ...rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
    };
  });

  return result;
}

// Re-export testing library utilities
export { screen, fireEvent };

interface PreloadedState {
  products?: any;
  cart?: any;
}

const preloadedState: PreloadedState = {};
