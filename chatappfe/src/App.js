import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import AppointmentPage from './pages/AppointmentPage';
import ChatPage from './pages/ChatPage';
import CommunityChatPage from './pages/CommunityChatPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/appointments" element={<AppointmentPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/community" element={<CommunityChatPage />} />
      </Routes>
    </Router>
  );
}

export default App;
