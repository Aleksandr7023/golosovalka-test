// src/screens/TestIdScreen.jsx
import { useState, useEffect } from 'react';

export default function TestIdScreen() {
  const [debug, setDebug] = useState([]);

  const log = (msg) => setDebug(prev => [...prev, msg]);

  useEffect(() => {
    log('=== ОТЛАДКА TELEGRAM ID ===');

    // Mini App
    log('Mini App:');
    log('window.Telegram.WebApp: ' + !!window.Telegram?.WebApp);
    log('initDataUnsafe.user.id: ' + window.Telegram?.WebApp?.initDataUnsafe?.user?.id || 'undefined');

    // URL hash
    log('URL hash: ' + window.location.hash);
    if (window.location.hash) {
      const hash = window.location.hash.substring(1);
      const params = new URLSearchParams(hash);
      const webAppData = params.get('tgWebAppData');
      log('tgWebAppData: ' + webAppData);
      if (webAppData) {
        const webParams = new URLSearchParams(webAppData);
        const userJson = webParams.get('user');
        log('user JSON: ' + userJson);
        if (userJson) {
          try {
            const user = JSON.parse(decodeURIComponent(userJson));
            log('PARSED USER ID: ' + user.id);
          } catch (e) {
            log('Ошибка парсинга user JSON: ' + e.message);
          }
        }
      }
    }

    // localStorage
    log('localStorage user_auth: ' + localStorage.getItem('user_auth'));
    log('localStorage tg_user_auth: ' + localStorage.getItem('tg_user_auth'));

    log('=== КОНЕЦ ===');
  }, []);

  return (
    <div style={{ padding: '20px', background: 'black', color: 'lime', fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
      {debug.map((line, i) => <div key={i}>{line}</div>)}
    </div>
  );
}