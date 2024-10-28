import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/common.css';

let root: ReturnType<typeof createRoot> | null = null;

export const initializeApp = async (): Promise<void> => {
  try {
    // Initialize shared scope
    // @ts-ignore
    await __webpack_init_sharing__('default');

    const container = document.getElementById('root');
    if (!container) {
      throw new Error('Root element not found');
    }

    if (root) {
      root.unmount();
    }

    root = createRoot(container);
    root.render(<App />);
  } catch (error) {
    console.error('Failed to initialize app:', error);
    const container = document.getElementById('root');
    if (container) {
      container.innerHTML = `
        <div style="color: #dc2626; padding: 2rem; text-align: center;">
          Failed to initialize application. Please refresh the page.
        </div>
      `;
    }
    throw error;
  }
};

// Handle hot module replacement
if (module.hot) {
  module.hot.accept('./App', () => {
    console.log('Hot reloading App component');
    initializeApp();
  });
}


