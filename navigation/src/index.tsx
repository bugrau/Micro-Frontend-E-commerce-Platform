import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './App';
import './styles/common.css';

// Initialize the application
const initializeApp = async () => {
  try {
    const { initializeApp: init } = await import('./bootstrap');
    await init();
  } catch (error: unknown) {
    console.error('Failed to mount application:', error instanceof Error ? error.message : 'Unknown error');
    // Show error UI to user
    const root = document.getElementById('root');
    if (root) {
      root.innerHTML = `
        <div style="color: #e74c3c; padding: 20px; text-align: center;">
          Failed to load application. Please try refreshing the page.
        </div>
      `;
    }
  }
};

initializeApp();
