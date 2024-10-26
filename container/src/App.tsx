import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import ErrorBoundary from './ErrorBoundary';

const ProductListings = React.lazy(() => import('productListings/ProductListings'));
const UserAuth = React.lazy(() => import('userAuth/UserAuth'));
const ShoppingCart = React.lazy(() => import('shoppingCart/ShoppingCart'));
const OrderHistory = React.lazy(() => import('orderHistory/OrderHistory'));

const App: React.FC = () => {
  return (
    <Router>
      <ErrorBoundary>
        <nav>
          <ul>
            <li><Link to="/">Products</Link></li>
            <li><Link to="/auth">Auth</Link></li>
            <li><Link to="/cart">Cart</Link></li>
            <li><Link to="/orders">Orders</Link></li>
          </ul>
        </nav>

        <React.Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path="/" component={ProductListings} />
            <Route path="/auth" component={UserAuth} />
            <Route path="/cart" component={ShoppingCart} />
            <Route path="/orders" component={OrderHistory} />
          </Switch>
        </React.Suspense>
      </ErrorBoundary>
    </Router>
  );
};

export default App;
