import React, { useState, useEffect } from "react";

const CreateTaskForm = ({ saveTask, task, userId, onCancel }) => {
  const [taskName, setTaskName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");

  useEffect(() => {
    if (task) {
      setTaskName(task.title);
      setStartDate(task.startDate.split("T")[0]);
      setEndDate(task.endDate.split("T")[0]);
      setDescription(task.description);
      setPriority(task.priority);
    } else {
      setTaskName("");
      setStartDate("");
      setEndDate("");
      setDescription("");
      setPriority("Low");
    }
  }, [task]);

  const handleSaveTask = () => {
    const newTask = {
      title: taskName,
      startDate,
      endDate,
      description,
      priority,
      userId
    };

    saveTask(task ? { ...newTask, id: task.id } : newTask);
    setTaskName("");
    setStartDate("");
    setEndDate("");
    setDescription("");
    setPriority("Low");
  };

  return (
    <div className="w-1/3 bg-[#181e3e] bg-opacity-70 border border-white/30 rounded-lg p-4" style={{ height: "96vh" }}>
      <div className="text-lg font-semibold mb-4">{task ? "Edit Task" : "Create New Task"}</div>
      <div className="text-sm">
        <div className="mb-4">
          <label className="block mb-2 text-gray-400">Task Name</label>
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            className="w-full p-2 bg-transparent border border-white/30 text-white rounded-lg"
            maxLength={50}
            placeholder="Enter task name"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-gray-400">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full p-2 bg-transparent border border-white/30 text-white rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-gray-400">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full p-2 bg-transparent border border-white/30 text-white rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-gray-400">Priority</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full p-2 border border-white/30 text-white rounded-lg bg-transparent"
          >
            <option className="border border-white/30 text-white rounded-lg bg-[#181e3e]" value="Low">
              Low
            </option>
            <option className="border border-white/30 text-white rounded-lg bg-[#181e3e]" value="High">
              High
            </option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-gray-400">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 bg-transparent border border-white/30 text-white rounded-lg resize-none"
            maxLength={200}
            rows={8}
            placeholder="Enter task description"
          />
        </div>
        <div className="flex justify-end">
          <button className="px-4 py-2 bg-violet-800 text-white rounded-lg" onClick={handleSaveTask}>
            Save Task
          </button>
          <button className="px-4 py-2 bg-gray-600 text-white rounded-lg ml-2" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTaskForm;
