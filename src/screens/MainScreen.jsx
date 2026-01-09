// MainScreen.jsx
import { useNavigate } from 'react-router-dom';

const polls = Array.from({ length: 50 }, (_, i) => ({ 
  id: i + 1, 
  title: `Опрос ${i + 1}`, 
  question: 'Вопрос опроса?', 
  views_count: Math.floor(Math.random() * 100), 
  votes: [Math.floor(Math.random() * 20), Math.floor(Math.random() * 20), Math.floor(Math.random() * 20)]
}));

export default function MainScreen() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Опросы</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {polls.map(poll => (
          <div
            key={poll.id}
            onClick={() => navigate(`/poll/${poll.id}`)}
            style={{
              padding: '20px',
              background: 'white',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              cursor: 'pointer'
            }}
          >
            <h3>{poll.title}</h3>
            <p>{poll.question}</p>
            <div style={{ fontSize: '14px', color: '#666' }}>
              <span>{poll.views_count} просмотров</span>
              <span style={{ marginLeft: '20px' }}>{poll.votes.reduce((a, b) => a + b, 0)} голосов</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}