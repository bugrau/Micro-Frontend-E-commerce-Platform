import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// Define Product interface
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  stock: number;
}

// Define the state interface
export interface ProductsState {
  items: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  filters: {
    category: string | null;
    minPrice: number | null;
    maxPrice: number | null;
    sortBy: 'price-asc' | 'price-desc' | 'name' | null;
  };
}

// Initial state
const initialState: ProductsState = {
  items: [],
  status: 'idle',
  error: null,
  filters: {
    category: null,
    minPrice: null,
    maxPrice: null,
    sortBy: null
  }
};

// Mock API call
const mockProducts: Product[] = [
  {
    id: 1,
    name: "Laptop",
    description: "High-performance laptop",
    price: 999.99,
    category: "Electronics",
    imageUrl: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop",
    stock: 10
  },
  {
    id: 2,
    name: "Smartphone",
    description: "Latest smartphone",
    price: 699.99,
    category: "Electronics",
    imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop",
    stock: 15
  },
  {
    id: 3,
    name: "Headphones",
    description: "Wireless noise-canceling headphones",
    price: 299.99,
    category: "Electronics",
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
    stock: 20
  },
  {
    id: 4,
    name: "Smartwatch",
    description: "Fitness tracking smartwatch",
    price: 199.99,
    category: "Electronics",
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop",
    stock: 25
  }
];

// Async thunk for fetching products
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    // Simulating API call
    return new Promise<Product[]>((resolve) => {
      setTimeout(() => {
        resolve(mockProducts);
      }, 1000);
    });
  }
);

// Create the slice
const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<Partial<ProductsState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch products';
      });
  }
});

// Export actions and reducer
export const { setFilter, clearFilters } = productsSlice.actions;
export default productsSlice.reducer;

// Selector to get filtered products
export const selectFilteredProducts = (state: { products: ProductsState }) => {
  const { items, filters } = state.products;
  let filteredItems = [...items];

  // Apply filters
  if (filters.category) {
    filteredItems = filteredItems.filter(item => item.category === filters.category);
  }

  if (filters.minPrice !== null) {
    filteredItems = filteredItems.filter(item => item.price >= filters.minPrice!);
  }
  if (filters.maxPrice !== null) {
    filteredItems = filteredItems.filter(item => item.price <= filters.maxPrice!);
  }

  // Apply sorting
  if (filters.sortBy) {
    filteredItems.sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });
  }

  return filteredItems;
};
