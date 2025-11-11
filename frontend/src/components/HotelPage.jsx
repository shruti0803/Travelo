import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const HotelsPage = () => {
  const { city } = useParams();
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedHotel, setSelectedHotel] = useState(null); // hotel to book
  const [days, setDays] = useState(1); // default 1 day
  const [showModal, setShowModal] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  const user = JSON.parse(localStorage.getItem("user")); // get user info

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/user/hotels/${city}`);
        setHotels(res.data.hotels);
      } catch (err) {
        setError(err.response?.data?.message || "Unable to fetch hotels.");
      } finally {
        setLoading(false);
      }
    };
    fetchHotels();
  }, [city]);

  const handleBookClick = (hotel) => {
    setSelectedHotel(hotel);
    setDays(Number(localStorage.getItem("days") || 1)); // optional if you stored days
    setTotalPrice(hotel.pricePerNight * days);
    setShowModal(true);
  };

  const handleConfirmBooking = async () => {
    try {
      const bookingData = {
        userId: user.id,           // user ID from localStorage
        hotelId: selectedHotel.id, // hotel ID
        city,
        days,
        totalPrice,
      };

      const res = await axios.post("http://localhost:8080/user/booking", bookingData);

      if (res.status === 200 || res.status === 201) {
        alert(`Booking confirmed for ${user.name} at ${selectedHotel.name}!`);
        setShowModal(false);
      } else {
        alert(res.data.error || "Booking failed!");
      }
    } catch (err) {
      console.error("Booking error:", err);
      alert(err.response?.data?.error || "Server error while booking.");
    }
  };

  const handleDaysChange = (e) => {
    const newDays = Number(e.target.value);
    setDays(newDays);
    if (selectedHotel) setTotalPrice(selectedHotel.pricePerNight * newDays);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 py-16 px-6">
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
          <p className="text-center text-gray-600 font-medium">No hotels found in {city}.</p>
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
                  <p className="text-lg font-bold text-blue-600">₹{hotel.pricePerNight} / night</p>
                  <button
                    onClick={() => handleBookClick(hotel)}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 mt-3 transition"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal */}
        {showModal && selectedHotel && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white rounded-2xl p-6 w-80 relative">
              <h2 className="text-xl font-semibold text-center mb-4">Book {selectedHotel.name}</h2>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-gray-700">Name</label>
                  <input
                    type="text"
                    value={user.name}
                    readOnly
                    className="w-full border rounded-lg p-2 bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">City</label>
                  <input
                    type="text"
                    value={city}
                    readOnly
                    className="w-full border rounded-lg p-2 bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Number of Days</label>
                  <input
                    type="number"
                    value={days}
                    onChange={handleDaysChange}
                    min={1}
                    className="w-full border rounded-lg p-2"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Total Price</label>
                  <input
                    type="text"
                    value={`₹${totalPrice}`}
                    readOnly
                    className="w-full border rounded-lg p-2 bg-gray-100 font-bold"
                  />
                </div>
              </div>

              <div className="flex justify-between mt-6">
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmBooking}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HotelsPage;
