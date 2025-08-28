// src/services/userService.js
import axios from 'axios';

// THE FIX: Point to port 8082 and the '/auth' path.
const API_URL = 'http://localhost:8082/auth'; 

/**
 * A helper function to get the authorization headers.
 */
const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
};

/**
 * Fetches all regular users for the admin dashboard.
 */
export const getRegularUsers = async () => {
    try {
        const response = await axios.get(`${API_URL}/getregularusers`, {
            headers: getAuthHeaders(),
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching users:", error.response ? error.response.data : error.message);
        throw error;
    }
};