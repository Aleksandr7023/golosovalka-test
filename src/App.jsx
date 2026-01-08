// App.jsx
import { Routes, Route } from 'react-router-dom';
import TestMainScreen from './screens/TestMainScreen.jsx';
import TestPollScreen from './screens/TestPollScreen.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<TestMainScreen />} />
      <Route path="/poll/:id" element={<TestPollScreen />} />
    </Routes>
  );
}