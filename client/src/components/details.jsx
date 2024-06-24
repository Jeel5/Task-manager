import React from "react";

const Details = ({ task, close }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="relative w-1/3 bg-[#181e3e] bg-opacity-70 border border-white/30 rounded-lg p-4" style={{ height: "96vh" }}>
      <div className="text-lg font-semibold mb-4">Task Details</div>
      <div className="text-sm">
        <div className="mb-5">
          <label className="block mb-3 text-gray-400">Task Name:</label>
          <div className="text-white text-sm border border-white rounded-xl p-3 bg-[#141933]">{task.title}</div>
        </div>
        <div className="mb-5">
          <label className="block mb-3 text-gray-400">Start Date:</label>
          <div className="text-white text-sm border border-white rounded-xl p-3 bg-[#141933]">{formatDate(task.startDate)}</div>
        </div>
        <div className="mb-5">
          <label className="block mb-3 text-gray-400">End Date:</label>
          <div className="text-white text-sm border border-white rounded-xl p-3 bg-[#141933]">{formatDate(task.endDate)}</div>
        </div>
        <div className="mb-5">
          <label className="block mb-3 text-gray-400">Priority:</label>
          <div className="text-white text-sm border border-white rounded-xl p-3 bg-[#141933]">{task.priority}</div>
        </div>
        <div className="mb-5">
          <label className="block mb-3 text-gray-400">Description:</label>
          <div className="text-white text-xs border border-white rounded-xl p-3 bg-[#141933]">{task.description}</div>
        </div>
      </div>
      <button className="px-4 py-2 absolute right-5 bottom-5 hover:bg-red-800 bg-gray-600 text-white rounded-lg ml-2" onClick={close}>
        Close
      </button>
    </div>
  );
};

export default Details;
