import axios from 'axios';

const API_BASE_URL = "https://localhost:7253/api";



export const getPatientByEmail = async (email) => {
  const response = await axios.get(`${API_BASE_URL}/Patient/GetPatientByEmail/${email}`);
  return response.data;
};

export const getBookedSlots = async (doctorId, appointmentDate) => {
  const response = await axios.get(`${API_BASE_URL}/Appointments/GetBookedSlots`, {
    params: { doctorId, appointmentDate },
  });
  return response.data;
};

export const getAvailableTimeSlots = async (range, interval) => {
  const response = await axios.get(`${API_BASE_URL}/Appointments/GetAvailableTimeSlots`, {
    params: { range, interval },
  });
  return response.data;
};

export const bookAppointment = async (appointmentData) => {
  const response = await axios.post(`${API_BASE_URL}/Appointments/BookAppointment`, appointmentData);
  return response;
};
