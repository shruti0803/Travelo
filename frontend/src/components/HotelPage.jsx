import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const HotelsPage = () => {
  const { city } = useParams();
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/user/hotels/${city}`);
        console.log("API response:", res.data); // for debugging
        setHotels(res.data.hotels);
      } catch (err) {
        console.error("API error:", err);
        setError(
          err.response?.data?.message || "Unable to fetch hotels for this city."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchHotels();
  }, [city]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 py-10 px-6">
      <div className="max-w-6xl mx-auto bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-blue-700 mb-8 drop-shadow-md">
          🏨 Hotels in {city}
        </h1>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <p className="text-center text-red-600 font-semibold">{error}</p>
        ) : hotels.length === 0 ? (
          <p className="text-center text-gray-600 font-medium">
            No hotels found in {city}.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {hotels.map((hotel) => (
              <div
                key={hotel.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition duration-300"
              >
               <img
  src={hotel.imageUrl || `https://source.unsplash.com/600x400/?hotel,${hotel.city}`}
  alt={hotel.name}
  className="w-full h-56 object-cover"
/>

                <div className="p-5 space-y-2">
                  <h2 className="text-xl font-semibold text-gray-800">{hotel.name}</h2>
                  <p className="text-gray-500">{hotel.city}</p>
                  <p className="text-sm text-gray-600">
                    🏠 {hotel.availableRooms}/{hotel.totalRooms} rooms available
                  </p>
                  <p className="text-lg font-bold text-blue-600">
                    ₹{hotel.pricePerNight} / night
                  </p>
                  <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 mt-3 transition">
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HotelsPage;
