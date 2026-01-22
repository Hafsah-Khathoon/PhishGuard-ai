import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

window.onerror = function(message, source, lineno, colno, error) {
  console.error("PhishGuard Global Error:", message, "at", source, lineno, colno);
  // Show error in UI for debugging
  const errorDiv = document.createElement('div');
  errorDiv.innerHTML = `
    <div style="color: #ef4444; padding: 20px; font-family: monospace; background: #1e293b; border: 1px solid #ef4444; margin: 20px;">
      <h3>PhishGuard Loading Error:</h3>
      <p>${message}</p>
      <p>Source: ${source}:${lineno}:${colno}</p>
      <p>Please check the browser console for more details.</p>
    </div>
  `;
  document.body.appendChild(errorDiv);
};

const rootElement = document.getElementById('root');
if (rootElement) {
  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (error) {
    console.error("Failed to render React app:", error);
    rootElement.innerHTML = `
      <div style="color: #ef4444; padding: 40px; text-align: center; font-family: monospace; background: #020617;">
        <h2>PhishGuard AI - Loading Error</h2>
        <p>Failed to initialize the application.</p>
        <p>Error: ${error}</p>
        <p>Please refresh the page or check the browser console.</p>
      </div>
    `;
  }
} else {
  console.error("Critical Error: Root element not found.");
  document.body.innerHTML = `
    <div style="color: #ef4444; padding: 40px; text-align: center; font-family: monospace; background: #020617;">
      <h2>PhishGuard AI - Critical Error</h2>
      <p>Root element not found in DOM.</p>
    </div>
  `;
}