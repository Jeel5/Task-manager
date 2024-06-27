import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faTasks, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const Sidebar = ({ onItemClick, onLogoutClick }) => {
  const [selectedItem, setSelectedItem] = useState('Dashboard');

  useEffect(() => {
    setSelectedItem('Dashboard');
  }, []);

  const handleItemClick = (itemName) => {
    setSelectedItem(itemName);
    onItemClick(itemName);
  };

  const isItemSelected = (itemName) => {
    return selectedItem === itemName;
  };

  return (
    <div className="flex flex-col rounded-lg p-6 bg-opacity-10 mr-3 overflow-hidden" style={{ height: "96vh", width: "18vw" }}>
      <div className="flex items-center h-16 text-xl font-semibold text-white">
        COCREATE
      </div>
      <nav className="flex-1 overflow-y-auto">
        <ul>
          <li
            className={`px-4 flex items-center py-2 text-gray-300 mb-2 transition-all ease delay-100 rounded-lg cursor-pointer ${
              isItemSelected('Dashboard') ? 'bg-violet-800 text-white' : 'hover:bg-violet-800/30 hover:text-white'
            }`}
            onClick={() => handleItemClick('Dashboard')}
          >
            <FontAwesomeIcon icon={faHome} className="mr-2" />
            <div>Dashboard</div>
          </li>
          <li
            className={`px-4 flex items-center py-2 text-gray-300 mb-2 transition-all ease delay-100 rounded-lg cursor-pointer ${
              isItemSelected('Tasks') ? 'bg-violet-800 text-white' : 'hover:bg-violet-800/30 hover:text-white'
            }`}
            onClick={() => handleItemClick('Tasks')}
          >
            <FontAwesomeIcon icon={faTasks} className="mr-2" />
            <div>Tasks</div>
          </li>
        </ul>
      </nav>
      <div className="border-t border-gray-700">
        <ul>
          <li
            className="px-4 py-2 flex items-center text-gray-300 hover:bg-red-900 transition-all ease delay-100 cursor-pointer rounded-lg"
            onClick={onLogoutClick}
          >
            <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
            <div>Logout</div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
