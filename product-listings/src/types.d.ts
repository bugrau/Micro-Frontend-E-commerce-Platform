import '@testing-library/jest-dom';

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R;
      toHaveTextContent(text: string): R;
      toBeVisible(): R;
    }
  }
}

declare module 'shopping-cart/cartSlice' {
  import { Product } from './productSlice';
  
  export interface CartItem extends Product {
    quantity: number;
  }

  export const cartActions: {
    addToCart: (product: Product) => {
      type: string;
      payload: Product;
    };
    removeFromCart: (id: number) => {
      type: string;
      payload: number;
    };
    updateQuantity: (data: { id: number; quantity: number }) => {
      type: string;
      payload: { id: number; quantity: number };
    };
    clearCart: () => {
      type: string;
    };
  };

  const cartReducer: any;
  export default cartReducer;
}

declare module 'shopping-cart/store' {
  import { CartState } from 'shopping-cart/cartSlice';
  
  export interface RootState {
    cart: CartState;
  }
}
