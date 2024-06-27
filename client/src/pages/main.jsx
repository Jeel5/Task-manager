import React, { useState } from "react";  
import Sidebar from "../components/sidebar";
import img from "../assets/back1.jpg";
import Dashboard from "./dashboard";
import Task from "./task";

const Main = ({ setIsAuthenticated }) => {
  const [selectedItem, setSelectedItem] = useState("Dashboard");
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  const confirmLogout = () => {
    setShowLogoutConfirm(true);
  };

  const cancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  return (
    <div
      className="relative flex p-4 overflow-hidden h-screen bg-opacity-50"
      style={{
        backgroundImage: `url(${img})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Sidebar onItemClick={handleItemClick} onLogoutClick={confirmLogout} />
      <div className="flex items-center h-full">
        {selectedItem === "Dashboard" && <Dashboard />}      
        {selectedItem === "Tasks" && <Task />}
      </div>
      {showLogoutConfirm && (
        <div className="absolute bg-black inset-0 flex items-center justify-center bg-opacity-50">
          <div className="bg-[#1c1849] p-6 rounded-lg shadow-lg">
            <h2 className="text-lg text-white text-center font-semibold mb-4">Confirm Logout</h2>
            <p className="mb-4 text-white">Are you sure you want to logout?</p>
            <div className="flex justify-around">
              <button
                className="bg-red-600 text-white px-4 py-2 rounded mr-2"
                onClick={handleLogout}
              >
                Logout
              </button>
              <button
                className="bg-gray-300 px-4 py-2 rounded"
                onClick={cancelLogout}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Main;
