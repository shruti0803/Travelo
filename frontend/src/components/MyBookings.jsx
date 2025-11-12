// src/components/MyBookings.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Get user from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id || user?._id;

  useEffect(() => {
    if (!userId) {
      navigate("/register");
      return;
    }

    const fetchBookings = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/user/${userId}`);
        setBookings(response.data.bookings);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [userId, navigate]);

  if (loading) return <p className="text-center py-10">Loading your bookings...</p>;
  if (error) return <p className="text-center py-10 text-red-500">{error}</p>;
  if (bookings.length === 0) return <p className="text-center py-10">No bookings found.</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600 p-6">
      <h1 className="text-4xl font-bold text-center text-white mb-8">My Bookings</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="bg-white border rounded-lg p-4 shadow hover:shadow-lg transition duration-300"
          >
            <h2 className="font-semibold text-xl mb-2">{booking.hotel_name}</h2>
            <p>City: {booking.city}</p>
            <p>Days: {booking.days}</p>
            <p className="font-bold">Price: ₹{booking.total_price}</p>
            <img
              src={booking.hotel_image}
              alt={booking.hotel_name}
              className="mt-2 rounded-lg w-full h-40 object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
