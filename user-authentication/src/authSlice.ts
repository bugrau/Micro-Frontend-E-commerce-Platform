import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';



// Types

export interface User {

  id: string;

  email: string;

  name: string;

}



export interface AuthState {

  user: User | null;

  token: string | null;

  isAuthenticated: boolean;

  loading: boolean;

  error: string | null;

}



// Initial state

const initialState: AuthState = {

  user: null,

  token: localStorage.getItem('token'),

  isAuthenticated: false,

  loading: false,

  error: null

};



// Mock user data

const mockUsers = [

  {

    id: '1',

    email: 'test@test.com',

    password: 'Test123!',

    name: 'Test User'

  }

];



// Mock authentication functions

const mockLogin = async (credentials: { email: string; password: string }) => {

  const user = mockUsers.find(u => u.email === credentials.email && u.password === credentials.password);

  if (!user) {

    throw new Error('Invalid credentials');

  }

  const token = `mock-jwt-${Date.now()}`;

  return { user: { id: user.id, email: user.email, name: user.name }, token };

};



const mockRegister = async (credentials: { email: string; password: string; name: string }) => {

  const exists = mockUsers.find(u => u.email === credentials.email);

  if (exists) {

    throw new Error('User already exists');

  }

  const newUser = {

    id: `${mockUsers.length + 1}`,

    ...credentials

  };

  mockUsers.push(newUser);

  const token = `mock-jwt-${Date.now()}`;

  return { user: { id: newUser.id, email: newUser.email, name: newUser.name }, token };

};



// Async thunks

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterCredentials extends LoginCredentials {
  name: string;
}

interface AuthResponse {
  user: User;
  token: string;
}

export const login = createAsyncThunk<AuthResponse, LoginCredentials>(
  'auth/login',
  async (credentials) => {
    return await mockLogin(credentials);
  }
);

export const registerUser = createAsyncThunk<AuthResponse, RegisterCredentials>(
  'auth/register',
  async (credentials) => {
    return await mockRegister(credentials);
  }
);





// Auth slice

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
    clearError: (state) => {
      state.error = null;
    }
  }
});

export const { logout, clearError } = authSlice.actions;

export default authSlice.reducer;
