declare module 'product-listings/ProductListings' {
  const ProductListings: React.ComponentType;
  export default ProductListings;
}

declare module 'product-listings/productSlice' {
  import { Reducer } from '@reduxjs/toolkit';
  const productReducer: Reducer;
  export default productReducer;
}
