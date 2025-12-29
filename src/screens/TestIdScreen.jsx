// TestIdScreen.jsx
import { useState, useEffect } from 'react';

export default function TestIdScreen() {
  const [debug, setDebug] = useState([]);

  const log = (msg) => setDebug(prev => [...prev, msg]);

  useEffect(() => {
    log('=== ОТЛАДКА TELEGRAM ID ===');

    // 1. Mini App
    log('1. Проверка Mini App:');
    log('window.Telegram: ' + !!window.Telegram);
    log('window.Telegram.WebApp: ' + !!window.Telegram?.WebApp);
    log('initDataUnsafe: ' + JSON.stringify(window.Telegram?.WebApp?.initDataUnsafe || null));
    if (window.Telegram?.WebApp?.initDataUnsafe?.user?.id) {
      log(`ID из Mini App: ${window.Telegram.WebApp.initDataUnsafe.user.id}`);
    }

    // 2. localStorage
    log('2. Проверка localStorage:');
    const userAuth = localStorage.getItem('user_auth');
    const tgUserAuth = localStorage.getItem('tg_user_auth');
    log('user_auth: ' + userAuth);
    log('tg_user_auth: ' + tgUserAuth);

    if (userAuth) {
      try {
        const parsed = JSON.parse(userAuth);
        log('Парсинг user_auth успешен: ' + JSON.stringify(parsed));
        if (parsed.id) log(`ID из user_auth: ${parsed.id}`);
      } catch (e) {
        log('Ошибка парсинга user_auth: ' + e.message);
      }
    }

    // 3. URL hash
    log('3. Проверка URL hash:');
    log('location.hash: ' + window.location.hash);
    if (window.location.hash) {
      const hash = window.location.hash.substring(1);
      const params = new URLSearchParams(hash);
      const webAppData = params.get('tgWebAppData');
      log('tgWebAppData из hash: ' + webAppData);
      if (webAppData) {
        try {
          const decoded = decodeURIComponent(webAppData);
          const parsed = JSON.parse(decoded);
          log('Парсинг tgWebAppData успешен: ' + JSON.stringify(parsed));
          if (parsed.user?.id) log(`ID из tgWebAppData: ${parsed.user.id}`);
        } catch (e) {
          log('Ошибка парсинга tgWebAppData: ' + e.message);
        }
      }
    }

    // 4. Локальный тест
    if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
      log('Локальный запуск — тестовый ID: 9999');
    }

    log('=== КОНЕЦ ОТЛАДКИ ===');
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'monospace', whiteSpace: 'pre-wrap', background: '#000', color: '#0f0' }}>
      <h1 style={{ color: '#0f0' }}>ОТЛАДКА TELEGRAM ID</h1>
      {debug.map((line, i) => (
        <div key={i}>{line}</div>
      ))}
    </div>
  );
}