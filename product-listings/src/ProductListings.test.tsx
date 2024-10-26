import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders, mockUseSelector, mockDispatch } from '../../jest.setup';
import ProductListings from './ProductListings';
import { fetchProducts, addToCart } from './productsSlice';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useEffect: jest.fn((f) => f()),
}));

describe('ProductListings', () => {
  const mockProducts = {
    items: [
      { id: 1, name: 'Product 1', price: 10, description: 'Description 1' },
      { id: 2, name: 'Product 2', price: 20, description: 'Description 2' },
    ],
    status: 'succeeded',
    error: null,
  };

  beforeEach(() => {
    mockUseSelector.mockClear();
    mockDispatch.mockClear();
  });

  it('renders product listings', async () => {
    mockUseSelector.mockReturnValue(mockProducts);
    renderWithProviders(<ProductListings />);

    const productElements = await screen.findAllByTestId('product-item');
    expect(productElements).toHaveLength(2);
  });

  it('displays loading state', () => {
    mockUseSelector.mockReturnValue({ ...mockProducts, status: 'loading' });
    renderWithProviders(<ProductListings />);

    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('displays error state', () => {
    mockUseSelector.mockReturnValue({ 
      ...mockProducts, 
      status: 'failed',
      error: 'Failed to load products'
    });
    renderWithProviders(<ProductListings />);

    expect(screen.getByText(/failed to load products/i)).toBeInTheDocument();
  });

  it('handles add to cart', () => {
    mockUseSelector.mockReturnValue(mockProducts);
    renderWithProviders(<ProductListings />);

    const addButtons = screen.getAllByRole('button', { name: /add to cart/i });
    fireEvent.click(addButtons[0]);
    expect(mockDispatch).toHaveBeenCalledWith(addToCart(mockProducts.items[0]));
  });

  it('displays product details correctly', () => {
    mockUseSelector.mockReturnValue(mockProducts);
    renderWithProviders(<ProductListings />);

    mockProducts.items.forEach(product => {
      const productElement = screen.getByText(product.name).closest('[data-testid="product-item"]');
      expect(productElement).toBeInTheDocument();
      expect(screen.getByText(`$${product.price}`)).toBeInTheDocument();
      expect(screen.getByText(product.description)).toBeInTheDocument();
    });
  });
});
