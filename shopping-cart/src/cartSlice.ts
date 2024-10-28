import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the Product type locally to avoid circular dependencies
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  stock: number;
}

export interface CartItem extends Product {
  quantity: number;
}

interface NotificationState {
  message: string;
  type: 'success' | 'error' | null;
}

export interface CartState {
  items: CartItem[];
  loading: boolean;
  error: string | null;
  notification: NotificationState | null;
}

// Add mock products
const mockItems: CartItem[] = [
  {
    id: 1,
    name: "Laptop",
    description: "High-performance laptop",
    price: 999.99,
    category: "Electronics",
    imageUrl: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop",
    stock: 10,
    quantity: 1
  },
  {
    id: 2,
    name: "Smartphone",
    description: "Latest smartphone",
    price: 699.99,
    category: "Electronics",
    imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop",
    stock: 15,
    quantity: 2
  },
  {
    id: 3,
    name: "Headphones",
    description: "Wireless noise-canceling headphones",
    price: 299.99,
    category: "Electronics",
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
    stock: 20,
    quantity: 1
  }
];

const initialState: CartState = {
  items: mockItems, // Add mock items to initial state
  loading: false,
  error: null,
  notification: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      try {
        const existingItem = state.items.find(item => item.id === action.payload.id);
        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          state.items.push({ ...action.payload, quantity: 1 });
        }
        state.notification = {
          message: `${action.payload.name} added to cart`,
          type: 'success'
        };
      } catch (error) {
        state.error = 'Failed to add item to cart';
        state.notification = {
          message: 'Failed to add item to cart',
          type: 'error'
        };
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      try {
        const item = state.items.find(item => item.id === action.payload);
        state.items = state.items.filter(item => item.id !== action.payload);
        state.notification = {
          message: item ? `${item.name} removed from cart` : 'Item removed from cart',
          type: 'success'
        };
      } catch (error) {
        state.error = 'Failed to remove item from cart';
        state.notification = {
          message: 'Failed to remove item from cart',
          type: 'error'
        };
      }
    },
    updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      try {
        const item = state.items.find(item => item.id === action.payload.id);
        if (item) {
          item.quantity = Math.max(1, action.payload.quantity);
          state.notification = {
            message: `${item.name} quantity updated`,
            type: 'success'
          };
        }
      } catch (error) {
        state.error = 'Failed to update quantity';
        state.notification = {
          message: 'Failed to update quantity',
          type: 'error'
        };
      }
    },
    clearCart: (state) => {
      try {
        state.items = [];
        state.notification = {
          message: 'Cart cleared',
          type: 'success'
        };
      } catch (error) {
        state.error = 'Failed to clear cart';
        state.notification = {
          message: 'Failed to clear cart',
          type: 'error'
        };
      }
    },
    clearNotification: (state) => {
      state.notification = null;
    }
  }
});

// Export all actions under a single namespace
export const shoppingCartActions = cartSlice.actions;

// Export individual actions as needed
export const { clearNotification } = shoppingCartActions;

// Export the reducer
export const cartReducer = cartSlice.reducer;
