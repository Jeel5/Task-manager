import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="flex flex-col h-screen w-64 bg-gray-900 text-gray-100">
      <div className="flex items-center justify-center h-16 bg-gray-800 text-xl font-semibold">
        COCREATE
      </div>
      <nav className="flex-1 overflow-y-auto">
        <ul>
          <li className="px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white">
            <Link to="/">Dashboard</Link>
          </li>
          <li className="px-4 py-2 bg-purple-600 text-white">
            <Link to="/projects">Projects</Link>
          </li>
          <li className="px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white">
            <Link to="/issues">Issues</Link>
          </li>
          <li className="px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white">
            <Link to="/boards">Boards</Link>
          </li>
          <li className="px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white">
            <Link to="/calendar">Calendar</Link>
          </li>
        </ul>
        <Outlet />
      </nav>
      <div className="border-t border-gray-700">
        <ul>
          <li className="px-4 py-2 text-gray-300">
            <Link to="/logout">Log out</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
