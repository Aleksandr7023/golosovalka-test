// App.jsx
import React, { useState } from 'react';
import { Routes, Route, useNavigate, useLocation, ScrollRestoration } from 'react-router-dom';
import MainScreen from './screens/MainScreen.jsx';
import PollScreen from './screens/PollScreen.jsx';
import CommentScreen from './screens/CommentScreen.jsx';
import ProfileScreen from './screens/ProfileScreen.jsx';
import { APP_VERSION } from './utils/constants.js';

// Контекст (пустой — ID и username убраны)
export const UserContext = React.createContext({});

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isMainScreen = location.pathname === '/';
  const isPollScreen = location.pathname.startsWith('/poll/');

  const handleBack = () => {
    if (isPollScreen) {
      navigate('/');
    } else {
      navigate(-1);
    }
  };

  return (
    <UserContext.Provider value={{}}>
      <div className="app">
        {/* Фиксированная шапка */}
        <header style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '80px',
          padding: '20px',
          background: 'white',
          boxShadow: '0 2px 8px rgba(0,0,0,.1)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 99
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {!isMainScreen && (
              <button
                onClick={handleBack}
                style={{ background: 'none', border: 'none', fontSize: '32px', cursor: 'pointer', marginRight: '15px', padding: '0' }}
              >
                ←
              </button>
            )}
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: 'none', border: 'none', fontSize: '28px', cursor: 'pointer', padding: '0 10px' }}
          >
            ⋯
          </button>
        </header>

        {/* Меню */}
        {menuOpen && (
          <div style={{
            position: 'fixed',
            right: '20px',
            top: '80px',
            background: 'white',
            border: '1px solid #d0d7de',
            borderRadius: '8px',
            padding: '10px',
            boxShadow: '0 4px 12px rgba(0,0,0,.1)',
            zIndex: 101
          }}>
            <button 
              onClick={() => {
                setMenuOpen(false);
                navigate('/profile');
              }}
              style={{ width: '100%', padding: '12px', background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', fontSize: '15px' }}
            >
              Мой профиль
            </button>
            <button 
              onClick={() => {
                setMenuOpen(false);
                setShowHelpModal(true);
              }}
              style={{ width: '100%', padding: '12px', background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', fontSize: '15px' }}
            >
              Помощь
            </button>
            <button 
              onClick={() => {
                setMenuOpen(false);
                alert(`Голосовалка\nВерсия: ${APP_VERSION}\n© 2026`);
              }}
              style={{ width: '100%', padding: '12px', background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', fontSize: '15px' }}
            >
              О программе
            </button>
          </div>
        )}

        {/* Модалка помощи */}
        {showHelpModal && (
          <div style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100
          }}>
            <div style={{
              background: 'white',
              padding: '30px',
              borderRadius: '16px',
              width: '90%',
              maxWidth: '500px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
              textAlign: 'center'
            }}>
              <h2 style={{ marginBottom: '20px', color: '#0969da' }}>Помощь</h2>
              <p style={{ fontSize: '16px', marginBottom: '30px' }}>
                По всем вопросам пишите на почту:<br />
                <strong>admin@the8th.ru</strong>
              </p>
              <button
                onClick={() => setShowHelpModal(false)}
                style={{
                  padding: '12px 30px',
                  background: '#2ea44f',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                Закрыть
              </button>
            </div>
          </div>
        )}

        {/* Контент со скроллом */}
        <main style={{
          height: '100vh',
          overflowY: 'auto',
          paddingTop: '80px'
        }}>
          <Routes>
            <Route path="/" element={<MainScreen />} />
            <Route path="/poll/:id" element={<PollScreen />} />
            <Route path="/comment/:id" element={<CommentScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
          </Routes>
          <ScrollRestoration />
        </main>
      </div>
    </UserContext.Provider>
  );
}