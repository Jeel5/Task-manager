import React from 'react';

const Sidebar = ({ onItemClick }) => {
  return (
    <div className="flex flex-col rounded-lg p-6 bg-opacity-10 mr-3 overflow-hidden" style={{height: "96vh", width: "18vw"}}>
      <div className="flex items-center h-16 text-xl font-semibold text-white">
        COCREATE
      </div>
      <nav className="flex-1 overflow-y-auto">
        <ul>
          <li
            className="px-4 py-2 text-gray-300 hover:bg-violet-800 mb-2 hover:text-white transition-all ease delay-100 rounded-lg cursor-pointer"
            onClick={() => onItemClick("Dashboard")}
          >
            <div>Dashboard</div>
          </li>
          <li
            className="px-4 py-2 hover:bg-violet-800 transition-all ease delay-100 rounded-lg text-white cursor-pointer"
            onClick={() => onItemClick("Tasks")}
          >
            <div>Tasks</div>
          </li> 
        </ul>
      </nav>
      <div className="border-t border-gray-700">
        <ul>
          <li
            className="px-4 py-2 text-gray-300 hover:bg-red-900 transition-all ease delay-100 cursor-pointer rounded-lg"
            onClick={() => onItemClick("Logout")}
          >
            <div>Logout</div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
