import { useNavigate } from 'react-router-dom';

const cards = Array.from({ length: 50 }, (_, i) => ({ id: i + 1, title: `Карточка ${i + 1}` }));

export default function TestMainScreen() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Тест скролла (50 карточек)</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {cards.map(card => (
          <div
            key={card.id}
            onClick={() => navigate(`/detail/${card.id}`)}
            style={{
              padding: '20px',
              background: 'white',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              cursor: 'pointer',
              textAlign: 'center',
              fontSize: '18px'
            }}
          >
            {card.title}
          </div>
        ))}
      </div>
    </div>
  );
}