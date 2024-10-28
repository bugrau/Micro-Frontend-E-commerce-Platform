import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'completed' | 'cancelled';
}

interface OrderState {
  orders: Order[];
  isLoading: boolean;
  error: string | null;
}

// Mock data with new product images
const mockOrders: Order[] = [
  {
    id: 'ORD-2024-001',
    date: '2024-03-15',
    items: [
      {
        id: 'PROD-001',
        name: 'MacBook Pro M2',
        price: 1499.99,
        quantity: 1,
        image: 'https://images.pexels.com/photos/303383/pexels-photo-303383.jpeg?auto=compress&cs=tinysrgb&w=800'
      },
      {
        id: 'PROD-002',
        name: 'AirPods Pro',
        price: 249.99,
        quantity: 2,
        image: 'https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=800'
      }
    ],
    total: 1999.97,
    status: 'completed'
  },
  {
    id: 'ORD-2024-002',
    date: '2024-03-10',
    items: [
      {
        id: 'PROD-003',
        name: 'iPhone 15 Pro',
        price: 999.99,
        quantity: 1,
        image: 'https://images.pexels.com/photos/5741605/pexels-photo-5741605.jpeg?auto=compress&cs=tinysrgb&w=800'
      }
    ],
    total: 999.99,
    status: 'completed'
  },
  {
    id: 'ORD-2024-003',
    date: '2024-03-20',
    items: [
      {
        id: 'PROD-004',
        name: 'Apple Watch Series 9',
        price: 399.99,
        quantity: 1,
        image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=800'
      },
      {
        id: 'PROD-005',
        name: 'MagSafe Charger',
        price: 39.99,
        quantity: 2,
        image: 'https://images.pexels.com/photos/4526407/pexels-photo-4526407.jpeg?auto=compress&cs=tinysrgb&w=800'
      }
    ],
    total: 479.97,
    status: 'pending'
  }
];

const initialState: OrderState = {
  orders: mockOrders,
  isLoading: false,
  error: null
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    fetchOrdersStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchOrdersSuccess: (state, action: PayloadAction<Order[]>) => {
      state.orders = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    fetchOrdersFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    }
  }
});

export const { fetchOrdersStart, fetchOrdersSuccess, fetchOrdersFailure } = orderSlice.actions;
export type { OrderState };
export default orderSlice.reducer;
