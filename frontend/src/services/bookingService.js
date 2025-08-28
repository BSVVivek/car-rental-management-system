import axios from 'axios';

const API_URL = 'http://localhost:8082/api/bookings';

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
};


export const getAllBookings = async () => {
    try {
        const response = await axios.get(`${API_URL}/all`, {
            headers: getAuthHeaders(),
        });
        return response.data;
    } catch (error) { 
        console.error("Error fetching all bookings:", error.response ? error.response.data : error.message);
        throw error;
    } 
};

/**
 * NEW FUNCTION: Fetches all bookings for the currently logged-in user.
 * It uses the existing backend endpoint that takes an email.
 * @param {string} email The user's email address.
 * @returns {Promise<Array>} A list of the user's bookings.
 */
export const getBookingsByUser = async (email) => {
    try {
        const response = await axios.get(`${API_URL}/user/${email}`, {
            headers: getAuthHeaders(),
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching user bookings:", error.response ? error.response.data : error.message);
        throw error;
    }
};




/**
 * NEW FUNCTION: Cancels a booking by its ID.
 * @param {number} bookingId The ID of the booking to cancel.
 * @returns {Promise<void>}
 */
export const cancelBooking = async (bookingId) => {
    try {
        await axios.delete(`${API_URL}/${bookingId}`, {
            headers: getAuthHeaders(),
        });
    } catch (error) {
        console.error("Error canceling booking:", error.response ? error.response.data : error.message);
        throw error;
    }
};