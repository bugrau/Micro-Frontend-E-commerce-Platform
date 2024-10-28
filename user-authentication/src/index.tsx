import React from 'react';

import { createRoot } from 'react-dom/client';

import { Provider } from 'react-redux';

import { store } from './store';

import UserAuthentication from './UserAuthentication';

import { login } from './authSlice';

import './styles.css';



// If you need to check for existing auth on startup

const token = localStorage.getItem('token');

if (token) {

  // Instead of dispatching login directly, create a separate action

  // or handle the initial auth state differently

  store.dispatch({ type: 'auth/setInitialState', payload: { token } });

}



const container = document.getElementById('root');

const root = createRoot(container!);



root.render(

  <Provider store={store}>

    <UserAuthentication />

  </Provider>

);


