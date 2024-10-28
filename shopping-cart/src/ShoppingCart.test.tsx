import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import ShoppingCart from './ShoppingCart';
import { mockUseSelector, mockDispatch } from '../../jest.setup';

const mockStore = configureStore([]);

// Update mock to use actions
jest.mock('./cartSlice', () => ({
  actions: {
    removeFromCart: (id: number) => ({ type: 'cart/removeFromCart', payload: id }),
    updateQuantity: (data: { id: number; quantity: number }) => ({ type: 'cart/updateQuantity', payload: data }),
    clearCart: () => ({ type: 'cart/clearCart' })
  }
}));

describe('ShoppingCart', () => {
  const mockItems = [
    { id: 1, name: 'Item 1', price: 10, quantity: 2, imageUrl: 'test.jpg', stock: 5 },
    { id: 2, name: 'Item 2', price: 20, quantity: 1, imageUrl: 'test.jpg', stock: 3 },
  ];

  beforeEach(() => {
    mockUseSelector.mockClear();
    mockDispatch.mockClear();
  });

  it('renders cart items', () => {
    mockUseSelector.mockReturnValue({ items: mockItems });
    render(
      <Provider store={mockStore({})}>
        <ShoppingCart />
      </Provider>
    );

    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });

  it('displays correct total price', () => {
    mockUseSelector.mockReturnValue({ items: mockItems });
    render(
      <Provider store={mockStore({})}>
        <ShoppingCart />
      </Provider>
    );

    expect(screen.getByTestId('cart-total')).toHaveTextContent('$40');
  });

  it('handles item removal', () => {
    mockUseSelector.mockReturnValue({ items: mockItems });
    render(
      <Provider store={mockStore({})}>
        <ShoppingCart />
      </Provider>
    );

    const removeButtons = screen.getAllByRole('button', { name: /remove/i });
    fireEvent.click(removeButtons[0]);
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'cart/removeFromCart', payload: 1 });
  });

  it('handles quantity updates', () => {
    mockUseSelector.mockReturnValue({ items: mockItems });
    render(
      <Provider store={mockStore({})}>
        <ShoppingCart />
      </Provider>
    );

    const quantityInputs = screen.getAllByRole('spinbutton');
    fireEvent.change(quantityInputs[0], { target: { value: '3' } });
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'cart/updateQuantity', payload: { id: 1, quantity: 3 } });
  });

  it('handles cart clearing', () => {
    mockUseSelector.mockReturnValue({ items: mockItems });
    render(
      <Provider store={mockStore({})}>
        <ShoppingCart />
      </Provider>
    );

    fireEvent.click(screen.getByRole('button', { name: /clear cart/i }));
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'cart/clearCart' });
  });

  it('displays empty cart message when no items', () => {
    mockUseSelector.mockReturnValue({ items: [] });
    render(
      <Provider store={mockStore({})}>
        <ShoppingCart />
      </Provider>
    );

    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
  });
});
