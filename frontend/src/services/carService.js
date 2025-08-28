// src/services/carService.js
import axios from 'axios';

// The base URL for your car service microservice
const API_URL = 'http://localhost:8082/api'; 

/**
 * A helper function to get the authorization headers.
 * It retrieves the JWT token from localStorage.
 */
const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    // Your backend might expect the 'Bearer ' prefix
    return token ? { Authorization: `Bearer ${token}` } : {};
};

// --- Vehicle Functions ---

/**
 * Fetches all vehicles. 
 * Renamed back to getAllVehicles to match your Vehicles.jsx component.
 */
export const getAllVehicles = async () => {
    try {
        const response = await axios.get(`${API_URL}/vehicles/getAllVehicles`, {
            headers: getAuthHeaders(),
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching vehicles:", error.response ? error.response.data : error.message);
        throw error;
    }
};

/**
 * Adds a new vehicle to the database.
 */
export const addCar = async (carData) => {
    try {
        const response = await axios.post(`${API_URL}/vehicles/save`, carData, {
            headers: getAuthHeaders(),
        });
        return response.data;
    } catch (error) {
        console.error("Error adding car:", error.response ? error.response.data : error.message);
        throw error;
    }
};

/**
 * Updates an existing vehicle's details.
 */
export const updateCar = async (id, carData) => {
    try {
        const response = await axios.put(`${API_URL}/vehicles/updateVehicle/${id}`, carData, {
            headers: getAuthHeaders(),
        });
        return response.data;
    } catch (error) {
        console.error("Error updating car:", error.response ? error.response.data : error.message);
        throw error;
    }
};

/**
 * Deletes a vehicle from the database.
 */
export const deleteCar = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/vehicles/deleteVehicle/${id}`, {
            headers: getAuthHeaders(),
        });
        return response.data;
    } catch (error) {
        console.error("Error deleting car:", error.response ? error.response.data : error.message);
        throw error;
    }
};

// --- Booking Functions ---

/**
 * Books a car.
 * Renamed back to createBooking to match your Booking.jsx component.
 * NOTE: Ensure your backend has a /bookings/book endpoint.
 */
export const createBooking = async (bookingData) => {
    try {
        // You might need to adjust this URL based on your BookingController
        const response = await axios.post(`${API_URL}/bookings`, bookingData, {
            headers: getAuthHeaders(),
        });
        return response.data;
    } catch (error) {
        console.error("Error creating booking:", error.response ? error.response.data : error.message);
        throw error;
    }
};