import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const MyAppointments = () => {
  const { id } = useParams();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      // try {
        console.log("lkgjfls")
        const response = await axios.get(`http://localhost:5007/api/appointmentpat/${id}`);
        setAppointments(response.data);
        setLoading(false);
      // } catch (error) {
      //   console.error('Error fetching appointments:', error);
      //   setLoading(false);
      // }
    };

    fetchAppointments();
  }, [id]);

  return (
    <div>
      <h1>My Appointments</h1>
      {loading ? (
        <p>Loading appointments...</p>
      ) : (
        <ul>
          {appointments.map(appointment => (
            <li key={appointment._id}>
              <p>Date: {appointment.age}</p>
              <p>Time: {appointment.purpose}</p>
              <p>Doctor: {appointment.patientName}</p>
              {/* Add more details as needed */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyAppointments;
