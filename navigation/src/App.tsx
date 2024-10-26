import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { useSelector } from 'react-redux';

import { RootState } from './store';

import Navigation from './Navigation';

import ErrorMessage from '../../common/components/ErrorMessage';



// Import micro-frontends

const ProductListings = React.lazy(() => import('product-listings/ProductListings'));

const ShoppingCart = React.lazy(() => import('shopping-cart/ShoppingCart'));

const UserAuthentication = React.lazy(() => import('user-authentication/UserAuthentication'));

const OrderHistory = React.lazy(() => import('order-history/OrderHistory'));



const App: React.FC = () => {

  const globalError = useSelector((state: RootState) => state.app.globalError);



  return (

    <Router>

      <React.Suspense fallback={<div>Loading...</div>}>

        {globalError && <ErrorMessage message={globalError} />}

        <Routes>

          <Route path="/" element={<Navigation />}>

            <Route index element={<ProductListings />} />

            <Route path="cart" element={<ShoppingCart />} />

            <Route path="auth" element={<UserAuthentication />} />

            <Route path="orders" element={<OrderHistory />} />

          </Route>

        </Routes>

      </React.Suspense>

    </Router>

  );

};



export default App;



