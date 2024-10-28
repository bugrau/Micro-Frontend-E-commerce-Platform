import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const Navigation: React.FC = () => {
  return (
    <Nav>
      <NavContainer>
        <NavList>
          <NavItem>
            <StyledNavLink 
              to="/" 
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              Products
            </StyledNavLink>
          </NavItem>
          <NavItem>
            <StyledNavLink 
              to="/cart" 
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              Cart
            </StyledNavLink>
          </NavItem>
          <NavItem>
            <StyledNavLink 
              to="/auth" 
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              Login
            </StyledNavLink>
          </NavItem>
          <NavItem>
            <StyledNavLink 
              to="/orders" 
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              Orders
            </StyledNavLink>
          </NavItem>
        </NavList>
      </NavContainer>
    </Nav>
  );
};

const Nav = styled.nav`
  background-color: #ffffff;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const NavList = styled.ul`
  list-style: none;
  display: flex;
  gap: 1rem;
  margin: 0;
  padding: 0;
  justify-content: center;
`;

const NavItem = styled.li`
  position: relative;
`;

const StyledNavLink = styled(NavLink)`
  color: #64748b;
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.2s;
  display: block;

  &:hover {
    color: #2563eb;
    background-color: #eff6ff;
  }

  &.active {
    color: #2563eb;
    background-color: #eff6ff;
    font-weight: 600;

    &::after {
      transform: scaleX(1);
    }
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: #2563eb;
    transform: scaleX(0);
    transition: transform 0.2s;
  }
`;

export default Navigation;


















