import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import ProductListings from './ProductListings';

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <ProductListings />
      </Provider>
    </React.StrictMode>,
    rootElement
  );
}
