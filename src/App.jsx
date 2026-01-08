// App.jsx — полный исправленный код (с сохранением скролла через localStorage)

import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import TestMainScreen from './screens/TestMainScreen.jsx';
import TestDetailScreen from './screens/TestDetailScreen.jsx';

export default function App() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const navigate = useNavigate();

  return (
    <Routes>
      <Route path="/" element={<TestMainScreen scrollPosition={scrollPosition} setScrollPosition={setScrollPosition} />} />
      <Route path="/detail/:id" element={<TestDetailScreen onBack={() => navigate('/')} />} />
    </Routes>
  );
}