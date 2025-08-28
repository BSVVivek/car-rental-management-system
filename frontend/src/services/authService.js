// src/services/authService.js

const API_BASE_URL = 'http://localhost:8082'; // Your API Gateway URL

export const registerUser = async (userData) => {
    const response = await fetch(`${API_BASE_URL}/auth/save`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
    });
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Registration failed.');
    }
    return response.text();
};

export const loginUser = async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
    });
    if (!response.ok) {
        const errorBody = await response.json();
        throw new Error(errorBody.error || 'Invalid credentials.');
    }
    return response.json();
};

/**
 * NEW FUNCTION: Fetches the full user profile details by email.
 * This requires the JWT token for authorization.
 * @param {string} email - The email of the user to fetch.
 * @param {string} token - The JWT token for the session.
 * @returns {Promise<object>} The user's profile data.
 */
export const getUserByEmail = async (email, token) => {
    const response = await fetch(`${API_BASE_URL}/auth/getuserbyemail/${email}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    if (!response.ok) {
        throw new Error('Failed to fetch user details after login.');
    }
    return response.json();
};
