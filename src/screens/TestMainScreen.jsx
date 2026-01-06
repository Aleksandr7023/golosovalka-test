// screens/TestMainScreen.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const cards = Array.from({ length: 50 }, (_, i) => ({ id: i + 1, title: `Карточка ${i + 1}` }));

export default function TestMainScreen() {
  const navigate = useNavigate();

  // Сохранение и восстановление скролла
  useEffect(() => {
    const savedScroll = localStorage.getItem('testScrollPosition');
    if (savedScroll) {
      window.scrollTo(0, parseInt(savedScroll, 10));
    }

    const saveScroll = () => {
      localStorage.setItem('testScrollPosition', window.scrollY);
    };

    window.addEventListener('scroll', saveScroll);
    window.addEventListener('beforeunload', saveScroll);

    return () => {
      window.removeEventListener('scroll', saveScroll);
      window.removeEventListener('beforeunload', saveScroll);
      saveScroll(); // сохраняем при уходе
    };
  }, []);

  const openDetail = (id) => {
    navigate(`/detail/${id}`);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Тест скролла — 50 карточек</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {cards.map(card => (
          <div
            key={card.id}
            onClick={() => openDetail(card.id)}
            style={{
              padding: '20px',
              background: 'white',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              cursor: 'pointer',
              textAlign: 'center',
              fontSize: '18px',
              transition: 'transform 0.2s'
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            {card.title}
          </div>
        ))}
      </div>
    </div>
  );
}