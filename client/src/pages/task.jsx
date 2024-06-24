import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faFileCirclePlus,
  faSliders,
  faEllipsisH,
  faEdit,
  faTrashAlt
} from "@fortawesome/free-solid-svg-icons";
import Details from "../components/details";
import CreateTaskForm from "../components/createtask";
import axios from "axios";

const Task = ({ userId }) => {
  const [taskDetail, setTaskDetail] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editDelete, setEditDelete] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:3100/user', {
          headers: { Authorization: token }
        });
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks", error);
      }
    };

    fetchTasks();
  }, [token]);

  const createTask = () => {
    setTaskToEdit(null);
    setShowCreateForm(true);
  };

  const saveTask = async (newTask) => {
    try {
      const response = await axios.post('http://localhost:3100/create', { ...newTask, userId }, {
        headers: { Authorization: token }
      });
      setTasks([...tasks, response.data]);
      setShowCreateForm(false);
    } catch (error) {
      console.error("Error saving task", error);
    }
  };

  const handleTaskClick = (task, event) => {
    if (!event.target.classList.contains('edit-delete-icon')) {
      setShowCreateForm(false);
      setTaskDetail(task);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);
    return `${day}-${month}-${year}`;
  };

  const getTaskStatus = (startDate, endDate) => {
    const today = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);
    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(endDate);

    if (today >= start && today <= end) {
      return "In Progress";
    } else if (today < start) {
      return `To-Do (${formattedStartDate} - ${formattedEndDate})`;
    } else {
      return `Incomplete (${formattedStartDate} - ${formattedEndDate})`;
    }
  };

  const closeDetails = () => {
    setTaskDetail(null);
  };

  const editdelete = (taskId) => {
    if (editDelete.includes(taskId)) {
      setEditDelete(editDelete.filter(id => id !== taskId));
    } else {
      setEditDelete([...editDelete, taskId]);
    }
  }

  const showEdit = (task) => {
    setTaskToEdit(task);
    setShowCreateForm(true);
    setEditDelete([]);
  }

  return (
    <div className="flex justify-center gap-3 flex-1 text-white rounded-lg" style={{ height: "96vh", width: "80vw" }}>
      <div className="flex flex-1 gap-2 space-x-2 overflow-hidden rounded-lg">
        <div className="flex-1 flex flex-col rounded-lg p-4 pb-0 bg-opacity-70 border border-white/30 overflow-y-auto">
          <div className="flex items-center relative mb-4">
            <FontAwesomeIcon icon={faSearch} className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search tasks"
              className="p-2 pl-10 bg-transparent border border-white/30 text-white rounded-lg"
              style={{width: "calc(100% - 3rem)"}}
            />
            <div className="flex items-center">
              <FontAwesomeIcon icon={faSliders} className="text-gray-400 ml-8" />
              <div className="flex text-nowrap ml-3">All filters</div>
              <div className="relative flex text-nowrap items-center ml-24" onClick={createTask}>
                <FontAwesomeIcon icon={faFileCirclePlus} className="absolute left-4 text-violet-800" />
                <div className="p-2 pl-10 px-4 cursor-pointer rounded-xl border border-violet-800">
                  Create task
                </div>
              </div>
            </div>
          </div>
          <div className="flex h-full justify-around items-center rounded-xl border overflow-hidden border-white/30">
            <div className="flex-1 items-center flex overflow-hidden h-full flex-col border border-white/10">
              <h2 className="h-10 w-full text-lg text-center font-semibold mb-2 bg-[#12162d] p-1">To-Do</h2>
              {tasks.filter(task => getTaskStatus(task.startDate, task.endDate).startsWith('To-Do')).map(task => (
                <div key={task.id} title="Double click to open details" className="relative task-card bg-[#141933] cursor-pointer flex flex-col rounded-xl gap-3 mb-4 border border-white/20 p-3" style={{width: "96%"}} onDoubleClick={(event) => handleTaskClick(task, event)}>
                  <div className="flex justify-between">
                    <div className="text-sm">{formatDate(task.startDate)}</div>
                    <FontAwesomeIcon icon={faEllipsisH} className="text-white h-5 w-5 edit-delete-icon" onClick={() => editdelete(task.id, task)} />
                  </div>
                  {editDelete.includes(task.id) && 
                  <div className="absolute bg-black border border-white text-white flex flex-col gap-3 p-1 rounded-lg right-0 top-8">
                    <div className="flex items-center gap-1 hover:text-blue-600" onClick={() => showEdit(task)}> 
                      <FontAwesomeIcon icon={faEdit} />
                      <div className="text-base">Edit</div>
                    </div>
                    <div className="flex items-center gap-1 hover:text-red-700"> 
                      <FontAwesomeIcon icon={faTrashAlt} />
                      <div className="text-base">Delete</div>
                    </div>
                  </div>
                  }
                  <div className="border-l-4 border-[#8208fc] text-xl py-3 pl-3">{task.title}</div>
                  <div className="text-sm">{formatDate(task.endDate)}</div>
                </div>
              ))}
            </div>
            <div className="flex-1 items-center flex overflow-hidden h-full flex-col border border-white/10">
              <h2 className="h-10 w-full text-lg text-center font-semibold mb-2 bg-[#12162d] p-1">In-progress</h2>
              {tasks.filter(task => getTaskStatus(task.startDate, task.endDate).startsWith('In Progress')).map(task => (
                <div key={task.id} title="Double click to open details" className="relative task-card bg-[#141933] cursor-pointer flex flex-col rounded-xl gap-3 mb-4 border border-white/20 p-3" style={{width: "96%"}} onDoubleClick={(event) => handleTaskClick(task, event)}>
                  <div className="flex justify-between">
                    <div className="text-sm">{formatDate(task.startDate)}</div>
                    <FontAwesomeIcon icon={faEllipsisH} className="text-white h-5 w-5 edit-delete-icon" onClick={() => editdelete(task.id, task)} />
                  </div>
                  {editDelete.includes(task.id) && 
                  <div className="absolute bg-black border border-white text-white flex flex-col gap-3 p-1 rounded-lg right-0 top-8">
                    <div className="flex items-center gap-1 hover:text-blue-600" onClick={() => showEdit(task)}> 
                      <FontAwesomeIcon icon={faEdit} />
                      <div className="text-base">Edit</div>
                    </div>
                    <div className="flex items-center gap-1 hover:text-red-700"> 
                      <FontAwesomeIcon icon={faTrashAlt} />
                      <div className="text-base">Delete</div>
                    </div>
                  </div>
                  }
                  <div className="border-l-4 hover:border-white border-[#8208fc] text-xl py-3 pl-3">{task.title}</div>
                  <div className="text-sm">{formatDate(task.endDate)}</div>
                </div>
              ))}
            </div>
            <div className="flex-1 items-center flex overflow-hidden h-full flex-col border border-white/10">
              <h2 className="h-10 w-full text-lg text-center font-semibold mb-2 bg-[#12162d] p-1">Incomplete</h2>
              {tasks.filter(task => getTaskStatus(task.startDate, task.endDate).startsWith('Incomplete')).map(task => (
                <div key={task.id} title="Double click to open details" className="relative task-card bg-[#141933] cursor-pointer flex flex-col rounded-xl gap-3 mb-4 border border-white/20 p-3" style={{width: "96%"}} onDoubleClick={(event) => handleTaskClick(task, event)}>
                  <div className="flex justify-between">
                    <div className="text-sm">{formatDate(task.startDate)}</div>
                    <FontAwesomeIcon icon={faEllipsisH} className="text-white h-5 w-5 edit-delete-icon" onClick={() => editdelete(task.id, task)} />
                  </div>
                  {editDelete.includes(task.id) && 
                  <div className="absolute bg-black border border-white text-white flex flex-col gap-3 p-1 rounded-lg right-0 top-8">
                    <div className="flex items-center gap-1 hover:text-blue-600" onClick={() => showEdit(task)}> 
                      <FontAwesomeIcon icon={faEdit} />
                      <div className="text-base">Edit</div>
                    </div>
                    <div className="flex items-center gap-1 hover:text-red-700"> 
                      <FontAwesomeIcon icon={faTrashAlt} />
                      <div className="text-base">Delete</div>
                    </div>
                  </div>
                  }
                  <div className="border-l-4 hover:border-white border-[#8208fc] text-xl py-3 pl-3">{task.title}</div>
                  <div className="text-sm">{formatDate(task.endDate)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {taskDetail && !showCreateForm && (
        <Details task={taskDetail} close={closeDetails} />
      )}
      {showCreateForm && <CreateTaskForm saveTask={saveTask} task={taskToEdit} userId={userId} onCancel={() => setShowCreateForm(false)} />}
    </div>
  );
};

export default Task;
