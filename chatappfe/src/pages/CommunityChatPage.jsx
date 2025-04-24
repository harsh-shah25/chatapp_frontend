import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';

const socket = io('http://localhost:3002'); // group chat backend

const CommunityChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [msg, setMsg] = useState('');
  const { user } = useSelector((state) => state.auth);
  const room = 'diabetes'; // Example room — could be based on disease

  useEffect(() => {
    socket.emit('join-room', room);

    socket.on('receive-room-message', (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off('receive-room-message');
    };
  }, [room]);

  const sendMessage = () => {
    const message = {
      content: msg,
      sender: user.name,
      room
    };

    socket.emit('send-room-message', message);
    setMessages((prev) => [...prev, message]);
    setMsg('');
  };

  return (
    <div>
      <h2>Community Chat: {room}</h2>
      <div style={{ maxHeight: '300px', overflowY: 'scroll', border: '1px solid #ccc' }}>
        {messages.map((m, idx) => (
          <p key={idx}><strong>{m.sender}</strong>: {m.content}</p>
        ))}
      </div>
      <input value={msg} onChange={(e) => setMsg(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default CommunityChatPage;
