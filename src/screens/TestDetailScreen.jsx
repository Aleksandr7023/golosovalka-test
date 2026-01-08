// screens/TestDetailScreen.jsx
import { useParams } from 'react-router-dom';

export default function TestDetailScreen({ onBack }) {
  const { id } = useParams();

  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h1>Детали карточки #{id}</h1>
      <p>Это тестовый экран для проверки сохранения скролла.</p>
      <button
        onClick={onBack}
        style={{
          padding: '15px 30px',
          background: '#2ea44f',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          marginTop: '30px'
        }}
      >
        Назад на список
      </button>
    </div>
  );
}