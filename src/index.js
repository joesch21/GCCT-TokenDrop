import React from 'react';
import ReactDOM from 'react-dom/client'; // Use createRoot from react-dom/client
import App from './App';

const container = document.getElementById('root'); // Root element in your HTML
const root = ReactDOM.createRoot(container); // Create the root

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
