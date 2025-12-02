// src/App.jsx — показываем версию тестировщика
import React from 'react'
import TestScreen from './screens/TestScreen.jsx'
import { APP_VERSION } from './utils/constants.js'

export default function App() {
  return (
    <div style={{ position: 'relative', minHeight: '100dvh' }}>
      {/* Версия в левом верхнем углу */}
      <div style={{
        position: 'absolute',
        top: 10,
        left: 10,
        fontSize: '12px',
        color: '#888',
        zIndex: 9999,
        background: 'rgba(255,255,255,0.8)',
        padding: '4px 8px',
        borderRadius: '4px'
      }}>
        {APP_VERSION}
      </div>

      <TestScreen />
    </div>
  )
}