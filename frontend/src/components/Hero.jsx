import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Hero = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState([]);


  const cities = ['Varanasi', 'Jaipur','Jodhpur', 'Srinagar', 'Delhi', 'Mumbai', 'Goa', 'Agra'];

 
  const handleChange = (e) => {
    const value = e.target.value;
    setSearch(value);

    if (value.length > 0) {
      const filtered = cities.filter((city) =>
        city.toLowerCase().startsWith(value.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  
  const handleSelect = (city) => {
    setSearch(city);
    setSuggestions([]);
    navigate(`/hotels/${city}`); 
  };

  const handleExploreClick = () => {
    if (search) {
      navigate(`/hotels/${search}`);
    } else {
      navigate('/package');
    }
  };

  return (
    <div>
      <div className="container mx-auto text-center pt-5 pb-28">
        <h1 className="text-white font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-mono py-1 sm:py-2">
          Travelo
        </h1>
        <h2 className="text-white font-bold text-2xl sm:text-2xl md:text-2xl lg:text-2xl font-mono">
          Travel the world with us
        </h2>
      </div>

      <div className="flex justify-center items-center my-6">
        <div className="bg-white p-2 w-5/6 max-w-8xl ">
          <div className="bg-white flex justify-center p-2">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9v86h474lWiTmn2KXsSjzTAxLvrzoTwauVyqiJf0_4Tf029TL_rVEUPypeT4QDT75wgk&usqp=CAU"
              className="max-w-full h-auto mx-auto"
              alt="Travel"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center text-center" id="des">
        <div className="m-4 py-4 bg-blue-100 bg-opacity-35 w-3/5 relative">
          <h1 className="text-3xl font-semibold py-6 sm:text-2xl md:text-2xl lg:text-2xl">
            Find Your Destination
          </h1>

          <input
            type="text"
            value={search}
            onChange={handleChange}
            className="block w-[900px] m-3 px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
            placeholder="Enter your city here"
          />

        
          {suggestions.length > 0 && (
            <ul className="absolute bg-white border border-gray-300 w-[200px] max-h-48 overflow-auto left-1/2 transform -translate-x-1/2 rounded-md shadow-lg z-50">
              {suggestions.map((city, index) => (
                <li
                  key={index}
                  onClick={() => handleSelect(city)}
                  className="px-4 py-2 hover:bg-blue-200 cursor-pointer"
                >
                  {city}
                </li>
              ))}
            </ul>
          )}

          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-2 rounded mt-4 text-lg sm:text-xl md:text-2xl lg:text-3xl"
            onClick={handleExploreClick}
          >
            Explore Now
          </button>
        </div>
      </div>
    </div>
  );
};
