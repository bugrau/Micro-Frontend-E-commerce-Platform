import React, { Suspense } from 'react';
import Navigation from './Navigation';
import styled from 'styled-components';

interface SharedLayoutProps {
  children: React.ReactNode;
}

const SharedLayout: React.FC<SharedLayoutProps> = ({ children }) => {
  return (
    <LayoutContainer>
      <Navigation />
      <MainContent>
        <Suspense fallback={<LoadingSpinner>Loading...</LoadingSpinner>}>
          {children}
        </Suspense>
      </MainContent>
    </LayoutContainer>
  );
};

const LayoutContainer = styled.div`
  min-height: 100vh;
  background-color: #f8fafc;
`;

const MainContent = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
  color: #64748b;
`;

export default SharedLayout;
