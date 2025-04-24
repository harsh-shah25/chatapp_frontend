import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';

const socket = io('http://localhost:3001'); // Change this to your messaging backend

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [msg, setMsg] = useState('');
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    socket.emit('join', { userId: user.id });

    socket.on('receive-message', (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off('receive-message');
    };
  }, [user]);

  const sendMessage = () => {
    const message = {
      content: msg,
      from: user.id,
      to: 'doctor-id-xyz', // Replace with selected doctorId
    };

    socket.emit('send-message', message);
    setMessages((prev) => [...prev, { ...message, fromMe: true }]);
    setMsg('');
  };

  return (
    <div>
      <h2>Doctor Chat</h2>
      <div style={{ maxHeight: '300px', overflowY: 'scroll', border: '1px solid #ccc' }}>
        {messages.map((m, idx) => (
          <p key={idx} style={{ textAlign: m.fromMe ? 'right' : 'left' }}>
            <strong>{m.fromMe ? 'You' : 'Doctor'}:</strong> {m.content}
          </p>
        ))}
      </div>

      <input value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="Type..." />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatPage;
