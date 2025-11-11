import React, { useState } from 'react';
  



import { useNavigate } from 'react-router-dom';


 


const Navbar = () => {

    const navigate = useNavigate();

    const handleRegClick = () => {
      navigate('/register');
    };
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-transparent fixed w-full z-10 top-0">
            <div className="container mx-auto flex items-center justify-between p-4">
                <div className="text-white text-xl">Travelo</div>
                <div className="hidden lg:flex space-x-4">
                    <a href="#home" className="text-white">Home</a>
                    <a href="#login" className="text-white"  onClick={handleRegClick}>Log In</a>
                    <a href="#explore" className="text-white">Explore</a>
                    <a href="#contact" className="text-white">Contact Us</a>
                </div>
                <div className="lg:hidden flex items-center">
                    <button onClick={toggleMenu} className="text-white focus:outline-none">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </button>
                </div>
            </div>
            {isOpen && (
                <div className="lg:hidden flex flex-col space-y-2 p-4 bg-black">
                    <a href="#home" className="text-white">Home</a>
                    <a href="#login" className="text-white" onClick={handleRegClick}>Log In</a>
                    <a href="#explore" className="text-white">Explore</a>
                    <a href="#contact" className="text-white">Contact Us</a>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
