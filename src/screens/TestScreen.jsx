// src/screens/TestScreen.jsx — полигон вложений (работает 100%)

import React, { useState } from 'react'

export default function TestScreen() {
  const [attachments, setAttachments] = useState([])
  const [viewerFile, setViewerFile] = useState(null)

  const handleFiles = (e) => {
    const files = Array.from(e.target.files)
    const valid = files.filter(f => f.size <= 50 * 1024 * 1024)

    if (files.length !== valid.length) {
      alert('Файлы > 50 МБ запрещены')
    }

    if (attachments.length + valid.length > 3) {
      alert('Максимум 3 вложения')
    } else {
      setAttachments(prev => [...prev, ...valid].slice(0, 3))
      setViewerFile(null)
    }
  }

  const removeAttachment = (i) => {
    setAttachments(prev => prev.filter((_, idx) => idx !== i))
    if (viewerFile && viewerFile.file === attachments[i]) {
      URL.revokeObjectURL(viewerFile.url)
      setViewerFile(null)
    }
  }

  const openFile = (file) => {
    const url = URL.createObjectURL(file)
    setViewerFile({ url, file })
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
      gap: '30px',
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

      <label style={{
        fontSize: '100px',
        cursor: 'pointer',
        transition: 'transform 0.2s'
      }}
      onMouseEnter={e => e.target.style.transform = 'scale(1.1)'}
      onMouseLeave={e => e.target.style.transform = 'scale(1)'}
      >
        📎
        <input
          type="file"
          multiple
          accept="image/*,video/*,.pdf,.doc,.docx,.txt"
          onChange={handleFiles}
          style={{ display: 'none' }}
        />
      </label>

      <p style={{ fontSize: '18px', color: '#666', margin: 0 }}>
        Прикрепи до 3 файлов
      </p>

      {attachments.length > 0 && (
        <div style={{
          display: 'flex',
          gap: '16px',
          flexWrap: 'wrap',
          justifyContent: 'center',
          maxWidth: '90%'
        }}>
          {attachments.map((file, i) => (
            <div key={i} style={{ position: 'relative' }}>
              <div
                onClick={() => openFile(file)}
                style={{
                  width: '100px',
                  height: '100px',
                  background: '#ddd',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontSize: '14px',
                  textAlign: 'center',
                  padding: '8px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  transition: 'transform 0.2s'
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              >
                {file.type.startsWith('image/') ? 'Фото' :
                 file.type.startsWith('video/') ? 'Видео' :
                 file.name.split('.').pop().toUpperCase()}
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  removeAttachment(i)
                }}
                style={{
                  position: 'absolute',
                  top: '-10px',
                  right: '-10px',
                  background: '#ff4d4d',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  width: '30px',
                  height: '30px',
                  fontSize: '18px',
                  cursor: 'pointer'
                }}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      {viewerFile && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: '#000',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column'
        }}>
          <button
            onClick={() => {
              URL.revokeObjectURL(viewerFile.url)
              setViewerFile(null)
            }}
            style={{
              alignSelf: 'flex-end',
              background: 'none',
              border: 'none',
              color: 'white',
              fontSize: '40px',
              padding: '20px',
              cursor: 'pointer'
            }}
          >
            ×
          </button>
          <div style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}>
            <iframe
              src={viewerFile.url}
              title={viewerFile.file.name}
              style={{ width: '100%', height: '100%', border: 'none' }}
              sandbox="allow-scripts allow-same-origin"
            />
          </div>
        </div>
      )}
    </div>
  )
}