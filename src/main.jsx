// main.jsx
import React from 'react';
import { createRoot } from 'react-dom/client'; // ← правильный импорт (функция createRoot)
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);