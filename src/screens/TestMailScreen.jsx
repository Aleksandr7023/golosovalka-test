import { useState } from 'react';

const API_BASE = 'https://the8th.ru/api';

export default function TestMailScreen() {
  const [result, setResult] = useState('');

  const sendTestMail = async () => {
    try {
      const res = await fetch(`${API_BASE}/test_mail.php`);
      const data = await res.json();
      setResult(data.success ? 'Письмо отправлено успешно!' : 'Ошибка отправки письма');
    } catch (e) {
      setResult('Ошибка сети');
    }
  };

  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h1>Тест отправки почты</h1>
      <button 
        onClick={sendTestMail}
        style={{ padding: '20px 40px', fontSize: '20px', background: '#2ea44f', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer' }}
      >
        Отправить тестовое письмо на admin@the8th.ru
      </button>
      {result && <p style={{ marginTop: '40px', fontSize: '18px' }}>{result}</p>}
    </div>
  );
}