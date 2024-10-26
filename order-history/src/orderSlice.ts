import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: number;
  date: string;
  products: Product[];
  total: number;
}

interface OrderState {
  orders: Order[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: OrderState = {
  orders: [],
  status: 'idle',
  error: null,
};

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {
  // In a real app, this would be an API call
  const response = await new Promise<Order[]>((resolve) =>
    setTimeout(() => resolve([
      {
        id: 1,
        date: '2023-04-15',
        products: [
          { id: 1, name: 'Product 1', price: 19.99, quantity: 2 },
          { id: 2, name: 'Product 2', price: 29.99, quantity: 1 },
        ],
        total: 69.97,
      },
      {
        id: 2,
        date: '2023-04-20',
        products: [
          { id: 3, name: 'Product 3', price: 39.99, quantity: 1 },
        ],
        total: 39.99,
      },
    ]), 1000)
  );
  return response;
});

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOrders.fulfilled, (state, action: PayloadAction<Order[]>) => {
        state.status = 'succeeded';
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch orders';
      });
  },
});

export default orderSlice.reducer;
