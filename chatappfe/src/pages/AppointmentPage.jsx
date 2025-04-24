import { useEffect, useState } from 'react';
import axios from '../api/axios';
import { useSelector } from 'react-redux';

const AppointmentPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [slots, setSlots] = useState([]);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    axios.get('/doctors').then((res) => {
      setDoctors(res.data);
    });
  }, []);

  const fetchSlots = async (doctorId) => {
    const res = await axios.get(`/appointments/slots/${doctorId}`);
    setSelectedDoctor(doctorId);
    setSlots(res.data);
  };

  const bookSlot = async (slot) => {
    try {
      await axios.post('/appointments/book', {
        doctorId: selectedDoctor,
        slot
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Appointment booked! Check email for confirmation.');
    } catch (err) {
      alert('Booking failed.');
    }
  };

  return (
    <div>
      <h2>Choose Doctor</h2>
      <ul>
        {doctors.map((doc) => (
          <li key={doc.id}>
            {doc.name} <button onClick={() => fetchSlots(doc.id)}>View Slots</button>
          </li>
        ))}
      </ul>

      {slots.length > 0 && (
        <>
          <h3>Available Slots</h3>
          <ul>
            {slots.map((s, i) => (
              <li key={i}>
                {s} <button onClick={() => bookSlot(s)}>Book</button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default AppointmentPage;
