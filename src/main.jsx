import React from 'react';
import { createRoot } from 'react-dom/client';
import TestMailScreen from './screens/TestMailScreen.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TestMailScreen />
  </React.StrictMode>
);