import axios from 'axios';

const API_BASE_URL = "https://localhost:7253/api";

class ApiService {
  static async getDoctors() {
    const response = await axios.get(`${API_BASE_URL}/Doctor/GetDoctors`);
    return response.data;
  }

  static async getUserDetails(userId) {
    const response = await axios.get(`${API_BASE_URL}/Account/${userId}`, {
      params: { id: userId },
    });
    return response.data;
  }

  static async getPatientByEmail(email) {
    const response = await axios.get(`${API_BASE_URL}/Patient/GetPatientByEmail/${email}`);
    return response.data;
  }

  static async getBookedSlots(doctorId, appointmentDate) {
    const response = await axios.get(`${API_BASE_URL}/Appointments/GetBookedSlots`, {
      params: { doctorId, appointmentDate },
    });
    return response.data;
  }

  static async getAvailableTimeSlots(range, interval) {
    const response = await axios.get(`${API_BASE_URL}/Appointments/GetAvailableTimeSlots`, {
      params: { range, interval },
    });
    return response.data;
  }

  static async bookAppointment(appointmentData) {
    const response = await axios.post(`${API_BASE_URL}/Appointments/BookAppointment`, appointmentData);
    return response;
  }

  static async login(email, password) {
    const response = await axios.post(`${API_BASE_URL}/Account/login`, { email, password });
    return response.data;
  }

  static async register(userData) {
    const response = await axios.post(`${API_BASE_URL}/Account/register`, userData);
    return response.data;
  }

  static async getUserRole(email) {
    const response = await axios.get(`${API_BASE_URL}/Account/role`, { params: { email } });
    return response.data;
  }
}

export default ApiService;
