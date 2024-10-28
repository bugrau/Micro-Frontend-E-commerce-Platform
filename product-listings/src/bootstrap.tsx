import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import ProductListings from './ProductListings';

const mount = (el: HTMLElement) => {
  const root = createRoot(el);
  
  const init = async () => {
    try {
      root.render(
        <Provider store={store}>
          <ProductListings />
        </Provider>
      );
    } catch (err) {
      console.error('Error initializing product listings:', err);
    }
  };

  init();

  return () => {
    root.unmount();
  };
};

// Mount immediately for standalone development
if (process.env.NODE_ENV === 'development') {
  const devRoot = document.getElementById('root');
  if (devRoot) {
    mount(devRoot);
  }
}

export { mount };
