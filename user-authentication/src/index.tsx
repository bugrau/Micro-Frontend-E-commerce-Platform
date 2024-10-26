import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import UserAuthentication from './UserAuthentication';
import { loginSuccess } from './authSlice';

// Initialize localStorage if needed
const token = localStorage.getItem('authToken');
const email = localStorage.getItem('userEmail');
if (token && email) {
  store.dispatch(loginSuccess({ email, token }));
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <UserAuthentication />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
