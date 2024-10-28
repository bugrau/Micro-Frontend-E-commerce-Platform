import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import ProductListings from './ProductListings';
import productReducer, { Product } from './productSlice';

// Mock products
const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Product 1',
    price: 10,
    description: 'Description 1',
    category: 'Test Category',
    imageUrl: 'test1.jpg',
    stock: 10
  },
  {
    id: 2,
    name: 'Product 2',
    price: 20,
    description: 'Description 2',
    category: 'Test Category',
    imageUrl: 'test2.jpg',
    stock: 15
  }
];

// Create test store
const store = configureStore({
  reducer: {
    products: productReducer
  },
  preloadedState: {
    products: {
      items: mockProducts,
      status: 'idle',
      error: null,
      filters: {
        category: null,
        minPrice: null,
        maxPrice: null,
        sortBy: null
      }
    }
  }
});

describe('ProductListings', () => {
  it('renders product list', () => {
    render(
      <Provider store={store}>
        <ProductListings />
      </Provider>
    );

    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
  });
});
