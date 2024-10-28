import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import ShoppingCart from './ShoppingCart';

const mount = async (el: HTMLElement) => {
  const root = createRoot(el);
  
  root.render(
    <Provider store={store}>
      <ShoppingCart />
    </Provider>
  );

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
