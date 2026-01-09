// main.jsx
import React from 'react';
import { createRoot } from 'react-dom/client';

createRoot(document.getElementById('root')).render(
  <div style={{ padding: '40px', textAlign: 'center', fontSize: '24px' }}>
    <h1>Главный экран работает!</h1>
    <p>Если видишь это — рендер работает.</p>
  </div>
);