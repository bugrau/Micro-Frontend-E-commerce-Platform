declare module 'shopping-cart/ShoppingCart' {
  const ShoppingCart: React.ComponentType;
  export default ShoppingCart;
}

declare module 'shopping-cart/cartSlice' {
  import { Reducer } from '@reduxjs/toolkit';
  const cartReducer: Reducer;
  export default cartReducer;
}
