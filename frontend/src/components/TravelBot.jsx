import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const TravelBot = () => {
  const { city: cityParam } = useParams();
  const navigate = useNavigate();
  const [city, setCity] = useState(cityParam || "");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async (selectedCity) => {
    const targetCity = selectedCity || city;
    if (!targetCity.trim()) return;

    setLoading(true);
    setResponse("");

    try {
      const res = await axios.post("http://localhost:8080/user/travel-info", {
        city: targetCity,
      });
      setResponse(res.data.answer);
    } catch (err) {
      console.error("Error:", err);
      setResponse("⚠️ Something went wrong. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (cityParam) handleSend(cityParam);
  }, [cityParam]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600 p-6">
      <div className="w-full max-w-3xl bg-white/90 backdrop-blur-md shadow-2xl rounded-2xl p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center text-blue-700 drop-shadow-md">
          ✈️ Explore {city || "Your Destination"}
        </h1>

        <div className="flex justify-center">
          <input
            type="text"
            className="w-full sm:w-2/3 text-center border-none bg-gray-100 text-gray-800 font-semibold text-lg rounded-lg py-3 focus:ring-2 focus:ring-blue-400 outline-none"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            readOnly={!!cityParam} // disable typing if city came from Package
          />
        </div>

        <div className="min-h-[220px] bg-gray-100 rounded-xl p-5 text-gray-800 text-lg leading-relaxed overflow-y-auto shadow-inner">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-full space-y-3 animate-pulse">
              <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-blue-600 font-medium">Exploring {city}...</p>
            </div>
          ) : response ? (
            <div
              className="prose prose-blue max-w-none"
              dangerouslySetInnerHTML={{
                __html: response
                  .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // bold
                  .replace(/\*(.*?)\*/g, "<em>$1</em>") // italic
                  .replace(/\n/g, "<br/>"), // line breaks
              }}
            />
          ) : (
            <p className="text-gray-500 text-center">
              Enter or select a city to explore its highlights.
            </p>
          )}
        </div>

        {/* 🏨 Book Hotels Button */}
        {city && !loading && (
          <div className="flex justify-center pt-4">
            <button
              onClick={() => navigate(`/hotels/${city}`)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-all transform hover:scale-105"
            >
              🏨 View Hotels in {city}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TravelBot;
