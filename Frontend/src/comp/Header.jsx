import React, { useState } from "react";
import AzuraWhite from "../assets/azura-white.png"
import UserProfile from "../assets/user.png"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="flex justify-between items-center py-4 px-8 bg-gray-800 text-white">
      <div className="flex items-center justify-center w-">
        <img src={AzuraWhite} alt="Logo" className="h-10" />
      </div>
      <div className="relative">
        <button onClick={toggleMenu} className="focus:outline-none">
          <img src={UserProfile} alt="Profile" className="h-8 w-8" />
        </button>
        
        {isMenuOpen && (
          <div className="absolute z-50 right-0 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg">
            <ul>
              <li className="py-2 px-4 hover:bg-green-100 cursor-pointer text-black">Profile Settings</li>
              <li className="py-2 px-4 hover:bg-red-100 cursor-pointer text-black">Log Out</li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
