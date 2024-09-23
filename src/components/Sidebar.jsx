import React from 'react';
import { FaHome, FaBook, FaUserAlt, FaChartLine, FaSignOutAlt } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div>
      {/* Vertical Sidebar for Large Screens */}
      <div className="hidden md:flex flex-col h-screen p-4 bg-white w-64 border-r">
        {/* Sidebar Header */}
        <div className="text-gray-600 text-lg font-bold mb-6">
          Student Dashboard
        </div>

        {/* Sidebar Items */}
        <nav className="flex flex-col space-y-4">
          <a href="/" className="flex items-center space-x-2 text-gray-600 hover:bg-blue-100
           p-2 rounded">
            <FaHome />
            <span>Home</span>
          </a>

          <a href="/quizzes" className="flex items-center space-x-2 text-gray-600 hover:bg-blue-100 p-2 rounded">
            <FaBook />
            <span>Quizzes</span>
          </a>

          <a href="/profile" className="flex items-center space-x-2 text-gray-600 hover:bg-blue-100 p-2 rounded">
            <FaUserAlt />
            <span>Profile</span>
          </a>

          <a href="/progress" className="flex items-center space-x-2 text-gray-600 hover:bg-blue-100 p-2 rounded">
            <FaChartLine />
            <span>Progress</span>
          </a>
        </nav>

        {/* Sidebar Footer with Logout */}
        <div className="mt-auto">
          <a href="/logout" className="flex items-center space-x-2 text-gray-600 hover:bg-red-600 p-2 rounded">
            <FaSignOutAlt />
            <span>Logout</span>
          </a>
        </div>
      </div>

      {/* Horizontal Navbar for Mobile Screens */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-white flex justify-around p-2">
        <a href="/" className="flex flex-col items-center space-y-1 text-gray-600 hover:bg-blue-100 p-2 rounded">
          <FaHome />
          <span className="text-xs">Home</span>
        </a>

        <a href="/quizzes" className="flex flex-col items-center space-y-1 text-gray-600 hover:bg-blue-100 p-2 rounded">
          <FaBook />
          <span className="text-xs">Quizzes</span>
        </a>

        <a href="/profile" className="flex flex-col items-center space-y-1 text-gray-600 hover:bg-blue-100 p-2 rounded">
          <FaUserAlt />
          <span className="text-xs">Profile</span>
        </a>

        <a href="/progress" className="flex flex-col items-center space-y-1 text-gray-600 hover:bg-blue-100 p-2 rounded">
          <FaChartLine />
          <span className="text-xs">Progress</span>
        </a>

       
      </div>
    </div>
  );
};

export default Sidebar;
