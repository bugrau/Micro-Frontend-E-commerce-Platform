import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from './store';
import { fetchOrders, Order } from './orderSlice';
import ErrorMessage from '../../common/components/ErrorMessage';

const OrderHistory: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { orders, status, error } = useSelector((state: RootState) => state.orders);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchOrders()).catch((err) => {
        console.error('Failed to fetch orders:', err);
      });
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <ErrorMessage message={error || 'An error occurred while fetching orders.'} />;
  }

  return (
    <div>
      <h1>Order History</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul>
          {orders.map((order: Order) => (
            <li key={order.id}>
              <h3>Order #{order.id}</h3>
              <p>Date: {new Date(order.date).toLocaleDateString()}</p>
              <ul>
                {order.products.map((product) => (
                  <li key={product.id}>
                    {product.name} - Quantity: {product.quantity} - ${product.price.toFixed(2)}
                  </li>
                ))}
              </ul>
              <p>Total: ${order.total.toFixed(2)}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderHistory;
