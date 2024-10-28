declare module 'order-history/OrderHistory' {
  const OrderHistory: React.ComponentType;
  export default OrderHistory;
}

declare module 'order-history/orderSlice' {
  import { Reducer } from '@reduxjs/toolkit';
  const orderReducer: Reducer;
  export default orderReducer;
}
