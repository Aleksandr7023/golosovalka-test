// screens/TestPollScreen.jsx
import { useParams, useNavigate } from 'react-router-dom';

export default function TestPollScreen() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h1>Опрос #{id}</h1>
      <p>Это тестовый экран опроса для проверки сохранения скролла при возврате.</p>
      <button
        onClick={() => navigate('/')}
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
        Назад к списку
      </button>
    </div>
  );
}