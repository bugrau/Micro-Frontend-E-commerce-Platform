declare module 'product-listings/productSlice' {
  export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    category: string;
    imageUrl: string;
    stock: number;
  }
}

declare module 'product-listings/store' {
  import { Product } from 'product-listings/productSlice';
  
  export interface ProductsState {
    items: Product[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
  }

  export interface RootState {
    products: ProductsState;
  }
}

// Add cart-specific type declarations without declaring reducer
declare module 'shopping-cart/cartSlice' {
  import { Product } from 'product-listings/productSlice';

  export interface CartItem extends Product {
    quantity: number;
  }

  export interface CartState {
    items: CartItem[];
    loading: boolean;
    error: string | null;
    notification: {
      message: string;
      type: 'success' | 'error' | null;
    };
  }

  export const shoppingCartActions: {
    addToCart: (product: Product) => any;
    removeFromCart: (id: number) => any;
    updateQuantity: (data: { id: number; quantity: number }) => any;
    clearCart: () => any;
    clearNotification: () => any;
  };
}
