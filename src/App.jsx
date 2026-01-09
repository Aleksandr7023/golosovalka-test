// App.jsx
import React from 'react';
import { Routes, Route, ScrollRestoration } from 'react-router-dom';
import MainScreen from './screens/MainScreen.jsx';

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainScreen />} />
      </Routes>
      <ScrollRestoration />
    </>
  );
}