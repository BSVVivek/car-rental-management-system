// src/services/adminService.js
import axios from 'axios';

// The base URL for your user authentication microservice
// NOTE: Your user service runs on port 8081
const API_URL = 'http://localhost:8081/auth'; 

/**
 * A helper function to get the authorization headers.
 * It retrieves the JWT token from localStorage.
 */
const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
};

/**
 * Fetches all regular users (role 'USER') from the backend.
 * This function is for admins only.
 */
export const getAllUsers = async () => {
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

// You can add more admin-specific functions here later (e.g., fetch bookings)