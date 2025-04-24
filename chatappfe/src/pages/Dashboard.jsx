import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../features/auth/authSlice';

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <div>
      <h1>Welcome, {user?.name}</h1>
      <h3>Role: {user?.role}</h3>

      <div style={{ marginTop: '20px' }}>
        <button onClick={() => navigate('/appointments')}>Book Appointment</button>
        {user?.role === 'patient' && (
          <>
            <button onClick={() => navigate('/chat')}>1-on-1 Chat</button>
            <button onClick={() => navigate('/community')}>Community Chat</button>
          </>
        )}
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Dashboard;
