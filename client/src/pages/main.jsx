import React, { useState } from "react";  
import Sidebar from "../components/sidebar";
import img from "../assets/back1.jpg";
import Dashboard from "./dashboard";
import Task from "./task";

const Main = () => {
  const [selectedItem, setSelectedItem] = useState("Dashboard");

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <div
      className="flex p-4 overflow-hidden h-screen bg-opacity-50"
      style={{
        backgroundImage: `url(${img})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Sidebar onItemClick={handleItemClick} />
      <div className="flex items-center h-full">
        {selectedItem === "Dashboard" && <Dashboard />}      
        {selectedItem === "Tasks" && <Task />}
      </div>
    </div>
  );
};

export default Main;
