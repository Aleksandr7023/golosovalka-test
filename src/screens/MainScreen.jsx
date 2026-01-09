// MainScreen.jsx — минимальный статичный код для теста (без fetch, без useContext, без стилей)
export default function MainScreen() {
  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h1>Главный экран (тест)</h1>
      <p>Если видишь это — рендер работает.</p>
      <p>Пролистай вниз — там 50 пустых карточек для скролла.</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {Array.from({ length: 50 }, (_, i) => (
          <div
            key={i}
            style={{
              height: '100px',
              background: 'white',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px'
            }}
          >
            Карточка {i + 1}
          </div>
        ))}
      </div>
    </div>
  );
}