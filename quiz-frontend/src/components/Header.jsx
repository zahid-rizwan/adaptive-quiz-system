import React, { useState } from 'react';
import {FaBars , FaBell, FaChevronDown } from 'react-icons/fa';

const Header = ({toggleSidebar}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      {/* Search Bar */}
      <button className="text-gray-600 md:hidden" onClick={toggleSidebar}>
        <FaBars size={24} />
      </button>
      <div className="flex items-center space-x-2 w-1/3">
        <input 
          type="text" 
          placeholder="Search..." 
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Notification Icon and Profile Section */}
      <div className="flex items-center space-x-6">
        {/* Notification Icon */}
        <button className="text-gray-600 hover:text-gray-800">
          <FaBell size={20} />
        </button>

        {/* Profile Section */}
        <div className="relative">
          <div className="flex items-center cursor-pointer" onClick={toggleDropdown}>
            <img 
              src="https://via.placeholder.com/40" 
              alt="Profile" 
              className="w-10 h-10 rounded-full"
            />
            <FaChevronDown className="ml-2 text-gray-600" />
          </div>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute border right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2">
              <a href="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Account Settings</a>
              <a href="/logout" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Log Out</a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
