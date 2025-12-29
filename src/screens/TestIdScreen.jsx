// src/screens/TestIdScreen.jsx
import { useState, useEffect } from 'react';

export default function TestIdScreen() {
  const [debug, setDebug] = useState([]);

  const log = (msg) => setDebug(prev => [...prev, msg]);

  useEffect(() => {
    log('=== ОТЛАДКА TELEGRAM ID ===');

    let id = null;
    let source = 'не определён';

    // 1. Mini App (смартфон)
    if (window.Telegram?.WebApp?.initDataUnsafe?.user?.id) {
      id = window.Telegram.WebApp.initDataUnsafe.user.id;
      source = 'Mini App (смартфон)';
      log(`ID найден: ${id} (${source})`);
    }

    // 2. Telegram Web — из tgWebAppData в hash
    if (!id && window.location.hash) {
      const hash = window.location.hash.substring(1);
      const params = new URLSearchParams(hash);
      const webAppData = params.get('tgWebAppData');
      log('tgWebAppData из hash: ' + (webAppData ? webAppData.substring(0, 100) + '...' : 'нет'));

      if (webAppData) {
        try {
          const webParams = new URLSearchParams(webAppData);
          const userEncoded = webParams.get('user');
          if (userEncoded) {
            const userJson = decodeURIComponent(userEncoded);
            const user = JSON.parse(userJson);
            id = user.id;
            source = 'Telegram Web (tgWebAppData)';
            log(`ID найден: ${id} (${source})`);
          }
        } catch (e) {
          log('Ошибка парсинга tgWebAppData: ' + e.message);
        }
      }
    }

    // 3. localStorage (резерв)
    if (!id) {
      const stored = localStorage.getItem('user_auth');
      if (stored) {
        try {
          const userData = JSON.parse(stored);
          id = userData.id;
          source = 'Telegram Web (localStorage)';
          log(`ID найден: ${id} (${source})`);
        } catch (e) {
          log('Ошибка парсинга user_auth: ' + e.message);
        }
      }
    }

    // 4. Локальный тест
    if (!id && (location.hostname === 'localhost' || location.hostname === '127.0.0.1')) {
      id = 9999;
      source = 'Тестовый режим (локально)';
      log(`ID найден: ${id} (${source})`);
    }

    if (!id) {
      log('ID НЕ ОПРЕДЕЛЁН — режим просмотра');
    }

    log('=== КОНЕЦ ОТЛАДКИ ===');
  }, []);

  return (
    <div style={{ padding: '20px', background: 'black', color: 'lime', fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
      <h1 style={{ color: 'lime' }}>ОТЛАДКА TELEGRAM ID</h1>
      {debug.map((line, i) => (
        <div key={i}>{line}</div>
      ))}
    </div>
  );
}