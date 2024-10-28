// Add empty export to make this file a module
export {};

// Initialize the shared scope
import('./bootstrap').catch(err => console.error('Error loading product listings:', err));



