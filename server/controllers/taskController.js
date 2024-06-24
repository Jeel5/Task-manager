const { task } = require('../models');

const createTask = async (req, res) => {
  try {
    const { title, description, startDate, endDate, priority } = req.body;
    const userId = req.userId;

    const newTask = await task.create({
      title,
      description,
      startDate,
      endDate,
      userId,
      priority,
    });

    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTasksByUserId = async (req, res) => {
  console.log("getooo")
  try {
    const userId = req.userId;
    const tasks = await task.findAll({ where: { userId } });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id, title, description, startDate, endDate, status, priority } = req.body;
    const userId = req.userId;

    const existingTask = await task.findOne({ where: { id, userId } });
    if (!existingTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    existingTask.title = title;
    existingTask.description = description;
    existingTask.startDate = startDate;
    existingTask.endDate = endDate;
    existingTask.status = status;
    existingTask.priority = priority;

    await existingTask.save();
    res.status(200).json(existingTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createTask,
  getTasksByUserId,
  updateTask
};
