{/* Просмотрщик — картинка вписывается как на iPhone */}
{viewerFile && (
  <div style={{
    position: 'fixed',
    inset: 0,
    background: '#000',
    z-index: 1000,
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
      {viewerFile.file.type.startsWith('image/') ? (
        <img
          src={viewerFile.url}
          alt=""
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            objectFit: 'contain'   // ← ВОТ ЭТО ГЛАВНОЕ! Как на iPhone
          }}
        />
      ) : viewerFile.file.type.startsWith('video/') ? (
        <video
          src={viewerFile.url}
          controls
          autoPlay
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            objectFit: 'contain'
          }}
        />
      ) : (
        <iframe
          src={viewerFile.url}
          title={viewerFile.file.name}
          style={{ width: '100%', height: '100%', border: 'none' }}
          sandbox="allow-scripts allow-same-origin"
        />
      )}
    </div>
  </div>
)}