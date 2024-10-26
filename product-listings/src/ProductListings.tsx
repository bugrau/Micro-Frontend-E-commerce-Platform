import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { AppDispatch } from './store';
import { RootState } from './store';
import { fetchProducts, addToCart, Product } from './productsSlice';

const ProductListings: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items = [], status = 'idle', error = null } = useSelector((state: RootState) => state.products);

  React.useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  if (status === 'loading') {
    return <div data-testid="loading-spinner">Loading...</div>;
  }

  if (status === 'failed') {
    return <div>{error}</div>;
  }

  if (!items.length) {
    return <div>No products available</div>;
  }

  return (
    <div>
      <h2>Products</h2>
      <ul>
        {items.map((product: Product) => (
          <li key={product.id} data-testid="product-item">
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>${product.price}</p>
            <button onClick={() => dispatch(addToCart(product))}>Add to Cart</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductListings;
