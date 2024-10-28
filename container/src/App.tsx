import React, { Suspense } from 'react';



import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';



import styled from 'styled-components';



import { Provider } from 'react-redux';



import { store } from './store';



// Lazy load micro-frontends



const ProductListings = React.lazy(() => import('productListings/ProductListings'));



const ShoppingCart = React.lazy(() => import('shoppingCart/ShoppingCart'));



const UserAuthentication = React.lazy(() => import('userAuthentication/UserAuthentication'));



const OrderHistory = React.lazy(() => import('orderHistory/OrderHistory'));



const Loading = () => <div>Loading...</div>;



const LoadingSpinner = styled.div`

  width: 100px;

  height: 100px;

  border-radius: 50%;

  background-color: #f0f0f0;

  animation: spin 2s linear infinite;

  @keyframes spin {

    0% {

      transform: rotate(0deg);

    }

    100% {

      transform: rotate(360deg);

    }

  }

`;



const Navigation = styled.nav`

  background-color: #333;

  padding: 1rem;

  display: flex;

  justify-content: space-between;

  align-items: center;

`;



const NavList = styled.ul`

  list-style: none;

  margin: 0;

  padding: 0;

  display: flex;

`;



const NavItem = styled.li`

  margin-right: 20px;

`;



const MainContent = styled.main`

  padding: 2rem;

`;



const App: React.FC = () => {



  return (



    <Provider store={store}>



      <Router>



        <Navigation>



          <NavList>



            <NavItem><Link to="/">Products</Link></NavItem>



            <NavItem><Link to="/cart">Cart</Link></NavItem>



            <NavItem><Link to="/auth">Login</Link></NavItem>



            <NavItem><Link to="/orders">Orders</Link></NavItem>



          </NavList>



        </Navigation>



        <MainContent>



          <Suspense fallback={<LoadingSpinner>Loading...</LoadingSpinner>}>>



            <Routes>



              <Route path="/" element={<ProductListings />} />



              <Route path="/cart" element={<ShoppingCart />} />



              <Route path="/auth" element={<UserAuthentication />} />



              <Route path="/orders" element={<OrderHistory />} />



            </Routes>



          </Suspense>



        </MainContent>



      </Router>



    </Provider>



  );



};



export default App;


