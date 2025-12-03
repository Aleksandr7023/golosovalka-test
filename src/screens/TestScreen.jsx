// src/screens/TestScreen.jsx — v2.096 — .docx работает, стили внутри

import React, { useState } from 'react'
import mammoth from 'mammoth'

export default function TestScreen() {
  const [attachments, setAttachments] = useState([])
  const [viewerFile, setViewerFile] = useState(null)

  const handleFiles = (e) => {
    const files = Array.from(e.target.files)
    const valid = files.filter(f => f.size <= 50 * 1024 * 1024)

    if (files.length !== valid.length) alert('Файлы > 50 МБ запрещены')
    if (attachments.length + valid.length > 3) alert('Максимум 3 вложения')
    else {
      setAttachments(prev => [...prev, ...valid].slice(0, 3))
      setViewerFile(null)
    }
  }

  const removeAttachment = (i) => {
    setAttachments(prev => prev.filter((_, idx) => idx !== i))
    if (viewerFile?.file === attachments[i]) {
      URL.revokeObjectURL(viewerFile.url)
      setViewerFile(null)
    }
  }

  const openFile = async (file) => {
    const url = URL.createObjectURL(file)

    if (file.name.endsWith('.docx') || file.name.endsWith('.doc')) {
      try {
        const arrayBuffer = await file.arrayBuffer()
        const result = await mammoth.convertToHtml({ arrayBuffer })
        setViewerFile({ url, file, html: result.value })
      } catch {
        setViewerFile({ url, file, html: '<p>Не удалось прочитать документ</p>' })
      }
    } else if (file.type === 'text/plain') {
      const text = await file.text()
      setViewerFile({ url, file, text })
    } else {
      setViewerFile({ url, file })
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
      gap: '30px',
      padding: '20px'
    }}>
      <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: '#333', margin: 0 }}>
        тестировщик работает
      </h1>

      <label style={{ fontSize: '100px', cursor: 'pointer' }}>
        📎
        <input
          type="file"
          multiple
          accept="image/*,video/*,.pdf,.doc,.docx,.txt"
          onChange={handleFiles}
          style={{ display: 'none' }}
        />
      </label>

      <p style={{ fontSize: '18px', color: '#666' }}>Прикрепи до 3 файлов</p>

      {attachments.length > 0 && (
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
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
                  padding: '8px'
                }}
              >
                {file.type.startsWith('image/') ? 'Фото' :
                 file.type.startsWith('video/') ? 'Видео' :
                 file.name.split('.').pop().toUpperCase()}
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); removeAttachment(i) }}
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
              >×</button>
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
          >×</button>

          <div style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}>
            {viewerFile.html ? (
              <div style={{
                background: 'white',
                color: 'black',
                padding: '30px',
                borderRadius: '16px',
                width: '95%',
                height: '90%',
                overflow: 'auto',
                fontSize: '16px',
                lineHeight: '1.6',
                boxShadow: '0 8px 32px rgba(0,0,0,0.6)'
              }} dangerouslySetInnerHTML={{ __html: viewerFile.html }} />
            ) : viewerFile.text ? (
              <div style={{
                background: 'white',
                color: 'black',
                padding: '30px',
                borderRadius: '16px',
                width: '95%',
                height: '90%',
                overflow: 'auto',
                fontFamily: 'monospace',
                fontSize: '16px',
                lineHeight: '1.6',
                boxShadow: '0 8px 32px rgba(0,0,0,0.6)'
              }}>
                <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{viewerFile.text}</pre>
              </div>
            ) : viewerFile.file.type.startsWith('image/') ? (
              <img src={viewerFile.url} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
            ) : viewerFile.file.type.startsWith('video/') ? (
              <video src={viewerFile.url} controls autoPlay style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
            ) : (
              <iframe src={viewerFile.url} title={viewerFile.file.name} style={{ width: '100%', height: '100%', border: 'none' }} />
            )}
          </div>
        </div>
      )}
    </div>
  )
}