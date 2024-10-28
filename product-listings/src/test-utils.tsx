import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import productReducer, { Product, ProductsState } from './productSlice';

// Create mock products
const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Product 1',
    description: 'Description 1',
    price: 99.99,
    category: 'Test Category',
    imageUrl: 'test1.jpg',
    stock: 10
  },
  {
    id: 2,
    name: 'Product 2',
    description: 'Description 2',
    price: 149.99,
    category: 'Test Category',
    imageUrl: 'test2.jpg',
    stock: 15
  }
];

// Define initial state with proper typing
const initialState: { products: ProductsState } = {
  products: {
    items: mockProducts,
    status: 'idle' as const, // Use const assertion to narrow the type
    error: null,
    filters: {
      category: null,
      minPrice: null,
      maxPrice: null,
      sortBy: null
    }
  }
};

const store = configureStore({
  reducer: {
    products: productReducer
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
