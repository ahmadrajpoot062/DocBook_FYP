import axios from 'axios';

const API_BASE_URL = "https://localhost:7253/api";

class ApiService {
    static async getDoctors() {
        const response = await axios.get(`${API_BASE_URL}/Doctor/GetDoctors`);
        return response.data;
    }

    static async getDoctorById(doctorId) {
        const response = await axios.get(`${API_BASE_URL}/Doctor/GetDoctorById/${doctorId}`);
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

    static async getPatientById(patientId) {
        const response = await axios.get(`${API_BASE_URL}/Patient/GetPatientById/${patientId}`);
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

    // get appointment 
    static async getAppointments(userId) {
        const response = await axios.get(`${API_BASE_URL}/Appointments/GetAppointments`, {
            params: { userId },
        });
        return response.data;
    }

    //get appointments by patientEmail
    static async getAppointmentsByPatientEmail(email) {
        const response = await axios.get(`${API_BASE_URL}/Appointments/byPatientEmail/${email}`);
        return response.data;
    }

    //get appointments by doctorId
    static async getAppointmentsByDoctorId(doctorId) {
        const response = await axios.get(`${API_BASE_URL}/Appointments/byDoctorId/${doctorId}`);
        return response.data;
    }

    //remove appointment
    static async removeAppointment(appointmentId) {
        const response = await axios.delete(`${API_BASE_URL}/Appointments/DeleteAppointment/${appointmentId}`);
        return response.data;
    }

    //cancel appointment
    static async cancelAppointment(appointmentId) {
        const response = await axios.put(`${API_BASE_URL}/Appointments/CancelAppointment/${appointmentId}`);
        return response.data;
    }

    //approve appointment
    static async approveAppointment(appointmentId) {
        const response = await axios.put(`${API_BASE_URL}/Appointments/ApproveAppointment/${appointmentId}`);
        return response.data;
    }

    //get appointments by doctorEmail
    static async getAppointmentsByDoctorEmail(email) {
        const response = await axios.get(`${API_BASE_URL}/Appointments/byDoctorEmail/${email}`);
        return response.data;
    }

    //get appointments by date and pass todday date
    static async getAppointmentsByDate(email, date) {
        const response = await axios.get(`${API_BASE_URL}/Appointments/byDate/${email}`, { params: { date } });
        return response.data;
    }
}

export default ApiService;
