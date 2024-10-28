import React, { Suspense, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store, initializeStore } from './store';
import Navigation from './Navigation';
import ErrorBoundary from './ErrorBoundary';
import styled from 'styled-components';

// Create a FallbackError component in case module loading fails
const FallbackError: React.FC = () => (
  <ErrorMessage>
    Failed to load module. Please try refreshing the page.
  </ErrorMessage>
);

// Lazy load components with better error handling
const ProductListings = React.lazy(() => 
  import('product-listings/ProductListings')
    .catch(() => ({ default: FallbackError }))
);

const ShoppingCart = React.lazy(() => 
  import('shopping-cart/ShoppingCart')
    .catch(() => ({ default: FallbackError }))
);

const UserAuthentication = React.lazy(() => 
  import('user-authentication/UserAuthentication')
    .catch(() => ({ default: FallbackError }))
);

const OrderHistory = React.lazy(() => 
  import('order-history/OrderHistory')
    .catch(() => ({ default: FallbackError }))
);

const App = () => {
  const [appStore, setAppStore] = useState<any>(store);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;

    const initStore = async () => {
      try {
        const initializedStore = await initializeStore();
        if (mounted) {
          setAppStore(initializedStore);
          setIsLoading(false);
        }
      } catch (err) {
        console.error('Store initialization failed:', err);
        if (mounted) {
          setError(err instanceof Error ? err : new Error('Failed to initialize store'));
          setIsLoading(false);
        }
      }
    };

    initStore();

    return () => {
      mounted = false;
    };
  }, []);

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorMessage>Failed to initialize application. Please refresh the page.</ErrorMessage>;
  }

  return (
    <Provider store={appStore}>
      <BrowserRouter>
        <AppContainer>
          <ErrorBoundary>
            <Navigation />
            <MainContent>
              <Suspense fallback={<LoadingState />}>
                <Routes>
                  <Route path="/" element={<ProductListings />} />
                  <Route path="/cart" element={<ShoppingCart />} />
                  <Route path="/auth" element={<UserAuthentication />} />
                  <Route path="/orders" element={<OrderHistory />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </Suspense>
            </MainContent>
          </ErrorBoundary>
        </AppContainer>
      </BrowserRouter>
    </Provider>
  );
};

const AppContainer = styled.div`
  min-height: 100vh;
  background-color: #f8fafc;
`;

const MainContent = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  min-height: calc(100vh - 80px); // Adjust based on Navigation height
`;

const LoadingState = () => (
  <LoadingContainer>
    <LoadingSpinner>
      <div className="spinner"></div>
      Loading...
    </LoadingSpinner>
  </LoadingContainer>
);

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
`;

const LoadingSpinner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #64748b;
  font-size: 1.1rem;
  gap: 1rem;

  .spinner {
    width: 40px;
    height: 40px;
    border: 3px solid #f3f3f3;
    border-top: 3px solid #2563eb;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const ErrorMessage = styled.div`
  color: #dc2626;
  padding: 2rem;
  text-align: center;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 2rem;
`;

export default App;
