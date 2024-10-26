// Note: Using a different name for the imported type
import type { Product as ProductInterface } from '../productsSlice';

export const fetchProducts = jest.fn();
export const addToCart = jest.fn();

export const initialState = {
  items: [] as ProductInterface[],
  status: 'idle' as const,
  error: null as string | null
};
