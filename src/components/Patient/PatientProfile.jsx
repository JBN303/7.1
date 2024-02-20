import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea, Modal, Box } from '@mui/material';
import { TextField } from '@mui/material';

const PatientProfile = () => {
  const { id } = useParams();
  const [patientData, setPatientData] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [appointmentDetails, setAppointmentDetails] = useState({
    patientName: '',
    age: '',
    contactNo: '',
    email: '',
    purpose: '',
  });
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [noDoctorsFound, setNoDoctorsFound] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch patient data
        const patientResponse = await axios.get(`http://localhost:5007/api/patients/${id}`);
        setPatientData(patientResponse.data);

        // Fetch list of doctors
        const doctorsResponse = await axios.get('http://localhost:5007/api/doctors');
        setDoctors(doctorsResponse.data);
      } catch (error) {
        console.error('Error fetching patient data or doctors:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAppointmentDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleAppointmentSubmit = () => {
    // You can handle the appointment submission logic here
    console.log('Appointment Details:', appointmentDetails);
    // Add your logic to submit the appointment details to the server or perform any other actions
    // For demonstration purposes, we'll just close the modal here
    handleCloseModal();
  };

  const handleOpenModal = (doctor) => {
    setSelectedDoctor(doctor);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleBookAppointment = async (doctorId) => {
    try {
      const selectedDoctor = filteredDoctors.find((doctor) => doctor._id === doctorId);

      // You can customize the appointment details based on your requirements
      const appointmentDetailsToSend = {
        patientName: appointmentDetails.patientName,
        age: appointmentDetails.age,
        contactNo: appointmentDetails.contactNo,
        email: appointmentDetails.email,
        purpose: appointmentDetails.purpose,
      };

      // Send appointment details to the server
      const response = await axios.post(`http://localhost:5007/api/appointments/${doctorId}`, appointmentDetails);

      // Log the response or handle it as needed
      console.log('Appointment booked successfully:', response.data);
      setAppointmentDetails({
        patientName: '',
        age: '',
        contactNo: '',
        email: '',
        purpose: '',
      });
      
        alert("Appointment successfull");
      
      handleCloseModal();
    } catch (error) {
      console.error('Error booking appointment:', error);
    }
  };

  const handleSearch = (query) => {
    const filtered = doctors.filter((doctor) =>
      doctor.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredDoctors(filtered);
    setNoDoctorsFound(filtered.length === 0);
  };

  return (
    <div>
      <TextField
        label="Search Doctor"
        variant="outlined"
        fullWidth
        margin="normal"
        onChange={(e) => handleSearch(e.target.value)}
      />
      {noDoctorsFound && <Typography variant="h6">No doctors found.</Typography>}
      {patientData ? (
        <div>
          <Box
            display="flex"
            flexWrap="wrap"
            sx={{
              flexGrow: 1,
              p: 3,
              backgroundColor: 'white',
            }}
          >
            {(filteredDoctors.length ? filteredDoctors : doctors).map((doctor) => (
              <Card key={doctor._id} sx={{ maxWidth: 345, margin: 2 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={`data:image/jpeg;base64,${doctor.pic}`}
                    alt="Profile"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {doctor.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Age: {doctor.age}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Specialty: {doctor.spec}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Language: {doctor.lang}
                    </Typography>
                    <Button onClick={() => handleOpenModal(doctor)} style={{ color: '#77d5cb' }}>
                      Book Appointment
                    </Button>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
          </Box>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      {selectedDoctor && (
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {selectedDoctor.name}
            </Typography>
            <TextField
              label="Patient Name"
              variant="outlined"
              fullWidth
              margin="normal"
              name="patientName"
              value={appointmentDetails.patientName}
              onChange={handleInputChange}
            />
            <TextField
              label="Age"
              variant="outlined"
              fullWidth
              margin="normal"
              name="age"
              value={appointmentDetails.age}
              onChange={handleInputChange}
            />
            <TextField
              label="Contact No."
              variant="outlined"
              fullWidth
              margin="normal"
              name="contactNo"
              value={appointmentDetails.contactNo}
              onChange={handleInputChange}
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              name="email"
              value={appointmentDetails.email}
              onChange={handleInputChange}
            />
            <TextField
              label="Purpose of Appointment"
              variant="outlined"
              fullWidth
              margin="normal"
              name="purpose"
              value={appointmentDetails.purpose}
              onChange={handleInputChange}
            />
            <Button onClick={() => handleBookAppointment(selectedDoctor._id)} style={{ color: '#77d5cb' }}>
              BOOK NOW
            </Button>
          </Box>
        </Modal>
      )}
    </div>
  );
};

export default PatientProfile;
