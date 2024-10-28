import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from './store';
import OrderHistory from './OrderHistory';

const Navigation = React.lazy(() => import('navigation/Navigation'));

export const mount = (el: HTMLElement) => {
  const root = createRoot(el);

  root.render(
    <Provider store={store}>
      <BrowserRouter>
        <React.Suspense fallback={<div>Loading...</div>}>
          <Navigation />
          <main style={{ padding: '20px' }}>
            <OrderHistory />
          </main>
        </React.Suspense>
      </BrowserRouter>
    </Provider>
  );

  return () => {
    root.unmount();
  };
};

if (process.env.NODE_ENV === 'development') {
  const devRoot = document.getElementById('root');
  if (devRoot) {
    mount(devRoot);
  }
}

export default mount;
