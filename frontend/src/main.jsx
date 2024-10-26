import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
// In your src/index.js or src/App.jsx
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap here
import './index.css'; // Add any custom CSS here


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
