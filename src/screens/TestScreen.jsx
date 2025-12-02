// src/screens/TestScreen.jsx — скрепка + надпись

import React from 'react'

export default function TestScreen() {
  const handleFileSelect = (e) => {
    const files = e.target.files
    if (files.length > 0) {
      alert(`Выбрано файлов: ${files.length}`)
      // Здесь потом будем обрабатывать вложения
    }
  }

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#f8f9fa',
      fontFamily: 'system-ui, sans-serif',
      gap: '40px',
      padding: '20px'
    }}>
      <h1 style={{
        fontSize: '36px',
        fontWeight: 'bold',
        color: '#333',
        margin: 0
      }}>
        тестировщик работает
      </h1>

      {/* Скрепка — большая и кликабельная */}
      <label style={{
        fontSize: '120px',
        cursor: 'pointer',
        transition: 'transform 0.2s',
        userSelect: 'none'
      }}
      onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
      onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
      >
        📎
        <input
          type="file"
          multiple
          accept="image/*,video/*,.pdf,.doc,.docx,.txt"
          onChange={handleFileSelect}
          style={{ display: 'none' }}
        />
      </label>

      <p style={{
        fontSize: '18px',
        color: '#666',
        margin: 0
      }}>
        Нажми на скрепку — прикрепи файл
      </p>
    </div>
  )
}