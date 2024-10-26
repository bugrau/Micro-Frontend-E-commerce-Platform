import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import OrderHistory from './OrderHistory';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <OrderHistory />
    </Provider>
  </React.StrictMode>,
  document.getElementById('order-history-root')
);
