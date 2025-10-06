import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/globals.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Register service worker only in production to avoid dev cache confusion
if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.getRegistrations().then(regs => {
      // Clean stale SWs not matching new path
      regs.forEach(r => { if (!r.active?.scriptURL.endsWith('/sw.js')) r.unregister(); });
    }).finally(() => {
      navigator.serviceWorker.register('/sw.js').catch(err => {
        console.warn('Service worker registration failed', err);
      });
    });
  });
}
