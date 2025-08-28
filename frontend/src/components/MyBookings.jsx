// src/components/MyBookings.jsx
import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { getBookingsByUser, cancelBooking } from '../services/bookingService';
import { getAllVehicles } from '../services/carService';
import './MyBookings.css';

const MyBookings = ({ isDarkMode }) => {
    const [enrichedBookings, setEnrichedBookings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const fetchAndCombineData = async () => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error("Authentication token not found.");
            
            const decodedToken = jwtDecode(token);
            const userEmail = decodedToken.sub;
            if (!userEmail) throw new Error("Email not found in token.");

            const [bookingsData, vehiclesData] = await Promise.all([
                getBookingsByUser(userEmail),
                getAllVehicles()
            ]);

            const vehiclesMap = new Map(vehiclesData.map(v => [v.vehicleID, v]));

            const combinedData = bookingsData.map(booking => ({
                ...booking,
                vehicle: vehiclesMap.get(booking.vehicleId) || null
            }));

            setEnrichedBookings(combinedData);
        } catch (err) {
            setError(err.message || 'Failed to fetch your bookings.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchAndCombineData();
    }, []);

    const handleCancelBooking = async (bookingId) => {
        const isConfirmed = window.confirm("Are you sure you want to cancel this booking? This action cannot be undone.");
        if (isConfirmed) {
            try {
                await cancelBooking(bookingId);
                setMessage('Booking cancelled successfully!');
                setEnrichedBookings(currentBookings =>
                    currentBookings.filter(b => b.bookingId !== bookingId)
                );
            } catch (err) {
                setError('Failed to cancel the booking. Please try again.');
            }
            setTimeout(() => setMessage(''), 3000);
        }
    };

    return (
        <div className={`my-bookings-page ${isDarkMode ? 'dark' : ''}`}>
            <header className="my-bookings-header">
                <h1>My Bookings</h1>
                <p>Here is a list of all your past and upcoming vehicle rentals.</p>
            </header>

            {isLoading && <p className="loading-message">Loading your bookings...</p>}
            {error && <p className="error-message">{error}</p>}
            {message && <p className="success-message">{message}</p>}

            <div className="bookings-list-container">
                {!isLoading && !error && enrichedBookings.length === 0 ? (
                    <p className="loading-message">You have no bookings.</p>
                ) : (
                    enrichedBookings.map((booking) => {
                        // --- THE FIX IS HERE ---
                        // Check if the booking's end date is in the past.
                        const today = new Date();
                        today.setHours(0, 0, 0, 0); // Set to the beginning of today for a fair comparison
                        const bookingEndDate = new Date(booking.toDate);
                        const isCancellable = bookingEndDate >= today;


                        return (
                            <div key={booking.bookingId} className="booking-card-rich">
                                <div className="booking-card-image-wrapper">
                                    {booking.vehicle ? (
                                        <img 
                                            src={booking.vehicle.pictureUrl} 
                                            alt={booking.vehicle.vehicleName} 
                                            className="booking-card-image" 
                                        />
                                    ) : (
                                        <div className="image-placeholder">No Image</div>
                                    )}
                                </div>
                                <div className="booking-card-details">
                                    <h3 className="booking-vehicle-name">
                                        {booking.vehicle ? booking.vehicle.vehicleName : 'Vehicle not found'}
                                    </h3>
                                    <p><strong>Booking ID:</strong> {booking.bookingId}</p>
                                    <p><strong>Rental Period:</strong> {new Date(booking.fromDate).toLocaleDateString()} to {new Date(booking.toDate).toLocaleDateString()}</p>
                                    <p className="booking-total-fare">
                                        <strong>Total Fare:</strong> ₹{booking.totalFare.toLocaleString()}
                                    </p>
                                    <button
                                        onClick={() => handleCancelBooking(booking.bookingId)}
                                        className="cancel-booking-btn"
                                        disabled={!isCancellable} // Disable the button if it's not cancellable
                                        title={!isCancellable ? "This booking cannot be cancelled as the date has passed." : "Cancel this booking"}
                                    >
                                        {isCancellable ? 'Cancel Booking' : 'Expired'}
                                    </button>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default MyBookings;
