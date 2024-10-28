import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import UserAuthentication from '../UserAuthentication';
import authReducer, { AuthState } from '../authSlice';

// Initial state matching the AuthState interface
const initialState: { auth: AuthState } = {
  auth: {
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null
  }
};

const store = configureStore({
  reducer: {
    auth: authReducer
  },
  preloadedState: initialState
});

describe('UserAuthentication', () => {
  it('renders login form by default', () => {
    render(
      <Provider store={store}>
        <UserAuthentication />
      </Provider>
    );

    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
  });

  it('switches to register form', () => {
    render(
      <Provider store={store}>
        <UserAuthentication />
      </Provider>
    );

    fireEvent.click(screen.getByText('Need an account? Register'));

    expect(screen.getByText('Register')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Name')).toBeInTheDocument();
  });

  it('shows loading state during authentication', () => {
    const loadingState: { auth: AuthState } = {
      auth: {
        user: null,
        token: null,
        isAuthenticated: false,
        loading: true,
        error: null
      }
    };

    const loadingStore = configureStore({
      reducer: { auth: authReducer },
      preloadedState: loadingState
    });

    render(
      <Provider store={loadingStore}>
        <UserAuthentication />
      </Provider>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('shows error message', () => {
    const errorState: { auth: AuthState } = {
      auth: {
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
        error: 'Invalid credentials'
      }
    };

    const errorStore = configureStore({
      reducer: { auth: authReducer },
      preloadedState: errorState
    });

    render(
      <Provider store={errorStore}>
        <UserAuthentication />
      </Provider>
    );

    expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
  });
});
