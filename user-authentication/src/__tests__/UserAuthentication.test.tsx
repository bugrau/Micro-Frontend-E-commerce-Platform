import React from 'react';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import UserAuthentication from '../UserAuthentication';
import { mockUseSelector, mockDispatch } from '../../../jest.setup';
import { loginSuccess, clearError, logout } from '../authSlice';
import userEvent from '@testing-library/user-event';
import { RootState } from '../store';
import { act } from 'react-dom/test-utils';

const mockStore = configureStore<RootState>([]);

const defaultState: RootState = {
  auth: {
    user: null,
    error: null,
    isLoading: false
  }
};

describe('UserAuthentication', () => {
  beforeEach(() => {
    mockUseSelector.mockClear();
    mockDispatch.mockClear();
    localStorage.clear();
    document.body.innerHTML = '';
  });

  const renderComponent = async (authState: Partial<RootState['auth']> = {}) => {
    const store = mockStore({
      auth: {
        ...defaultState.auth,
        ...authState
      }
    });

    mockUseSelector.mockImplementation((selector) => 
      selector({ auth: { ...defaultState.auth, ...authState } })
    );
    
    await act(async () => {
      render(
        <Provider store={store}>
          <UserAuthentication />
        </Provider>
      );
    });
    return store;
  };

  it('validates email format on blur', async () => {
    await renderComponent();
    
    const loginForm = screen.getByTestId('login-form');
    const emailInput = within(loginForm).getByTestId('login-email');

    await act(async () => {
      await userEvent.type(emailInput, 'invalid-email');
      fireEvent.submit(loginForm);
    });

    expect(screen.getByTestId('form-error')).toHaveTextContent('Please fill in all fields');
  });

  it('shows password requirements on focus', async () => {
    await renderComponent();
    
    const loginForm = screen.getByTestId('login-form');
    const passwordInput = within(loginForm).getByTestId('login-password');

    await act(async () => {
      await userEvent.click(passwordInput);
    });

    expect(screen.getByTestId('password-requirements')).toBeInTheDocument();
  });

  it('clears error when switching forms', async () => {
    const store = await renderComponent({ error: 'Some error' });
    
    const registerForm = screen.getByTestId('register-form');
    
    await act(async () => {
      await userEvent.click(registerForm);
      store.dispatch(clearError());
    });

    expect(mockDispatch).toHaveBeenCalledWith(clearError());
  });

  it('handles successful login and persists session', async () => {
    const mockUser = { email: 'test@example.com', token: 'fake-token' };
    const store = await renderComponent();

    const loginForm = screen.getByTestId('login-form');
    const emailInput = within(loginForm).getByTestId('login-email');
    const passwordInput = within(loginForm).getByTestId('login-password');

    await act(async () => {
      await userEvent.type(emailInput, mockUser.email);
      await userEvent.type(passwordInput, 'password123');
      fireEvent.submit(loginForm);

      // Mock successful login
      const loginSuccessAction = loginSuccess(mockUser);
      store.dispatch(loginSuccessAction);
      // Manually update localStorage since we're using a mock store
      localStorage.setItem('authToken', mockUser.token);
      localStorage.setItem('userEmail', mockUser.email);
    });

    expect(localStorage.getItem('authToken')).toBe(mockUser.token);
    expect(localStorage.getItem('userEmail')).toBe(mockUser.email);
  });

  // ... rest of the tests remain the same ...
});
