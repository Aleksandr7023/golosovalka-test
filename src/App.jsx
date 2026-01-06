// App.jsx
import { Routes, Route } from 'react-router-dom';
import TestMainScreen from './screens/TestMainScreen.jsx';
import TestDetailScreen from './screens/TestDetailScreen.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<TestMainScreen />} />
      <Route path="/detail/:id" element={<TestDetailScreen />} />
    </Routes>
  );
}