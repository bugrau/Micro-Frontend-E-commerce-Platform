import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './Navigation.css';

const Navigation: React.FC = () => {
  return (
    <div className="container">
      <nav className="main-nav">
        <ul>
          <li><Link to="/">Product Listings</Link></li>
          <li><Link to="/cart">Shopping Cart</Link></li>
          <li><Link to="/auth">User Authentication</Link></li>
          <li><Link to="/orders">Order History</Link></li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
};

export default Navigation;
