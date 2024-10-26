import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from './store';

export interface AuthState {
  user: { email: string; token: string } | null;
  error: string | null;
  isLoading: boolean;
}

// Load initial state from localStorage
const loadInitialState = (): AuthState => {
  const token = localStorage.getItem('authToken');
  const email = localStorage.getItem('userEmail');
  return {
    user: token && email ? { email, token } : null,
    error: null,
    isLoading: false
  };
};

const authSlice = createSlice({
  name: 'auth',
  initialState: loadInitialState(),
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<{ email: string; token: string }>) => {
      state.isLoading = false;
      state.user = action.payload;
      state.error = null;
      // Update localStorage
      localStorage.setItem('authToken', action.payload.token);
      localStorage.setItem('userEmail', action.payload.email);
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
      // Clear localStorage on failure
      localStorage.removeItem('authToken');
      localStorage.removeItem('userEmail');
    },
    logout: (state) => {
      state.user = null;
      state.error = null;
      // Clear localStorage on logout
      localStorage.removeItem('authToken');
      localStorage.removeItem('userEmail');
    },
    clearError: (state) => {
      state.error = null;
    }
  }
});

export const { loginStart, loginSuccess, loginFailure, logout, clearError } = authSlice.actions;

// Async action creators
export const login = (credentials: { email: string; password: string }) => 
  async (dispatch: AppDispatch): Promise<void> => {
    try {
      dispatch(loginStart());
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      dispatch(loginSuccess({ email: credentials.email, token: 'fake-token' }));
    } catch (error) {
      dispatch(loginFailure(error instanceof Error ? error.message : 'Login failed'));
    }
  };

export const register = (credentials: { email: string; password: string }) => 
  async (dispatch: AppDispatch): Promise<void> => {
    try {
      dispatch(loginStart());
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      dispatch(loginSuccess({ email: credentials.email, token: 'fake-token' }));
    } catch (error) {
      dispatch(loginFailure(error instanceof Error ? error.message : 'Registration failed'));
    }
  };

export default authSlice.reducer;
