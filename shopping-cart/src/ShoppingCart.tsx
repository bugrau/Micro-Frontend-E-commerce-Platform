import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './store';
import { removeFromCart, updateQuantity, clearCart } from './cartSlice';

const ShoppingCart: React.FC = () => {
  const dispatch = useDispatch();
  const { items: cartItems = [] } = useSelector((state: RootState) => state.cart);

  if (!cartItems || cartItems.length === 0) {
    return <div>Your cart is empty</div>;
  }

  const total = Array.isArray(cartItems) 
    ? cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    : 0;

  return (
    <div>
      <h2>Shopping Cart</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            <span>{item.name}</span>
            <span>${item.price}</span>
            <input
              type="number"
              min="1"
              value={item.quantity}
              onChange={(e) => dispatch(updateQuantity({ id: item.id, quantity: parseInt(e.target.value) }))}
            />
            <button onClick={() => dispatch(removeFromCart(item.id))}>Remove</button>
          </li>
        ))}
      </ul>
      <div data-testid="cart-total">Total: ${total}</div>
      <button onClick={() => dispatch(clearCart())}>Clear Cart</button>
    </div>
  );
};

export default ShoppingCart;
