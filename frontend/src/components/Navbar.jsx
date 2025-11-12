import React, { useState, useContext } from 'react'; 
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../userContext';
import { FaUserCircle } from 'react-icons/fa';
import { MyBookings } from './MyBookings.jsx';
const Navbar = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleRegClick = () => navigate('/register');

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    setShowLogout(false);
    navigate('/');
  };

  return (
    <nav className="bg-transparent fixed w-full z-10 top-0">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="text-white text-xl">Travelo</div>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center space-x-4">
          <Link to="/" className="text-white">Home</Link>
          {!user && (
            <button onClick={handleRegClick} className="text-white">
              Log In
            </button>
          )}
          <Link to="/package" className="text-white">Explore</Link>
          <Link to="/contact" className="text-white">Contact Us</Link>

         {user && (
  <div className="relative ml-4">
    <FaUserCircle
      className="text-white w-8 h-8 rounded-full cursor-pointer"
      onClick={() => setShowLogout(!showLogout)}
    />
    {showLogout && (
      <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg text-center z-50">
        <button
          onClick={() => {
            navigate('/mybookings');
            setShowLogout(false);
          }}
          className="w-full py-2 px-4 text-gray-800 hover:bg-gray-100 rounded-lg"
        >
          My Bookings
        </button>
        <button
          onClick={handleLogout}
          className="w-full py-2 px-4 text-red-600 hover:bg-gray-100 rounded-lg"
        >
          Logout
        </button>
      </div>
    )}
  </div>
)}

        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden flex flex-col space-y-2 p-4 bg-black">
          <Link to="/" className="text-white">Home</Link>
          {!user && (
            <button onClick={handleRegClick} className="text-white text-left">Log In</button>
          )}
          <Link to="/package" className="text-white">Explore</Link>
          <Link to="/contact" className="text-white">Contact Us</Link>
          {user && (
            <div className="mt-2 relative">
              <FaUserCircle
                className="text-white w-8 h-8 rounded-full cursor-pointer"
                onClick={() => setShowLogout(!showLogout)}
              />
              {showLogout && (
                <div className="absolute left-0 mt-2 w-32 bg-white rounded-lg shadow-lg text-center z-50">
                  <button
                    onClick={handleLogout}
                    className="w-full py-2 px-4 text-red-600 hover:bg-gray-100 rounded-lg"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
