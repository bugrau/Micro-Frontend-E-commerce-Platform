import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from './store';

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

interface ProductsState {
  items: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProductsState = {
  items: [],
  status: 'idle',
  error: null
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    fetchProductsStart: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    fetchProductsSuccess: (state, action: PayloadAction<Product[]>) => {
      state.status = 'succeeded';
      state.items = action.payload;
      state.error = null;
    },
    fetchProductsFailure: (state, action: PayloadAction<string>) => {
      state.status = 'failed';
      state.error = action.payload;
    },
    addToCart: (state, action: PayloadAction<Product>) => {
      // This will be handled by the cart slice
    }
  }
});

export const { 
  fetchProductsStart, 
  fetchProductsSuccess, 
  fetchProductsFailure,
  addToCart 
} = productsSlice.actions;

export const fetchProducts = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(fetchProductsStart());
    // Simulate API call
    const response = await fetch('/api/products');
    const data = await response.json();
    dispatch(fetchProductsSuccess(data));
  } catch (error) {
    dispatch(fetchProductsFailure(error instanceof Error ? error.message : 'Failed to fetch products'));
  }
};

export default productsSlice.reducer;
