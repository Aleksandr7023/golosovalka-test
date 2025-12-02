// src/screens/TestScreen.jsx — ПОЛИГОН ВЛОЖЕНИЙ (финальная версия)

import React, { useState } from 'react'
import '../styles/screens/TestScreen.css'

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
    <div className="test-container">
      <h1 className="test-title">Полигон вложений</h1>

      {/* Скрепка */}
      <label className="attach-button">
        <input
          type="file"
          multiple
          accept="image/*,video/*,.pdf,.doc,.docx,.txt"
          onChange={handleFiles}
          style={{ display: 'none' }}
        />
        📎 Прикрепить файлы
      </label>

      {/* Список вложений */}
      {attachments.length > 0 && (
        <div className="attachments-list">
          {attachments.map((file, i) => (
            <div key={i} className="attachment-item">
              <div onClick={() => openFile(file)} className="attachment-preview">
                {file.type.startsWith('image/') ? (
                  <div className="image-placeholder">Фото</div>
                ) : file.type.startsWith('video/') ? (
                  <div className="video-preview">Видео</div>
                ) : (
                  <div className="file-placeholder">
                    {file.name.split('.').pop().toUpperCase()}
                  </div>
                )}
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  removeAttachment(i)
                }}
                className="remove-attachment"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Просмотрщик */}
      {viewerFile && (
        <div className="viewer-overlay">
          <button
            onClick={() => {
              URL.revokeObjectURL(viewerFile.url)
              setViewerFile(null)
            }}
            className="viewer-close"
          >
            ×
          </button>
          <div className="viewer-content">
            <iframe
              src={viewerFile.url}
              title={viewerFile.file.name}
              style={{ width: '100%', height: '100%', border: 'none', borderRadius: '12px' }}
              sandbox="allow-scripts allow-same-origin"
            />
          </div>
        </div>
      )}
    </div>
  )
}